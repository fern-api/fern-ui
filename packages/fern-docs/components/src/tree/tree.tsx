import { composeEventHandlers } from "@radix-ui/primitive";
import { composeRefs } from "@radix-ui/react-compose-refs";
import { Primitive } from "@radix-ui/react-primitive";
import { Separator } from "@radix-ui/react-separator";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { noop } from "es-toolkit/function";
import { atom, PrimitiveAtom, useAtomValue, useSetAtom } from "jotai";
import { ChevronDown, Plus } from "lucide-react";
import {
  Children,
  ComponentProps,
  ComponentPropsWithoutRef,
  createContext,
  Dispatch,
  forwardRef,
  Fragment,
  isValidElement,
  PropsWithChildren,
  ReactNode,
  RefObject,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useMemoOne } from "use-memo-one";
import { Badge } from "../badges";
import { cn } from "../cn";
import Disclosure from "../disclosure";
import { Button } from "../FernButtonV2";
import { Chevron } from "./chevron";

const rootCtx = createContext<{
  ref: RefObject<HTMLDivElement | null>;
  rootId: string;
  idsAtom: PrimitiveAtom<string[]>;
  expandedAtom: PrimitiveAtom<string[]>;
}>({
  ref: { current: null },
  rootId: "",
  idsAtom: atom<string[]>([]),
  expandedAtom: atom<string[]>([]),
});

const SET_OPEN_ALL_EVENT = "tree-set-open-all-disclosures";

function useSetOpenAll() {
  const { ref, rootId } = useContext(rootCtx);
  return useCallback(
    (open: boolean) => {
      const current = ref.current;
      if (!current) {
        return;
      }
      current.dispatchEvent(
        new CustomEvent(SET_OPEN_ALL_EVENT, { detail: { rootId, open } })
      );
    },
    [rootId, ref]
  );
}

function useIsAllExpanded() {
  const { expandedAtom, idsAtom } = useContext(rootCtx);
  const expanded = useAtomValue(expandedAtom);
  const ids = useAtomValue(idsAtom);
  return expanded.length === ids.length;
}

function useHasNoDisclosures() {
  const { idsAtom } = useContext(rootCtx);
  const ids = useAtomValue(idsAtom);
  return ids.length === 0;
}

function useListenSetOpenAll(setOpen: (open: boolean) => void) {
  const { ref, rootId } = useContext(rootCtx);
  useEffect(() => {
    const current = ref.current;
    if (!current) {
      return;
    }
    const listener: EventListener = (e: Event) => {
      if (e instanceof CustomEvent && e.detail.rootId === rootId) {
        setOpen(e.detail.open);
      }
    };
    current.addEventListener(SET_OPEN_ALL_EVENT, listener);
    return () => {
      current.removeEventListener(SET_OPEN_ALL_EVENT, listener);
    };
  }, [ref, rootId, setOpen]);
}

const ctx = createContext<{
  indent: number;
  pointerOver: boolean;
  setPointerOver: Dispatch<SetStateAction<boolean>>;
  card: boolean;
}>({
  indent: 0,
  pointerOver: false,
  setPointerOver: noop,
  card: false,
});

function useIndent() {
  return useContext(ctx).indent;
}

function useIsCard() {
  return useContext(ctx).card;
}

const TreeRootProvider = ({ children }: PropsWithChildren) => {
  const card = useIsCard();
  return (
    <ctx.Provider
      value={useMemoOne(
        () => ({
          indent: 0,
          pointerOver: false,
          setPointerOver: noop,
          card,
        }),
        [card]
      )}
    >
      {children}
    </ctx.Provider>
  );
};

const SubTreeProvider = ({ children }: PropsWithChildren) => {
  const parentIndent = useIndent();
  const card = useIsCard();
  const [pointerOver, setPointerOver] = useState(false);
  return (
    <ctx.Provider
      value={{ indent: parentIndent + 1, pointerOver, setPointerOver, card }}
    >
      {children}
    </ctx.Provider>
  );
};

const Tree = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof Primitive.div>
>(({ children, ...props }, forwardRef) => {
  const ref = useRef<HTMLDivElement>(null);
  const rootId = useId();
  return (
    <div
      {...props}
      ref={composeRefs(ref, forwardRef)}
      className={cn("fern-tree", props.className)}
    >
      <rootCtx.Provider
        value={useMemoOne(
          () => ({
            ref,
            rootId,
            idsAtom: atom<string[]>([]),
            expandedAtom: atom<string[]>([]),
          }),
          [rootId, ref]
        )}
      >
        <TreeRootProvider>
          <Disclosure.Root>
            <Slottable>{children}</Slottable>
          </Disclosure.Root>
        </TreeRootProvider>
      </rootCtx.Provider>
    </div>
  );
});

Tree.displayName = "Tree";

const openCtx = createContext<{
  open: boolean;
  expandable: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean | undefined>>;
}>({
  open: false,
  expandable: false,
  setOpen: noop,
});

function useDetailContext(): {
  open: boolean;
  expandable: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean | undefined>>;
} {
  return useContext(openCtx);
}

const UnbranchedCtx = createContext(false);

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function useSyncDisclosureWithRoot(defaultOpen?: boolean) {
  const id = useId();
  const { idsAtom, expandedAtom } = useContext(rootCtx);
  const setIds = useSetAtom(idsAtom);
  const setExpanded = useSetAtom(expandedAtom);

  useIsomorphicLayoutEffect(() => {
    setIds((ids) => [...ids, id]);
    if (defaultOpen) {
      setExpanded((expanded) => [...expanded, id]);
    }
    return () => {
      setIds((ids) => ids.filter((id) => id !== id));
      setExpanded((expanded) => expanded.filter((id) => id !== id));
    };
  }, []);

  return useCallback(
    (open: boolean) => {
      setExpanded((expanded) =>
        open ? [...expanded, id] : expanded.filter((id) => id !== id)
      );
    },
    [id, setExpanded]
  );
}

const TreeItemHasChildrenCtx = createContext(false);

const TreeItem = forwardRef<
  HTMLDetailsElement,
  ComponentPropsWithoutRef<typeof TreeItemDisclosure> & {
    unbranched?: boolean;
  }
>(({ children, unbranched = false, ...props }, ref) => {
  const other = Children.toArray(children).filter(
    (child) => isValidElement(child) && child.type !== TreeItemSummary
  );
  const indent = useIndent();
  return (
    <UnbranchedCtx.Provider value={unbranched}>
      <TreeItemHasChildrenCtx.Provider value={other.length > 0}>
        {other.length > 0 ? (
          <TreeItemDisclosure ref={ref} {...props}>
            {children}
          </TreeItemDisclosure>
        ) : (
          <openCtx.Provider
            value={{ open: false, expandable: false, setOpen: noop }}
          >
            <div className={props.className} data-level={indent}>
              {children}
            </div>
          </openCtx.Provider>
        )}
      </TreeItemHasChildrenCtx.Provider>
    </UnbranchedCtx.Provider>
  );
});

TreeItem.displayName = "TreeItem";

const TreeItemDisclosure = forwardRef<
  HTMLDetailsElement,
  ComponentPropsWithoutRef<"details"> & {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    asChild?: boolean;
  }
>(
  (
    { children, open: openProp, defaultOpen, onOpenChange, asChild, ...props },
    ref
  ) => {
    const setOpenWithRoot = useSyncDisclosureWithRoot(defaultOpen);

    const [open = false, setOpen] = useControllableState({
      prop: openProp,
      defaultProp: defaultOpen,
      onChange: (open) => {
        setOpenWithRoot(open);
        onOpenChange?.(open);
      },
    });

    useListenSetOpenAll(setOpen);

    const childrenArray = Children.toArray(children);

    const summary = childrenArray.find(
      (child) => isValidElement(child) && child.type === TreeItemSummary
    );
    const other = childrenArray.filter(
      (child) => isValidElement(child) && child.type !== TreeItemSummary
    );

    const indent = useIndent();
    const ctxValue = useMemo(
      () => ({ open, setOpen, expandable: other.length > 0 }),
      [open, setOpen, other.length]
    );

    return (
      <openCtx.Provider value={ctxValue}>
        <Disclosure.Details
          {...props}
          ref={ref}
          open={open}
          onOpenChange={setOpen}
          data-level={indent}
        >
          {summary}
          {other.length > 0 && (
            <SubTreeProvider>
              <Disclosure.Content asChild={asChild}>{other}</Disclosure.Content>
            </SubTreeProvider>
          )}
        </Disclosure.Details>
      </openCtx.Provider>
    );
  }
);

TreeItemDisclosure.displayName = "TreeItemDisclosure";

const TreeItemContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof Primitive.div> & {
    notLast?: boolean;
  }
>(({ children, notLast = false, ...props }, ref) => {
  const indent = useIndent();
  const unbranched = useContext(UnbranchedCtx);

  if (indent === 0) {
    return children;
  }

  if (unbranched) {
    return (
      <Primitive.div
        {...props}
        ref={ref}
        className={cn(indent > 1 && "pl-2", props.className)}
      >
        {children}
      </Primitive.div>
    );
  }

  const childrenArray = Children.toArray(children);
  if (childrenArray.length === 0) {
    return false;
  }

  return (
    <Primitive.div
      {...props}
      ref={ref}
      className={cn(
        "relative grid grid-cols-[16px_1fr] *:min-w-0",
        props.className
      )}
      asChild={false} // no slotting allowed here
    >
      {childrenArray.map((child, i) => (
        <Fragment key={isValidElement(child) ? (child.key ?? i) : i}>
          <Disclosure.CloseTrigger asChild>
            <TreeBranch last={i === childrenArray.length - 1 && !notLast} />
          </Disclosure.CloseTrigger>
          {child}
        </Fragment>
      ))}
    </Primitive.div>
  );
});

TreeItemContent.displayName = "TreeItemContent";

const TreeItemCardCtx = createContext<boolean>(false);

const TreeItemCard = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div"> & {
    asChild?: boolean;
  }
>(({ children, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : "div";
  const indent = useIndent();
  return (
    <TreeRootProvider>
      <Comp
        {...props}
        ref={ref}
        className={cn(
          indent > 0 && "rounded-xl border border-[var(--grayscale-a4)]",
          props.className
        )}
      >
        <TreeItemCardCtx.Provider value={indent > 0}>
          <Slottable>{children}</Slottable>
        </TreeItemCardCtx.Provider>
      </Comp>
    </TreeRootProvider>
  );
});

TreeItemCard.displayName = "TreeItemCard";

const TreeItemsContentAdditional = ({
  children,
  ...props
}: ComponentProps<typeof TreeItemsContentAdditionalDisclosure>) => {
  const childrenArray = Children.toArray(children).filter(isValidElement);
  if (childrenArray.length === 0) {
    return false;
  }
  return (
    <TreeItemsContentAdditionalDisclosure {...props}>
      {children}
    </TreeItemsContentAdditionalDisclosure>
  );
};

const TreeItemsContentAdditionalDisclosure = ({
  children,
  open: openProp,
  defaultOpen,
  onOpenChange,
}: PropsWithChildren<{
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}>): ReactNode => {
  const setOpenWithRoot = useSyncDisclosureWithRoot(defaultOpen);

  const [open = false, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: (open) => {
      setOpenWithRoot(open);
      onOpenChange?.(open);
    },
  });

  useListenSetOpenAll(setOpen);

  const indent = useIndent();
  const childrenArray = Children.toArray(children).filter(isValidElement);

  // close the parent when this is clicked
  const onClose = Disclosure.useClose();

  return (
    <Disclosure.Details
      open={open}
      onOpenChange={setOpen}
      className="col-span-2"
    >
      <Disclosure.Summary className="list-none" tabIndex={-1}>
        {({ open }) =>
          !open &&
          (indent > 0 ? (
            <div className="relative grid grid-cols-[16px_1fr] *:min-w-0">
              <Disclosure.CloseTrigger asChild>
                <TreeBranch last />
              </Disclosure.CloseTrigger>
              <div className="py-2">
                <Disclosure.Trigger asChild>
                  <Badge
                    rounded
                    interactive
                    variant="subtle"
                    className="font-normal"
                  >
                    <ChevronDown />
                    {childrenArray.length} more attributes
                  </Badge>
                </Disclosure.Trigger>
              </div>
            </div>
          ) : (
            <div className="py-2">
              <Disclosure.Trigger asChild>
                <Badge
                  rounded
                  interactive
                  variant="subtle"
                  className="font-normal"
                >
                  <ChevronDown />
                  {childrenArray.length} more attributes
                </Badge>
              </Disclosure.Trigger>
            </div>
          ))
        }
      </Disclosure.Summary>
      <Disclosure.Content>
        {indent > 0 ? (
          <div className="relative grid grid-cols-[16px_1fr] *:min-w-0">
            {childrenArray.map((child, i) => (
              <Fragment key={i}>
                <TreeBranch
                  last={i === childrenArray.length - 1}
                  onClick={onClose}
                />
                {child}
              </Fragment>
            ))}
          </div>
        ) : (
          <>{childrenArray}</>
        )}
      </Disclosure.Content>
    </Disclosure.Details>
  );
};

export const UnionVariants = ({ children }: PropsWithChildren) => {
  const childrenArray = Children.toArray(children);
  const isCard = useContext(TreeItemCardCtx);
  return (
    <>
      {childrenArray.map((child, index) => (
        <Fragment key={isValidElement(child) ? (child.key ?? index) : index}>
          {index > 0 && (
            <Separator
              orientation="horizontal"
              className="pointer-events-none flex h-px items-center gap-2"
            >
              <div className="h-px flex-1 bg-[var(--grayscale-a4)]" />
              <span className="text-sm uppercase text-[var(--grayscale-a9)]">
                {"or"}
              </span>
              <div className="h-px flex-1 bg-[var(--grayscale-a4)]" />
            </Separator>
          )}
          <div
            className={cn(
              "py-4",
              isCard && "px-4"
              // !isCard && "first:pt-0 last:pb-0"
            )}
          >
            {child}
          </div>
        </Fragment>
      ))}
    </>
  );
};

UnionVariants.displayName = "UnionVariants";

const TreeItemSummary = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div"> & {
    collapseTriggerMessage?: string;
  }
>(
  (
    { children, collapseTriggerMessage = "Show child attributes", ...props },
    ref
  ) => {
    const indent = useIndent();
    const { expandable } = useDetailContext();
    const unbranched = useContext(UnbranchedCtx);

    if (!expandable) {
      return (
        <div
          {...props}
          ref={ref}
          className={cn(
            "relative mt-2 list-none items-center",
            props.className
          )}
        >
          {children}
        </div>
      );
    }

    return (
      <Disclosure.Summary
        {...props}
        ref={ref}
        className={cn("relative mt-2 list-none items-center", props.className)}
        onClick={composeEventHandlers(props.onClick, (e) => e.preventDefault())}
        tabIndex={-1}
      >
        {children}
        {expandable && (
          <Disclosure.If open={false}>
            {unbranched ? (
              <Disclosure.Trigger asChild>
                <Badge
                  rounded
                  interactive
                  className={cn("mt-2 font-normal", indent > 0 && "ml-2")}
                  variant="outlined-subtle"
                >
                  <Plus />
                  {collapseTriggerMessage}
                </Badge>
              </Disclosure.Trigger>
            ) : (
              <div className="grid grid-cols-[16px_1fr] *:min-w-0">
                <TreeBranch last />
                <div>
                  <Disclosure.Trigger asChild>
                    <Badge
                      rounded
                      interactive
                      className="mt-2 font-normal"
                      variant="outlined-subtle"
                    >
                      <Plus />
                      {collapseTriggerMessage}
                    </Badge>
                  </Disclosure.Trigger>
                </div>
              </div>
            )}
          </Disclosure.If>
        )}
      </Disclosure.Summary>
    );
  }
);

TreeItemSummary.displayName = "TreeItemSummary";

const TreeItemSummaryIndentedContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof Primitive.div>
>(({ children, ...props }, ref) => {
  const indent = useIndent();
  const unbranched = useContext(UnbranchedCtx);
  const hasChildren = useContext(TreeItemHasChildrenCtx);

  if (!hasChildren || unbranched) {
    return (
      <Primitive.div
        ref={ref}
        {...props}
        className={cn(props.className, indent > 0 && "pl-2")}
      >
        {children}
      </Primitive.div>
    );
  }

  return (
    <Primitive.div
      ref={ref}
      {...props}
      className={cn("grid grid-cols-[16px_1fr] *:min-w-0", props.className)}
    >
      <TreeBranch lineOnly />
      <Slottable>{children}</Slottable>
    </Primitive.div>
  );
});

TreeItemSummaryIndentedContent.displayName = "TreeItemSummaryIndentedContent";

const TreeDetailIndicator = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof Primitive.div>
>(({ children, ...props }, ref) => {
  const { open, expandable } = useDetailContext();
  if (!expandable) {
    return false;
  }
  return (
    <Primitive.div
      {...props}
      ref={ref}
      className={cn(
        props.className,
        "rounded-full transition-[transform,background] duration-100 hover:bg-[var(--grayscale-3)] hover:transition-transform",
        { "rotate-90": open }
      )}
    >
      <Chevron className="size-4" />
      <Slottable>{children}</Slottable>
    </Primitive.div>
  );
});

TreeDetailIndicator.displayName = "TreeDetailIndicator";

const TreeItemSummaryTrigger = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof Primitive.div>
>(({ children, ...props }, ref) => {
  const hasChildren = useContext(TreeItemHasChildrenCtx);
  const child = (
    <Primitive.div
      {...props}
      ref={ref}
      className={cn(props.className, "cursor-default")}
    >
      {children}
    </Primitive.div>
  );
  if (!hasChildren) {
    return child;
  }
  return <Disclosure.Trigger asChild>{child}</Disclosure.Trigger>;
});

TreeItemSummaryTrigger.displayName = "TreeItemSummaryTrigger";

const TreeBranch = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div"> & {
    lineOnly?: boolean;
    last?: boolean;
  }
>(({ lineOnly = false, last = false, ...props }, ref) => {
  const { pointerOver, setPointerOver } = useContext(ctx);
  return (
    <div
      aria-hidden="true"
      ref={ref}
      {...props}
      className={cn(props.className, "relative h-full", { last })}
      data-branch=""
      onPointerOver={() => setPointerOver(true)}
      onPointerLeave={() => setPointerOver(false)}
    >
      <div
        className={cn("absolute inset-0 h-full w-0 border-l", {
          "border-[var(--grayscale-9)]": pointerOver,
          "border-[var(--grayscale-6)] transition-colors duration-100":
            !pointerOver,
        })}
        data-line=""
      />
      {!lineOnly && (
        <div
          className={cn(
            "h-[19.5px] w-[15px] rounded-bl-[8px] border-b border-l",
            {
              "border-[var(--grayscale-9)]": pointerOver,
              "border-[var(--grayscale-6)] transition-colors duration-100":
                !pointerOver,
            }
          )}
          data-curve=""
        />
      )}
    </div>
  );
});

TreeBranch.displayName = "TreeBranch";

const HasDisclosures = ({ children }: PropsWithChildren) => {
  const hasNoDisclosures = useHasNoDisclosures();
  if (hasNoDisclosures) {
    return false;
  }
  return <>{children}</>;
};

const ToggleExpandAll = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<"button">
>(({ children, ...props }, ref) => {
  const isAllExpanded = useIsAllExpanded();
  const setOpen = useSetOpenAll();
  return (
    <Button
      {...props}
      ref={ref}
      onClick={composeEventHandlers(props.onClick, () => {
        setOpen(!isAllExpanded);
      })}
      variant="ghost"
      size="xs"
      color="gray"
    >
      {isAllExpanded ? "Collapse all" : "Expand all"}
    </Button>
  );
});

ToggleExpandAll.displayName = "ToggleExpandAll";

const Root = Tree;
const RootProvider = TreeRootProvider;
const Item = TreeItem;
const Content = TreeItemContent;
const CollapsedContent = TreeItemsContentAdditional;
const Summary = TreeItemSummary;
const SummaryIndentedContent = TreeItemSummaryIndentedContent;
const Trigger = TreeItemSummaryTrigger;
const Indicator = TreeDetailIndicator;
const Card = TreeItemCard;
const Variants = UnionVariants;
const Branch = TreeBranch;

const useIsOpen = () => {
  const { open } = useDetailContext();
  return open;
};

export {
  Branch,
  Card,
  CollapsedContent,
  Content,
  HasDisclosures,
  Indicator,
  Item,
  Root,
  RootProvider,
  Summary,
  SummaryIndentedContent,
  ToggleExpandAll,
  Trigger,
  useDetailContext,
  useIndent,
  useIsCard,
  useIsOpen,
  Variants,
};
