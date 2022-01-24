import { NextResponse } from "next/server";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { homeRedirect, noUserRedirect } from "../middleware/redirect";

export async function middleware(req, rev) {
  const { pathname } = req.nextUrl;
  // const user = req.userHasLogin || false;

  // //Redirect
  // if (noUserRedirect(user, pathname)) return NextResponse.redirect("/login");
  // if (homeRedirect(user, pathname)) return NextResponse.redirect("/");
}
