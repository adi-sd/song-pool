import React from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { FaSpotify } from "react-icons/fa";

// Components
import { Button } from "../../commons/button";
import { AUTHENTICATED_USER_REDIRECT } from "../../../routes/routes";

interface LogInProps {}

export const LogIn: React.FC<LogInProps> = () => {
    const onSignIn = () => {
        signIn("spotify", {
            callbackUrl: AUTHENTICATED_USER_REDIRECT,
        }).catch((error) => toast.error("Error While Logging In - " + (error as Error).message));
    };

    return (
        <div className="w-full flex items-center justify-between">
            <div className="flex-1 mr-auto flex items-center">
                <h1 className="text-4xl font-semibold">Hi There, Please login to your Spotify Account!</h1>
            </div>
            <div className="flex items-center justify-between">
                <Button
                    className="ml-3 px-7 py-5 text-3xl flex items-center "
                    type="submit"
                    name="action"
                    value="spotify"
                    onClick={onSignIn}
                >
                    <FaSpotify className="mr-3" size={35}></FaSpotify>
                    Spotify Login
                </Button>
            </div>
        </div>
    );
};
