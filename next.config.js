/** @type {import('next').NextConfig} */

const nextConfig = {
	env: {
		EXCHANGE_RATE_API_KEY: process.env.EXCHANGE_RATE_API_KEY
	},
	pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
	images: {
		remotePatterns: [
		  {
			protocol: 'https',
			hostname: 'flagcdn.com',
			port: '',
			pathname: '/24x18/**',
		  },
		],
	  },
};

module.exports = nextConfig;
