"use client";

import Image from "next/image";
import css from "./DiaryEntryDetails.module.css";
import { useSelectedNoteStore } from "@/lib/store/selectedNoteStore";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { DiaryNote, deleteNote } from "@/lib/api/diaryApi";
import { useNoteModalStore } from "@/lib/store/modalNoteStore";
import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal";
import { useRouter } from "next/navigation";

export default function DiaryEntryDetails() {
  const selectedNote = useSelectedNoteStore((s) => s.selectedNote);
  const setSelectedNote = useSelectedNoteStore((s) => s.setSelectedNote);
  const openNoteModal = useNoteModalStore((s) => s.openNoteModal);
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  const note = selectedNote ?? null;

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["notes"] });

      if (selectedNote?._id === id) {
        setSelectedNote(null);
      }
      return <></>;
    },
    onError: (err: unknown) => {
      console.error("Delete note failed", err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      useSelectedNoteStore.getState().setSelectedNote(null);
      router.replace("/diary");
    },
  });
  if (!note) {
    return null;
  }
  const handleDelete = (id: string) => {
    if (!id) return;
    deleteMutation.mutate(id);
    setSelectedNote(null);
  };
  const handleConfirm = () => {
    handleDelete(note._id);
    setIsOpen(false);
  };

  const handleEdit = (note: DiaryNote) => {
    setSelectedNote(note);
    openNoteModal();
  };

  return (
    <section className={css["diary-details-container"]}>
      <div className={css["diary-details-block"]}>
        <div className={css["diary-details-header"]}>
          <div className={css["diary-details-header-wrapper"]}>
            <div className={css["diary-details-title"]}>
              {note.title}
              <Image
                src="/edit_icon.svg"
                width={24}
                height={24}
                alt="edit"
                className={css["edit-icon"]}
                onClick={() => {
                  handleEdit(note);
                }}
              />
            </div>
            <div className={css["diary-details-date"]}>
              {note.date}
              <Image
                src="/delete_icon.svg"
                width={24}
                height={24}
                alt="delete"
                className={css["delete-icon"]}
                onClick={() => {
                  setIsOpen(true);
                }}
              />
            </div>
          </div>

          <div className={css["diary-details-content"]}>{note.description}</div>

          <div className={css["diary-details-emotions"]}>
            <ul className={css["diary-details-emotions-list"]}>
              {note.emotions.map((e) => (
                <li key={e._id} className={css["diary-details-emotions-item"]}>
                  {e.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isOpen}
        title="Ви дійсно хочете видалити нотатку?"
        confirmBtnText="Так, видаляємо"
        cancelBtnText="Ні, залишаємо"
        onCancel={() => setIsOpen(false)}
        onConfirm={handleConfirm}
      />
    </section>
  );
}
