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
    
    // Add userID to each company object if there's a match based on company name as well as add userID at the tippy top of data (so we can use in db calls)
    const updatedCompanies = {
        data: formattedCompanies.map(company => {
            const matchingUser = userList.find(user => user.name === company.name);
            return matchingUser ? { ...company, userID: matchingUser.userID } : company;
        }),
        // data: [{ userID }, ...formattedCompanies.map(company => {
        //     const matchingUser = userList.find(user => user.name === company.name);
        //     return matchingUser ? { ...company, userID: matchingUser.userID } : company;
        // })],
    };
    
    return NextResponse.json({ data: updatedCompanies });
}