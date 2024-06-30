import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/legal(.*)",
  "/favicon.ico",
  "/my-list(.*)", // anyone can see /my-list/[slug], but not /my-list without auth
  "/explore",
  "/add-partner",
  "/api(.*)",
]);

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    auth().protect();
  }
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
