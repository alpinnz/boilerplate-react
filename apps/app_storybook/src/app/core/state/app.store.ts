import { create } from 'zustand';

type AppStorybookState = {
  initialized: boolean;
  setInitialized: (value: boolean) => void;
};

export const useAppStorybookStore = create<AppStorybookState>((set) => ({
  initialized: true,
  setInitialized: (value) => set({ initialized: value }),
}));
