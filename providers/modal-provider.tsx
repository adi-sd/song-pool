"use client";

import { useEffect, useState } from "react";
import { AuthModal } from "../components/modal/auth-modal";

interface ModalProviderProps {}

const ModalProvider: React.FC<ModalProviderProps> = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <>
            <AuthModal></AuthModal>
        </>
    );
};

export default ModalProvider;
