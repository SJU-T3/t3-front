import { create } from "zustand";

interface AuthState {
  token: string | null;
  isLoggedIn: boolean;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: sessionStorage.getItem("token"),
  isLoggedIn: !!sessionStorage.getItem("token"),

  setToken: (token) =>
    set(() => {
      if (token) {
        sessionStorage.setItem("token", token);
      } else {
        sessionStorage.removeItem("token");
      }

      return {
        token,
        isLoggedIn: !!token,
      };
    }),

  logout: () =>
    set(() => {
      sessionStorage.removeItem("token");
      return {
        token: null,
        isLoggedIn: false,
      };
    }),
}));
