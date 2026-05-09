/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  webpack: (config) => {
    config.resolve.alias["html2canvas"] = false;
    config.resolve.alias["canvg"] = false;
    config.resolve.alias["dompurify"] = false;
    return config;
  },
};

export default nextConfig;
