import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


/**
 * Generate a subdomain for a project using the API
 * @param projectName The name of the project
 * @param projectId Optional project ID (if already created)
 * @returns Object containing subdomain information
 */
export async function generateProjectSubdomain(
  projectName: string,
  projectId?: string
) {
  try {
    const response = await fetch("/api/subdomain", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectName,
        projectId,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to generate subdomain");
    }

    return await response.json();
  } catch (error) {
    console.error("Error generating subdomain:", error);
    throw error;
  }
}

/**
 * Check if a subdomain is available
 * @param subdomain The subdomain to check
 * @returns Object containing availability information
 */
export async function checkSubdomainAvailability(subdomain: string) {
  try {
    if (!subdomain || typeof subdomain !== 'string') {
      throw new Error("Invalid subdomain provided");
    }
    
    const response = await fetch(
      `/api/subdomain?subdomain=${encodeURIComponent(subdomain)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const error = await response.json().catch(() => ({ 
        error: `HTTP error ${response.status}` 
      }));
      throw new Error(error.error || "Failed to check subdomain availability");
    }

    return await response.json();
  } catch (error) {
    console.error("Error checking subdomain availability:", error);
    throw error;
  }
}
