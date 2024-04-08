import { NextResponse } from 'next/server';
import { NextApiResponse } from 'next';
import Groq from 'groq-sdk'; 
import { elaborateCompanies } from '@/server/db/schema';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

const sql = neon<boolean, boolean>(process.env.DATABASE_URL!);
const db = drizzle(sql);

export async function POST(request: Request, res: NextApiResponse) {
    const data: any = await request.json();
    // First thing, call tavily api and pass in data
    let tavilyPrompt = `I want to partner with: ${data.business_name} at this zip code ${data.zip_code}. list me the phone number and email,tell me the abbr. type: (NPO:non profit org, FPO:for profit org, GA:Government Association, LB:Local Business, CB:Corporate Business) tell me the industry it is in, brief description, and resources they could provide to a high school.Remove all the \\n and extra spaces from the response`

    try {
      const tavilyAPI = await fetch('https://api.tavily.com/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: process.env.TAVILY_API_KEY,
          query: tavilyPrompt,
          search_depth: 'basic',
          include_images: true,
          include_answer: true,
          include_raw_content: false,
          max_results: 5, // trying this out
        }),
      });
        
      if (tavilyAPI.ok) {
        // If tavily API is successful, call groq API and pass in the response from tavily
        const tavilyResponse = await tavilyAPI.json();
        console.log(tavilyResponse.answer)
        const groq = new Groq();

        let groqPrompt = `I am an administrator at my high school and need insightful information on potential community partners near me. 
          take the info I will give you from a tavilyAPI search and compile it into JSON struture, 
          I want you to give a detailed analysis on the resources that the organization can provide that you will be given, and also come up with and infer potential reasons to or 
      not to partner with this organization and how it will be beneficial for the school. 
          Furthemore, come up with how we can work with the organization such as giving a process (directions) by contacting the specific number and email, reaching out to them, 
      and then talking about how we can acquire their resources for our school. 
          here is the tavilyAPI completion data:  
          "answer": "${tavilyResponse.answer}"  
          
          I want the response to go straight to the static site and look as professional and consistently generated as possible. 
          
          Make absolute sure your response is in the following JSON format without any escape sequences like new lines and the first key should be phoneNumber.
          Your response should be valid JSON string that is usable outside of the box without any tweaks for data.
          make sure to remove any new lines and extra spaces from the JSON response.
          {
          "phoneNumber": "(format: (314)-292-6262 --- include parenthesis for area code and dashes between each area code, telephone prefix, and line number including a dash after 
      the parenthesis)",
          "email": "(whatever the email is)",
          "name": "(exact business name from Tavily completion)",
          "type": "(the industry it is in --- one worder, make sure it is exactly a singular word and make it very vague/general, simply saying the umbrella industry it's in)",
          "resources": "(very brief list of resources they provide)",
          "description": "(extremely brief and concise description of the organization)",
          "category": "(3 letter abbreviation for the type of organization it is)",
          "genpage": {
            "summary": "(summary of the organization and who they are)",
            "resources": "(resources offered by the organization for highschools (be descriptive in your analysis))",
            "reasons": "(list out reasons we as a high school should partner with the organization and the opportunities they offer)",
            "flaws" : "(list out a couple reasons to reconsider our partnership with potential flaws)",
            "process" : "(list out directions and the process I should follow to partner with this organization)"
            }
          }`

          const groqParams = {
            messages: [
              { role: 'system', content: 'You are a RAG assistant that only answers in valid JSON (no generation key just straight into what the prompt asks for)' },
              { role: "user", content: groqPrompt }
            ],
            model: "mixtral-8x7b-32768",
            // temperature: "0.1", // TODO: Add these settings
            // max_tokens: "3000",
            // stream: false,
            // response_format: {
            //     type: "json_object"
            // }
          }

        // Call groq API and return the response
        try {
          const groqCompletion: Groq.Chat.ChatCompletion = await groq.chat.completions.create(groqParams);
          console.log("Seeding database");
          await db.insert(elaborateCompanies).values([
            {
              category: groqCompletion.choices[0]?.message?.content.category,
              name: groqCompletion.choices[0]?.message?.content.name,
              type: groqCompletion.choices[0]?.message?.content.type,
              description: groqCompletion.choices[0]?.message?.content.description,
              resources: groqCompletion.choices[0]?.message?.content.resources,
              phonenumber: groqCompletion.choices[0]?.message?.content.phoneNumber,
              email: groqCompletion.choices[0]?.message?.content.email,
              genpage: groqCompletion.choices[0]?.message?.content.genpage.summary,
            },
          ]);
          return NextResponse.json(
            { generation: `${groqCompletion.choices[0]?.message?.content ?? ""}` }, 
            { status: 200 }
          )
        } catch (err: any) {
          return NextResponse.json(
            { error: `Failed to query Groq | ${err.name}` }, 
            { status: 500 }
          )
        }
      } else {
        return new NextResponse(`Failed to query tavily | ${tavilyAPI.statusText}`, {
          status: 500,
        })
      }
    } catch (err: any) {
      return new NextResponse(`Failed to query RAG | ${err.name}`, {
        status: 500,
      })
    }
}
