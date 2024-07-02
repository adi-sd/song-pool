import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface BoxProps {
    children: ReactNode;
    className?: string;
    title?: string;
}

export const Box: React.FC<BoxProps> = ({ children, className, title }) => {
    return (
        <div className={twMerge("text-neutral-400 text-[30px] flex flex-col gap-y-2 pl-9", className)}>
            {title ? <span className="font-normal text-[25px] mb-2">{title.toUpperCase()}</span> : null}
            <>{children}</>
        </div>
    );
};
