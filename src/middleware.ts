import { NextRequest, NextResponse } from "next/server";

export default function middleware(request : NextRequest){
    const token = request.cookies.get("next-auth.session-token")
    if(!token){
     return NextResponse.rewrite(new URL("/login" , request.url))
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/dashboard", "/forgetPassword","/dashboard/:examsId"]
};