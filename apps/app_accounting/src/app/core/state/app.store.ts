import { create } from 'zustand';

type AppAccountingState = {
  initialized: boolean;
  setInitialized: (value: boolean) => void;
};

export const useAppAccountingStore = create<AppAccountingState>((set) => ({
  initialized: true,
  setInitialized: (value) => set({ initialized: value }),
}));
