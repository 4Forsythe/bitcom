/** @type {import('next').NextConfig} */

const nextConfig = {
	async rewrites() {
		return [
			{
				source: '/store/:path*',
				destination: `${process.env.STORE_API_URL}/:path*`
			},
			{
				source: '/api/:path*',
				destination: `${process.env.SERVER_API_URL}/:path*`
			}
		]
	},
	images: {
		domains: [
			'i.playground.ru',
			'tehnobytservis.ru',
			'detsad-shop.ru',
			'alterainvest.ru',
			'blog.printloja.com.br',
			'plasttrubkomplekt.ru',
			'medgear.ru'
		]
	}
}

export default nextConfig
