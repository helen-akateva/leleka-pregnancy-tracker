"use client";

import { useEffect, useRef, useState } from "react";
import { uploadImage } from "@/lib/api/clientApi";
import { ApiError } from "next/dist/server/api-utils";

import { useAuthStore } from "@/lib/store/authStore";
import Image from "next/image";
import css from "./ProfileAvatar.module.css";

export default function ProfileAvatar() {
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const [localAvatar, setLocalAvatar] = useState<string | null>(
    user?.avatarUrl ?? null
  );

  useEffect(() => {
    if (user?.avatarUrl) {
      queueMicrotask(() => setLocalAvatar(user.avatarUrl));
    }
  }, [user?.avatarUrl]);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setLocalAvatar(previewUrl);
      try {
        const response = await uploadImage(file);

        const updatedUser = response?.user;

        if (updatedUser?.avatarUrl) {
          setUser({ ...user, ...updatedUser });
          setLocalAvatar(updatedUser.avatarUrl);
          setError("");
        } else {
          // setError("Не вдалося отримати оновлений аватар");
        }
      } catch (err) {
        console.error(err);
        setError((err as ApiError)?.message || "Не вдалося завантажити фото");
      }
    }
  };
  return (
    <div className={css.container}>
      <div className={css.avatarImage}>
        <Image
          src={
            localAvatar ??
            user?.avatarUrl ??
            "https://ftp.goit.study/img/common/women-default-avatar.jpg"
          }
          height={132}
          width={132}
          alt="user avatar"
        />
      </div>

      <div className={css.userInfo}>
        <div className={css.userName}>{user?.name ?? "Користувач"}</div>
        <div className={css.userEmail}>{user?.email ?? "Немає пошти"}</div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        <button onClick={handleButtonClick} className={css.downloadAvatar}>
          Завантажити нове фото
        </button>

        {error && <p className={css.error}>{error}</p>}
      </div>
    </div>
  );
}
