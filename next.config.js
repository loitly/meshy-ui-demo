/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,   // when strictMode is true, nextjs will call render twice in dev to flush out rendering side-effect
  swcMinify: true,
}

module.exports = nextConfig
