import { Navbar } from "@/components/navbar";

export const metadata = {
  title: "PartnerFind | Home"
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar/>
      { children }
    </div>
  );
}