import clsx from "clsx";

export enum FernLogoFill {
    /**
     * The leaf color is fern (green), and the text color is ground in light mode or air in dark mode
     */
    Default = "default",

    /**
     * The entire logo is fern (green)
     */
    Fern = "fern",

    /**
     * The entire logo is monochrome — either ground in light mode or air in dark mode
     */
    Mono = "mono",

    /**
     * The entire logo is grayscale-a10
     */
    Muted = "muted",

    /**
     * The leaf color is fern (green), and the text color is air (white)
     */
    FernAir = "fern-air",

    /**
     * The leaf color is fern (green), and the text color is ground (black)
     */
    FernGround = "fern-ground",

    /**
     * The entire logo is air (white)
     */
    Air = "air",

    /**
     * The entire logo is ground (black)
     */
    Ground = "ground",
}

export declare namespace FernLogo {
    export interface Props {
        className?: string;
        fill?: FernLogoFill;
    }
}

export const FernLogo: React.FC<FernLogo.Props> = ({ fill = FernLogoFill.Default, className }) => {
    return (
        <svg
            viewBox="0 0 1370 480"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={clsx("aspect-[1370/480]", className)}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M670.518 64H585.653H585.598C538.706 64 511.567 88.6743 511.567 136.053V165.652H450.887V225.833H511.567V409.386H580.674V225.833H655.69V165.652H580.674V144.424C580.674 130.09 588.553 124.181 602.889 124.181H670.518V64ZM778.055 158.279C705.993 158.279 656.639 208.613 656.639 286.083H656.694C656.694 365.03 706.048 416.84 780.572 416.84C842.729 416.84 880.21 385.273 894.546 336.909H823.962C817.505 350.258 803.224 359.613 781.009 359.613C747.961 359.613 727.716 342.817 724.761 312.234H897.5C898.485 301.894 898.978 292.976 898.978 284.113C898.978 206.643 850.116 158.279 778.055 158.279ZM829.379 258.946V259.931H724.268C726.238 231.318 744.514 212.552 778.055 212.552C811.596 212.552 829.379 231.318 829.379 258.946ZM923.126 165.645H983.807V208.592C989.716 180.964 1009.47 165.645 1040.55 165.645H1083.99V174.015C1083.99 202.629 1060.79 225.826 1032.18 225.826C1005.04 225.826 992.178 239.668 992.178 267.297V409.435H923.071V165.645H923.126ZM1169.05 165.658H1108.37H1108.32V409.394H1177.43V270.757C1177.43 239.682 1195.7 220.423 1223.33 220.423C1250.96 220.423 1265.79 236.235 1265.79 268.788V409.448H1334.9V261.402C1334.9 196.788 1297.36 158.272 1237.67 158.272C1209.54 158.272 1183.39 169.105 1169.05 190.333V165.658Z"
                className={clsx({
                    "fill-fern": fill === FernLogoFill.Fern,
                    "fill-air": fill === FernLogoFill.Air || fill === FernLogoFill.FernAir,
                    "fill-ground": fill === FernLogoFill.Ground || fill === FernLogoFill.FernGround,
                    "fill-ground dark:fill-air": fill === FernLogoFill.Default || fill === FernLogoFill.Mono,
                    "fill-grayscale-a10": fill === FernLogoFill.Muted,
                })}
            />
            <path
                d="M356.495 236.668C333.276 217.039 298.297 209.171 267.295 232.085C265.868 233.122 264.095 231.35 265.176 229.966C272.527 220.498 281.045 210.295 287.92 200.048C294.924 189.543 305.388 182.02 317.451 178.345C381.66 158.89 362.376 64.0342 362.376 64.0342C362.376 64.0342 263.187 70.4328 275.424 155.993C277.456 170.303 273.651 184.873 264.701 196.244C253.718 210.122 240.963 223.395 231.71 232.993C229.764 234.981 226.478 233.079 227.256 230.399C236.207 200.265 242.736 153.658 211.734 123.611L168.106 87.3805L159.718 98.4484C134.77 131.35 142.077 177.74 175.024 202.642C193.92 216.91 202.481 232.431 201.14 249.465C200.319 259.668 195.692 269.223 188.774 276.789C175.76 291.056 163.61 306.361 154.227 324.087C152.93 326.551 149.168 325.6 149.298 322.79C150.638 293.52 147.828 227.545 98.536 203.983L43.364 182.668L39.0834 195.422C25.204 236.581 47.904 280.55 89.0236 294.515C124.782 306.663 137.537 329.707 128.933 364.251C128.543 365.505 122.317 401.086 123.182 416.867H162.831C164.172 392.396 189.855 376.313 212.123 386.3C218.392 389.111 224.835 393.131 231.45 398.32C266.906 426.249 319.138 419.634 347.026 384.139L354.982 374.022L304.826 338.008C270.408 310.944 224.489 323.179 190.504 346.352C187.65 348.298 184.018 345.185 185.618 342.072C226.694 261.484 280.093 261.657 301.021 279.556C326.402 301.259 364.84 297.368 386.373 271.903L392.556 264.597L356.452 236.668H356.495Z"
                className={clsx({
                    "fill-fern":
                        fill === FernLogoFill.Default ||
                        fill === FernLogoFill.Fern ||
                        fill === FernLogoFill.FernAir ||
                        fill === FernLogoFill.FernGround,
                    "fill-air": fill === FernLogoFill.Air,
                    "fill-ground": fill === FernLogoFill.Ground,
                    "fill-ground dark:fill-air": fill === FernLogoFill.Mono,
                    "fill-grayscale-a10": fill === FernLogoFill.Muted,
                })}
            />
        </svg>
    );
};
