import { NextResponse } from 'next/server';
import type { NextApiResponse } from 'next';
import { db } from '@/server/index';
import { elaborateCompanies, userFavorites, partnerNotes } from '@/server/db/schema';
import { eq, and } from "drizzle-orm";

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function POST(req: Request, res: NextApiResponse) {
    let data = await req.json()
    const userID = data.userID;
    const name = data.name;
    let allData = null;
    let existingFavorite = null;
    let isNameInFavorites = false;

    try {
        existingFavorite = await db.select().from(userFavorites).where(and(eq(userFavorites.userID, userID), eq(userFavorites.name, name)));
        if (existingFavorite != null) {
            isNameInFavorites = true;
        }
    } catch (err: any) {
        console.error(err)
        return NextResponse.json(
          { error: `Can't find if it is in database or not | ${err.message}` }, 
          { status: 500 }
        )
    }
    
    return NextResponse.json({ data: isNameInFavorites });
}