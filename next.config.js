/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en", "ar"],
    defaultLocale: "en",
  },
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['services.asfarcogroup.com', 'www.oneclickdrive.com'],
  },
};

module.exports = nextConfig;
