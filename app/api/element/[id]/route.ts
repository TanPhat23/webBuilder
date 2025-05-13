import { EditorElement } from "@/lib/type";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  ButtonElement,
  CarouselElement,
  FormElement,
  FrameElement,
  SelectElement,
} from "@/lib/interface";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await auth();
  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const element: EditorElement = await request.json();
    const { id } = await params;

    if (!element) {
      return new NextResponse("No elements found", {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    if (!id) {
      return new NextResponse("Element ID is required", {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    let elementSettings: string | undefined = undefined;
    switch (element.type) {
      case "Select":
        elementSettings = JSON.stringify((element as SelectElement).options);
        break;
      case "Carousel":
        elementSettings = JSON.stringify(
          (element as CarouselElement).carouselSettings
        );
        break;
      case "Form":
        elementSettings = JSON.stringify((element as FormElement).formSettings);
        break;
    }

    const settings = await prisma.settings.findFirst({
      where: {
        ElementId: element.id,
      },
    });
    const [updatedElement] = await prisma.$transaction([
      prisma.elements.update({
        where: {
          Id: element.id,
          ProjectId: element.projectId,
        },
        data: {
          Type: element.type,
          Content: element.content,
          Styles: JSON.stringify(element.styles),
          X: element.x ?? 0,
          Y: element.y ?? 0,
          Src: element.src,
          Href: element.href,
          ParentId: element.parentId,
          Name: element.name,
          TailwindStyles: element.tailwindStyles,
          Options: JSON.stringify((element as SelectElement).options),
          ButtonType: (element as ButtonElement).buttonType,
        },
      }),
      prisma.settings.update({
        where: {
          Id: settings?.Id,
        },
        data: {
          ElementId: element.id,
          Settings: elementSettings,
        },
      }),
    ]);

    return NextResponse.json(updatedElement, { status: 200 });
  } catch (error) {
    console.error("Error updating element:", error);
    return new NextResponse(
      `Error updating element: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await auth();
  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const { id } = await params;

    if (!id) {
      return new NextResponse("Element ID is required", {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const deletedElement = await prisma.$transaction([
      prisma.elements.delete({
        where: {
          Id: id,
        },
      }),
      prisma.elements.updateMany({
        where: {
          ParentId: id,
        },
        data: {
          ParentId: null,
        },
      })
    ]);

    return NextResponse.json(deletedElement, { status: 200 });
  } catch (error) {
    console.error("Error deleting element:", error);
    return new NextResponse(
      `Error deleting element: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}