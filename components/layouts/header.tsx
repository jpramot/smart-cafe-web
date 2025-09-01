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
  return <>{role === Role.BARISTA ? <BaristaHeader /> : <UserHeader />}</>;
}
