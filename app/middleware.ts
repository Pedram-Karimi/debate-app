import { NextResponse } from "next/server";
import { verifyJwtToken } from "@/app/libs/auth";

const AUTH_PAGES = ["/login"];

const isAuthPages = (url: string) =>
  AUTH_PAGES.some((page) => page.startsWith(url));

//fix the type
export async function middleware(req: any) {
  const { url, nextUrl, cookies } = req;
  const { value: token } = cookies.get("token") ?? { value: null };
  const hasVerifiedToken = token && (await verifyJwtToken(token));
  const isAuthPageRequested = isAuthPages(nextUrl.pathname);

  if (isAuthPageRequested) {
    if (!hasVerifiedToken) {
      const response = NextResponse.next();
      response.cookies.delete("token");
      return response;
    }
    const response = NextResponse.redirect(new URL(`/`, url));
    return response;
  }

  if (!hasVerifiedToken) {
    const searchParams = new URLSearchParams(nextUrl.searchParams);
    searchParams.set("next", nextUrl.pathname);
    const response = NextResponse.redirect(
      new URL(`/login?${searchParams}`, url)
    );
    response.cookies.delete("token");
    return response;
  }

  return NextResponse.next();
}
export const config = { matcher: ["/login", "/protected/:path*"] };
