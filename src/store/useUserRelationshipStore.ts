import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User, mockUsers } from '@/data/mockUsers';

// Define public user data to avoid exposing private information
export interface PublicUserInfo {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
  followers: number;
  following: number;
  isFollowing?: boolean; // Whether the current user is following this user
}

interface UserRelationshipState {
  // Followed users for the current user
  followedUsers: string[]; // List of user IDs the current user follows
  
  // List of users in their minimized form for suggestion/display
  suggestedUsers: PublicUserInfo[];
  
  // Actions
  followUser: (userId: string) => void;
  unfollowUser: (userId: string) => void;
  
  // Get the public info of a user by ID
  getUserPublicInfo: (userId: string) => PublicUserInfo | undefined;
  
  // Get all suggested users not already followed
  getSuggestedUsers: (currentUserId: string, limit?: number) => PublicUserInfo[];
  
  // Check if a user is being followed
  isFollowing: (userId: string) => boolean;
}

export const useUserRelationshipStore = create<UserRelationshipState>()(
  persist(
    (set, get) => ({
      followedUsers: [],
      suggestedUsers: mockUsers.map(user => ({
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        bio: user.bio,
        followers: user.followers,
        following: user.following,
      })),
      
      followUser: (userId: string) => {
        const currentFollowedUsers = get().followedUsers;
        // Don't add if already following
        if (currentFollowedUsers.includes(userId)) return;
        
        set({
          followedUsers: [...currentFollowedUsers, userId]
        });
      },
      
      unfollowUser: (userId: string) => {
        const currentFollowedUsers = get().followedUsers;
        set({
          followedUsers: currentFollowedUsers.filter(id => id !== userId)
        });
      },
      
      getUserPublicInfo: (userId: string) => {
        const user = mockUsers.find(u => u.id === userId);
        if (!user) return undefined;
        
        return {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          bio: user.bio,
          followers: user.followers,
          following: user.following,
          isFollowing: get().followedUsers.includes(userId)
        };
      },
      
      getSuggestedUsers: (currentUserId: string, limit = 5) => {
        const followedUsers = get().followedUsers;
        const suggestedUsers = mockUsers
          // Filter out current user but NOT followed users (changed behavior)
          .filter(user => user.id !== currentUserId)
          // Convert to public user info with isFollowing status
          .map(user => ({
            id: user.id,
            name: user.name,
            avatar: user.avatar,
            bio: user.bio,
            followers: user.followers,
            following: user.following,
            isFollowing: followedUsers.includes(user.id)
          }))
          // Limit the number of suggestions
          .slice(0, limit);
          
        return suggestedUsers;
      },
      
      isFollowing: (userId: string) => {
        return get().followedUsers.includes(userId);
      }
    }),
    {
      name: 'user-relationships',
      storage: createJSONStorage(() => localStorage),
    }
  )
); 