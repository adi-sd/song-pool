import type { Metadata } from "next";

// Styling
import { Poppins } from "next/font/google";
import "./globals.css";

// Components
import { ContentWrapper } from "../components/layout/content-wrapper";
import { ToastProvider } from "@/providers/toast-provider";
import { SessionProvider } from "next-auth/react";

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
                <link rel="icon" type="image/x-icon" href="/images/favicon.svg" />
            </head>
            <body className={popins.className}>
                <SessionProvider>
                    <ToastProvider></ToastProvider>
                    <ContentWrapper>{children}</ContentWrapper>
                </SessionProvider>
            </body>
        </html>
    );
}
