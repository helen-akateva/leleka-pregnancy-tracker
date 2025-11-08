"use client";
import css from "./layout.module.css";
import SideBar from "@/components/MainLayout/SideBar/SideBar";
import Breadcrumbs from "@/components/MainLayout/Breadcrumbs/Breadcrumbs";
import Header from "@/components/MainLayout/Header/Header";
import { useWindowSize } from "@/hooks/useWindowsSize";
import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { width } = useWindowSize();
  return (
    <>
      {width < 1440 ? <Header /> : null}
      <main className={css["main"]}>
        {width >= 1440 ? <SideBar /> : null}
        <div className={css["main-content"]}>
          <Breadcrumbs />

          {children}
          <ConfirmationModal />
        </div>
      </main>
    </>
  );
}
