import { NextResponse } from "next/server";
import type { NextApiResponse } from "next";
import { db } from "@/server/index";
import { elaborateCompanies } from "@/server/db/schema";
import { eq, and } from "drizzle-orm";

export async function POST(req: Request, res: NextApiResponse) {
  let data = await req.json();
  const type = data.type;
  const description = data.description;
  const resources = data.resources;
  const phonenumber = data.phonenumber;
  const email = data.email;
  const name = data.name;
  const genpage = data.genpage;
  const sources = data.sources;
  const category = data.category;
  let allData = null;
  let removeFromList = null;

  try {
    removeFromList = await db.delete(elaborateCompanies).where(eq(elaborateCompanies.name, name)); // Deletes database entry for the current user and name of row selected
    allData = await db.insert(elaborateCompanies).values([
      {
        category: category,
        name: name,
        type: type,
        description: description,
        resources: resources,
        phonenumber: phonenumber,
        email: email,
        genpage: genpage,
        sources: sources,
      },
    ]); // Adds to database with user passed userID and name
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: `Failed to insert into elaborteCompanies | ${err.message}` }, { status: 500 });
  }

  return NextResponse.json({ query: "successful insertion" }, { status: 200 });
}
