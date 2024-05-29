import { NextResponse } from "next/server";
import type { NextApiResponse } from "next";
import { auth } from "@clerk/nextjs";

export async function GET(req: Request, res: NextApiResponse) {
  const { userId }: { userId: string | null } = auth();

  return NextResponse.json({ userID: userId }, { status: 200 });
}
