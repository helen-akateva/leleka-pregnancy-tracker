import Link from "next/link";
import css from "./SideBar.module.css";
import AuthNavigation from "@/components/AuthNavigation/AuthNavigation";

export default function SideBar() {
  return (
    <div className={css["sidebar-container"]}>
      <div className={css["menu-top"]}>Логотип</div>
      <div className={css["menu-wrapper"]}>
        <ul>
          <li>
            <Link href={"/"}>Мій день</Link>
          </li>
          <li>
            <Link href={`/journey/1`}>Подорож</Link>
          </li>
          <li>
            <Link href={"/diary"}>Щоденник</Link>
          </li>
          <li>
            <Link href={"/profile"}>Профіль</Link>
          </li>
        </ul>
      </div>
      <div className={css["menu-bottom"]}>
        <AuthNavigation />
      </div>
    </div>
  );
}
