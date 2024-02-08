import { Dialog, Transition } from "@headlessui/react";
import classNames from "classnames";
import { FC, Fragment, PropsWithChildren, RefObject, useEffect, useRef } from "react";
import { useViewportContext } from "../viewport-context/useViewportContext";

interface FeedbackFormDialogProps {
    className?: string;
    show: boolean;
    targetRef: RefObject<HTMLDivElement>;
    onClose: () => void;
}

const POPOVER_GAP = 8;

export const FeedbackFormDialog: FC<PropsWithChildren<FeedbackFormDialogProps>> = ({
    className,
    show,
    children,
    targetRef,
    onClose,
}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const { viewportSize } = useViewportContext();
    useEffect(() => {
        let raf: number;
        function step() {
            const modal = modalRef.current;
            const feedback = targetRef.current;
            if (modal == null || feedback == null) {
                raf = window.requestAnimationFrame(step);
                return;
            }
            const feedbackRect = feedback.getBoundingClientRect();

            // stick to the top right corner of the feedback container
            const bottom = viewportSize.height - feedbackRect.top + POPOVER_GAP;
            const right = viewportSize.width - feedbackRect.right;
            modal.style.bottom = `${bottom}px`;
            modal.style.right = `${right}px`;

            raf = window.requestAnimationFrame(step);
        }

        raf = window.requestAnimationFrame(step);
        return () => {
            window.cancelAnimationFrame(raf);
        };
    }, [targetRef, viewportSize.height, viewportSize.width]);

    return (
        <Transition as={Fragment} show={show}>
            <Dialog as="div" onClose={onClose} role="dialog">
                <Transition.Child
                    as="div"
                    ref={modalRef}
                    className={classNames(
                        "border-default fixed z-50 w-96 rounded-lg border bg-white/50 p-4 shadow-xl backdrop-blur-xl dark:bg-background-dark/50",
                        className,
                    )}
                    enter="transition-all origin-bottom-right"
                    enterFrom="opacity-0 scale-90"
                    enterTo="opacity-100 scale-100"
                    leave="transition-all"
                    leaveFrom="opacity-100 scale-100 translate-y-0"
                    leaveTo="opacity-0 -translate-y-8"
                >
                    {children}
                </Transition.Child>
            </Dialog>
        </Transition>
    );
};
