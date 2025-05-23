import { EditorElement } from "@/lib/type";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  ButtonElement,
  CarouselElement,
  FormElement,
  FrameElement,
  InputElement,
  ListElement,
  SelectElement,
} from "@/lib/interface";
import crypto from "crypto";

export async function getElementSettings(
  element: EditorElement
): Promise<string | undefined> {
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
    case "Input":
      elementSettings = JSON.stringify((element as InputElement).inputSettings);
      break;
  }
  return elementSettings;
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
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

    const elementSettings = await getElementSettings(element);

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
    ]);
    if (settings) {
      await prisma.settings?.update({
        where: {
          Id: settings?.Id,
        },
        data: {
          ElementId: element.id,
          Settings: elementSettings,
        },
      });
    }

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
  const { userId } = await auth();
  if (!userId) {
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
    } // First, fetch the element to get its parentId
    const { id: elementId } = await request.json();
    if (!elementId) {
      return new NextResponse("Element ID is required", {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    const elementToDelete = await prisma.elements.findUnique({
      where: { Id: elementId, ProjectId: id },
      select: { ParentId: true, Order: true },
    });

    if (!elementToDelete) {
      return new NextResponse("Element not found", { status: 404 });
    }

    // Get all siblings with the same parentId and order > this element's order
    const siblingsToUpdate = await prisma.elements.findMany({
      where: {
        ParentId: elementToDelete.ParentId,
        ProjectId: id,
        Order: { gt: elementToDelete.Order },
      },
      select: { Id: true, Order: true },
    });

    const deletedElement = await prisma.$transaction([
      // Delete the element itself
      prisma.elements.delete({
        where: {
          Id: elementId,
          ProjectId: id,
        },
      }),
      // Update the order of sibling elements
      ...siblingsToUpdate.map((sibling) =>
        prisma.elements.update({
          where: { Id: sibling.Id },
          data: { Order: sibling.Order - 1 },
        })
      ),
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

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const element = await request.json();
    const { id } = await params;

    if (!element) {
      return new NextResponse("No elements found", { status: 400 });
    }

    if (!id) {
      return new NextResponse("Project ID is required", { status: 400 });
    }

    const createElementWithChildren = async (
      element: EditorElement,
      parentId?: string,
      order?: number
    ) => {
      const elementId = element.id ?? crypto.randomUUID();

      // Create the main element
      const createdElement = await prisma.elements.create({
        data: {
          Id: elementId,
          IsSelected: false,
          Type: element.type,
          Content: element.content,
          Styles: JSON.stringify(element.styles),
          X: element.x ?? 0,
          Y: element.y ?? 0,
          Src: element.src,
          Href: element.href,
          ParentId: element.parentId ?? parentId,
          Name: element.name,
          TailwindStyles: element.tailwindStyles,
          ProjectId: id,
          Order: order ?? 0,
          ButtonType: (element as ButtonElement).buttonType,
          ...(element.type === "carousel" && {
            CarouselSettings: JSON.stringify(
              (element as CarouselElement).carouselSettings
            ),
          }),
          ...(element.type === "input" && {
            InputSettings: JSON.stringify(
              (element as InputElement).inputSettings
            ),
          }),
          ...(element.type === "select" && {
            SelectSettings: JSON.stringify(
              (element as SelectElement).selectSettings
            ),
            Options: JSON.stringify((element as SelectElement).options),
          }),
        },
      });

      // Handle element-specific settings
      const elementSettings = await getElementSettings(element);
      if (elementSettings) {
        await prisma.settings.create({
          data: {
            Id: crypto.randomUUID(),
            ElementId: elementId,
            Settings: elementSettings,
            Name: `${element.type} Settings`,
            SettingType: element.type.toLowerCase(),
          },
        });
      }

      // Handle nested elements recursively
      if ("elements" in element) {
        const nestedElements = (
          element as FrameElement | CarouselElement | ListElement
        ).elements;
        if (nestedElements && nestedElements.length > 0) {
          await Promise.all(
            nestedElements.map((child, index) =>
              createElementWithChildren(child, elementId, index)
            )
          );
        }
      }
      // Handle button's nested element
      if (element.type === "button" && (element as ButtonElement).element) {
        await createElementWithChildren(
          (element as ButtonElement).element!,
          elementId
        );
      }

      return createdElement;
    };

    const createdElement = await createElementWithChildren(element);

    return NextResponse.json(createdElement, { status: 200 });
  } catch (error) {
    console.error("Error creating element:", error);
    return new NextResponse(
      `Error creating element: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      { status: 500 }
    );
  }
}
