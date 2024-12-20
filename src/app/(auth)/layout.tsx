import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"
import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
    title: "GIGIFY",
    description: "W"
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <ClerkProvider >

                <body className={` ${inter.className} bg-dark-1`}>
                    {children}
                </body>


            </ClerkProvider>
        </html>
    )
}