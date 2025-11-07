import css from "./DiaryEntryCard.module.css";

export default function DiaryEntryCard() {
  return (
    <li className={css["diary-item"]}>
      <div className={css["diary-item-header"]}>
        <div className={css["diary-item-title"]}>Дивне бажання</div>
        <div className={css["diary-item-date"]}>9 липня 2025</div>
      </div>
      <div className={css["diary-item-emotion-list"]}>
        <div className={css["diary-item-emotion"]}>Дивні бажання</div>
        <div className={css["diary-item-emotion"]}>Любов</div>
        <div className={css["diary-item-emotion"]}>Любов</div>
        <div className={css["diary-item-emotion"]}>Любов</div>
        <div className={css["diary-item-emotion"]}>Любов</div>
        <div className={css["diary-item-emotion"]}>Любов</div>
        <div className={css["diary-item-emotion"]}>Любов</div>
        <div className={css["diary-item-emotion"]}>Любов</div>
      </div>
    </li>
  );
}
