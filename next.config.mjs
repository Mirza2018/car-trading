/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  transpilePackages: [
    "antd",
    "rc-util",
    "rc-picker",
    "rc-tree",
    "rc-table",
    "rc-pagination",
    "rc-input",
    "@ant-design/icons",
    "dayjs",
    "jodit-react",
  ],
};

export default nextConfig;
