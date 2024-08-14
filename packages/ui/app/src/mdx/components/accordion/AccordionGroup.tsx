import * as RadixAccordion from "@radix-ui/react-accordion";
import { slug } from "github-slugger";
import { NavArrowRight } from "iconoir-react";
import { useAtom } from "jotai";
import { NextRouter } from "next/router";
import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import { v4 } from "uuid";
import { ANCHOR_ATOM } from "../../../atoms";

export interface AccordionItemProps {
    title: string;
    toc?: boolean;
    children: ReactNode;
}

export interface AccordionGroupProps {
    items: AccordionItemProps[];
    router: NextRouter;
    toc?: boolean;
    key: string;
}

export const AccordionGroup: FC<AccordionGroupProps> = ({ items = [], toc: parentToc = true }) => {
    const [key, _setKey] = useState(v4());
    const [activeTabs, setActiveTabs] = useState<string[]>([]);
    const [anchor, setAnchor] = useAtom(ANCHOR_ATOM);
    useEffect(() => {
        if (anchor != null) {
            const anchorTab = items.findIndex((tab) => slug(`${tab.title}-${key}`) === anchor);
            if (anchorTab >= 0) {
                setActiveTabs((prev) => (prev.includes(anchorTab.toString()) ? prev : [...prev, anchorTab.toString()]));
            }
        }
    }, [anchor, items, key]);

    const handleValueChange = useCallback(
        (nextActiveTabs: string[]) => {
            setActiveTabs((prev) => {
                const added = nextActiveTabs.filter((tab) => !prev.includes(tab));
                if (added[0] != null) {
                    const addedItem = items[parseInt(added[0])];
                    if (addedItem != null) {
                        setAnchor(slug(`${addedItem.title}-${key}`));
                    }
                }
                return nextActiveTabs;
            });
        },
        [items, setAnchor, key],
    );

    return (
        <RadixAccordion.Root
            type="multiple"
            className="fern-accordion"
            value={activeTabs}
            onValueChange={handleValueChange}
        >
            {items.map(({ title, toc = parentToc, children }, idx) => {
                const id = slug(title);
                return (
                    <RadixAccordion.Item key={idx} value={idx.toString()} className="fern-accordion-item" id={id}>
                        <RadixAccordion.Trigger className="fern-accordion-trigger">
                            <NavArrowRight className="fern-accordion-trigger-arrow" />
                            <h6 className="fern-accordion-trigger-title" id={toc ? id : undefined}>
                                {title}
                            </h6>
                        </RadixAccordion.Trigger>
                        <RadixAccordion.Content className="fern-accordion-content">
                            <div className="m-5">{children}</div>
                        </RadixAccordion.Content>
                    </RadixAccordion.Item>
                );
            })}
        </RadixAccordion.Root>
    );
};
