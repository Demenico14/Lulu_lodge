/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["lh3.googleusercontent.com", "cdn.sanity.io"],  // Added Sanity's CDN along with Googleusercontent
    },
};

export default nextConfig;
