import { ClerkProvider } from '@clerk/nextjs';
import { twMerge } from 'tailwind-merge';
import { Navbar } from '@/components/navbar';
import { SidebarNav } from '@/components/sidebar';
import '@/styles/globals.css';

import { fontSans } from '@/lib/fonts';

export const metadata = {
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

const sidebarNavItems = [
  {
    title: 'Explore',
    href: '/explore',
  },
  {
    title: 'My List',
    href: '/my-list',
  },
  {
    title: 'Add',
    href: '/add-partner',
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={twMerge(
            'min-h-screen bg-background font-sans antialiased',
            fontSans.variable
          )}
        >
          <Navbar />
          <div className="flex flex-col md:flex-row">
            <aside className="absolute z-10 top-24 md:top-28 lg:top-32 left-0 w-half ">
              <SidebarNav items={sidebarNavItems} />
            </aside>
            <main className="flex-1 mt-20 md:mt-5 lg:mt-0 lg:ml-20">{children}</main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
