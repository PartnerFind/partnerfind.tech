"use client"

import * as React from "react"
import { SignedIn, SignedOut } from '@clerk/nextjs'
import Link from "next/link";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu"
import UserButton from "@/components/user-button"
import { Button } from "./ui/button"

import SignInAndSignUp from "@/components/signin-and-signup"

export function Navbar() {
    return (
        <>
            <div id="navbar" className="absolute top-0 p-4 w-full flex justify-between items-center">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <div>
                                <div className="flex items-center">
                                    <Link href="/">
                                        <Button size="xlg">Home</Button>
                                    </Link>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <SignedIn>
                                    <UserButton/>
                                </SignedIn>
                                <SignedOut>
                                    <SignInAndSignUp/>
                                </SignedOut>
                            </div>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </>
    );
}