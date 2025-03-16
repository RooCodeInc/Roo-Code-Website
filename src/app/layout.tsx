import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Roo Code – Your AI-Powered Dev Team in VS Code",
    description: "Roo Code puts an entire AI dev team right in your editor, outpacing closed tools with deep project-wide context, multi-step agentic coding, and unmatched developer-centric flexibility.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                {/* google site name: https://developers.google.com/search/docs/appearance/site-names */}
                <div itemScope itemType="https://schema.org/WebSite">
                    <link itemProp="url" href="https://roocode.com" />
                    <meta itemProp="name" content="Roo Code" />
                </div>
                <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
