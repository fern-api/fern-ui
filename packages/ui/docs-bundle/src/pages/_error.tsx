import { PageRouterErrorProps, pageRouterCustomErrorHandler } from "@highlight-run/next/ssr";

import { GetServerSideProps } from "next";
import Error from "next/error";

export function parseResolvedUrl(resolvedUrl: string): string {
    // if resolvedUrl is `/static/[host]/[...slug]` or `/dynamic/[host]/[..slug]` then return '/[...slug]`
    const match = resolvedUrl.match(/\/(static|dynamic)\/[^/]+(.*)/);
    return match?.[2] ?? resolvedUrl;
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, resolvedUrl, query }) => {
    if (
        res.statusCode >= 500 &&
        res.statusCode < 600 &&
        req.url != null &&
        resolvedUrl.startsWith("/static") &&
        query.error !== "true"
    ) {
        const url = parseResolvedUrl(resolvedUrl);
        return {
            redirect: {
                destination: `${url}${url.includes("?") ? "&" : "?"}error=true`,
                permanent: false,
            },
        };
    }
    return {
        props: { errorCode: res.statusCode },
    };
};

// This is for capturing SSR errors
export default pageRouterCustomErrorHandler(
    {
        // This is just the same config as the error NextApp has
        // TODO(armando): we should have a shared config for this
        projectId: "3ej4m3ye",
        serviceName: "docs-frontend-server",
        tracingOrigins: true,
        environment: process?.env.NEXT_PUBLIC_APPLICATION_ENVIRONMENT ?? "dev",
    },
    (props: PageRouterErrorProps) => <Error statusCode={props.statusCode} />,
);
