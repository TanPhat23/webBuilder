import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/editor(.*)",
  "/preview(.*)",
  "/actions(.*)",
  "/settings(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get("host") || "";
  const path = url.pathname;

  const mainDomain = process.env.NEXT_PUBLIC_APP_DOMAIN || "localhost";

  let isSubdomain = false;
  let subdomain: string | null = null;

  if (hostname.includes(".localhost")) {
    isSubdomain = true;
    subdomain = hostname.split(".localhost")[0];
  } else if (
    hostname !== mainDomain &&
    !hostname.includes("vercel.app") &&
    hostname.includes(".")
  ) {
    const parts = hostname.split(".localhost");
    if (parts.length > 1) {
      subdomain = parts[0];
    }
  }

  if (isSubdomain) {
    if (path === "/" || path === "") {
      url.pathname = `/preview/${subdomain}`;
      console.log(`Redirecting to: ${url.pathname}`);
      return NextResponse.rewrite(url);
    }
  }

  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
