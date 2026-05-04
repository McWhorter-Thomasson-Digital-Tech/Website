import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Initialize Redis and Rate Limit
// Check if UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are set to avoid errors during local dev if not configured yet
const redis = (process.env.UPSTASH_REDIS_REST_API_URL && process.env.UPSTASH_REDIS_REST_API_TOKEN)
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_API_URL,
      token: process.env.UPSTASH_REDIS_REST_API_TOKEN,
    })
  : null;

// Create a new ratelimiter, that allows 10 requests per 10 seconds
const ratelimit = redis ? new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(10, '10 s'),
  analytics: true,
}) : null;

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'mtdigitaltech.com';
  const pathname = request.nextUrl.pathname;

  // 1. Rate Limiting Logic
  // Apply rate limiting to all business card routes or api routes that handle sensitive PII
  if (pathname.startsWith('/api/apple-wallet') || pathname.startsWith('/api/google-wallet') || pathname.startsWith('/business-cards')) {
    // In Next.js 15, request.ip is removed. We use the 'x-forwarded-for' header instead.
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
    
    if (ratelimit) {
      const { success, limit, reset, remaining } = await ratelimit.limit(`ratelimit_${ip}`);
      
      if (!success) {
        return new NextResponse('Too Many Requests', {
          status: 429,
          headers: {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': reset.toString(),
            'Retry-After': ((reset - Date.now()) / 1000).toString()
          }
        });
      }
    }
  }

  // 2. Subdomain Routing Logic
  // Exclude standard assets and APIs from being rewritten by subdomain
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // Excludes files like favicon.ico, images, etc.
  ) {
    return NextResponse.next();
  }

  // Check if it's a subdomain
  if (hostname !== rootDomain && hostname.endsWith(`.${rootDomain}`)) {
    const subdomain = hostname.replace(`.${rootDomain}`, '');
    
    // Skip if it's 'www'
    if (subdomain !== 'www') {
      // Rewrite to the dynamic path for business cards
      return NextResponse.rewrite(new URL(`/business-cards/${subdomain}${pathname}`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
