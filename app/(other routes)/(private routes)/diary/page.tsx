"use client";

import GreetingBlock from "@/components/Dashboard/GreetingBlock/GreetingBlock";
import DiaryEntryDetails from "@/components/DiaryPage/DiaryEntryDetails/DiaryEntryDetails";
import DiaryList from "@/components/DiaryPage/DiaryList/DiaryList";
import css from "./DiaryPage.module.css";
import { useWindowSize } from "@/hooks/useWindowsSize";

export default function JourneyPage() {
  const { width } = useWindowSize();
  return (
    <div>
      <GreetingBlock />
      <div className={css.diary_wrapper}>
        <DiaryList />

        {width >= 1440 ? <DiaryEntryDetails /> : null}
      </div>
    </div>
  );
}
