/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        // Resolve the 'fs' module issue
        config.resolve.fallback = {
          fs: false,
        };
      }
  
      return config;
    },
  };
  
  export default nextConfig;