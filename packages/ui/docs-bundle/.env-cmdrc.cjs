module.exports = {
    "fern-dev": {
        NEXT_PUBLIC_FDR_ORIGIN: "https://registry-dev2.buildwithfern.com",
        NEXT_PUBLIC_POSTHOG_API_KEY: process.env.NEXT_PUBLIC_POSTHOG_API_KEY,
        NEXT_PUBLIC_APPLICATION_ENVIRONMENT: process.env.NEXT_PUBLIC_APPLICATION_ENVIRONMENT,
        NEXT_PUBLIC_ALGOLIA_APP_ID: "CQINPZSKS3",
        NEXT_PUBLIC_ALGOLIA_API_KEY: "9515d5b15764da73b5cfad85772779fa",
        NEXT_PUBLIC_ALGOLIA_SEARCH_INDEX: "search_index_dev",
        NEXT_PUBLIC_FONTAWESOME_CDN_HOST: process.env.FONTAWESOME_CDN_HOST,
        NEXT_PUBLIC_SEGMENT_API_KEY: ""
    },
    "fern-prod": {
        NEXT_PUBLIC_FDR_ORIGIN: "https://registry.buildwithfern.com",
        NEXT_PUBLIC_POSTHOG_API_KEY: process.env.NEXT_PUBLIC_POSTHOG_API_KEY,
        NEXT_PUBLIC_ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID,
        NEXT_PUBLIC_ALGOLIA_API_KEY: process.env.ALGOLIA_API_KEY,
        NEXT_PUBLIC_APPLICATION_ENVIRONMENT: process.env.NEXT_PUBLIC_APPLICATION_ENVIRONMENT,
        NEXT_PUBLIC_ALGOLIA_SEARCH_INDEX: "search_index_prod",
        NEXT_PUBLIC_FONTAWESOME_CDN_HOST: process.env.FONTAWESOME_CDN_HOST
    },
    "fern-preview": {
        NEXT_PUBLIC_FDR_ORIGIN: "http://localhost:3000"
    }
};
