"use client";

import { useQuery } from "@tanstack/react-query";

import css from "./JourneyDetails.module.css";
import { useJourneyStore } from "@/lib/store/journeyStore";
import { getBabyDetails, getMomDetails } from "@/lib/api/clientApi";
import MomTab from "../MomTab/MomTab";
import BabyTab from "../BabyTab/BabyTab";

interface JourneyDetailsProps {
  weekNumber: number;
}

export default function JourneyDetails({ weekNumber }: JourneyDetailsProps) {
  const { activeTab, setActiveTab } = useJourneyStore();

  const {
    data: babyData,
    isLoading: babyLoading,
    error: babyError,
  } = useQuery({
    queryKey: ["baby", weekNumber],
    queryFn: () => getBabyDetails(weekNumber),
    enabled: activeTab === "baby" && weekNumber > 0,
    staleTime: 5 * 60 * 1000,
  });

  const {
    data: momData,
    isLoading: momLoading,
    error: momError,
  } = useQuery({
    queryKey: ["mom", weekNumber],
    queryFn: () => getMomDetails(weekNumber),
    enabled: activeTab === "mom" && weekNumber > 0,
    staleTime: 5 * 60 * 1000,
  });

  const isLoading = activeTab === "baby" ? babyLoading : momLoading;
  const error = activeTab === "baby" ? babyError : momError;

  return (
    <section className={css.journeyDetailsSection}>
      <div className={css.tabsContainer}>
        <button
          onClick={() => setActiveTab("baby")}
          className={activeTab === "baby" ? css.tabButtonActive : css.tabButton}
        >
          Розвиток малюка
        </button>
        <button
          onClick={() => setActiveTab("mom")}
          className={activeTab === "mom" ? css.tabButtonActive : css.tabButton}
        >
          Тіло мами
        </button>
      </div>

      {isLoading && (
        <div className={css.loaderContainer}>
          <div className={css.spinner} />
        </div>
      )}

      {error && (
        <div className={css.errorMessage}>
          Помилка завантаження даних. Спробуйте ще раз.
        </div>
      )}

      {!isLoading && !error && (
        <>
          {activeTab === "baby" && babyData && <BabyTab data={babyData} />}
          {activeTab === "mom" && momData && <MomTab data={momData} />}
        </>
      )}
    </section>
  );
}
