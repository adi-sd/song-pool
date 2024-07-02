import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, className, disabled, type = "button", ...props }, ref) => {
        return (
            <button
                type={type}
                className={twMerge(
                    "rounded-full bg-green-500 border-transparent p-3 disabled:cursor-not-allowed disabled:opacity-50 text-black font-semibold hover:opacity-75 transition text-nowrap h-full",
                    className
                )}
                disabled={disabled}
                ref={ref}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";
