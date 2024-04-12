import { Navbar } from "@/components/navbar";

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      { children }
    </div>
  );
}