"use server";

import { appProjectTypes } from "@/lib/type";
import { auth, clerkClient } from "@clerk/nextjs/server";

const URL = process.env.NEXT_PUBLIC_API_URL + "/projects";

export const Create = async (data: appProjectTypes) => {
  try {
    const { userId, sessionId } = await auth();
    if (!userId || !sessionId) throw new Error("User not found");
    const client = await clerkClient();
    const token = await client.sessions.getToken(sessionId, "usertemp");

    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.jwt}`,
      },
      body: JSON.stringify(data),
    });

    return response.json();
  } catch (error: Error | unknown) {
    throw new Error(error instanceof Error ? error.message : String(error));    
  }
};

export const GetAll = async (): Promise<appProjectTypes[]> => {
  try {
    const { userId, sessionId } = await auth();
    if (!userId || !sessionId) throw new Error("User not found");
    const client = await clerkClient();
    const token = await client.sessions.getToken(sessionId, "usertemp");

    const response = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.jwt}`,
      },
    });

    return response.json();
  } catch (error: Error | unknown) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

export const Delete = async (id: string) => {
  try {
    const { userId, sessionId } = await auth();
    if (!userId || !sessionId) throw new Error("User not found");
    const client = await clerkClient();
    const token = await client.sessions.getToken(sessionId, "usertemp");

    const response = await fetch(`${URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.jwt}`,
      },
    });

    if (response.status === 204) return "Project deleted successfully";
  } catch (error: Error | unknown) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};
