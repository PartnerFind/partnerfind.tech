import { NextResponse } from 'next/server';
import { NextApiResponse } from 'next';
import Groq from 'groq-sdk';
import { env } from "@/env"

export async function POST(request: Request, res: NextApiResponse) {
    const data: any = await request.json();
    // First thing, call tavily api and pass in data
    let tavilyPrompt = `I want to partner with: ${data.business_name} at this zip code ${data.zip_code}. list me the contact info: phone number and email. Then tell me the abbr. type: (NPO:non profit org, FPO:for profit org, GA:Government Association, LB:Local Business, CB:Corporate Business). Then tell me the industry it is in, and a brief description and the resources they could provide to a high school.`
    try {
      const tavilyAPI = await fetch('https://api.tavily.com/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: env.TAVILY_API_KEY,
          query: tavilyPrompt,
          search_depth: 'basic',
          include_images: false,
          include_answer: true,
          include_raw_content: false,
          max_results: 1,
        }),
      });
        
      if (tavilyAPI.ok) {
        // If tavily API is successful, call groq API and pass in the response from tavily
        const tavilyResponse = await tavilyAPI.json();
        const groq = new Groq();

        let groqPrompt = `I am an administrator at my high school and need insightful information on potential community partners near me. 
          I have used tavily API to scrape and find organizations and their info for me. I want you to take this info and compile it into JSON struture, with the final key in the array being all of the info compiled into a nicely and neatly formatted analysis page for my website. 
          I want you to give a detailed analysis on the resources that the organization can provide that you will be given, and also come up with and infer potential reasons to or not to partner with this organization and how it will be beneficial for the school. 
          Furthemore, come up with how we can work with the organization such as giving a process (directions) by contacting the specific number and email, reaching out to them, and then talking about how we can acquire their resources for our school. 
          here is the tavilyAPI completion:  
          "answer": "${tavilyResponse.answer}"  If for some reason you can't do something, omit the little apology statement from the text as I want the response to go straight to the static site and look as professional and consistently generated as possible. 
          Make absolute sure your response is in this exact JSON format, with the array and key: value structure, since we will be storing some important info, so make the response in this EXACT array format (key:value):
          {
          "phonenumber": "(format: (314)-292-6262 --- include parenthesis for area code and dashes between each area code, telephone prefix, and line number including a dash after the parenthesis)"
          "email": "(whatever the email is)"
          "name": "(exact business name from Tavily completion)"
          "type": "(the industry it is in --- one worder, make sure it is exactly a singular word and make it very vague/general, simply saying the umbrella industry it's in)"
          "resources": "(very brief list of resources they provide)"
          "description": "(extremely brief and concise description of the organization)"
          "category": "(3 letter abbreviation for the type of organization it is)"
          "genpage": {
            "summary": "(summary of the organization and who they are)",
            "resources": "(resources offered by the organization for highschools (be descriptive in your analysis))",
            "reasons": "(list out reasons we as a high school should partner with the organization and the opportunities they offer)"
            "flaws" : "(list out a couple reasons to reconsider our partnership with potential flaws)"
            "process" : "(list out directions and the process I should follow to partner with this organization)"
            }
          }
          
          Do not put any text outside of the array, simply give me the JSON array that I am asking for with an extensively detailed analysis for the genpage nest JSON in which you will not put any divisions within the key values, making the values a continous string/block of text and thought.`;

          const groqParams = {
            messages: [
              {
                  role: "user",
                  content: groqPrompt
              }
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