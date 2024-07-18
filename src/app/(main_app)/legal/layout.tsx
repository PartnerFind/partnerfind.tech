import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal | PartnerFind",
};

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
