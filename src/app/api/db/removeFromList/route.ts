import { NextResponse } from 'next/server';
import type { NextApiResponse } from 'next';
import { sql as s } from 'drizzle-orm';
import { db } from '@/server/index';
import { userFavorites } from '@/server/db/schema';

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function POST(req: Request, res: NextApiResponse) {
    let data = await req.json()
    const userID = data.userID;
    const name = data.name;

    let removeFromUserList = null;
    try {
        removeFromUserList = await db.delete(userFavorites).where(s`${userFavorites.userID} = ${userID} AND ${name} = ${""}`); // Deletes database entry for the current user and name of row selected

    } catch (err: any) {
        console.error(err)
        return NextResponse.json(
          { error: `Failed to remove from userFavorites | ${err.message}` }, 
          { status: 500 }
        )
    }

    return NextResponse.json(
        { query: "successful deletion" }, 
        { status: 200 }
      )
}