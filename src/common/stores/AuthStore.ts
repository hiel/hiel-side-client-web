import { create } from "zustand"
import { AuthUtility } from "@/common/utilities/AuthUtility"

type Store = {
  isLogined: boolean,
  setIsLogined: (isLogined: boolean) => void,
  initializeAuth: () => void,
}

export default create<Store>((set) => ({
  isLogined: false,
  setIsLogined: (isLogined: boolean) => set({ isLogined: isLogined }),
  initializeAuth: () => set({ isLogined: AuthUtility.isLogin() }),
}))
