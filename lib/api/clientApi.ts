import { User, UserData } from "@/types/user";
import { nextServerApi } from "./api";

export interface SessionResponse {
  success: boolean;
}

interface UserRegisterData {
  name: string;
  email: string;
  password: string;
}

interface UserLoginData {
  email: string;
  password: string;
}

// Аутентифікація

export async function registerUser(userData: UserRegisterData) {
  const res = await nextServerApi.post("/auth/register", userData);
  console.log("Frontend responce :", res);
  return res;
}

export async function loginUser(userData: UserLoginData): Promise<User> {
  const res = await nextServerApi.post<User>("/auth/login", userData);
  console.log(res);
  return res.data;
}

export async function logoutUser(): Promise<void> {
  await nextServerApi.post("/auth/logout");
}

export async function getUser(): Promise<UserData> {
  const res = await nextServerApi.get("/users/current");
  return res.data;
}

export async function checkServerSession(): Promise<SessionResponse> {
  const res = await nextServerApi.get("/auth/session");
  return res.data;
}
