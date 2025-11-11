"use client";

import styles from "./TaskReminderCard.module.css";
import { Task } from "@/types/task";
import {
  keepPreviousData,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { fetchTasks, updateTaskStatus } from "@/lib/api/taskApi";
import AddTaskModal from "../AddTaskModal/AddTaskModal";
import { useTaskModalStore } from "@/lib/store/taskModalStore";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";

export default function TaskReminderCard() {
  const { isOpen, openModal } = useTaskModalStore();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
    placeholderData: keepPreviousData,
  });

  const { mutate: toggleStatus, isPending } = useMutation({
    mutationFn: (task: Task) => updateTaskStatus(task._id, !task.isDone),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const handleBtnClick = () => {
    if (!user) {
      router.push("/auth/register");
    } else openModal();
  };

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h2>Важливі завдання</h2>
        <button onClick={handleBtnClick}>＋</button>
      </div>

      {isLoading && <p>Завантаження...</p>}
      {isError && <p>Помилка завантаження завдань 😢</p>}

      <ul className={styles.taskList}>
        {data?.tasks?.length ? (
          data.tasks.map((t) => (
            <li
              key={t._id}
              className={`${styles.taskItem} ${t.isDone ? styles.done : ""}`}
            >
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={t.isDone}
                  onChange={() => toggleStatus(t)}
                  disabled={isPending}
                />
                <span className={styles.customCheckbox}></span>
              </label>
              <div className={styles.taskText}>
                <span className={styles.taskDate}>
                  {new Date(t.date).toLocaleDateString("uk-UA", {
                    day: "2-digit",
                    month: "2-digit",
                  })}
                </span>
                <span className={styles.taskName}>{t.name}</span>
              </div>
            </li>
          ))
        ) : (
          <p className={styles.empty}>Немає завдань</p>
        )}
      </ul>

      {isOpen && <AddTaskModal />}
    </div>
  );
}
