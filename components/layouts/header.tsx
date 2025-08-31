import { Clock, Coffee, ShoppingCart } from "lucide-react";
import { Button } from "primereact/button";
import CustomButton from "../ui/custom-button";
import CustomLinkButton from "../ui/custom-link-button";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-100 w-full border-b  bg-white">
      <div className=" flex h-16 items-center justify-between px-6">
        <div className="">
          <Link href="/" className="flex items-center gap-2">
            <Coffee className="h-6 w-6 text-primary text-green-700" />
            <h1 className="text-xl font-bold text-foreground">Smart Café</h1>
          </Link>
        </div>
        <div className="flex  gap-4">
          {/* <CustomButton label="Track Order" icon={<Clock className="h-4 w-4 mr-2" />} /> */}
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
        </div>
      </div>
    </header>
  );
}
