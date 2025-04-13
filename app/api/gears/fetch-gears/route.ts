import { prisma } from "~/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const gears = await prisma.gear.findMany();

    return NextResponse.json({ gears });
  } catch (error) {
    return NextResponse.json({ error: `Error: ${error}` }, { status: 500 });
  }
}
