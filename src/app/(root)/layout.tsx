import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import TopBar from "@/components/shared/TopBar";
import LeftSideBar from "@/components/shared/LeftSideBar";
import RightSideBar from "@/components/shared/RightSideBar";
import BottomBar from "@/components/shared/BottomBar";
import Gigificon from "@/components/shared/Gigificon";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GIGIFY",
  description: "W",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider signInFallbackRedirectUrl={"/"}
    signUpFallbackRedirectUrl={"/"}>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
           <TopBar />
          <main className=" flex flex-row">
            <LeftSideBar />
            <section className=" main-container">
              <div className=" w-full max-w-4xl">
                {children}
              </div>
              <Gigificon/>
            </section>
            <RightSideBar />
          </main>
          <BottomBar />
        </body>
      </html>
    </ClerkProvider>

  );
}
