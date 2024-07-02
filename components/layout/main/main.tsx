import { ReactNode } from "react";

// Styling
import { twMerge } from "tailwind-merge";

interface MainProps {
    children: ReactNode;
    className?: string;
}

export const Main: React.FC<MainProps> = ({ children, className }) => {
    return <main className={twMerge(className)}>{children}</main>;
};
