import styles from "./page.module.css";
import StatusBlock from "@/components/Dashboard/StatusBlock/StatusBlock";
import BabyTodayCard from "@/components/Dashboard/BabyTodayCard/BabyTodayCard";
import MomTipCard from "@/components/Dashboard/MomTipCard/MomTipCard";
import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal";
import GreetingBlock from "@/components/Dashboard/GreetingBlock/GreetingBlock";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* <Header /> */}
        <GreetingBlock />
        <StatusBlock />
        <BabyTodayCard />
        <MomTipCard />
        <ConfirmationModal />
      </main>
    </div>
  );
}
