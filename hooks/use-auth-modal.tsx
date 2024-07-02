import { create } from "zustand";

interface AuthModalStore {
    isOpen: boolean;
    isSignUp: boolean;
    onOpen: (signUp: boolean) => void;
    onClose: () => void;
}

export const useAuthModal = create<AuthModalStore>((set) => ({
    isOpen: false,
    isSignUp: false,
    onOpen: (signUp: boolean) => set({ isOpen: true, isSignUp: signUp }),
    onClose: () => set({ isOpen: false }),
}));
