"use client";

import Image from "next/image";
import css from "./DiaryEntryDetails.module.css";
import { useSelectedNoteStore } from "@/lib/store/selectedNoteStore";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import React from "react";
import { DiaryNote, deleteNote } from "@/lib/api/diaryApi";
import { useNoteModalStore } from "@/lib/store/modalNoteStore";

export default function DiaryEntryDetails() {
  const selectedNote = useSelectedNoteStore((s) => s.selectedNote);
  const setSelectedNote = useSelectedNoteStore((s) => s.setSelectedNote);
  const openNoteModal = useNoteModalStore((s) => s.openNoteModal);

  const queryClient = useQueryClient();

  // якщо selectedNote є — беремо її. Інакше пробуємо знайти в кеші ["notes"].
  const noteFromCache: DiaryNote | undefined = React.useMemo(() => {
    if (selectedNote) return selectedNote;
    const notesData = queryClient.getQueryData<{ diaryNotes: DiaryNote[] }>([
      "notes",
    ]);
    return notesData?.diaryNotes?.find(Boolean);
  }, [selectedNote, queryClient]);

  const note = selectedNote ?? noteFromCache ?? null;

  // Мутація видалення нотатки
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onMutate: async (id: string) => {
      // оптимістичне оновлення кешу: видаляємо нотатку з локального кешу
      await queryClient.cancelQueries({ queryKey: ["notes"] });
      const previous = queryClient.getQueryData<{ diaryNotes: DiaryNote[] }>([
        "notes",
      ]);
      if (previous) {
        queryClient.setQueryData<{ diaryNotes: DiaryNote[] }>(["notes"], {
          ...previous,
          diaryNotes: previous.diaryNotes.filter((n) => n._id !== id),
        });
      }
      // якщо видалена була поточна вибрана нотатка — очищаємо selection
      if (selectedNote?._id === id) {
        setSelectedNote(null);
      }
      return { previous };
    },
    onError: (
      err: unknown,
      id: string,
      context?: { previous?: { diaryNotes: DiaryNote[] } }
    ) => {
      // відкат кешу у випадку помилки
      if (context?.previous) {
        queryClient.setQueryData(["notes"], context.previous);
      }
      // Тут можна логувати помилку або показати повідомлення користувачу
      console.error("Delete note failed", err);
    },
    onSettled: () => {
      // оновлюємо/перезапитуємо список нотаток після завершення
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleDelete = (id: string) => {
    if (!id) return;
    deleteMutation.mutate(id);
    setSelectedNote(null);
  };

  if (!note) {
    return null;
  }

  const handleEdit = (note: DiaryNote) => {
    setSelectedNote(note); // 1) поставити note в стор
    openNoteModal(); // 2) відкрити модалку
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
                  handleDelete(note._id);
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
    </section>
  );
}
