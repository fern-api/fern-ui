import type { ReactElement, SVGProps } from "react";
const SvgLogoWhatsApp = (props: SVGProps<SVGSVGElement>): ReactElement => (
    <svg strokeLinejoin="round" data-testid="geist-icon" viewBox="0 0 16 16" width={16} height={16} {...props}>
        <path
            fill="#25D366"
            fillRule="evenodd"
            d="M13.638 2.323A7.87 7.87 0 0 0 8.034 0C3.667 0 .112 3.554.11 7.922c0 1.396.364 2.76 1.058 3.96L.044 15.989l4.2-1.101a7.9 7.9 0 0 0 3.786.964h.004c4.366 0 7.92-3.554 7.922-7.923a7.87 7.87 0 0 0-2.318-5.604zm-5.604 12.19H8.03a6.6 6.6 0 0 1-3.352-.918l-.24-.143-2.493.654.666-2.43-.157-.25a6.57 6.57 0 0 1-1.007-3.504 6.595 6.595 0 0 1 6.588-6.584 6.54 6.54 0 0 1 4.656 1.931 6.54 6.54 0 0 1 1.926 4.659c-.001 3.63-2.955 6.584-6.584 6.584zm3.611-4.932c-.197-.099-1.17-.578-1.352-.644s-.314-.099-.445.1c-.132.198-.512.644-.627.776-.116.132-.231.148-.43.049-.197-.1-.835-.308-1.591-.982a6 6 0 0 1-1.101-1.372c-.116-.198-.013-.305.086-.404.09-.088.198-.23.297-.346.1-.116.132-.199.198-.33.066-.133.033-.248-.016-.347-.05-.1-.445-1.074-.61-1.47-.161-.386-.325-.334-.446-.34a8 8 0 0 0-.38-.007.73.73 0 0 0-.527.248c-.182.198-.693.677-.693 1.651s.709 1.916.808 2.048 1.396 2.132 3.382 2.99c.472.203.84.325 1.128.416.474.151.906.13 1.247.08.38-.058 1.171-.48 1.336-.942.165-.463.165-.86.116-.942-.05-.082-.182-.132-.38-.23z"
            clipRule="evenodd"
        />
    </svg>
);
export default SvgLogoWhatsApp;
