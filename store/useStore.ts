import { isAuthenticated } from "./../middleware";
import { User } from "@/types/user";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
const myMiddlewares = (f: any) => devtools(persist(f, { name: "bearStore" }));

interface UserState {
  isAuthenticated: boolean;
  user: User;
  setUser: (user) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  myMiddlewares((set) => ({
    isAuthenticated: false,
    user: { email: "", name: "", token: "" } as User,
    setUser: (userObj: UserState) =>
      set({ isAuthenticated: userObj.isAuthenticated, user: userObj.user }),
    logout: () =>
      set({
        isAuthenticated: false,
        user: { email: "", name: "", token: "" } as User,
      }),
  }))
);
