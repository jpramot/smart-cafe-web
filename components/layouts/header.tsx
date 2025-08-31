"use client";

import userStore from "@/hook/store/user-store";
import BaristaHeader from "./barista-header";
import { Role } from "@/enum/role";
import UserHeader from "./user-header";
import LayoutLoading from "./layout-loading";

export default function Header() {
  const role = userStore((state) => state.role);
  const isHydrated = userStore((state) => state.isHydrated);
  if (!isHydrated) {
    return <LayoutLoading />;
  }
  return (
    // <header className="sticky top-0 z-100 w-full border-b  bg-white">
    //   <div className=" flex h-16 items-center justify-between px-6">
    //     <div className="">
    //       <Link href="/" className="flex items-center gap-2">
    //         <Coffee className="h-6 w-6 text-primary text-green-700" />
    //         <h1 className="text-xl font-bold text-foreground">Smart Café</h1>
    //       </Link>
    //     </div>
    //     <div className="flex  gap-4">
    //       <CustomLinkButton
    //         label="Track Order"
    //         href="/track"
    //         icon={<Clock className="h-4 w-4 mr-2" />}
    //       />
    //       <CustomLinkButton
    //         label="Cart"
    //         href="/cart"
    //         icon={<ShoppingCart className="h-4 w-4 mr-2" />}
    //       />
    //       <CustomLinkButton label="Login" href="/login" />
    //       <CustomLinkButton label="Barista" href="/barista" />
    //     </div>
    //   </div>
    // </header>
    <>{role === Role.BARISTA ? <BaristaHeader /> : <UserHeader />}</>
  );
}
