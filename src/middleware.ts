// import { NextRequest, NextResponse } from "next/server";

// export default function middleware(request : NextRequest){
//     const token = request.cookies.get("next-auth.session-token")
//     if(!token){
//      return NextResponse.rewrite(new URL("/login" , request.url))
//     }

//     return NextResponse.next();
// }

// export const config = {
//     matcher: ["/", "/dashboard", "/forgetPassword","/dashboard/:examsId"]
// };




import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
const authPages=['/auth/login','/auth/register'];
const privatePages = ['/dashboard']

export  default async function middleware(request: NextRequest) {
    const token = await getToken ({req:request})  
    console.log("Middleware Token:", token);
    const url=request.nextUrl.pathname;
    if(token && authPages.includes(url)){
        const redirectUrl= new URL('/dashboard',request.nextUrl.origin)
        return NextResponse.rewrite(redirectUrl)
    }
    if(!token && privatePages.includes(url)){
        const redirectUrl= new URL('/auth/login',request.nextUrl.origin)
        return NextResponse.rewrite(redirectUrl)

    }

    return NextResponse.next()

 
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
}