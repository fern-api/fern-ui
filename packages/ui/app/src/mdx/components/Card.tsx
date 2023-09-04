import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

export declare namespace Card {
    export interface Props {
        title: string;
        icon?: string;
        children?: string;
        href?: string;
        iconPosition?: "top" | "left";
    }
}

export const Card: React.FC<Card.Props> = ({ title, icon, iconPosition = "top", children, href }) => {
    const Component = href != null ? "a" : "div";
    return (
        <Component
            className={classNames(
                "border-border-default-light dark:border-border-default-dark bg-background-tertiary-light dark:bg-background-tertiary-dark flex items-start rounded-lg border p-4 !no-underline transition",
                "grow basis-1/4",
                {
                    "space-y-3 flex-col": iconPosition === "top",
                    "space-x-3 flex-row": iconPosition === "left",
                },
                {
                    "hover:border-accent-primary hover:dark:border-accent-primary": href != null,
                }
            )}
            href={href}
        >
            <FontAwesomeIcon className="text-intent-default dark:text-intent-default h-5 w-5" icon={icon as IconProp} />
            <div>
                <div className="text-text-primary-light dark:text-text-primary-dark font-normal">{title}</div>
                {children != null && <div className="t-muted mt-1">{children}</div>}
            </div>
        </Component>
    );
};
