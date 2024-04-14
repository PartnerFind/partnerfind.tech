import { Toaster } from "@/components/ui/toaster"

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      { children }
      <Toaster />
    </div>
  );
}