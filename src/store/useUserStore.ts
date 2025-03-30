import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { User } from '@/data/mockUsers';

interface UserState {
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
  setCurrentUser: (user: User) => void;
  clearCurrentUser: () => void;
  setError: (error: string) => void;
  clearError: () => void;
  setLoading: (isLoading: boolean) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      currentUser: null,
      isLoading: false,
      error: null,
      setCurrentUser: (user) => set({ currentUser: user, error: null }),
      clearCurrentUser: () => set({ currentUser: null }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),
      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: 'user-storage', // name of the item in localStorage
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ currentUser: state.currentUser }), // only persist these fields
    }
  )
); 