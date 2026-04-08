import { create } from 'zustand';

type AppPocketState = {
  initialized: boolean;
  setInitialized: (value: boolean) => void;
};

export const useAppPocketStore = create<AppPocketState>((set) => ({
  initialized: true,
  setInitialized: (value) => set({ initialized: value }),
}));
