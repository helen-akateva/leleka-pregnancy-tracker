"use client";

import { logoutUser } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import Link from "next/link";

export default function AuthNavigation() {
  const { user, isAuthenticated, clearIsAuthenticated } = useAuthStore();
  const handleLogout = async () => {
    await logoutUser();

    console.log("Виходим");
    clearIsAuthenticated();
  };

  return (
    <>
      Користувач: {!isAuthenticated && <p>Неваторизований Користувач</p>}
      {user && <p>{user.email}</p>}
      <Link href={"/auth/login"}>Увійти</Link>
      <p></p>
      <Link href={"/auth/register"}>Зареєструватись</Link>
      {isAuthenticated && <button onClick={handleLogout}>Вийти</button>}
    </>
  );
}
