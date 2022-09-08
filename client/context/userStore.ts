import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface userStateType {
  user: any;
  setUser: (user: any) => void;
}

const userStore = (set: any) => ({
  user: {},
  setUser: (user: any) => set(() => ({ user })),
});

const useUserStore = create<userStateType>()(
  devtools(persist(userStore, { name: "user" }))
);

export default useUserStore;
