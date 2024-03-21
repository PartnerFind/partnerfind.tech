import { NextResponse } from 'next/server';
import { NextApiResponse } from 'next';

export async function POST(request: Request, res: NextApiResponse) {
    const data: any = await request.json();
    let testData = {
        "business_name": "Starbucks",
        "address": "125 Plaza Dr, Wildwood, MO 63040"
    }
    // First thing, call tavily api and pass in data

    

    // Pass tavily response into groq

    
    return NextResponse.json({ status: "success" });
}