"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { NavigationMenu, NavigationMenuList } from "@radix-ui/react-navigation-menu";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import { Menu } from "lucide-react";
import partnerfind from "public/image/android-chrome-512x512.png";
import Image from "next/image";
import Link from "next/link";

// Dynamically import components to avoid SSR mismatches
const UserButton = dynamic(() => import("@/components/user-button"), { ssr: false });
const SignInAndSignUp = dynamic(() => import("./signin-and-signup"), { ssr: false });
type NavLink = "/explore" | "/my-list" | "/add-partner" | "/legal/privacy-policy" | "/";

export function Navbar() {
  const [isMenuOut, setIsMenuOut] = useState(false);
  const pathname = usePathname();
  const isLinkActive = (href: NavLink) => pathname === href;

  return (
    <>
      <div
        className={`fixed z-40 top-0 left-0 bottom-0 right-0 bg-slate-800/50 backdrop-blur-xl w-full h-full transition-opacity duration-500 flex justify-center items-center flex-col space-y-8 ${isMenuOut ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => {
          setIsMenuOut(!isMenuOut);
        }}
      >
        <div className="flex space-x-4 items-center justify-center pb-16">
          <Link href="/" prefetch={false} className="flex items-center space-x-4">
            <Image
              src={partnerfind}
              alt="PartnerFind Logo"
              className="h-16 w-16 bg-white rounded-full"
              priority={true}
            />
            <div className="font-semibold text-6xl font-teachers">PartnerFind</div>
          </Link>
        </div>
        <Link
          href="/explore"
          prefetch={false}
          className={`text-4xl font-semibold ${isLinkActive("/explore") ? "text-white" : ""}`}
        >
          Explore
        </Link>
        <Link
          href="/my-list"
          prefetch={false}
          className={`text-4xl font-semibold ${isLinkActive("/my-list") ? "text-white" : ""}`}
        >
          My List
        </Link>
        <Link
          href="/add-partner"
          prefetch={false}
          className={`text-4xl font-semibold ${isLinkActive("/add-partner") ? "text-white" : ""}`}
        >
          Add Partner
        </Link>
        <Link
          href="/legal/privacy-policy"
          prefetch={false}
          className={`text-4xl font-semibold ${isLinkActive("/legal/privacy-policy") ? "text-white" : ""}`}
        >
          Privacy Policy
        </Link>
      </div>
      <NavigationMenu>
        <NavigationMenuList className="fixed top-0 right-0 left-0 flex justify-between h-16 bg-background backdrop-blur-lg md:px-12 px-2 border-b-2 border-gray-300">
          <div className="flex h-full space-x-4">
            <Link href="/" prefetch={false} className="flex items-center">
              <div className="flex items-center h-full">
                <div className="flex h-12 items-center p-2">
                  <Image src={partnerfind} priority alt="PartnerFind Logo" className="h-9 w-9 bg-white rounded-full" />
                </div>
                <span className="text-xl font-semibold font-teachers">PartnerFind</span>
              </div>
            </Link>

            <div className="md:w-fit w-0 flex space-x-4 overflow-clip">
              <Link
                href="/explore"
                prefetch={false}
                className={`flex items-center tracking-wider text-sm h-full font-light p-2 transition-colors duration-500 ${
                  isLinkActive("/explore") ? "text-white font-medium" : "text-slate-300 hover:text-white"
                }`}
              >
                Explore
              </Link>
              <Link
                prefetch={false}
                href="/my-list"
                className={`flex items-center tracking-wider text-sm h-full font-light p-2 transition-colors duration-500 ${
                  isLinkActive("/my-list") ? "text-white font-medium" : "text-slate-300 hover:text-white"
                }`}
              >
                My List
              </Link>
              <Link
                prefetch={false}
                href="/add-partner"
                className={`flex items-center tracking-wider text-sm h-full font-light p-2 transition-colors duration-500 ${
                  isLinkActive("/add-partner") ? "text-white font-medium" : "text-slate-300 hover:text-white"
                }`}
              >
                Add Partner
              </Link>
              <Link
                prefetch={false}
                href="/legal/privacy-policy"
                className={`flex items-center tracking-wider text-sm h-full font-light p-2 transition-colors duration-500 ${
                  isLinkActive("/legal/privacy-policy") ? "text-white font-medium" : "text-slate-300 hover:text-white"
                }`}
              >
                Privacy Policy
              </Link>
            </div>
          </div>
          <div className="flex h-full space-x-4 items-center p-3 text-sm">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInAndSignUp />
            </SignedOut>
            <button className="md:w-0 w-fit overflow-clip" onClick={() => setIsMenuOut(!isMenuOut)}>
              <Menu color={"#cbd5e1"} />
            </button>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
