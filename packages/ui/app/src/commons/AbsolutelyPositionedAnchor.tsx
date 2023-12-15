import classNames from "classnames";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";

export declare namespace AbsolutelyPositionedAnchor {
    export interface Props {
        href: Url;
        smallGap?: boolean;
    }
}

/**
 * Can only be used with a parent div that has `position` set to `"relative"`.
 */
export const AbsolutelyPositionedAnchor: React.FC<AbsolutelyPositionedAnchor.Props> = ({ href, smallGap = false }) => {
    return (
        <div className="absolute">
            <Link
                href={href}
                shallow={true}
                scroll={false}
                replace={true}
                className={classNames("flex items-center border-0 opacity-0 group-hover/anchor-container:opacity-100", {
                    "-ml-10": !smallGap,
                    "-ml-8": smallGap,
                })}
            >
                <span className="zinc-box flex h-6 w-6 items-center justify-center rounded-md bg-white text-gray-400 ring-1 ring-gray-400/30 hover:ring-gray-400/60 dark:ring-gray-700/25 dark:hover:ring-white/20">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="gray" height="12px" viewBox="0 0 576 512">
                        <path d="M0 256C0 167.6 71.6 96 160 96h72c13.3 0 24 10.7 24 24s-10.7 24-24 24H160C98.1 144 48 194.1 48 256s50.1 112 112 112h72c13.3 0 24 10.7 24 24s-10.7 24-24 24H160C71.6 416 0 344.4 0 256zm576 0c0 88.4-71.6 160-160 160H344c-13.3 0-24-10.7-24-24s10.7-24 24-24h72c61.9 0 112-50.1 112-112s-50.1-112-112-112H344c-13.3 0-24-10.7-24-24s10.7-24 24-24h72c88.4 0 160 71.6 160 160zM184 232H392c13.3 0 24 10.7 24 24s-10.7 24-24 24H184c-13.3 0-24-10.7-24-24s10.7-24 24-24z"></path>
                    </svg>
                </span>
            </Link>
        </div>
    );
};
