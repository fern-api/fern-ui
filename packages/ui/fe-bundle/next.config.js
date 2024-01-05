/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ["@fern-ui/ui"],
    productionBrowserSourceMaps: true,
    experimental: {
        scrollRestoration: true,
    },
    assetPrefix: "/_fern",
    rewrites: async () => ({
        beforeFiles: [
            {
                source: "/_fern/_next/:path*",
                destination: "/_next/:path*",
            },
        ],
        afterFiles: [
            {
                has: [
                    {
                        type: "header",
                        key: "x-fern-host",
                        value: "(?<host>.*)",
                    },
                ],
                source: "/:path*",
                destination: "/:host/:path*",
            },
            {
                has: [
                    {
                        type: "host",
                        value: "(?<host>.*)",
                    },
                ],
                source: "/:path*",
                destination: "/:host/:path*",
            },
        ],
    }),
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);
