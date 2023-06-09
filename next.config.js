/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
		esmExternals: 'loose',
		nextScriptWorkers: true,
	},
	images: {
		domains: [
			'lh3.googleusercontent.com',
			'avatars.githubusercontent.com ',
		],
	},
};

module.exports = nextConfig;
