import { User } from "@/types/user";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface UserState {
  isAuthenticated: boolean;
  user: User;
  setUser: (user: any) => void;
  logout: () => void;
}

const anonymousUser = { id: -1, email: "", name: "", token: "" } as User;

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        isAuthenticated: false,
        user: anonymousUser,
        setUser: (userObj: UserState) =>
          set({ isAuthenticated: userObj.isAuthenticated, user: userObj.user }),
        logout: () =>
          set({
            isAuthenticated: false,
            user: anonymousUser,
          }),
      }),
      {
        name: "user-store",
      }
    )
  )
);
