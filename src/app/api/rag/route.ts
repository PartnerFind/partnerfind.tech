import { NextResponse } from 'next/server';
import { NextApiResponse } from 'next';
import { env } from "@/env"

export async function POST(request: Request, res: NextApiResponse) {
    const data: any = await request.json();
    let testData = {
        "business_name": "Starbucks",
        "zip_code": "63040"
    }
    // First thing, call tavily api and pass in data
    let tavilyQuery = `I want to partner with: ${testData.business_name} at this zip code ${testData.zip_code}. list me the contact info: phone number and email. Then tell me the abbr. type: (NPO:non profit org, FPO:for profit org, GA:Government Association, LB:Local Business, CB:Corporate Business). Then tell me the industry it is in, and a brief description and the resources they could provide to a high school.`
    
    const tavilyAPI = await fetch('https://api.tavily.com/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: process.env.TAVILY_API_KEY,
          query: tavilyQuery,
          search_depth: 'basic',
          include_images: false,
          include_answer: true,
          include_raw_content: false,
          max_results: 1,
        }),
      });

      

      if (tavilyAPI.ok) {
        // Pass tavily response into groq
      } else {
        return new Response(`Failed to query tavily`, {
            status: 500,
        })
      }

      const tavilyResponse = await tavilyAPI.json();
    


    
    return NextResponse.json({ status: "success" });
}