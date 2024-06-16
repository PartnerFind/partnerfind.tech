import { NextResponse } from "next/server";
import type { NextApiResponse } from "next";
import { db } from "@/server/index";
import { userFavorites } from "@/server/db/schema";

export async function POST(req: Request, res: NextApiResponse) {
  let info = await req.json();
  const userID = info.data.userID;
  const name = info.data.name;

  let addToUserList = null;
  try {
    addToUserList = await db.insert(userFavorites).values([{ userID: userID, name: name }]); // Adds to database with user passed userID and name
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: `Failed to insert into userFavorites | ${err.message}` }, { status: 500 });
  }

  return NextResponse.json({ query: "successful insertion" }, { status: 200 });
}
