import { getDynamicDocsPageProps } from "@/server/getDynamicDocsPageProps";
import { DocsPage } from "@fern-ui/ui";
import { GetServerSideProps } from "next";

export default DocsPage;

export const getServerSideProps: GetServerSideProps = async ({ req, res, query, params = {} }) => {
    if (query.error === "true") {
        res.statusCode = 500;
    }

    const xFernHost = params.host as string;
    const slugArray = params.slug == null ? [] : Array.isArray(params.slug) ? params.slug : [params.slug];

    return getDynamicDocsPageProps(xFernHost, slugArray, req.cookies);
};
