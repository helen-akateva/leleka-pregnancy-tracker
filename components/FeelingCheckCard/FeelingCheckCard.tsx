"use client";

import styles from "./FeelingCheckCard.module.css";

export default function FeelingCard() {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Як ви себе почуваєте?</h3>
      <p className={styles.subtitle}>Рекомендація на сьогодні:</p>
      <p className={styles.text}>Занотуйте незвичні відчуття у тілі.</p>
      <button className={styles.button}>Зробити запис у щоденник</button>
    </div>
  );
}
