"use client";

import { SignInButton as ClerkSignInButton, SignUpButton as ClerkSignUpButton, useUser } from '@clerk/nextjs';
// import { Skeleton } from "@/components/ui/skeleton";
import { Button } from '@/components/ui/button';

export default function SignInAndSignUp() {
//   let { isLoaded } = useUser(); // TODO: Skeletons don't work on buttons yet

//   if (!isLoaded) {
//     return (
//         <>
//             <div className="absolute right-[8rem]">
//                 <Skeleton className="h-[12px] rounded-full"/>
//                 {/* <h1>skeleton</h1> */}
//             </div>

//             <div className="flex justify-end ml-auto">
//                 <Skeleton className="h-[12px] rounded-full"/>
//                 {/* <h1>skeleton</h1> */}
//             </div>
//         </>
//     )
//   }

  return (
    <>
        <div>
            <ClerkSignInButton>
                <div className="absolute right-[8rem]">
                    <Button size="xlg" variant="ghost">Login</Button>
                </div>
            </ClerkSignInButton>         

            <ClerkSignUpButton>
                <div className="flex justify-end ml-auto">
                    <Button size="xlg">Sign Up</Button>
                </div>
            </ClerkSignUpButton>
        </div>
    </>
  )
}