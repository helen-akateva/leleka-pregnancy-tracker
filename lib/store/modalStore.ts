import { create } from "zustand";

interface ModalOptions {
  title: string;
  confirmBtnText: string;
  canceleBtnText: string;
  onConfirm: () => Promise<void> | void;
}

interface ModalState {
  isOpen: boolean;
  options?: ModalOptions;
  openModal: (options: ModalOptions) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  options: undefined,
  openModal: (options) => set({ isOpen: true, options }),
  closeModal: () => set({ isOpen: false, options: undefined }),
}));
