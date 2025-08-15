// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';


export async function POST(req: Request) {
    const cookieStore = await cookies();
    const { uid, role } = await req.json();

    // 設定 HttpOnly cookie 儲存 UID
    cookieStore.set('uid', uid, {
        httpOnly: true,
        secure: true,
        path: '/',
        maxAge: 60 * 60 * 24, // 1 天
    });

    // 設定 HttpOnly cookie 儲存角色
    cookieStore.set('role', role, {
        httpOnly: true,
        secure: true,
        path: '/',
        maxAge: 60 * 60 * 24,
    });

    return NextResponse.json({ success: true });
}
