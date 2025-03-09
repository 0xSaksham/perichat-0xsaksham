import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {},
  },
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
      },
      {
        hostname: "avatars.githubusercontent.com",
      },
      {
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  dangerouslyAllowSVG: true,
  contentSecurityPolicy: "default-src 'self';  script-src 'none'; sandbox;",
};

export default nextConfig;
