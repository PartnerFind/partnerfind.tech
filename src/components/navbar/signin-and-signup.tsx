"use client";

import { SignInButton as ClerkSignInButton, SignUpButton as ClerkSignUpButton } from "@clerk/nextjs";
import { NavigationMenuItem } from "@radix-ui/react-navigation-menu";
import NavBarElement from "./navbar-element";

export default function SignInAndSignUp() {
  return (
    <>
      <div className="flex space-x-2">
        <ClerkSignInButton mode="modal">
          <NavigationMenuItem>
            <NavBarElement>Sign In</NavBarElement>
          </NavigationMenuItem>
        </ClerkSignInButton>

        <ClerkSignUpButton mode="modal">
          <NavigationMenuItem>
            <NavBarElement>Sign Up</NavBarElement>
          </NavigationMenuItem>
        </ClerkSignUpButton>
      </div>
    </>
  );
}
