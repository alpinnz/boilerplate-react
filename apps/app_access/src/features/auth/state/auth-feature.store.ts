import { create } from 'zustand';

type AuthFeatureState = {
  draftUsername: string;
  loginAttemptCount: number;
  setDraftUsername: (value: string) => void;
  incrementLoginAttemptCount: () => void;
};

export const useAuthFeatureStore = create<AuthFeatureState>((set) => ({
  draftUsername: '',
  loginAttemptCount: 0,
  setDraftUsername: (value) => set({ draftUsername: value }),
  incrementLoginAttemptCount: () =>
    set((state) => ({
      loginAttemptCount: state.loginAttemptCount + 1,
    })),
}));
