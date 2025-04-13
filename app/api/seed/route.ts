// app/api/seed/route.ts
import { NextResponse } from "next/server";
import { gearsDummy } from "~/lib/data/gears/gears";

import { prisma } from "~/lib/prisma";
import { slugify } from "~/lib/utils/slugify";

export async function POST() {
  try {
    const gearsWithSlug = gearsDummy.map((gear) => ({
      ...gear,
      slug: slugify(gear.name),
    }));
    await prisma.gear.createMany({
      data: gearsWithSlug,
    });

    return NextResponse.json({ message: "Gears seeded successfully!" });
  } catch (error) {
    return NextResponse.json(
      //@ts-expect-error: error type unknown
      { message: "Error seeding gears", error: error.message },
      { status: 500 }
    );
  }
}
