import { create } from 'zustand';

interface SelectedThoughtState {
  selectedThoughtId: string | null;
  setSelectedThoughtId: (id: string | null) => void;
}

export const useSelectedThoughtStore = create<SelectedThoughtState>((set) => ({
  selectedThoughtId: null,
  setSelectedThoughtId: (id) => set({ selectedThoughtId: id }),
})); 