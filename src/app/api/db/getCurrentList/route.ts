import { NextResponse } from 'next/server';
import type { NextApiResponse } from 'next';
import { db } from '@/server/index';
import { userFavorites } from '@/server/db/schema';
import { eq, and, sql as s} from "drizzle-orm";

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function POST(req: Request, res: NextApiResponse) {
    let data = await req.json()
    const userID = data.userID;
    const name = data.name;
    let allData = null;
    let isNameInFavorites = false;

    try {
        allData = await db.select().from(userFavorites);
        let isNameInFavorites = allData.some(item => {
            return item.name === name && item.userID === userID;
        });

        return NextResponse.json({ data: isNameInFavorites });

    } catch (err: any) {
        console.error(err)
        return NextResponse.json(
          { error: `Can't find if it is in database or not | ${err.message}` }, 
          { status: 500 }
        )
    }
    
}