import { NextResponse } from 'next/server';
import type { NextApiResponse } from 'next';
import { db } from '@/server/index';
import { elaborateCompanies } from '@/server/db/schema';

export async function POST(req: Request, res: NextApiResponse) {
    let data = await req.json();

    if (data === null) {
        return NextResponse.json(
          { error: `Failed to parse request body` }, 
          { status: 400 }
        )
    }

    //Full data for the elaborateCompanies table, using this table you can create objects for each individual row (aka Company)
    const allData = await db.select({
      category: elaborateCompanies.category,
      name: elaborateCompanies.name,
      type: elaborateCompanies.type,
      description: elaborateCompanies.description,
      resources: elaborateCompanies.resources,
      phonenumber: elaborateCompanies.phonenumber,
      email: elaborateCompanies.email,
      genpage: elaborateCompanies.genpage as any,
    }).from(elaborateCompanies).execute();

    //Object for the Company Bombay Bazar
    const findName = allData.find(item => item.name === data.name);
    
    return NextResponse.json({ ragData: findName });
}