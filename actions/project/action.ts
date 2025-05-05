"use server";

import { appProject } from "@/lib/interface";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const URL = process.env.NEXT_PUBLIC_API_URL + "/projects";

export const Create = async (data: appProject) => {
  try {
    const { userId, sessionId } = await auth();
    if (!userId || !sessionId) throw new Error("User not found");
    const client = await clerkClient();
    const token = await client.sessions.getToken(sessionId, "usertemp");
    console.log(data);

    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.jwt}`,
      },
      body: JSON.stringify(data),
    });

    revalidatePath("/dashboard");
    return response.json();
  } catch (error: Error | unknown) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

export const GetAll = async (): Promise<appProject[]> => {
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

export const GetProjectById = async (id: string): Promise<appProject> => {
  try {
    const { userId, sessionId } = await auth();
    if (!userId || !sessionId) throw new Error("User not found");
    const client = await clerkClient();
    const token = await client.sessions.getToken(sessionId, "usertemp");

    const response = await fetch(`${URL}/${id}`, {
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

export const UpdateProject = async (data: appProject) => {
  try {
    const { userId, sessionId } = await auth();
    if (!userId || !sessionId) throw new Error("User not found");
    const client = await clerkClient();
    const token = await client.sessions.getToken(sessionId, "usertemp");

    const response = await fetch(`${URL}/${data.id}`, {
      method: "PUT",
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

    if (response.status === 204) {
      revalidatePath("/dashboard");
      return "Project deleted successfully";
    }
  } catch (error: Error | unknown) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};
