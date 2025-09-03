import { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
// primereact core
import "primereact/resources/primereact.min.css";
// primereact theme (เลือกอันที่คุณใช้ เช่น saga-green, lara-light-blue, bootstrap4-dark-blue ฯลฯ)
import "primereact/resources/themes/lara-light-blue/theme.css";
// primeicons (ถ้ามีใช้ icons ด้วย)
import "primeicons/primeicons.css";

const poppin = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Smart Cafe - ร้านกาแฟอัจฉริยะ สั่งง่าย จ่ายสะดวก",
  description:
    "สัมผัสประสบการณ์ Smart Cafe ร้านกาแฟอัจฉริยะ สั่งเมนูโปรดง่าย ๆ ผ่านมือถือ พร้อมโปรโมชั่นพิเศษทุกวัน",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppin.className} bg-gray-50`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
