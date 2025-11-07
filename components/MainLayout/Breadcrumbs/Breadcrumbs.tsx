import Link from "next/link";
import css from "./Breadcrumbs.module.css";
import Image from "next/image";

export default function Breadcrumbs() {
  return (
    <div className={css["breadcrumb-block"]}>
      <Link href={"/"}>
        <p className={css["nav-link"]}>Лелека</p>
      </Link>
      <Image
        src="/chevron_right.svg"
        width={24}
        height={24}
        alt="arrow right"
      ></Image>
      <p className={`${css["nav-link"]} ${css.active}`}>Щоденник</p>
    </div>
  );
}
