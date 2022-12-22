/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'content.fakeface.rest'
      }
    ]
  }
}

module.exports = nextConfig
