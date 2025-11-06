import Breadcrumbs from "@/components/MainLayout/Breadcrumbs/Breadcrumbs";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Breadcrumbs />
        <p>`Головна сторінка за шляхом (/)</p>
      </main>
    </div>
  );
}
