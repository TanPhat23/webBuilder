"use server";
import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";
import { UTApi } from "uploadthing/server";
import { UploadedFileData } from "uploadthing/types";
import { auth } from "@clerk/nextjs/server";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {},
});

export const deleteImage = async (image: UploadedFileData) => {
  try {
    const user = await auth();
    if (!user) throw new Error("Unauthorized");

    const utapi = new UTApi();
    await utapi.deleteFiles(image.key);
  } catch (error) {
    console.error("Error deleting image:", error);
  }
};
