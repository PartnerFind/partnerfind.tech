import { NextResponse } from 'next/server';
import type { NextApiResponse } from 'next';

import { db } from '@/server/index';
import { sql as s } from 'drizzle-orm';
import { userFavorites } from '@/server/db/schema';

export async function POST(req: Request, res: NextApiResponse) {
    let data = await req.json()
    const userID = data.userID;
    // rkmadhavan109:   
    // nan.navinnarayanan: user_2e1CYrk8OQu5f2qAiW58hmE35ev
    
    let userList = await db.select().from(userFavorites).where(s`${userFavorites.userID} = ${userID}`);
    //await db.insert(userFavorites).values([{userID: userID, name: "", },]);   Adds to database with userID and empty name based on what name you want to put in
    //await db.delete(userFavorites).where(s`${userFavorites.userID} = ${userID} AND ${userFavorites.name} = ${""}`); Deletes database for the current user and name of row selected to remove


    // return NextResponse.json({ list: userList });
    return NextResponse.json({ list: userList });

}