import { ClerkProvider } from '@clerk/nextjs'
import { twMerge } from "tailwind-merge";
import { Navbar } from "@/components/navbar";
import { SidebarNav } from "@/components/sidebar"
import "@/styles/globals.css";

import { fontSans } from "@/lib/fonts"

export const metadata = {
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const sidebarNavItems = [
  {
    title: "Explore Partners",
    href: "/explore",
  },
  {
    title: "My List",
    href: "/my-list",
  },
  {
    title: "Add Partner",
    href: "/add-partner",
  },
]

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
          <Navbar/> 
          <div style={{ display: 'flex'}}>
            <aside className="absolute z-10 w-1/5 h-full flex flex-col items-start justify-start"
              style={{ marginLeft: '0.69%', marginTop: '19%'}}>
              <SidebarNav items={sidebarNavItems} />
            </aside>
          </div>
          <main style={{ flex: 1 }}>
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
