import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest){

    const token =  request.cookies.get('@bbg')?.value;

    console.log(`[Middleware] A verificar rota: ${request.nextUrl.pathname}. Token encontrado: ${!!token}`);

    if(!token){
        const loginUrl = new URL('/register', request.url);
        loginUrl.searchParams.set('redirected', 'true');

        console.log(`[Middleware] Sem token. A redirecionar para: ${loginUrl.toString()}`);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/Dashboard/:path*'],
};