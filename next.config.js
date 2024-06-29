/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'eceuymrbngzlclukvwtb.supabase.co',
      },
      {
        hostname: 'lh3.googleusercontent.com',
        protocol: 'https',
      },
      {
        hostname: 'i.pravatar.cc',
        protocol: 'https',
      },
    ],
  },
}

module.exports = nextConfig
