import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const project = await prisma?.projects.findMany();
    return new Response(JSON.stringify(project), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
