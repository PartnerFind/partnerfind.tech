import { ClerkProvider } from "@clerk/nextjs";
import "@/styles/globals.css";
import { Manrope } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          fontFamily: manrope.style.fontFamily,
        },
        elements: {
          modalContent: {
            fontFamily: "Manrope, sans-serif",
          },
        },
      }}
    >
      <html lang="en">
        <body>
          <div className={manrope.className}>
            <main>{children}</main>
            <Toaster />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
