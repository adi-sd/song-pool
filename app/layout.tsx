import type { Metadata } from "next";

// Styling
import { Poppins } from "next/font/google";
import "./globals.css";

// Components
import { ContentWrapper } from "./components/layout/content-wrapper";

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
                <ContentWrapper>{children}</ContentWrapper>
            </body>
        </html>
    );
}
