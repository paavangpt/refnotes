import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "github.com",
                pathname: "/ContractSPAN/EmailImages/**",
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "plus.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "ik.imagekit.io",
            },
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
            },
            {
                protocol: "https",
                hostname: "randomuser.me",
            },
        ],
    },
    reactStrictMode: true,
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.module.rules.push({
                test: /react-dom$/,
                loader: 'string-replace-loader',
                options: {
                    search: 'hydrateRoot(container, element, options);',
                    replace: 'hydrateRoot(container, element, {...options, onRecoverableError: err => { if (!err.message.includes("Attribute")) console.error(err); }});',
                },
            });
        }
        return config;
    },
    // Explicitly disable SWC minification, works better with hydration errors
    swcMinify: false,
};

export default nextConfig;
