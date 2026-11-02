import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: '/(.*)', headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      // A checkout tab opened from here must stay reachable to be pointed at the provider.
      { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
    ] }];
  },
};

export default nextConfig;
