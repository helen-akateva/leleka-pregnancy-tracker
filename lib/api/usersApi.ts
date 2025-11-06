import { User } from "@/types/user";
import { nextServerApi } from "./api";

export async function getUser(): Promise<User> {
  const res = await nextServerApi.get("/users/me");
  return res.data;
}
