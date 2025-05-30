import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import routes from "@/constants/routes";
import checkAuth from "@/utils/validateToken";
import ACCESS_TOKEN_COOKIE_NAME from "@/constants/accessTokenCookieName";

const PROTECTED_ROUTES = [routes.LIKED_JOBS];
const PUBLIC_ONLY_ROUTES = [routes.SIGN_IN, routes.CREATE_PROFILE];

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/") {
    return NextResponse.redirect(new URL(routes.JOBS, req.nextUrl));
  }

  const accessToken = cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value;

  const hasAuth = await checkAuth(accessToken);

  if (!hasAuth && PROTECTED_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL(routes.SIGN_IN, req.nextUrl));
  }

  if (hasAuth && PUBLIC_ONLY_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL(routes.JOBS, req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
