import { prisma } from "~/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const param = await params;
    const slug = param.slug;

    const gear = await prisma.gear.findUnique({
      where: {
        slug: slug,
      },
    });

    if (!gear) {
      return NextResponse.json({ error: "Gear not found" }, { status: 404 });
    }

    return NextResponse.json({ gear });
  } catch (error) {
    return NextResponse.json(
      { error: error || "Server error" },
      { status: 500 }
    );
  }
}
