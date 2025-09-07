/** @type {import('next').NextConfig} */
const nextConfig = {
  // Silence warnings
  // https://github.com/WalletConnect/walletconnect-monorepo/issues/1908
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

export default nextConfig;

// async redirects() {
//   return [
//     {
//       source: '/home',
//       destination: 'https://vibe-coding-snowy-five.vercel.app',
//       permanent: true,
//     },
//   ] {source: '/.wellknown: '/home', permanent: true}
// }