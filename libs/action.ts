"use server";

import { redirect } from "next/navigation";
import { getMe } from "./apis/auth";

export async function getUser() {
  try {
    await getMe();
  } catch (error) {
    redirect("/login");
  }
}
