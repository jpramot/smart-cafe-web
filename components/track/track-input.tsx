"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TrackForm } from "@/types/track.type";
import { trackFormSchema } from "@/libs/schema/track.schema";
import CustomButton from "../ui/custom-button";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function TrackInput() {
  const pathName = usePathname();
  const oldSearch = useSearchParams();
  const router = useRouter();
  const { handleSubmit, register } = useForm<TrackForm>({ resolver: zodResolver(trackFormSchema) });

  const onSubmit = (data: TrackForm) => {
    const searchParams = new URLSearchParams(oldSearch);
    if (data.orderId.trim()) {
      searchParams.set("orderId", data.orderId);
    } else {
      searchParams.delete("orderId");
    }
    router.replace(`${pathName}?${searchParams.toString()}`);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 mb-8">
      <input
        type="text"
        placeholder="Enter your Order ID"
        {...register("orderId")}
        className="flex-1 border border-gray-300 px-3 py-2 rounded-md outline-none"
      />
      <CustomButton label="Track" icon={<Search className="h-4 w-4 mr-2" />} />
    </form>
  );
}
