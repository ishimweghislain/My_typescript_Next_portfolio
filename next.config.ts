import type { NextConfig } from "next";

// Vercel deploys full-stack Next.js with Serverless API Routes (/api/contact).
// Netlify uses static export to 'out' with Netlify Functions.
const isVercel = Boolean(process.env.VERCEL || process.env.NOW_BUILDER);

const nextConfig: NextConfig = {
  ...(isVercel ? {} : { output: 'export' }),
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
