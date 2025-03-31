export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'user' | 'admin' | 'pro';
  bio?: string;
  joinedDate: string;
  following: number;
  followers: number;
  preferences?: {
    darkMode: boolean;
    notifications: boolean;
    emailUpdates: boolean;
  };
}

export const mockUsers: User[] = [
  {
    id: 'user-001',
    name: 'Angelica Rose',
    email: 'angelica@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    role: 'pro',
    bio: 'Digital creator passionate about minimalism and productivity.',
    joinedDate: '2023-01-15T00:00:00Z',
    following: 121,
    followers: 4583,
    preferences: {
      darkMode: true,
      notifications: true,
      emailUpdates: false,
    },
  },
  {
    id: 'user-002',
    name: 'Marcus Chen',
    email: 'marcus@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    role: 'user',
    bio: 'Software engineer and open source contributor.',
    joinedDate: '2023-03-22T00:00:00Z',
    following: 87,
    followers: 242,
    preferences: {
      darkMode: false,
      notifications: true,
      emailUpdates: true,
    },
  },
  {
    id: 'user-003',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    role: 'admin',
    bio: 'Platform administrator and community manager.',
    joinedDate: '2022-11-08T00:00:00Z',
    following: 56,
    followers: 1203,
    preferences: {
      darkMode: true,
      notifications: true,
      emailUpdates: true,
    },
  },
  {
    id: 'user-004',
    name: 'Alex Thompson',
    email: 'alex@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/86.jpg',
    role: 'pro',
    bio: 'Product designer with 5+ years experience in UX/UI.',
    joinedDate: '2023-05-17T00:00:00Z',
    following: 234,
    followers: 876,
    preferences: {
      darkMode: false,
      notifications: false,
      emailUpdates: false,
    },
  },
  {
    id: 'user-005',
    name: 'Elena Rodriguez',
    email: 'elena@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/90.jpg',
    role: 'user',
    bio: 'Content creator and digital marketing specialist.',
    joinedDate: '2023-07-02T00:00:00Z',
    following: 149,
    followers: 421,
    preferences: {
      darkMode: true,
      notifications: true,
      emailUpdates: false,
    },
  }
]; 