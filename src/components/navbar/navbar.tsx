"use client";

import { useState } from "react";
import NavBarElement from "./navbar-element";
import { NavigationMenu, NavigationMenuList } from "@radix-ui/react-navigation-menu";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import UserButton from "@/components/user-button";
import SignInAndSignUp from "./signin-and-signup";
import { Menu } from "lucide-react";
import partnerfind from "public/image/android-chrome-512x512.png";
import Image from "next/image";
import Link from "next/link";

export function Navbar() {
  const [isMenuOut, setIsMenuOut] = useState(false);

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
        <Link href="/explore" prefetch={false} className="text-4xl font-semibold">
          Explore
        </Link>
        <Link href="/my-list" prefetch={false} className="text-4xl font-semibold">
          My List
        </Link>
        <Link href="/add-partner" prefetch={false} className="text-4xl font-semibold">
          Add Partner
        </Link>
        <Link href="/legal/privacy-policy" prefetch={false} className="text-4xl font-semibold">
          Privacy Policy
        </Link>
      </div>
      <NavigationMenu>
      <NavigationMenuList className="fixed top-0 right-0 left-0 flex justify-between h-16 bg-background backdrop-blur-lg md:px-12 px-2 border-b-2 border-gray-300">
          <div className="flex h-full space-x-4">
            <Link href="/" prefetch={false} className="flex items-center">
              <div className="flex items-center h-full">
                <div className="flex h-12 items-center p-2">
                  <Image src={partnerfind} alt="PartnerFind Logo" className="h-9 w-9 bg-white rounded-full" />
                </div>
                <span className="text-xl font-semibold font-teachers">PartnerFind</span>
              </div>
            </Link>

            <div className="md:w-fit w-0 flex space-x-4 overflow-clip">
              <NavBarElement link="/explore">Explore</NavBarElement>
              <NavBarElement link="/my-list">My List</NavBarElement>
              <NavBarElement link="/add-partner">Add Partner</NavBarElement>
              <NavBarElement link="/legal/privacy-policy">Privacy Policy</NavBarElement>
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
