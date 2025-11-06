import { cookies } from "next/headers";
import { nextServerApi } from "./api";

export async function checkServerSession() {
  const cookieStore = await cookies();
  const res = await nextServerApi.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
}
