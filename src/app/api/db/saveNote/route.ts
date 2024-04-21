import { NextResponse } from 'next/server';
import type { NextApiResponse } from 'next';
import { db } from '@/server/index';
import { partnerNotes } from '@/server/db/schema';
import { eq, and } from "drizzle-orm";

export async function POST(req: Request, res: NextApiResponse) {
    let data = await req.json()
    const userID = data.userID;
    const name = data.name;
    const note = data.note;
    let allData = null;
    let removeFromList = null;

    try {
        removeFromList = await db.delete(partnerNotes).where(and(eq(partnerNotes.userID, userID), eq(partnerNotes.name, name))); // Deletes database entry for the current user and name of row selected
        allData = await db.insert(partnerNotes).values([{userID: userID, name: name, note: note},]); // Adds to database with user passed userID and name 
    } catch (err: any) {
        console.error(err)
        return NextResponse.json(
          { error: `Failed to insert into partnerNotes | ${err.message}` }, 
          { status: 500 }
        )
    }

    return NextResponse.json(
        { query: "successful insertion" }, 
        { status: 200 }
      )
}