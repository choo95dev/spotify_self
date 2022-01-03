import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET,
  });

  console.log("My token",token);

  const { pathname} = req.nextUrl;
  console.log("my req",req);
  console.log("My path name",pathname);

  //Allow if the following is true for:
  //1) Request for next-auth session and provder fetching
  if(pathname?.includes('/api/auth') || token){
      console.log("Redirecting.....");
      return NextResponse.next();
  }

  //Redirect to login
  if(!token && pathname !== '/login'){
      return NextResponse.redirect('/login');
  }

}
