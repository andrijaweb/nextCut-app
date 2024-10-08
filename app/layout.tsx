import type { Metadata } from "next";
import { Karla } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";

const fontSans = Karla({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    template: "%s | NextCut",
    default: "Welcome | NextCut",
  },
  description: "NextCut is an application for haircut appointments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-dark-300 text-white font-sans antialiased",
          fontSans.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
