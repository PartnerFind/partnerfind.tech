import { ClerkProvider } from "@clerk/nextjs";
import "@/styles/globals.css";
import { fontSans } from "@/lib/fonts";
import { twMerge } from "tailwind-merge";

export const metadata = {
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <div className={twMerge("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
            <main>{children}</main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
