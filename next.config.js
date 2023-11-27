/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: "irp-cdn.multiscreensite.com" },
      { hostname: "lirp.cdn-website.com" },
      { hostname: "images.cdn.appfolio.com" },
    ],
  },
};

module.exports = nextConfig;
