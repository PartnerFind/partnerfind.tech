import { AuthPageNavbar } from '@/components/auth-page-navbar';

export const metadata = {
  title: "PartnerFind | Auth"
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white">
        <AuthPageNavbar/>
        {children}
    </div>
  );
}