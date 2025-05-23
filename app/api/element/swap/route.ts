import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const response = await req.json();
    const { element, targetedElement } = response;
    if (!element || !targetedElement) {
      return new NextResponse("No elements found", {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    const [elementOrder, targetedElementOrder] = await prisma.$transaction([
      prisma.elements.findUnique({
        where: {
          Id: element.id,
        },
        select: {
          Order: true,
        },
      }),
      prisma.elements.findUnique({
        where: {
          Id: targetedElement.id,
        },
        select: {
          Order: true,
        },
      }),
    ]);

    if (!elementOrder || !targetedElementOrder) {
      return new NextResponse("Element not found", { status: 404 });
    }
    await prisma.$transaction([
      prisma.elements.update({
        where: {
          Id: element.id,
        },
        data: {
          Order: targetedElementOrder.Order,
        },
      }),
      prisma.elements.update({
        where: {
          Id: targetedElement.id,
        },
        data: {
          Order: elementOrder.Order,
        },
      }),
    ]);
    return NextResponse.json({ success: true });
  } catch (error) {
    return new NextResponse(`Internal Server Error, ${error}`, { status: 500 });
  }
}
