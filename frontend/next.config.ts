import type { NextConfig } from "next";
import { API_BASE_URL } from "./shared/config/dotenv-config";

const nextConfig: NextConfig = {
  // images config
  images: {
    qualities: [75, 80],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },

  // mapping api url
  async rewrites() {
    return [
      {
        source: "/backend-api/:path*",
        destination: `${API_BASE_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
