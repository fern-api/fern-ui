import { ExternalLinkIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { type ComponentProps } from "react";
import { format, parse, resolve, type UrlObject } from "url";

interface FernLinkProps extends ComponentProps<typeof Link> {
    showExternalLinkIcon?: boolean;
}

export function FernLink(props: FernLinkProps) {
    const url = toUrlObject(props.href);
    const isExternalUrl = checkIsExternalUrl(url);

    // if the url is relative, we will need to invoke useRouter to resolve the relative url
    // since useRouter injects the router context, it will cause a re-render any time the route changes.
    // to avoid unnecessary re-renders, we will isolate the useRouter call to a separate component.
    if (!isExternalUrl && checkIsRelativeUrl(url)) {
        return <FernRelativeLink {...props} />;
    }

    return (
        <Link {...props} target={isExternalUrl ? "_blank" : props.target}>
            {props.children}
            {isExternalUrl && props.showExternalLinkIcon && <ExternalLinkIcon className="external-link-icon" />}
        </Link>
    );
}

function FernRelativeLink(props: ComponentProps<typeof Link>) {
    const router = useRouter();
    const href = resolveRelativeUrl(router.asPath, formatUrlString(props.href));
    return <Link {...props} href={href} />;
}

export function toUrlObject(url: string | UrlObject) {
    return typeof url === "string" ? parse(url) : url;
}

export function formatUrlString(url: string | UrlObject) {
    return typeof url === "string" ? url : format(url);
}

export function resolveRelativeUrl(pathName: string, href: string): string {
    // if the href is "../" or "./" or missing an initial slash, we want to resolve it relative to the current page
    if (href.startsWith(".") || !href.startsWith("/") || href.startsWith("#") || href.startsWith("?")) {
        const pathname = resolve(pathName, href);
        return pathname;
    }
    return href;
}

export function checkIsExternalUrl(url: UrlObject) {
    return url.protocol != null && url.host != null;
}

export function checkIsRelativeUrl(url: UrlObject) {
    if (checkIsExternalUrl(url)) {
        return false;
    }
    return (
        url.href == null ||
        url.href.startsWith(".") ||
        !url.href.startsWith("/") ||
        url.href.startsWith("#") ||
        url.href.startsWith("?")
    );
}
