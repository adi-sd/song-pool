import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";

// Components
import Navbar from "./components/navbar/navbar";
import Main from "./components/main/main";
import SessionWrapper from "./components/session-wrapper/session-wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "song-pool",
    description: "A Communal Music Player",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SessionWrapper>
            <html lang="en" suppressHydrationWarning>
                <head>
                    <link rel="icon" href="/favicon.svg" sizes="any" />
                </head>
                <body className={inter.className}>
                    <Navbar></Navbar>
                    <Main></Main>
                </body>
            </html>
        </SessionWrapper>
    );
}
