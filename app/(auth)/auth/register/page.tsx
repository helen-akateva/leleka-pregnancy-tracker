"use client";

import css from "./RegisterPage.module.css";
import { registerUser } from "@/lib/api/clientApi";
import { useState } from "react";
import { ApiError } from "@/lib/api/api";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    try {
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const userData = { name, email, password };
      const { data: statusCode } = await registerUser(userData);
      if (statusCode === 204) {
        router.push("/profile/edit");
      } else {
        setError("Bad request | Invalid body");
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
      <h1 className={css.formTitle}>Зареєструватись</h1>
      <form action={handleSubmit} className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="name">Ім&apos;я</label>
          <input
            id="name"
            type="text"
            name="name"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="email">Пошта</label>
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
          <label htmlFor="password">Пароль</label>
          <input
            id="password"
            type="password"
            name="password"
            autoComplete="new-password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Зареєструватись
          </button>
        </div>

        {error && (
          <p className={css.error}>
            {/* {"Виникла помилка(для розробників): бекенд повертає таку помилку "} */}
            {error}
          </p>
        )}
      </form>
    </main>
  );
}
