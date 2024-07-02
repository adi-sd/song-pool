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
        <div className={twMerge("bg-white rounded-xl drop-shadow-lg p-10", className)}>
            <div className="text-4xl font-semibold text-green-500 mb-10">{title}</div>
            {children}
        </div>
    );
};
