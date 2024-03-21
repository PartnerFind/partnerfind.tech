import { Navbar } from "@/components/navbar";

export const metadata = {
  title: "T3 Login",
  description: "Login system using T3"
};

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white">
      <Navbar/>
      {children}
    </div>
  );
}