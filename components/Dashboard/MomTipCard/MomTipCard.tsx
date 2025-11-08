"use client";

import { useQuery } from "@tanstack/react-query";

import css from "./MomTipCard.module.css";
import { getBabyData } from "@/lib/api/babyService";

export default function MomTipCard() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["babyData"],
    queryFn: getBabyData,
  });

  if (isLoading) {
    return <p className={css.loading}>Loading...</p>;
  }

  if (isError || !data?.data?.momHint) {
    return (
      <div className={css.card}>
        <p className={css.error}>Не вдалося завантажити пораду 😔</p>
      </div>
    );
  }

  const momHint = data.data.momHint;

  return (
    <div className={css.card}>
      <p className={css.text}>{momHint}</p>
    </div>
  );
}
