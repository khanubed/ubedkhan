import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // Only enforce domain canonical redirects in Vercel production deployments
  if (process.env.VERCEL_ENV !== 'production') {
    return NextResponse.next();
  }

  const host = request.headers.get('host')?.toLowerCase() ?? '';

  if (host.endsWith('.vercel.app') || host === 'www.ubed.in') {
    const url = request.nextUrl.clone();
    url.protocol = 'https';
    url.host = 'ubed.in';
    url.port = '';
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
