import BaristaHeader from "@/components/layouts/barista-header";
import Footer from "@/components/layouts/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <BaristaHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
