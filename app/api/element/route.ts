"use server";
import { EditorElement } from "@/lib/type";
import { auth, clerkClient } from "@clerk/nextjs/server";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/elements`;

export const Create = async (data: EditorElement) => {
  try {
    const { userId, sessionId } = await auth();
    if (!userId) throw new Error("User not found");

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

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || "Failed to create element");
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export const Update = async (data: EditorElement) => {
  try {
    const { userId, sessionId } = await auth();
    if (!userId || !sessionId) throw new Error("User not found");
    const client = await clerkClient();
    const token = await client.sessions.getToken(sessionId, "usertemp");
    const response = await fetch(`${URL}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.jwt}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Failed to update element + ${JSON.stringify(data)} at ${URL}`);
    } else {
      console.log("Updated element successfully");
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export const Delete = async (id: string) => {
  try {
    const { userId, sessionId } = await auth();
    if (!userId || !sessionId) throw new Error("User not found");
    const client = await clerkClient();
    const token = await client.sessions.getToken(sessionId, "usertemp");
    const response = await fetch(`${URL}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.jwt}`,
      },
      method: "DELETE",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete element");
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export const GetAll = async (url: string) => {
  try {
    const { userId, sessionId } = await auth();
    if (!userId || !sessionId) throw new Error("User not found");

    const client = await clerkClient();
    const token = await client.sessions.getToken(sessionId, "usertemp");

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.jwt}`,
      },
    });

    const data: EditorElement[] = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error in GetAll:", error.message);
    throw error;
  }
};
