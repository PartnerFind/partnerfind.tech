import { NextResponse } from "next/server";
import type { NextApiResponse } from "next";
import { elaborateCompanies } from "@/server/db/schema";
import fetchRAGDataForAPartner from "@/util/fetchRAGDataForAPartner";
import { db } from "@/server/index";
import Groq from "groq-sdk";

// Define the handler for POST requests
export async function POST(request: Request, res: NextApiResponse) {
  const data: any = await request.json(); // Parse the JSON request body to get the input data

  if (!data) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // Create a prompt for the Tavily API
  const tavilyPrompt = `I want to partner with: ${data.business_name} at this zip code ${data.zip_code}.list me the business phone number, tell me the abbr. type of business:(NPO:nonprofit org,FPO:for profit org,GA:Government Association,LB:Local Business,CB:Corporate Business)tell me the industry it is in, detailed description, and resources they could provide to a high school`;

  // Ensure the prompt does not exceed 400 characters
  if (tavilyPrompt.length > 399) {
    return NextResponse.json(
      {
        error: "The prompt length exceeds the maximum limit of 400 characters.",
      },
      { status: 400 }
    );
  }

  let checkIfPartnerInDB = await fetchRAGDataForAPartner(data.business_name);

  if (checkIfPartnerInDB.ragData !== null && checkIfPartnerInDB.ragData !== undefined) {
    return NextResponse.json({ error: "Partner already in database" }, { status: 206 });
  }

  // ENV KEYS
  let TAVILY_API_KEY = null;
  let GROQ_API_KEY = null;
  let CLEARBIT_SECRET_KEY = null;
  let HUNTERIO_API_KEY = null;

  if (process.env.NODE_ENV === "development") {
    TAVILY_API_KEY = process.env.LOCAL_TAVILY_API_KEY;
    GROQ_API_KEY = process.env.LOCAL_GROQ_API_KEY;
    CLEARBIT_SECRET_KEY = process.env.CLEARBIT_SECRET_KEY; // use the same key for local and prod (no limits)
    HUNTERIO_API_KEY = process.env.LOCAL_HUNTERIO_API_KEY;
  } else {
    TAVILY_API_KEY = process.env.TAVILY_API_KEY;
    GROQ_API_KEY = process.env.GROQ_API_KEY;
    CLEARBIT_SECRET_KEY = process.env.CLEARBIT_SECRET_KEY;
    HUNTERIO_API_KEY = process.env.HUNTERIO_API_KEY;
  }

  try {
    // Call Tavily API with the generated prompt
    const tavilyAPI = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: TAVILY_API_KEY,
        query: tavilyPrompt,
        search_depth: "advanced",
        include_answer: true,
        include_raw_content: false,
        max_results: 5, // Limit the results to 5
      }),
    });

    // Check if Tavily API call was successful
    if (!tavilyAPI.ok) {
      return NextResponse.json({ error: `Failed to query Tavily API: ${tavilyAPI.statusText}` }, { status: 500 });
    }

    const tavilyResponse = await tavilyAPI.json(); // Parse the response from Tavily API

    // Call Clearbit API to get additional company details
    const clearbitAPI = await fetch(`https://company.clearbit.com/v1/domains/find?name=${data.business_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CLEARBIT_SECRET_KEY}`,
      },
    });

    const clearbitResponse = await clearbitAPI.json(); // Parse the response from Clearbit API

    // Call Hunter.io API to get the email address of the company
    const hunterAPI = await fetch(
      `https://api.hunter.io/v2/domain-search?domain=${clearbitResponse.domain}&api_key=${HUNTERIO_API_KEY}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const hunterResponse = await hunterAPI.json(); // Parse the response from Hunter.io API
    const email = hunterResponse.data.emails[0]?.value || ""; // Extract the email address or default to an empty string

    const groq = new Groq({
      apiKey: GROQ_API_KEY,
    }); // Initialize Groq SDK

    // Create a prompt for Groq API with the response from Tavily API
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
            "name": "", // (the business name KEEP IT THE SAME AS WHAT TAVILY GIVES YOU)
            "phonenumber": "", // just the simple 9 digits as it will be a US number no formatting no extra characters - (IF NOT VALID LEAVE BLANK)
            "email": "", // Leave blank if no VALID email is provided
            "type": "", // (the industry it is in --- one worder, make sure it is exactly a singular word and make it very vague/general, simply saying the umbrella industry it's in)
            "resources": "", // (very brief list of resources they provide for highschool students)
            "description": "", // (extremely brief and concise description of the organization)
            "category": "", // (2 or 3 letter abbreviation for the type of organization it is - MUST BE ONE OF THESE: (NPO - nonprofit org,FPO - for profit org, GA - Government Association, LB - Local Business,CB - Corporate Business))
            "genpage": { // DO NOT ADD ANY \\n OR ESCAPE SEQUENCES IN THIS FOLLOWING OBJECT
              "summary": "", // (summary of the organization and who they are; be descriptive and talk about how this partner can potential help highschool students)
              "resources": "", // (resources offered by the organization for highschools;be extremely descriptive and specific in your analysis)
              "reasons": "", // (list out all the reasons we as a high school should partner with the organization and the opportunities they offer)
              "flaws" : "", // (list out a couple reasons to reconsider our partnership with potential flaws - can be any potential flaws make sure to list some)
              "process" : "" // (list out directions and the process I should follow to partner with this organization)
            }
          }
          If ANY VALUE is blank, say N/A in the field. Try to make sure there is 1 valid phonenumber with the given format above in the field, 
          and one VALID email in the field.
          `;

    // Define the parameters for the Groq API call
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

    // Call Groq API and parse the response
    const groqCompletion = await groq.chat.completions.create(groqParams);
    let parsedGroqCompletion: any = groqCompletion.choices[0]?.message?.content ?? "";
    parsedGroqCompletion = JSON.parse(parsedGroqCompletion);

    // Simplify Tavily API results for easier consumption
    const simplifiedResults = tavilyResponse.results.map((result: any) => ({
      title: result.title,
      url: result.url,
      score: result.score,
    }));

    // Add simplified results to the parsed Groq response
    parsedGroqCompletion.sources = simplifiedResults;

    // Insert the processed data into the database
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
          sources: parsedGroqCompletion.sources,
        },
      ]);
    } catch (err: any) {
      // Handle potential duplicate entry error
      if (err.code === "23505") {
        return NextResponse.json({ error: `Duplicate DB entry: ${err.message}` }, { status: 206 });
      } else {
        // Handle other database errors
        console.error(err);
        return NextResponse.json({ error: `Error adding to DB: ${err.message}` }, { status: 500 });
      }
    }

    // Return the successfully processed and inserted data
    return NextResponse.json({ generation: parsedGroqCompletion }, { status: 200 });
  } catch (err: any) {
    // Handle any other errors that may occur during the process
    console.error(err);
    return NextResponse.json({ error: `An error occurred: ${err.message}` }, { status: 500 });
  }
}
