import { create } from "zustand";

interface MenuStore {
  isOpen: boolean;
  opemMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
}

export const useMenuStore = create<MenuStore>((set) => ({
  isOpen: false,
  opemMenu: () => set({ isOpen: true }),
  closeMenu: () => set({ isOpen: false }),
  toggleMenu: () => set((state) => ({ isOpen: !state.isOpen })),
}));
