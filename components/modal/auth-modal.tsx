"use client";

// Components
import Modal from "../commons/modal";

import { useAuthModal } from "@/hooks/use-auth-modal";

export const AuthModal = () => {
    const { onClose, isOpen, isSignUp } = useAuthModal();

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
            Hey There
        </Modal>
    );
};
