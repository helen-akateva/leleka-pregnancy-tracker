import styles from "./page.module.css";
import StatusBlock from "@/components/Dashboard/StatusBlock/StatusBlock";
import BabyTodayCard from "@/components/Dashboard/BabyTodayCard/BabyTodayCard";
import MomTipCard from "@/components/Dashboard/MomTipCard/MomTipCard";
import GreetingBlock from "@/components/Dashboard/GreetingBlock/GreetingBlock";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.greetingstatus}>
          <GreetingBlock />
          <StatusBlock />
        </div>
        <div className={styles.babytodaymomtip}>
          <BabyTodayCard />
          <MomTipCard />
        </div>
      </main>
    </div>
  );
}
