"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

// Components
import Modal from "../commons/modal";

import { useAuthModal } from "@/hooks/use-auth-modal";

export const AuthModal = () => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const { session } = useSessionContext();
    const { onClose, isOpen, isSignUp } = useAuthModal();

    useEffect(() => {
        if (session) {
            router.refresh();
            onClose();
        }
    }, [session, router, onClose]);

    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    };

    const getDescription = () => {
        if (isSignUp) {
            return "Sign up for a new Spotify account.";
        } else {
            return "Login to your Spotify account.";
        }
    };

    return (
        <Modal title="Welcome Back!" description={getDescription()} isOpen={isOpen} onChange={onChange}>
            <Auth
                theme="light"
                view={isSignUp ? "sign_up" : "sign_in"}
                supabaseClient={supabaseClient}
                providers={["spotify"]}
                providerScopes={{
                    spotify: process.env.SPOTIFY_AUTH_SCOPE,
                }}
                appearance={{
                    theme: ThemeSupa,
                    variables: {
                        default: {
                            colors: {
                                brand: "#EEEDEB",
                                brandAccent: "#EEEDEB",
                            },
                            fontSizes: {
                                baseButtonSize: "20px",
                            },
                            borderWidths: {
                                buttonBorderWidth: "3px",
                            },
                            radii: {
                                borderRadiusButton: "15px",
                            },
                        },
                    },
                }}
                onlyThirdPartyProviders
            ></Auth>
        </Modal>
    );
};
