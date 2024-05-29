import { NextResponse } from "next/server";
import type { NextApiResponse } from "next";
import { elaborateCompanies } from "@/server/db/schema";
import { db } from "@/server/index";
import Groq from "groq-sdk";

export async function POST(request: Request, res: NextApiResponse) {
  const data: any = await request.json();
  // First thing, call tavily api and pass in data
  let tavilyPrompt = `I want to partner with: ${data.business_name} at this zip code ${data.zip_code}.list me the business phone number, tell me the abbr. type of business:(NPO:nonprofit org,FPO:for profit org,GA:Government Association,LB:Local Business,CB:Corporate Business)tell me the industry it is in, detailed description, and resources they could provide to a high school`;

  // Check if the length exceeds 400 characters
  if (tavilyPrompt.length > 399) {
    return NextResponse.json(
      {
        error: "The prompt length exceeds the maximum limit of 400 characters.",
      },
      { status: 400 },
    );
  }

  try {
    const tavilyAPI = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: process.env.TAVILY_API_KEY,
        query: tavilyPrompt,
        search_depth: "advanced",
        include_answer: true,
        include_raw_content: false,
        max_results: 10, // trying this out
      }),
    });

    if (tavilyAPI.ok) {
      // If tavily API is successful, call groq API and pass in the response from tavily
      const tavilyResponse = await tavilyAPI.json();
      const clearbitAPI = await fetch(
        `https://company.clearbit.com/v1/domains/find?name=${data.business_name}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.CLEARBIT_SECRET_KEY}`,
          },
        },
      );
      const clearbitResponse = await clearbitAPI.json();

      const hunterAPI = await fetch(
        `https://api.hunter.io/v2/domain-search?domain=${clearbitResponse.domain}&api_key=${process.env.HUNTERIO_API_KEY}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const hunterResponse = await hunterAPI.json();
      const email = hunterResponse.data.emails[0].value;
      const groq = new Groq();

      let groqPrompt = `I am an administrator at my high school and need insightful information on potential community partners near me. 
          take the info I will give you from a tavilyAPI search and I compile it into JSON struture, 
          I want you to give a detailed analysis on the resources that the organization can provide that you will be given, and also come up with and infer potential reasons to or 
          not to partner with this organization and how it will be beneficial for the school. 
          Furthemore, come up with how we can work with the organization such as giving a process (directions) by contacting the specific number and email, reaching out to them, 
          and then talking about how we can acquire their resources for our school. 
          here is the tavilyAPI completion data:  
          "answer": "${tavilyResponse.answer.replace(/\\n/g, "")}" If for some reason you can't do something, omit the little apology statement from the text as I want the response to go straight to the static site and look as professional and consistently generated as possible. 
          Here is the email of the organization: ${email}
          NOTE: Make sure the response is a valid JSON object, meaning no escape sequences, and do this through generating the completion in only one line. 
          Make absolute sure your response is in this exact JSON schema below:
          {
            "name": "", // (the business name)
            "phonenumber": "", // just the simple 9 digits as it will be a US number no formatting no extra characters - (IF NOT VALID LEAVE BLANK)
            "email": "", // Leave blank if no VALID email is provided
            "type": "", // (the industry it is in --- one worder, make sure it is exactly a singular word and make it very vague/general, simply saying the umbrella industry it's in)
            "resources": "", // (very brief list of resources they provide for highschool students)
            "description": "", // (extremely brief and concise description of the organization)
            "category": "", // (3 letter abbreviation for the type of organization it is)
            "genpage": { // DO NOT ADD ANY \\n OR ESCAPE SEQUENCES IN THIS FOLLOWING OBJECT
              "summary": "", // (summary of the organization and who they are; be descriptive and talk about how this partner can potential help highschool students)
              "resources": "", // (resources offered by the organization for highschools;be extremely descriptive and specific in your analysis)
              "reasons": "", // (list out all the reasons we as a high school should partner with the organization and the opportunities they offer)
              "flaws" : "", // (list out a couple reasons to reconsider our partnership with potential flaws - can be any potential flaws make sure to list some)
              "process" : "" // (list out directions and the process I should follow to partner with this organization)
            }
          }
          make sure there is 1 valid phonenumber with the given format above in the field, and one VALID email in the field.
          `;
      const groqParams: any = {
        messages: [
          {
            role: "system",
            content:
              "You are a RAG assistant that only answers in valid JSON objects. The response should be instantly usable in a web app with no \\n and other escape sequences. Use the schema provided by the user.",
          },
          { role: "user", content: groqPrompt },
        ],
        model: "mixtral-8x7b-32768",
        temperature: 0.0000001,
        stream: false,
        response_format: {
          type: "json_object",
        },
      };

      // Call groq API and return the response
      try {
        const groqCompletion = await groq.chat.completions.create(groqParams);

        let parsedGroqCompletion: any =
          groqCompletion.choices[0]?.message?.content ?? "";
        parsedGroqCompletion = await JSON.parse(parsedGroqCompletion);

        try {
          await db.insert(elaborateCompanies).values([
            {
              name: parsedGroqCompletion.name,
              phonenumber: parsedGroqCompletion.phonenumber,
              email: parsedGroqCompletion.email,
              type: parsedGroqCompletion.type,
              resources: parsedGroqCompletion.resources,
              description: parsedGroqCompletion.description,
              category: parsedGroqCompletion.category,
              genpage: parsedGroqCompletion.genpage,
            },
          ]);
        } catch (err: any) {
          // Check if the error code indicates a duplicate key violation
          if (err.code === "23505") {
            return NextResponse.json(
              { error: `Duplicate DB entry: ${err.message}` },
              { status: 206 }, // 409 status code causes error messages and etc
            );
          } else {
            // For other errors, return a 500 status
            console.error(err);
            return NextResponse.json(
              { error: `Error adding to DB: ${err.message}` },
              { status: 500 },
            );
          }
        }

        return NextResponse.json(
          { generation: parsedGroqCompletion },
          { status: 200 },
        );
      } catch (err: any) {
        console.error(err);
        return NextResponse.json(
          { error: `Failed to query Groq API | ${err.message}` },
          { status: 500 },
        );
      }
    } else {
      return new NextResponse(
        `Failed to query tavily | ${tavilyAPI.statusText}`,
        {
          status: 500,
        },
      );
    }
  } catch (err: any) {
    console.error(err);
    return new NextResponse(`Failed to query Tavily (RAG) | ${err.message}`, {
      status: 500,
    });
  }
}
