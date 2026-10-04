import { NextResponse, type NextRequest } from "next/server";

/**
 * The site is English only. Pages live under app/[lang]/, so every clean URL
 * (/about) is served from /en/about. Old /en/... and /dz/... links redirect
 * to the clean URL.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  const prefixed = pathname.match(/^\/(en|dz)(\/.*)?$/);
  if (prefixed) {
    url.pathname = prefixed[2] || "/";
    return NextResponse.redirect(url, 308);
  }

  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, API routes, and any file with an extension.
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
