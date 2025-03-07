"use server";

import { appProjectTypes } from "@/lib/type";
import { auth, clerkClient } from "@clerk/nextjs/server";

const URL = process.env.NEXT_PUBLIC_API_URL + "/projects";

export const Create = async (data: appProjectTypes) => {
  try {
    const { userId, sessionId } = await auth();
    if (!userId || !sessionId) throw new Error("User not found");
    const client = await clerkClient();
    const token = await client.sessions.getToken(sessionId, "templeUser");

    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.jwt}`,
      },
      body: JSON.stringify(data),
    });

    return response.json();
  } catch (error: any) {
    console.error("Create Error:", error);
    throw new Error(error.message || "Failed to create project");
  }
};

export const GetAll = async () => {
  try {
    const { userId, sessionId } = await auth();
    if (!userId || !sessionId) throw new Error("User not found");
    const client = await clerkClient();
    const token = await client.sessions.getToken(sessionId, "templeUser");

    const response = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.jwt}`,
      },
    });

    return response.json();
  } catch (error: any) {
    console.error("GetAll Error:", error);
    throw new Error(error.message || "Failed to get projects");
  }
};
