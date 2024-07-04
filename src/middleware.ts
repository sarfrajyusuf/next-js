// import { NextResponse } from "next/server";
// import localStorage from "redux-persist/es/storage";
// // import {  sessionStatus } from "./session/session";
// export const sessionStatus = localStorage.getItem("accessToken");
// console.log(sessionStatus, "&&&&&&::");
// const protectedRoutes = [
//   "/",
//   "/calendar",
//   "/profile",
//   "/forms/form-elements",
//   "/forms/form-layout",
//   "/tables",
//   "/pages/settings",
//   "/charts/basic-chart",
// ];

// export default function middleware(req: any) {
//   if (!sessionStatus && protectedRoutes.includes(req.nextUrl.pathname)) {
//     const absoluteURL = new URL("/auth/signin", req.nextUrl.origin);
//     return NextResponse.redirect(absoluteURL.toString());
//   }
// }

import { NextResponse } from "next/server";

const protectedRoutes = [
  "/",
  "/calendar",
  "/profile",
  "/forms/form-elements",
  "/forms/form-layout",
  "/tables",
  "/pages/settings",
  "/charts/basic-chart",
];

function getTokenFromCookies(req: any) {
  const cookies = req.headers.get("cookie") || "";
  const token = cookies
    .split("; ")
    .find((cookie: any) => cookie.startsWith("token="));
  return token ? token.split("=")[1] : null;
}

export default function middleware(req:any) {
  const token = getTokenFromCookies(req);

  if (!token && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/auth/signin", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/calendar",
    "/profile",
    "/forms/form-elements",
    "/forms/form-layout",
    "/tables",
    "/pages/settings",
    "/charts/basic-chart",
  ],
};