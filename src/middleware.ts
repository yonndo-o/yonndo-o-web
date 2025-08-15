import { NextRequest, NextResponse } from 'next/server';
import { SUPPORTED_LANGUAGES } from './i18n/config';

// 定義路由保護規則的型別（區分是否需要 admin 權限）
type RouteRule =
  | { requiresAuth: true; requiresAdmin?: false }
  | { requiresAuth: true; requiresAdmin: true };

// 集中管理需要保護的路由與其規則
const protectedRoutes: Record<string, RouteRule> = {
  profile: { requiresAuth: true },
  dashboard: { requiresAuth: true, requiresAdmin: true },
};

// 解析 pathname，取得路由的第一層（例如 /zh/profile → profile）
function getRouteKey(pathname: string): keyof typeof protectedRoutes | null {
  const segments = pathname.split('/');
  const key = segments[2]; // 若有語系層，應取第 2 層
  return key in protectedRoutes ? (key as keyof typeof protectedRoutes) : null;
}

// middleware 主函式：處理路由存取權限
export function middleware(req: NextRequest) {
  const uid = req.cookies.get('uid')?.value ?? null;   // 使用者 ID
  const role = req.cookies.get('role')?.value ?? null; // 使用者角色
  const { pathname } = req.nextUrl;
  const segments = pathname.split('/');
  const lang = segments[1] || 'en'; // 語系代碼（預設為 en）

  const routeKey = getRouteKey(pathname);

  if (!routeKey) {
    // 非保護路由，直接放行
    return NextResponse.next();
  }

  const rules = protectedRoutes[routeKey];

  // 驗證是否登入
  if (rules.requiresAuth && !uid) {
    return NextResponse.redirect(new URL(`/${lang}/login`, req.url));
  }

  // 驗證是否為 admin（僅當 requiresAdmin 為 true 時）
  if (rules.requiresAdmin === true && role !== 'admin') {
    return NextResponse.redirect(new URL(`/${lang}/unauthorized`, req.url));
  }

  // 通過驗證，繼續執行
  return NextResponse.next();
}

// 設定 middleware 套用範圍：僅限語系路徑
export const config = {
  matcher: [
    '/en/:path*',
    '/zh/:path*',
    '/ja/:path*',
    '/fr/:path*',
    '/es/:path*',
    '/de/:path*',
    '/it/:path*',
    '/pt/:path*',
    '/ru/:path*',
    '/ko/:path*',
    '/vi/:path*',
    '/th/:path*',
    '/id/:path*',
    '/tr/:path*',
    '/ar/:path*',
    '/hi/:path*',
    '/bn/:path*',
    '/ms/:path*',
    '/nl/:path*',
    '/sv/:path*',
    '/pl/:path*',
    '/he/:path*',
    '/uk/:path*',
  ],
};
