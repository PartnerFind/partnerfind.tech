import { ClerkProvider } from '@clerk/nextjs'
import { twMerge } from "tailwind-merge";
import "@/styles/globals.css";

import { fontSans } from "@/lib/fonts"

export const metadata = {
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={twMerge(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}>
          <main>
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
