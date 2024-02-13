/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'logos-download.com',
        port: '',
        pathname: '/**'
      }
    ]
  }
}

module.exports = nextConfig
