"use client";

import { SignInButton as ClerkSignInButton, SignUpButton as ClerkSignUpButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function SignInAndSignUp() {
  return (
    <>
      <div>
        <ClerkSignInButton mode="modal">
          <div className="absolute right-[9.25rem]">
            <Button size="xlg" variant="ghost">
              Login
            </Button>
          </div>
        </ClerkSignInButton>

        <ClerkSignUpButton mode="modal">
          <div className="ml-auto flex justify-end">
            <Button size="xlg">Sign Up</Button>
          </div>
        </ClerkSignUpButton>
      </div>
    </>
  );
}
