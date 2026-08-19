import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // display-core and design-tokens ship as TS source; Next compiles them.
  transpilePackages: ['@wlans/design-tokens', '@wlans/display-core'],
  experimental: {
    // Keeps the client bundle honest: we want to see what actually ships.
    optimizePackageImports: ['lucide-react'],
  },
}

export default nextConfig
