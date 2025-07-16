import api from "@/services/api";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;

        const authResponse = await api.post("/api/v1/auth", { email, password });

        const { token } = authResponse.data;

        if (!token) {
            return NextResponse.json({ error: 'Token não recebido' }, { status: 401 });
        }

        const response = NextResponse.json({
            message: "Login bem-sucedido",
            token: token 
        }, { status: 200 });

        response.cookies.set('@bbg', token, { 
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 30, // 30 dias
            path: '/',
            sameSite: 'lax', 
        });

        return response;

    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return NextResponse.json(
                { error: error.response.data.message || 'Credenciais inválidas' },
                { status: error.response.status }
            );
        }
        return NextResponse.json({ error: 'Ocorreu um erro inesperado.' }, { status: 500 });
    }
}