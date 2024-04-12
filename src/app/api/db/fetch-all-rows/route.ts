import { NextResponse } from 'next/server';
import { db } from '@/server/index';
import { elaborateCompanies } from '@/server/db/schema';

export async function GET() {
    let Companies = null;
    try {
        Companies = await db.select().from(elaborateCompanies);
    } catch (err: any) {
        console.error(err)
        return NextResponse.json(
          { error: `Failed to query DB | ${err.message}` }, 
          { status: 500 }
        )
    }

    return NextResponse.json({ data: Companies });
}