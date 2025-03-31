import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Thought, mockThoughts, Comment } from '@/data/mockThoughts';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface ThoughtState {
  // All thoughts in the system
  thoughts: Thought[];
  
  // Filter for showing only user thoughts
  showOnlyUserThoughts: boolean;
  setShowOnlyUserThoughts: (show: boolean) => void;
  
  // Loading and error states
  isLoading: boolean;
  error: string | null;
  
  // Actions for managing thoughts
  setThoughts: (thoughts: Thought[]) => void;
  addThought: (thought: Thought) => void;
  updateThought: (id: string, updates: Partial<Thought>) => void;
  deleteThought: (id: string) => void;
  
  // Like/unlike functionality
  likeThought: (thoughtId: string, userId: string) => void;
  unlikeThought: (thoughtId: string, userId: string) => void;
  
  // Comment functionality
  addComment: (thoughtId: string, comment: Comment) => void;
  
  // Error handling
  setError: (error: string | null) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useThoughtStore = create<ThoughtState>()(
  persist(
    (set) => ({
      // Initial state - ensure each thought has commentData initialized
      thoughts: mockThoughts.map(thought => ({
        ...thought,
        commentData: Array.isArray(thought.commentData) ? thought.commentData : []
      })),
      showOnlyUserThoughts: false,
      isLoading: false,
      error: null,
      
      // Set filter for user thoughts
      setShowOnlyUserThoughts: (show) => set({ showOnlyUserThoughts: show }),
      
      // Actions
      setThoughts: (thoughts) => set({ thoughts }),
      
      addThought: (thought) => {
        // Make sure the new thought has commentData initialized
        const newThought = {
          ...thought,
          commentData: Array.isArray(thought.commentData) ? thought.commentData : []
        };
        
        // Add to the state
        set((state) => ({
          thoughts: [newThought, ...state.thoughts]
        }));
        
        // Also update the original mock data to keep things in sync
        mockThoughts.unshift(newThought);
      },
      
      updateThought: (id, updates) => {
        set((state) => ({
          thoughts: state.thoughts.map((thought) => 
            thought.id === id ? { ...thought, ...updates } : thought
          )
        }));
        
        // Update the original mock data
        const index = mockThoughts.findIndex(t => t.id === id);
        if (index !== -1) {
          mockThoughts[index] = { ...mockThoughts[index], ...updates };
        }
      },
      
      deleteThought: (id) => {
        set((state) => ({
          thoughts: state.thoughts.filter((thought) => thought.id !== id)
        }));
        
        // Update the original mock data
        const index = mockThoughts.findIndex(t => t.id === id);
        if (index !== -1) {
          mockThoughts.splice(index, 1);
        }
      },
      
      likeThought: (thoughtId, userId) => {
        set((state) => ({
          thoughts: state.thoughts.map((thought) => {
            if (thought.id === thoughtId) {
              // Check if user already liked this thought
              if (!thought.likedBy.includes(userId)) {
                return {
                  ...thought,
                  likes: thought.likes + 1,
                  likedBy: [...thought.likedBy, userId]
                };
              }
            }
            return thought;
          })
        }));
        
        // Update the original mock data
        const index = mockThoughts.findIndex(t => t.id === thoughtId);
        if (index !== -1) {
          const thought = mockThoughts[index];
          if (!thought.likedBy.includes(userId)) {
            mockThoughts[index] = {
              ...thought,
              likes: thought.likes + 1,
              likedBy: [...thought.likedBy, userId]
            };
          }
        }
      },
      
      unlikeThought: (thoughtId, userId) => {
        set((state) => ({
          thoughts: state.thoughts.map((thought) => {
            if (thought.id === thoughtId) {
              // Check if user had liked this thought
              if (thought.likedBy.includes(userId)) {
                return {
                  ...thought,
                  likes: Math.max(0, thought.likes - 1),
                  likedBy: thought.likedBy.filter(id => id !== userId)
                };
              }
            }
            return thought;
          })
        }));
        
        // Update the original mock data
        const index = mockThoughts.findIndex(t => t.id === thoughtId);
        if (index !== -1) {
          const thought = mockThoughts[index];
          if (thought.likedBy.includes(userId)) {
            mockThoughts[index] = {
              ...thought,
              likes: Math.max(0, thought.likes - 1),
              likedBy: thought.likedBy.filter(id => id !== userId)
            };
          }
        }
      },
      
      addComment: (thoughtId, comment) => {
        set((state) => ({
          thoughts: state.thoughts.map((thought) => {
            if (thought.id === thoughtId) {
              // Ensure commentData is an array before adding to it
              const commentData = Array.isArray(thought.commentData) ? thought.commentData : [];
              return {
                ...thought,
                comments: thought.comments + 1,
                commentData: [...commentData, comment]
              };
            }
            return thought;
          })
        }));
        
        // Update the original mock data
        const index = mockThoughts.findIndex(t => t.id === thoughtId);
        if (index !== -1) {
          // Ensure commentData is an array before adding to it
          const commentData = Array.isArray(mockThoughts[index].commentData) 
            ? mockThoughts[index].commentData 
            : [];
            
          mockThoughts[index] = {
            ...mockThoughts[index],
            comments: mockThoughts[index].comments + 1,
            commentData: [...commentData, comment]
          };
        }
      },
      
      setError: (error) => set({ error }),
      setLoading: (isLoading) => set({ isLoading })
    }),
    {
      name: 'thoughts-storage',
      // Manual merge strategy to ensure data structure consistency
      merge: (persistedState: any, currentState) => {
        // Ensure all thoughts have commentData as an array
        const thoughts = (persistedState.thoughts || []).map((thought: Thought) => ({
          ...thought,
          commentData: Array.isArray(thought.commentData) ? thought.commentData : []
        }));
        
        return {
          ...currentState,
          ...persistedState,
          thoughts,
          // Always reset filter state on refresh
          showOnlyUserThoughts: false
        };
      }
    }
  )
); 