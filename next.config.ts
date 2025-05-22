import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Experimental features can be added here if needed, for example:
  // experimental: {
  //   serverActions: true, // Server Actions are stable in Next.js 14, but might need explicit enabling in older versions or specific configurations
  // },
};

export default nextConfig;
