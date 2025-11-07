"use client";

import { loginUser } from "@/lib/api/clientApi";
import css from "./LoginPage.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ApiError } from "@/lib/api/api";
import { useAuthStore } from "@/lib/store/authStore";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const { setUser } = useAuthStore();

  const handleSubmit = async (formData: FormData) => {
    try {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const userData = { email, password };
      const { user } = await loginUser(userData);
      if (user) {
        setUser(user);
        router.push("/");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          "Oops... some error"
      );
    }
  };

  return (
    <main className={css.mainContent}>
      <form action={handleSubmit} className={css.form}>
        <h1 className={css.formTitle}> Увійти</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            autoComplete="current-password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Увійти
          </button>
          Не має акаунту? <Link href={"/auth/register"}>Зареєструватись</Link>
        </div>

        <p className={css.error}>{error}</p>
      </form>
    </main>
  );
}
