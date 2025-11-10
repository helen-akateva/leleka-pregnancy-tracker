import { Task } from "@/types/task";
import { nextServerApi } from "./api";

export interface TasksResponce {
  tasks: Task[];
  totalCount: number;
  totalPages: number;
  page: number;
}

// GET /tasks
export async function fetchTasks(): Promise<TasksResponce> {
  const res = await nextServerApi.get("/tasks");
  return res.data;
}

// POST /tasks
export interface CreateTaskBody {
  name: string;
  date: string;
}

export async function createTask(body: CreateTaskBody): Promise<Task> {
  const res = await nextServerApi.post("/tasks", body);
  if (res.status !== 201) {
    throw new Error("Не вдалося створити завдання");
  }
  return res.data;
}

// PATCH /tasks/status/{taskId}
export async function updateTaskStatus(
  taskId: string,
  isDone: boolean
): Promise<Task> {
  const res = await nextServerApi.patch(`/tasks/status/${taskId}`, { isDone });
  if (res.status !== 200) {
    throw new Error("Не вдалося оновити статус завдання");
  }
  return res.data;
}
