"use client";

import { useSidebarStore } from "@/lib/store/sidebarStore";
import css from "./Header.module.css";
import Image from "next/image";

import Link from "next/link";

export default function Header() {
  const { toggleSidebar } = useSidebarStore();

  return (
    <header className={css.header}>
      <Link href="/" className={css.logo}>
        <Image src="/logo.svg" alt="Logo" width={24} height={24} />
        <Image src="/logotext.svg" alt="Logotext" width={49} height={11} />
      </Link>
      <button
        type="button"
        aria-label="Open menu"
        className={css.burgerBtn}
        onClick={toggleSidebar}
      >
        <Image src="/burger.svg" alt="Burger" width={32} height={32} />
      </button>
    </header>
  );
}
