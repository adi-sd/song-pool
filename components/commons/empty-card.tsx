import { ReactNode } from "react";

// Styling
import { twMerge } from "tailwind-merge";

interface EmptyCardProps {
    className?: string;
}

export const EmptyCard: React.FC<EmptyCardProps> = ({ className }) => {
    return (
        <div className={twMerge("bg-neutral-400/20 rounded-xl drop-shadow-lg p-10", className)}>
            <div className="text-xl font-semibold text-neutral-800/60 mb-10">Content Not Available...</div>
        </div>
    );
};
