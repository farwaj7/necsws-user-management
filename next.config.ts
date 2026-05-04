import type { NextConfig } from 'next'

const isDev = process.env.NODE_ENV === 'development'

// A basic Content-Security-Policy.
// - 'unsafe-inline' is required by Next.js for its own runtime scripts/styles
//   unless you implement nonce-based CSP via middleware.
// - 'unsafe-eval' is required by React in development mode only (used for
//   reconstructing call stacks and other debugging features). It is never
//   included in production, where React does not use eval().
const ContentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "img-src 'self' data:",
  // 'self' covers same-origin fetch/XHR; ws: is added only in development
  // because CSP Level 2 browsers do not automatically extend 'self' to ws://
  // origins, which would silently block the Turbopack HMR WebSocket. It is
  // intentionally excluded from production to restrict outbound WS origins.
  `connect-src 'self'${isDev ? ' ws:' : ''}`,

].join('; ')

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: ContentSecurityPolicy },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },
}

export default nextConfig
