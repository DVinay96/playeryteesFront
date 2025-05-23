/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  output: 'export', 
  images: {
    unoptimized: true, 
  },
}

module.exports = nextConfig