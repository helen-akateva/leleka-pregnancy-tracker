import GreetingBlock from "@/components/DashboardPage/GreetingBlock/GreetingBlock";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <GreetingBlock />
      Сторінка Головна
    </div>
  );
}
