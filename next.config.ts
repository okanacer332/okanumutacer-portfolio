/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // GitHub Pages'te alt dizinde yayınlamak için bu ayarları ekliyoruz
  basePath: '/okanumutacer-portfolio', // Deponun adı neyse buraya onu yazıyoruz
  assetPrefix: '/okanumutacer-portfolio/', // Statik varlıklar için ön ek
};

module.exports = nextConfig;