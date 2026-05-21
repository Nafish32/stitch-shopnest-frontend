import { create } from "zustand";

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  tone?: "success" | "error" | "info";
}

interface UiState {
  toasts: ToastMessage[];
  modalId?: string;
  isMobileMenuOpen: boolean;
  isFilterOpen: boolean;
  showToast: (toast: Omit<ToastMessage, "id">) => void;
  dismissToast: (id: string) => void;
  openModal: (id: string) => void;
  closeModal: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  setFilterOpen: (open: boolean) => void;
}

export const useUiStore = create<UiState>((set) => ({
  toasts: [],
  isMobileMenuOpen: false,
  isFilterOpen: false,
  showToast: (toast) =>
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id: crypto.randomUUID() }].slice(-4),
    })),
  dismissToast: (id) => set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) })),
  openModal: (id) => set({ modalId: id }),
  closeModal: () => set({ modalId: undefined }),
  setMobileMenuOpen: (isMobileMenuOpen) => set({ isMobileMenuOpen }),
  setFilterOpen: (isFilterOpen) => set({ isFilterOpen }),
}));
