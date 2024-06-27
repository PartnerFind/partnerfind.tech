import { Navbar } from "@/components/navbar/navbar";

export const metadata = {
  title: "PartnerFind | Home",
};

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className={`dark:bg-background overflow-clip`}>
        <div id="navbar" className="fixed top-0 right-0 left-0 w-full z-50">
          <Navbar />
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="mt-20 flex-1 md:mt-5 lg:ml-20 lg:mt-0">{children}</div>
        </div>
      </div>
    </>
  );
}
