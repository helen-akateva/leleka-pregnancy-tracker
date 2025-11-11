"use client";
import AddDiaryEntryForm from "@/components/AddDiaryEntryForm/AddDiaryEntryForm";
import AddDiaryEntryModal from "@/components/AddDiaryEntryModal/AddDiaryEntryModal";
import DiaryEntryDetails from "@/components/DiaryPage/DiaryEntryDetails/DiaryEntryDetails";
import { useNoteModalStore } from "@/lib/store/modalNoteStore";
import { useSelectedNoteStore } from "@/lib/store/selectedNoteStore";

export default function CardDetailPage() {
  const { isOpen, closeNoteModal } = useNoteModalStore();
  const selectedNote = useSelectedNoteStore((s) => s.selectedNote);

  return (
    <>
      {" "}
      <DiaryEntryDetails />{" "}
      {isOpen && (
        <AddDiaryEntryModal
          onClose={() => {
            closeNoteModal();
            useSelectedNoteStore.getState().setSelectedNote(null);
          }}
        >
          <AddDiaryEntryForm editingNote={selectedNote ?? null} />
        </AddDiaryEntryModal>
      )}
    </>
  );
}
