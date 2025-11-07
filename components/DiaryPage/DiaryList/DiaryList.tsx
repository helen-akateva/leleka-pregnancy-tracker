"use client";

import Image from "next/image";
import css from "./DiaryList.module.css";
import DiaryEntryCard from "../DiaryEntryCard/DiaryEntryCard";

export default function DiaryList() {
  return (
    <section className={css["diary-list-container"]}>
      <div className={css["diary-list-block"]}>
        <div className={css["diary-list-header"]}>
          <div className={css["diary-header-left-content"]}>Ваші записи</div>
          <div className={css["diary-header-right-content"]}>
            <div>Новий запис</div>
            <Image
              src="/add_icon.svg"
              width={24}
              height={24}
              alt="add icon"
              onClick={() => {
                console.log("mene najali");
              }}
            ></Image>
          </div>
        </div>
        <ul className={css["diary-list"]}>
          <DiaryEntryCard />
          <DiaryEntryCard />
          <DiaryEntryCard />
          <DiaryEntryCard />
        </ul>
      </div>
    </section>
  );
}
