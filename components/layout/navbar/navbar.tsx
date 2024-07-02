"use client";

import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";
import Image from "next/image";

// Styling
import { FaUserAlt } from "react-icons/fa";

// Components
import { useAuthModal } from "@/hooks/use-auth-modal";
import { Button } from "../../commons/button";
import { useUser } from "@/hooks/use-user";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = () => {
    const router = useRouter();
    const authModal = useAuthModal();
    const { user, userDetails } = useUser();

    const supabaseClient = useSupabaseClient();

    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut();
        router.refresh();
        if (error) {
            toast.error("An error occurred while logging out");
        } else {
            toast.success("Logged out successfully!");
        }
    };

    return (
        <div className="h-[80px] mb-10 flex items-center">
            {user ? (
                <span className="text-neutral-400 font-semibold text-[53px]">Hi, There...</span>
            ) : (
                <span className="text-neutral-400 font-semibold text-[53px]">
                    Hi There, To Continue Please Login to your Spotify Account...
                </span>
            )}
            <div className="ml-auto flex gap-x-4">
                {/* <Button className="text-3xl p-4 px-6" onClick={() => authModal.onOpen(false)}>
                    Log In
                </Button>
                <Button className="text-3xl p-4 px-6" onClick={() => authModal.onOpen(false)}>
                    Log Out
                </Button> */}

                {user ? (
                    <div className="flex gap-x-5 items-center">
                        <Button
                            onClick={() => {
                                router.push("/profile");
                            }}
                            className="flex items-center gap-x-3 px-7 py-5 text-3xl"
                        >
                            {userDetails?.avatar_url ? (
                                (console.log(userDetails.avatar_url),
                                (
                                    <Image
                                        className="rounded-full"
                                        src={userDetails.avatar_url}
                                        alt="Avatar Image"
                                        height={40}
                                        width={40}
                                    ></Image>
                                ))
                            ) : (
                                <FaUserAlt size={25}></FaUserAlt>
                            )}
                            <p>{userDetails?.full_name ? userDetails.full_name : "User Profile"}</p>
                        </Button>
                        <Button onClick={handleLogout} className="px-7 py-5 text-3xl">
                            Log Out
                        </Button>
                    </div>
                ) : (
                    <div className="flex gap-x-5 items-center">
                        <Button
                            onClick={() => {
                                authModal.onOpen(false);
                            }}
                            className="px-7 py-5 text-3xl"
                        >
                            Log In
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};
