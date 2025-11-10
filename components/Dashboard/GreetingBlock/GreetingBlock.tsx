"use client";

import { useAuthStore } from "@/lib/store/authStore";
import css from "./GreetingBlock.module.css";

export default function GreetingBlock() {
  const { user } = useAuthStore();

  return (
    <div className={css.block}>
      <h2 className={css.title}>Доброго ранку, {user?.name}!</h2>
    </div>
  );
}
