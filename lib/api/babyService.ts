import axios from "axios";
import type { BabyDataResponse } from "@/types/baby";

const API_URL = "https://lehlehka.b.goit.study";

export const getBabyData = async (): Promise<{ data: BabyDataResponse }> => {
  try {
    const response = await axios.get<BabyDataResponse>(
      `${API_URL}/weeks/greeting/public`,
      {
        headers: { Accept: "application/json" },
      }
    );
    return response;
  } catch (error) {
    console.error("Помилка при отриманні даних з бекенду:", error);
    throw error;
  }
};
