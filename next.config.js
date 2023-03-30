/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
			{
				protocol: 'http',
				hostname: '**',
			},
		],
	},
	async rewrites() {
		return [
			{
				source: '/@:slug',
				destination: '/profile/:slug',
			},
		]
	},
}

module.exports = nextConfig
