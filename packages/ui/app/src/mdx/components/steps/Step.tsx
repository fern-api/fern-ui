import { useCopyToClipboard } from "@fern-ui/react-commons";
import cn from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Link } from "iconoir-react";
import { ComponentProps, ReactElement, useState } from "react";
import { FernLink } from "../../../components/FernLink";

interface StepProps extends ComponentProps<"div"> {
    id: string; // id can be overridden, but a default is generated by rehypeFernSteps
    index: string; // index is always set by rehypeFernSteps and cannot be overridden
}

export function Step({ children, className, title, id, index, ...props }: StepProps): ReactElement {
    const href = `#${id}`;
    const { copyToClipboard, wasJustCopied } = useCopyToClipboard(() => new URL(href, window.location.href).toString());
    const [hover, setHover] = useState(false);

    return (
        <div className={cn("fern-step scroll-mt-content-padded", className)} id={id} {...props}>
            <FernLink
                className="fern-anchor"
                href={href}
                shallow={true}
                scroll={false}
                replace={true}
                onClick={copyToClipboard}
                onMouseOver={() => setHover(true)}
                onMouseOut={() => setHover(false)}
                tabIndex={-1}
            >
                <span className="fern-anchor-icon">{hover ? <Link /> : <span>{index}</span>}</span>
                <AnimatePresence>
                    {wasJustCopied && (
                        <motion.div className="fern-anchor-icon copied" exit={{ opacity: 0 }}>
                            <Check />
                        </motion.div>
                    )}
                </AnimatePresence>
            </FernLink>
            {title != null && (
                <h3 onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)}>
                    {title}
                </h3>
            )}
            {children}
        </div>
    );
}
