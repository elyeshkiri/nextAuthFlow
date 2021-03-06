/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  env: {
    HOSTNAME: process.env.HOSTNAME,
    PORT: process.env.PORT,
    AUTHOST: process.env.AUTHOST,
    REALM: process.env.REALM,
    CLIENTID: process.env.CLIENTID,
    CLIENTSECRET: process.env.CLIENTID,
    USERNAME: process.env.USERNAME,
    PASSWORD: process.env.PASSWORD,
  },
};

module.exports = nextConfig;
