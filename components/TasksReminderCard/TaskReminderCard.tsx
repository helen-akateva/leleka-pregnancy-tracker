"use client";

import { useState, useEffect } from "react";
import styles from "./TaskReminderCard.module.css";
import { Task } from "@/types/task";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { fetchTasks, TasksResponce } from "@/lib/api/taskApi";
import AddTaskModal from "../AddTaskModal/AddTaskModal";
import { useTaskModalStore } from "@/lib/store/taskModalStore";

export default function TaskReminderCard() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const { isOpen, openModal } = useTaskModalStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data } = useQuery<TasksResponce>({
    queryKey: ["tasks"],
    queryFn: () => fetchTasks({}),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  return (
    <div className={styles.page}>
      {/* ПРАВА КОЛОНКА */}
      <div className={styles.rightColumn}>
        {/* ВАЖЛИВІ ЗАВДАННЯ */}
        <section className={styles.section}>
          <h2>Важливі завдання</h2>
          <button onClick={() => openModal()}>+ Нове завдання</button>

          {loading && <p>Завантаження...</p>}
          {error && <p className={styles.error}>{error}</p>}

          <ul className={styles.taskList}>
            {tasks.map((t) => (
              <li key={t._id} className={styles.taskItem}>
                <span>{t.name}</span> —{" "}
                <span>{new Date(t.date).toLocaleDateString("uk-UA")}</span>
              </li>
            ))}
          </ul>
        </section>
        {isOpen && <AddTaskModal />}
      </div>
    </div>
  );
}

//
