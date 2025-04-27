/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "github.com",
                pathname: "/**", // optional, all images under github.com
              },
        ]
    }
};

export default nextConfig;
