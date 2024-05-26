"use client";

import * as React from "react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import UserButton from "@/components/user-button";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

import SignInAndSignUp from "@/components/signin-and-signup";

export function Navbar() {
  const [isNavbarVisible, setIsNavbarVisible] = React.useState(true);

  React.useEffect(() => {
    let prevScrollPos = window.scrollY;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isVisible = prevScrollPos > currentScrollPos || currentScrollPos < 100;
      setIsNavbarVisible(isVisible);
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        id="navbar"
        className={`fixed top-6 left-0 right-0 p-4 flex justify-between items-center transition-opacity duration-300 ${isNavbarVisible ? "opacity-100" : "opacity-0"}`}
      >
        <div>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/">
                  <Button size="xlg">
                    <Home />
                    <span className="icon-text-margin"></span> {/* Spacer element */}
                    Home
                  </Button>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center">
          <div className="ml-4">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInAndSignUp />
            </SignedOut>
          </div>
        </div>
      </div>

      <style jsx>{`
        .icon-text-margin {
          margin-right: 7px; /* Adjust the margin as needed */
          visibility: hidden; /* Hide the spacer element */
        }
        @media (max-width: 768px) {
          #navbar {
            padding-left: 16px;
            padding-right: 16px;
          }
        }
      `}</style>
    </>
  );
}
