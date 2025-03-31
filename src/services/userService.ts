import { User, mockUsers } from '@/data/mockUsers';
import { useUserStore } from '@/store/useUserStore';

/**
 * Simulates API call delay
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetch user by ID from mock data
 * In a real application, this would be an API call
 */
export const fetchUserById = async (userId: string): Promise<User> => {
  try {
    // Simulate API call delay
    await delay(800);
    
    const user = mockUsers.find(user => user.id === userId);
    
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

/**
 * Fetch the currently authenticated user
 * In a real app, this would use a token or session
 */
export const fetchCurrentUser = async (userId: string): Promise<User> => {
  const store = useUserStore.getState();
  
  // Don't fetch if user is already loaded with the same ID
  if (store.currentUser?.id === userId && !store.isLoading) {
    return store.currentUser;
  }
  
  try {
    store.setLoading(true);
    store.setError('');
    
    const user = await fetchUserById(userId);
    
    store.setCurrentUser(user);
    return user;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch user';
    store.setError(errorMessage);
    throw error;
  } finally {
    store.setLoading(false);
  }
};

/**
 * Update user profile
 * For mock purposes, this just returns the updated user without persisting
 */
export const updateUserProfile = async (userId: string, updates: Partial<User>): Promise<User> => {
  const { setCurrentUser, setLoading, setError } = useUserStore.getState();
  
  try {
    setLoading(true);
    setError('');
    
    // Find existing user
    const existingUser = await fetchUserById(userId);
    
    // In a real app, this would be a PUT/PATCH API call
    await delay(1000);
    
    // Merge existing user with updates
    const updatedUser = { ...existingUser, ...updates };
    
    setCurrentUser(updatedUser);
    return updatedUser;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update user profile';
    setError(errorMessage);
    throw error;
  } finally {
    setLoading(false);
  }
};

/**
 * Logout user - clear current user from store
 */
export const logoutUser = (): void => {
  const { clearCurrentUser } = useUserStore.getState();
  clearCurrentUser();
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  const { currentUser } = useUserStore.getState();
  return currentUser !== null;
}; 