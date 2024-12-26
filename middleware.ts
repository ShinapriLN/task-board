import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

  // if (request.nextUrl.pathname.startsWith(/^\/boards\/.*$/)) {
  //   return NextResponse.rewrite(new URL("/", request.url));
  // }

  if(/^\/boards\/.*$/.test(request.nextUrl.pathname)){
    return NextResponse.rewrite(new URL("/", request.url));
  }

//   return NextResponse.redirect(new URL("/", request.url));
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: "/boards/:path*",
// };
