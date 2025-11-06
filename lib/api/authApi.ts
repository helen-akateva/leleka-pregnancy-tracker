import { nextServerApi } from "./api";

export interface SessionResponse {
  success: boolean;
}

export async function checkServerSession(): Promise<SessionResponse> {
  const res = await nextServerApi.get("/auth/session");
  return res.data;
}
