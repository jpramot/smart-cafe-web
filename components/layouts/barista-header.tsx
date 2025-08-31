import { Clock, Coffee, ShoppingCart } from "lucide-react";
import Link from "next/link";
import CustomLinkButton from "../ui/custom-link-button";
import CustomButton from "../ui/custom-button";
import userStore from "@/hook/store/user-store";

export default function BaristaHeader() {
  const logout = userStore((state) => state.logout);
  return (
    <header className="sticky top-0 z-100 w-full border-b  bg-white">
      {/* <div className="">
          <Link href="/" className="flex items-center gap-2">
            <Coffee className="h-6 w-6 text-primary text-green-700" />
            <h1 className="text-xl font-bold text-foreground">Smart Café</h1>
          </Link>
        </div> */}
      {/* <div className="flex  gap-4">
          <CustomLinkButton
            label="Track Order"
            href="/track"
            icon={<Clock className="h-4 w-4 mr-2" />}
          />
          <CustomLinkButton
            label="Cart"
            href="/cart"
            icon={<ShoppingCart className="h-4 w-4 mr-2" />}
          />
          <CustomLinkButton label="Login" href="/login" />
          <CustomLinkButton label="Barista" href="/barista" />
        </div> */}
      <div className="flex h-16 items-center justify-between px-6">
        <h1 className="text-xl font-bold text-green-700">☕ Barista Dashboard</h1>
        <CustomButton label="Log out" className="p-button-outlined p-button-sm" click={logout} />
      </div>
    </header>
  );
}
