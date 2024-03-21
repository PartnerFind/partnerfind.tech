import { AuthPageNavbar } from '@/components/auth-page-navbar';

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