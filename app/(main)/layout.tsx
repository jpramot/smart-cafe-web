import "../globals.css";
import Footer from "@/components/layouts/footer";
import UserHeader from "@/components/layouts/user-header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <UserHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
