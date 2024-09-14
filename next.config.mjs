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
    ],
  },
};

export default nextConfig;
