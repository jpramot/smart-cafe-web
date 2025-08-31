"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TrackForm } from "@/types/track.type";
import { trackFormSchema } from "@/libs/schema/track.schema";
import CustomButton from "../ui/custom-button";
import { Search } from "lucide-react";

export default function TrackInput() {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<TrackForm>({ resolver: zodResolver(trackFormSchema) });

  const onSubmit = (data: TrackForm) => {
    console.log(data);
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
