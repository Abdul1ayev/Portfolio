/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wmzqtwntwwydbffvefxx.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;
