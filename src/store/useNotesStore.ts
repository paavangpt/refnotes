import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { Note, mockNotes } from '@/data/mockNotes';

export interface NotesState {
  notes: Note[];
  selectedNoteId: string | null;
  
  // Getters
  getUserNotes: (userId: string) => Note[];
  getSelectedNote: () => Note | null;
  
  // Actions
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (note: Note) => void;
  deleteNote: (noteId: string) => void;
  selectNote: (noteId: string | null) => void;
  togglePinNote: (noteId: string) => void;
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set, get) => ({
      notes: mockNotes,
      selectedNoteId: null,
      
      getUserNotes: (userId: string) => {
        return get().notes.filter(note => note.userId === userId);
      },
      
      getSelectedNote: () => {
        const { notes, selectedNoteId } = get();
        if (!selectedNoteId) return null;
        return notes.find(note => note.id === selectedNoteId) || null;
      },
      
      addNote: (note) => {
        const newNote: Note = {
          id: uuidv4(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          ...note,
        };
        
        set(state => ({
          notes: [newNote, ...state.notes],
          selectedNoteId: newNote.id,
        }));
        
        return newNote.id;
      },
      
      updateNote: (updatedNote) => {
        set(state => ({
          notes: state.notes.map(note => 
            note.id === updatedNote.id ? { ...note, ...updatedNote } : note
          ),
        }));
      },
      
      deleteNote: (noteId) => {
        set(state => ({
          notes: state.notes.filter(note => note.id !== noteId),
          selectedNoteId: state.selectedNoteId === noteId ? null : state.selectedNoteId,
        }));
      },
      
      selectNote: (noteId) => {
        set({ selectedNoteId: noteId });
      },
      
      togglePinNote: (noteId) => {
        set(state => ({
          notes: state.notes.map(note => 
            note.id === noteId ? { ...note, isPinned: !note.isPinned } : note
          ),
        }));
      },
    }),
    {
      name: 'notes-storage',
    }
  )
); 