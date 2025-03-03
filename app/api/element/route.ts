"use server";
import { EditorElement } from "@/lib/type";
import { auth, clerkClient, verifyToken } from "@clerk/nextjs/server";

const URL = "http://localhost:5232/api/elements";

export const Create = async (data: EditorElement) => {
  try {
    const { userId, sessionId } = await auth();
    if (!userId) throw new Error("User not found");

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
    const { userId } = await auth();
    if (!userId) throw new Error("User not found");

    const response = await fetch(`${URL}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update element");
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export const Delete = async (id: string) => {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("User not found");

    const response = await fetch(`${URL}/${id}`, {
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

export const GetAll = async () => {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("User not found");

    const response = await fetch(URL);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch elements");
    }
    const data: EditorElement[] = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
