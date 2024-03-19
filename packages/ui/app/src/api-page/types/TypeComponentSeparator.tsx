import cn from "clsx";

export declare namespace TypeComponentSeparator {
    export interface Props {
        className?: string;
    }
}

export const TypeComponentSeparator: React.FC<TypeComponentSeparator.Props> = ({ className }) => {
    return <div className={cn(className, "h-px bg-border-default")} />;
};
