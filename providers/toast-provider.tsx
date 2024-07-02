"use-client";

import { Toaster } from "react-hot-toast";

export const ToastProvider = () => {
    return (
        <Toaster
            toastOptions={{
                style: {
                    background: "#fff",
                    color: "#737373",
                    border: "#737373",
                },
            }}
        ></Toaster>
    );
};
