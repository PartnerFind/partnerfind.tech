import { Navbar } from "@/components/navbar";
import { SidebarNav } from "@/components/sidebar";

export const metadata = {
  title: "PartnerFind | Home",
};

const sidebarNavItems = [
  {
    title: "Explore",
    href: "/explore",
  },
  {
    title: "My List",
    href: "/my-list",
  },
  {
    title: "Add",
    href: "/add-partner",
  },
  {
    title: "Privacy Policy",
    href: "/legal/privacy-policy",
  },
];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div>
        <Navbar />
        <div className="flex flex-col md:flex-row">
          <aside className="w-half absolute left-0 top-24 z-10 md:top-28 lg:top-32 ">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="mt-20 flex-1 md:mt-5 lg:ml-20 lg:mt-0">{children}</div>
        </div>
      </div>
    </>
  );
}
