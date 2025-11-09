"use client";

import { useQuery } from "@tanstack/react-query";

import css from "./StatusBlock.module.css";
import { getBabyData } from "@/lib/api/babyService";

export default function StatusBlock() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["babyData"],
    queryFn: getBabyData,
  });

  if (isLoading) {
    return <p className={css.loading}>Loading...</p>;
  }

  if (isError || !data?.data) {
    return (
      <div className={css.block}>
        <p className={css.error}>Не вдалося завантажити статус</p>
      </div>
    );
  }

  const { curWeekToPregnant, daysBeforePregnant } = data.data;

  return (
    <div className={css.block}>
      <p className={css.text}>Тиждень {curWeekToPregnant}</p>
      <p className={css.text}>Днів до зустрічі ~ {daysBeforePregnant}</p>
    </div>
  );
}
