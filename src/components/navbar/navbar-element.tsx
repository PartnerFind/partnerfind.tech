import Link from "next/link";

export default function NavBarElement(props: { link?: string; children: React.ReactNode }) {
  return (
    <Link
      href={props.link ?? ""}
      prefetch={false}
      className="flex items-center tracking-wider text-sm h-full font-light p-2 hover:text-white text-slate-300 transition-colors duration-500"
    >
      {props.children}
    </Link>
  );
}
