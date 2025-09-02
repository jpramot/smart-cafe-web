"use client";

import { useRouter } from "next/navigation";
import CustomButton from "../ui/custom-button";
import userStore from "@/hook/store/user-store";
import { Role } from "@/enum/role";
import { useEffect } from "react";

export default function BaristaHeader() {
  const logout = userStore((state) => state.logout);
  const role = userStore((state) => state.role);
  const router = useRouter();

  const hdlLogout = () => {
    logout();
    router.replace("/");
  };

  useEffect(() => {
    if (role !== Role.BARISTA) {
      router.replace("/");
    }
  }, [role]);

  return (
    <header className="sticky top-0 z-100 w-full border-b  bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        <h1 className="text-xl font-bold text-green-700">☕ Barista Dashboard</h1>
        <CustomButton label="Log out" className="p-button-outlined p-button-sm" click={hdlLogout} />
      </div>
    </header>
  );
}
