import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs'

export async function GET() {
    let { userId }= auth();

    return NextResponse.json({ clerkUserID: userId });
}