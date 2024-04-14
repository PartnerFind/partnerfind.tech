import { NextResponse } from 'next/server';
import type { NextApiResponse } from 'next';

import { db } from '@/server/index';
import { sql as s } from 'drizzle-orm';
import { elaborateCompanies, userFavorites } from '@/server/db/schema';

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function POST(req: Request, res: NextApiResponse) {
    let data = await req.json()
    const userID = data.userID;

    let userList = null;
    try {
        userList = await db.select().from(userFavorites).where(s`${userFavorites.userID} = ${userID}`);
    } catch (err: any) {
        console.error(err)
        return NextResponse.json(
          { error: `Failed to query userFavorites | ${err.message}` }, 
          { status: 500 }
        )
    }

    let Companies = null;
    try {
        Companies = await db.select().from(elaborateCompanies);
    } catch (err: any) {
        console.error(err)
        return NextResponse.json(
          { error: `Failed to query elaborateCompanies | ${err.message}` }, 
          { status: 500 }
        )
    }

    const formattedCompanies = Companies.map(item => {
        const { genpage, ...rest } = item;
        return rest;
    });

    // Filter companies that match the userID
    const updatedCompanies = {
        data: formattedCompanies.filter(company => {
            const matchingUser = userList.find(user => user.name === company.name);
            return matchingUser;
        }).map(company => {
            const matchingUser = userList.find(user => user.name === company.name);
            return { ...company, userID: matchingUser?.userID };
        }),
    };
    
    return NextResponse.json({ data: updatedCompanies });
}