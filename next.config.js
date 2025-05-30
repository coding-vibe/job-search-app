/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "encrypted-tbn0.gstatic.com",
      "img.icons8.com",
      "images.unsplash.com",
    ],
  },
};

module.exports = nextConfig;
