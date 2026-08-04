// Source - https://stackoverflow.com/a/77230182
// Posted by Jay, modified by community. See post 'Timeline' for change history
// Retrieved 2026-06-08, License - CC BY-SA 4.0

import { NextRequest, NextResponse } from "next/server";
import { MiddlewareFactory } from "./shared/types/middleware-type";
import { withProtectedRoutes } from "./shared/middlewares/with-protected-routes";
import { withAuthRoutes } from "./shared/middlewares/with-auth-routes";

export const middlewares: MiddlewareFactory[] = [
  withProtectedRoutes,
  withAuthRoutes,
];

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  for (const currentMiddleware of middlewares) {
    const result: any = await currentMiddleware(request, response);

    if (result instanceof NextResponse) {
      return result;
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)",
  ],
};
