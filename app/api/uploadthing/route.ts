"use server";
import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";
import { UTApi } from "uploadthing/server";
import { UploadedFileData } from "uploadthing/types";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {},
});

export const deleteImage = async (image: UploadedFileData) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const utapi = new UTApi();
    await utapi.deleteFiles(image.key);
  } catch (error) {
    console.error("Error deleting image:", error);
  }
};