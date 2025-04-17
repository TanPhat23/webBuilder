/**
 * Utilities for handling project subdomains
 */

/**
 * Configuration options for subdomains
 */
interface SubdomainConfig {
  // The base domain for the application (e.g., "myapp.com")
  baseDomain: string;
  // Whether to use https in generated URLs
  useHttps: boolean;
}

// Default configuration
const defaultConfig: SubdomainConfig = {
  baseDomain: process.env.NEXT_PUBLIC_APP_DOMAIN || "localhost:3000",
  useHttps: process.env.NODE_ENV === "production",
};

/**
 * Generate a safe subdomain slug from a project name
 * @param name Project name to convert to a subdomain-safe string
 */
export function generateSubdomainFromName(name: string): string {
  // Convert to lowercase, remove special characters, and replace spaces with hyphens
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug;
}

/**
 * Create a full subdomain URL for a project
 * @param projectId The project's unique ID
 * @param projectName Optional project name to use instead of ID
 * @param config Configuration options
 */
export function getProjectSubdomainUrl(
  projectId: string,
  projectName?: string,
  config?: Partial<SubdomainConfig>
): string {
  const { baseDomain, useHttps } = { ...defaultConfig, ...config };

  // Use project name if provided, otherwise use project ID
  const subdomain = projectName
    ? `${generateSubdomainFromName(projectName)}-${projectId.substring(0, 8)}`
    : projectId;

  const protocol = useHttps ? "https://" : "http://";

  return `${protocol}${subdomain}.${baseDomain}`;
}

/**
 * Check if a subdomain is available (not already in use)
 * @param subdomain The subdomain to check
 * @returns Promise resolving to boolean (true if available)
 */
export async function isSubdomainAvailable(
  subdomain: string
): Promise<boolean> {
  // In a real implementation, this would check against a database
  // For now, we'll just check for a valid format
  const validFormat = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(subdomain);

  // TODO: Add a database check to ensure this subdomain isn't already taken
//   const existingProject = await db.project.findFirst({ where: { subdomain } });
//   return validFormat && !existingProject;

  return validFormat;
}

/**
 * Extract project ID from a hostname
 * @param hostname The hostname from the request
 * @returns The project ID or null if not a project subdomain
 */
export function getProjectIdFromHostname(hostname: string): string | null {
  const baseDomain = process.env.NEXT_PUBLIC_APP_DOMAIN || "localhost:3000";

  // Check if this is a subdomain of our base domain
  if (
    hostname === baseDomain ||
    hostname === "localhost" ||
    hostname.startsWith("localhost:")
  ) {
    return null;
  }

  // For development using .vercel.app domain
  if (hostname.includes("vercel.app")) {
    return null;
  }

  // Extract the subdomain part
  const parts = hostname.split(".");
  if (parts.length <= 1) {
    return null;
  }

  const subdomain = parts[0];

  // If using name-id format, extract the ID part
  if (subdomain.includes("-")) {
    const idPart = subdomain.split("-").pop() || "";
    // This is a simplification - you might need more robust validation
    return idPart;
  }

  return subdomain;
}
