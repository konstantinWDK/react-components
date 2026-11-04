/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static site: `next build` writes plain HTML to out/, served by nginx.
  output: 'export',
  // Same URL format as astrocomponents.dev: /docs/glass-button/
  trailingSlash: true,
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
