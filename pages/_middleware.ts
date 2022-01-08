import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET,
  });
  
  const { pathname} = req.nextUrl;

  //Allow if the following is true for:
  //1) Request for next-auth session and provder fetching
  if(pathname?.includes('/api/auth') || token){
      return NextResponse.next();
  }

  //Redirect to login
  if(!token && pathname !== '/login'){
      return NextResponse.redirect('/login');
  }

}
