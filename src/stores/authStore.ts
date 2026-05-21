import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../types/domain";

interface AuthState {
  user?: User;
  token?: string;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      login: (user, token) => set({ user, token, isAuthenticated: true }),
      logout: () => set({ user: undefined, token: undefined, isAuthenticated: false }),
    }),
    { name: "shopnest-auth" },
  ),
);
