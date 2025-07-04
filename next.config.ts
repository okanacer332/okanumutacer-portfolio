/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Bu satırı ekle veya var olanı bu şekilde değiştir
  images: {
    unoptimized: true, // GitHub Pages'te Next.js Image optimizasyonu çalışmaz, bu yüzden devre dışı bırakıyoruz.
  },
  // Diğer mevcut ayarlarınız buraya gelecek
};

module.exports = nextConfig;