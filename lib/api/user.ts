import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const api = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface User {
  _id: string;
  name: string;
  email: string;
  avatarUrl: string;
  dueDate: string;
  babyGender: "boy" | "girl" | "unknown";
  theme: "light" | "dark";
}

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const response = await api.get("/users/current");
    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні користувача:", error);
    return null;
  }
};
