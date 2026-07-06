import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              request.cookies.set(name, value);
              res.cookies.set(name, value, options);
            });
          } catch (error) {
            console.error('Cookie error:', error);
          }
        },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();

  const isAdminPath = request.nextUrl.pathname.startsWith('/admin');
  const isLoginPath = request.nextUrl.pathname === '/login';

  // اگر به ادمین رفت ولی لاگین نبود
  if (isAdminPath && !session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // اگر لاگین کرده ولی به لاگین اومده
  if (isLoginPath && session) {
    const { data: admin } = await supabase
      .from('admins')
      .select('id')
      .eq('email', session.user?.email)
      .single();

    if (admin) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  // اگر به ادمین اومده ولی ادمین نیست
  if (isAdminPath && session) {
    const { data: admin } = await supabase
      .from('admins')
      .select('id')
      .eq('email', session.user?.email)
      .single();

    if (!admin) {
      await supabase.auth.signOut();
      return NextResponse.redirect(new URL('/login?error=not_admin', request.url));
    }
  }

  return res;
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
};