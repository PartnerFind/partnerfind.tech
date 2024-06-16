import { NextResponse } from "next/server";
import type { NextApiResponse } from "next";
import { db } from "@/server/index";
import { partnerNotes } from "@/server/db/schema";

export async function POST(req: Request, res: NextApiResponse) {
  let data = await req.json();
  const name = data.name;
  const userID = data.userID;
  let allData = null;

  try {
    allData = await db
      .select({
        name: partnerNotes.name,
        note: partnerNotes.note,
        userID: partnerNotes.userID,
      })
      .from(partnerNotes)
      .execute();
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: `Failed to query partnerNotes | ${err.message}` }, { status: 500 });
  }

  let note = allData.find((item) => item.userID === userID && item.name === name); //note?.note

  return NextResponse.json({ data: note });
}
