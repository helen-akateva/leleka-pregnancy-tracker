import styles from "./page.module.css";
import StatusBlock from "@/components/Dashboard/StatusBlock/StatusBlock";
import BabyTodayCard from "@/components/Dashboard/BabyTodayCard/BabyTodayCard";
import MomTipCard from "@/components/Dashboard/MomTipCard/MomTipCard";
import GreetingBlock from "@/components/Dashboard/GreetingBlock/GreetingBlock";
import TaskReminderCard from "@/components/TasksReminderCard/TaskReminderCard";
import FeelingCard from "@/components/FeelingCheckCard/FeelingCheckCard";

export default function DashboardPage() {
  return (
    <div className={styles.page}>
      <GreetingBlock />
      <div className={styles.main}>
        <div>
          <div className={styles.greetingstatus}>
            <StatusBlock />
          </div>
          <div className={styles.babytodaymomtip}>
            <BabyTodayCard />
            <MomTipCard />
          </div>
        </div>
        <div className={styles.right_block}>
          <TaskReminderCard />
          <FeelingCard />
        </div>
      </div>
    </div>
  );
}
