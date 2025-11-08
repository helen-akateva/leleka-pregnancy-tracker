"use client";

import { useQuery } from "@tanstack/react-query";

import css from "./GreetingBlock.module.css";
import { getCurrentUser } from "@/lib/api/user";

export default function GreetingBlock() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  if (isLoading) {
    return <p className={css.loading}>Loading...</p>;
  }

  if (isError || !data?.name) {
    return (
      <div className={css.block}>
        <p className={css.error}>Не вдалося завантажити ім&#39;я користувача</p>
      </div>
    );
  }
  return (
    <div className={css.block}>
      <h2 className={css.title}>Доброго ранку, {data?.name}!</h2>
    </div>
  );
}
