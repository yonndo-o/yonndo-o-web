import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 假設以 /admin 開頭的路徑都要存在
  if (pathname.startsWith('/admin') && !isValidPath(pathname)) {
    return NextResponse.redirect(new URL('/not-found', request.url));
  }

  return NextResponse.next();
}

function isValidPath(path: string) {
  // 你可以自訂路徑驗證邏輯
  return true;
}