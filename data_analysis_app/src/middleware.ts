import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function middleware(req: NextRequest) {
  // Create a Supabase client configured to use cookies
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  // Get the user from the session
  const { data: { session } } = await supabase.auth.getSession();
  
  // Check authentication for protected routes
  const isProtectedRoute = req.nextUrl.pathname.startsWith('/dashboard') || 
                          req.nextUrl.pathname.startsWith('/projects') || 
                          req.nextUrl.pathname.startsWith('/profile');
    
  // If on a protected route and not authenticated, redirect to sign in
  if (isProtectedRoute && !session) {
    const redirectUrl = new URL('/signin', req.url);
    redirectUrl.searchParams.set('redirect', req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // If on auth page but already authenticated, redirect to dashboard
  if ((req.nextUrl.pathname === '/signin' || req.nextUrl.pathname === '/signup') && session) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

// Specify which routes this middleware should run on
export const config = {
  matcher: ['/dashboard/:path*', '/projects/:path*', '/profile/:path*', '/signin', '/signup'],
};
