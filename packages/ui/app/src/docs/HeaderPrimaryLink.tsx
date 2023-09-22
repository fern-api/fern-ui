import * as FernRegistryDocsRead from "@fern-fern/registry-browser/api/resources/docs/resources/v1/resources/read";
import classNames from "classnames";
import { ArrowRightIcon } from "../commons/icons/ArrowRightIcon";

export declare namespace HeaderPrimaryLink {
    export interface Props {
        navbarLink: FernRegistryDocsRead.NavbarLink.Primary;
    }
}

export const HeaderPrimaryLink: React.FC<HeaderPrimaryLink.Props> = ({ navbarLink }) => {
    return (
        <a
            className={classNames(
                "group pl-4 pr-3 py-1.5 border border-border-primary dark:hover:border-2 flex space-x-1.5 items-center !no-underline !text-white dark:!text-accent-primary bg-accent-primary hover:bg-accent-primary/80 dark:bg-transparent transition rounded-lg dark:hover:bg-tag-primary",
                "dark:hover:py-[calc(theme(spacing.1.5)-1px)] dark:hover:pr-[calc(theme(spacing.3)-1px)] dark:hover:pl-[calc(theme(spacing.4)-1px)]"
            )}
            href={navbarLink.url}
            target="_blank"
            rel="noreferrer noopener"
        >
            <span className="whitespace-nowrap">{navbarLink.text}</span>
            <div className="flex h-5 w-5 items-center">
                <ArrowRightIcon className="h-5 w-5 transition group-hover:translate-x-0.5" />
            </div>
        </a>
    );
};
