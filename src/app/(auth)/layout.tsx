import { AuthPageNavbar } from "@/components/auth-page-navbar";
import { Manrope } from "next/font/google";
import { twMerge } from "tailwind-merge";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "PartnerFind | Auth",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={twMerge("bg-white", manrope.className)}>
      <AuthPageNavbar />
      {children}
    </div>
  );
}
