import { ReactNode } from "react";

// Styling
import { twMerge } from "tailwind-merge";

interface CardProps {
    children?: ReactNode;
    className?: string;
    title: string;
}

export const Card: React.FC<CardProps> = ({ children, className, title }) => {
    return (
        <div
            className={twMerge(
                "bg-white rounded-xl drop-shadow-lg p-10 h-full w-full flex flex-col gap-y-[2%]",
                className
            )}
        >
            <div className="w-full text-4xl font-semibold text-green-500 ">{title}</div>
            <div className="w-full flex-1">{children}</div>
        </div>
    );
};
