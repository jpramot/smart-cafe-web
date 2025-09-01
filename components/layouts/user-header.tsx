"use client";
import { Clock, Coffee, ShoppingCart } from "lucide-react";
import CustomLinkButton from "../ui/custom-link-button";
import Link from "next/link";
import userStore from "@/hook/store/user-store";
import CustomButton from "../ui/custom-button";
import { useRouter } from "next/navigation";
import cartStore from "@/hook/store/cart-store";

export default function UserHeader() {
  const username = userStore((state) => state.username);
  const totalItems = cartStore((state) => state.cart.length);
  const logout = userStore((state) => state.logout);
  const router = useRouter();

  const hdlLogout = () => {
    logout();
    router.replace("/");
  };
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
          {username && (
            <CustomLinkButton
              label="Track Order"
              href="/track"
              icon={<Clock className="h-4 w-4 mr-2" />}
            />
          )}
          {username && (
            <CustomLinkButton
              label="Cart"
              href="/cart"
              icon={
                <div className="relative">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                      {totalItems}
                    </span>
                  )}
                </div>
              }
            />
          )}

          {username ? (
            <CustomButton
              label="Log out"
              className="p-button-outlined p-button-sm"
              click={hdlLogout}
            />
          ) : (
            <CustomLinkButton label="Login" href="/login" />
          )}
        </div>
      </div>
    </header>
  );
}
