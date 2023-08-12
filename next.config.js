/** @type {import('next').NextConfig} */

const nextConfig = {
	env: {
		EXCHANGE_RATE_API_KEY: process.env.EXCHANGE_RATE_API_KEY
	},
	pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
};

module.exports = nextConfig;
