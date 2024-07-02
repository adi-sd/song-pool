import type { Metadata } from "next";

// Styling
import { Poppins } from "next/font/google";
import "./globals.css";

// Components
import { SupabaseProvider } from "@/providers/supabase-provider";
import { ContentWrapper } from "../components/layout/content-wrapper";
import { UserProvider } from "@/providers/user-provider";
import ModalProvider from "@/providers/modal-provider";
import { ToastProvider } from "@/providers/toast-provider";

const popins = Poppins({ subsets: ["latin"], weight: ["200", "400", "600", "800", "900"] });

export const metadata: Metadata = {
    title: "song-pool",
    description: "A Collaborative Music Platform",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" type="image/x-icon" href="favicon.svg" />
            </head>
            <body className={popins.className}>
                <ToastProvider></ToastProvider>
                <SupabaseProvider>
                    <UserProvider>
                        <ModalProvider></ModalProvider>
                        <ContentWrapper>{children}</ContentWrapper>
                    </UserProvider>
                </SupabaseProvider>
            </body>
        </html>
    );
}
