"use client"

import * as React from "react"
import Link from "next/link";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu"
import { Button } from "./ui/button"

export function AuthPageNavbar() {
    return (
        <>
            <div id="navbar" className="absolute top-0 left-0 p-4">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Link href="/">
                                <Button size="xlg">Go Back Home</Button>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </>
    );
}