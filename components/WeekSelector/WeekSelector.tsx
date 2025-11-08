"use client";

import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import css from "./WeekSelector.module.css";

interface WeekSelectorProps {
  currentWeek: number;
  selectedWeek: number;
  onWeekChange: (week: number) => void;
}

export default function WeekSelector({
  currentWeek,
  selectedWeek,
  onWeekChange,
}: WeekSelectorProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const weeks = Array.from({ length: 42 }, (_, i) => i + 1);

  useEffect(() => {
    if (swiperRef.current && selectedWeek) {
      const index = weeks.indexOf(selectedWeek);
      if (index !== -1) {
        swiperRef.current.slideTo(index, 300);
      }
    }
  }, [selectedWeek, weeks]);

  return (
    <div className={css.weekSelectorContainer}>
      <Swiper
        modules={[Mousewheel]}
        slidesPerView="auto"
        spaceBetween={16}
        centeredSlides={false}
        mousewheel={{
          forceToAxis: true,
          releaseOnEdges: true,
          sensitivity: 1,
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;

          const index = weeks.indexOf(selectedWeek);
          if (index !== -1) {
            setTimeout(() => swiper.slideTo(index, 0), 100);
          }
        }}
      >
        {weeks.map((week) => {
          const isCurrent = week === currentWeek;
          const isSelected = week === selectedWeek;
          const isFuture = week > currentWeek;
          const isDisabled = isFuture;

          let buttonClass = css.weekButton;
          if (isSelected) {
            buttonClass = css.activatedButton;
          } else if (isCurrent) {
            buttonClass = css.currentButton;
          } else if (isDisabled) {
            buttonClass = css.disabledBtn;
          }

          return (
            <SwiperSlide key={week} className={css.weekSlide}>
              <button
                onClick={() => !isDisabled && onWeekChange(week)}
                disabled={isDisabled}
                className={buttonClass}
              >
                <p className={css.weekNumbers}>{week}</p>
                <p className={css.weekText}>Тиждень</p>
              </button>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
