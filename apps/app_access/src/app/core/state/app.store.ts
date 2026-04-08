import { create } from 'zustand';

type AppStore = {
  activeTheme: 'GroAccess' | 'GroAccounting' | 'GroPocket' | 'Wireframe';
  setActiveTheme: (theme: AppStore['activeTheme']) => void;
};

export const useAppStore = create<AppStore>((set) => ({
  activeTheme: 'GroAccess',
  setActiveTheme: (theme) => set({ activeTheme: theme }),
}));
