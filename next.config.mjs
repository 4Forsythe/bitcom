/** @type {import('next').NextConfig} */

const nextConfig = {
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: `${process.env.API_BASE_URL}/:path*`
			}
		]
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '*'
			}
		]
	},
	experimental: {
		missingSuspenseWithCSRBailout: false
	}
}

export default nextConfig
