/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'chawkbazar.vercel.app',
        port: '',
      },
    ],
  },
};

export default nextConfig;
