import { useState } from "react";
import styles from "./AddTaskModal.module.css";
import { useTaskModalStore } from "@/lib/store/taskModalStore";

export default function AddTaskModal() {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDate, setNewTaskDate] = useState("");
  const { isOpen, openModal, closeModal } = useTaskModalStore();

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const taskName = FormData;
  };

  return (
    <div className={styles.modalOverlay}>
      <form onSubmit={handleCreateTask} className={styles.modal}>
        <div className={styles.modalHeader}>
          <h3>Нове завдання</h3>
          <button
            type="button"
            className={styles.closeButton}
            onClick={() => closeModal()}
          >
            ✕
          </button>
        </div>

        <div>
          <label htmlFor="taskTitle">Назва завдання</label>
          <input
            id="taskTitle"
            type="text"
            placeholder="Прийняти вітаміни"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="taskDate">Дата</label>
          <input
            id="taskDate"
            type="date"
            value={newTaskDate}
            onChange={(e) => setNewTaskDate(e.target.value)}
            required
          />
        </div>

        <button type="submit" className={styles.createButton}>
          Зберегти
        </button>
      </form>
    </div>
  );
}
