"use server";

import { redirect } from "next/navigation";
import { getMe } from "./apis/auth";
import { createOrder } from "./apis/order";
import { CreateOrderBody } from "@/types/order.type";

export async function getUser() {
  try {
    await getMe();
  } catch (error) {
    redirect("/login");
  }
}
