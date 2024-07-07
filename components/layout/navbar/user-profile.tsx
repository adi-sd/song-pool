import React from "react";
import { User } from "next-auth";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import { Button } from "@/components/commons/button";
import Image from "next/image";

interface UserProfileProps {
    user: User;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
    const onSignOut = () => {
        signOut().catch((error) => toast.error("Error While Logging Out - " + (error as Error).message));
    };

    return (
        <div className="w-full flex items-center justify-between">
            <div className="flex-1 mr-auto flex items-center">
                <h1 className="text-4xl font-semibold">Welcome {user.name}!</h1>
            </div>
            <div className="flex items-center justify-between">
                <Button className="ml-3 px-7 py-5 text-3xl flex items-center gap-x-3">
                    {user.image ? (
                        <Image
                            src={user.image}
                            alt="Profile Image"
                            height={35}
                            width={35}
                            className="rounded-full"
                        ></Image>
                    ) : null}
                    <h1>{user.name ? user.name : "User Profile"}</h1>
                </Button>
                <Button
                    className="ml-3 px-7 py-5 text-3xl flex items-center "
                    type="submit"
                    name="action"
                    value="spotify"
                    onClick={onSignOut}
                >
                    Logout
                </Button>
            </div>
        </div>
    );
};
