/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["localhost", "service.ubbpress.tp3i.ubb.ac.id"],
  },
}

module.exports = nextConfig


