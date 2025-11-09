"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { logoutUser } from "@/lib/api/clientApi";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      await queryClient.setQueryData(["currentUser"], undefined);

      toast.success("Ви вийшли з системи");
      router.push("/auth/login");
    },
    onError: () => {
      toast.error("Помилка при виході");
    },
  });
};
