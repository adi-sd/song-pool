"use client";

import { twMerge } from "tailwind-merge";
import { useSession } from "next-auth/react";

// Styling

// Components
import { LogIn } from "./log-in";
import { UserProfile } from "./user-profile";

// Miscellaneous

interface NavBarProps {
    className?: string;
}

export const NavBar: React.FC<NavBarProps> = ({ className }) => {
    const { data: session, status } = useSession();

    return (
        <div className={twMerge("h-10 w-full mb-16 flex items-center", className)}>
            {status === "authenticated" && session?.user ? (
                <UserProfile user={session.user}></UserProfile>
            ) : (
                <LogIn></LogIn>
            )}
        </div>
    );
};
