/** @type {import('next').NextConfig} */

import withPlaiceholder from '@plaiceholder/next'

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
				protocol: 'http',
				hostname: '*'
			},
			{
				protocol: 'https',
				hostname: '*'
			}
		]
	}
}

export default withPlaiceholder(nextConfig)
