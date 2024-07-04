"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Styling
import { FaUserAlt, FaSpotify } from "react-icons/fa";

// Components
import { Button } from "../../commons/button";

// Hooks
import { useAuthModal } from "@/hooks/use-auth-modal";

// Server Actions
import { spotifyLogin, spotifyLogOut } from "@/actions/handle-social-login";
import { twMerge } from "tailwind-merge";

interface NavBarProps {
    className?: string;
}

export const NavBar: React.FC<NavBarProps> = ({ className }) => {
    const router = useRouter();
    const authModal = useAuthModal();

    return (
        <div className={twMerge("h-10 w-full mb-16 flex items-center", className)}>
            <div className="w-full flex items-end justify-end">
                <div className="flex-1 mr-auto">
                    <h1 className="text-4xl font-semibold ">Hi There...</h1>
                </div>
                <form action={spotifyLogin}>
                    <Button
                        className="ml-3 px-7 py-5 text-3xl flex items-center "
                        type="submit"
                        name="action"
                        value="spotify"
                    >
                        <FaSpotify className="mr-3" size={35}></FaSpotify>
                        Spotify Login
                    </Button>
                </form>
                <form action={spotifyLogOut}>
                    <Button
                        className="ml-3 px-7 py-5 text-3xl flex items-center "
                        type="submit"
                        name="action"
                        value="spotify"
                    >
                        Logout
                    </Button>
                </form>
            </div>
        </div>
    );
};
