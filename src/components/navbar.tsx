"use client"

import * as React from "react"
import { SignedIn, SignedOut } from '@clerk/nextjs'
import Link from "next/link";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu"
import UserButton from "@/components/user-button"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

import SignInAndSignUp from "@/components/signin-and-signup"

export function Navbar() {
    return (
        <>
            <div id="navbar" className="fixed top-6 left-0 p-4 flex justify-between w-full">
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
                            <UserButton/>
                        </SignedIn>
                        <SignedOut>
                            <SignInAndSignUp/>
                        </SignedOut>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .icon-text-margin {
                    margin-right: 7px; /* Adjust the margin as needed */
                    visibility: hidden; /* Hide the spacer element */
                }
            `}</style>
        </>
    );
}
