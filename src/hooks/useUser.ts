import { useEffect, useState, useCallback } from 'react';
import { useUserStore } from '@/store/useUserStore';
import { fetchCurrentUser, fetchUserById, updateUserProfile, logoutUser } from '@/services/userService';
import { User } from '@/data/mockUsers';

interface UseUserResult {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  fetchUser: (userId: string) => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
  logout: () => void;
}

export function useUser(): UseUserResult {
  // Use the store as a hook to get reactive state
  const currentUser = useUserStore((state) => state.currentUser);
  const isLoading = useUserStore((state) => state.isLoading);
  const error = useUserStore((state) => state.error);
  
  // Fetch user data function with useCallback to maintain stable reference
  const fetchUser = useCallback(async (userId: string) => {
    try {
      await fetchCurrentUser(userId);
    } catch (error) {
      console.error('Error in useUser hook:', error);
    }
  }, []);

  // Update user data with useCallback
  const updateUser = useCallback(async (updates: Partial<User>) => {
    if (!currentUser) {
      throw new Error('Cannot update user: No user is currently logged in');
    }
    
    await updateUserProfile(currentUser.id, updates);
  }, [currentUser]);

  // Logout current user with useCallback
  const logout = useCallback(() => {
    logoutUser();
  }, []);

  return {
    user: currentUser,
    isLoading,
    error,
    fetchUser,
    updateUser,
    logout,
  };
} 