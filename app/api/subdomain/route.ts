import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getProjectSubdomainUrl } from "@/lib/subdomain";
import prisma from "@/lib/prisma";

// Generate a subdomain using project ID
export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { projectId } = body;

    if (!projectId) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      );
    }

    // Use project ID directly as subdomain
    const subdomain = projectId;

    // Generate the full URL
    const subdomainUrl = getProjectSubdomainUrl(projectId);


    return NextResponse.json({
      projectId,
      subdomain,
      url: subdomainUrl,
    });
  } catch (error: any) {
    console.error("Subdomain generation error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate subdomain" },
      { status: 500 }
    );
  }
}

// Get a project's subdomain info
export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");

    if (!projectId) {
      return NextResponse.json(
        { error: "Project ID parameter is required" },
        { status: 400 }
      );
    }

    const project = await prisma.projects.findFirst({
      where: {
        Id: projectId,
        OwnerId: userId, // Ensure the user owns the project
      },
      select: {
        Id: true,
        Name: true,
        subdomain: true,
        published: true,
      },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const subdomain = project.subdomain || project.Id;
    const subdomainUrl = getProjectSubdomainUrl(project.Id);

    return NextResponse.json({
      projectId: project.Id,
      projectName: project.Name,
      subdomain,
      url: subdomainUrl,
    });
  } catch (error: any) {
    console.error("Project subdomain lookup error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to get project subdomain" },
      { status: 500 }
    );
  }
}

// Resolve a project by subdomain - public endpoint
export async function HEAD(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const subdomain = searchParams.get("subdomain");

    if (!subdomain) {
      return NextResponse.json(
        { error: "Subdomain parameter is required" },
        { status: 400 }
      );
    }

    // Search for a project with the given subdomain (which is the project ID)
    const project = await prisma.projects.findFirst({
      where: {
        OR: [{ subdomain: subdomain }, { Id: subdomain }],
        published: true,
      },
      select: {
        Id: true,
        Name: true,
        subdomain: true,
        published: true,
      },
    });

    if (!project) {
      return NextResponse.json(
        { error: "Project not found or not published" },
        { status: 404 }
      );
    }

    // Return basic project info in headers to keep the HEAD request lightweight
    return NextResponse.json(
      {},
      {
        headers: {
          "X-Project-Id": project.Id,
          "X-Project-Name": project.Name,
          "X-Project-Published": String(project.published),
        },
      }
    );
  } catch (error: any) {
    console.error("Project by subdomain lookup error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to find project by subdomain" },
      { status: 500 }
    );
  }
}
