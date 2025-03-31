export interface Comment {
  id: string;
  text: string;
  authorId: string;
  authorName: string;
  authorImage: string;
  timestamp: string;
}

export interface Thought {
  id: string;
  content: string;
  authorId: string;
  username: string;
  authorImage: string;
  timestamp: string;
  likes: number;
  comments: number;
  commentData: Comment[];
  shares: number;
  tags?: string[];
  isPublic: boolean;
  likedBy: string[];
}

export const mockThoughts: Thought[] = [
  {
    id: 'thought-001',
    content: 'Just finished designing a new UI component library focused on accessibility. Check out the showcase!',
    authorId: 'user-001',
    username: 'Angelica Rose',
    authorImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    timestamp: '2023-09-15T14:23:00Z',
    likes: 87,
    comments: 12,
    commentData: [],
    shares: 5,
    tags: ['Design', 'Accessibility', 'UI'],
    isPublic: true,
    likedBy: ['user-002', 'user-003', 'user-004', 'user-mel', 'user-olivia']
  },
  {
    id: 'thought-002',
    content: 'React Server Components are changing how we think about data fetching in frontend applications.',
    authorId: 'user-002',
    username: 'Marcus Chen',
    authorImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    timestamp: '2023-09-16T09:45:00Z',
    likes: 134,
    comments: 23,
    commentData: [],
    shares: 18,
    tags: ['React', 'WebDev', 'JavaScript'],
    isPublic: true,
    likedBy: ['user-001', 'user-003', 'user-004', 'user-005', 'user-loretta', 'user-bikezh']
  },
  {
    id: 'thought-003',
    content: 'Implementing a neural network from scratch taught me more than any tutorial ever could!',
    authorId: 'user-004',
    username: 'Alex Thompson',
    authorImage: 'https://randomuser.me/api/portraits/men/86.jpg',
    timestamp: '2023-09-14T16:12:00Z',
    likes: 209,
    comments: 31,
    commentData: [],
    shares: 27,
    tags: ['AI', 'MachineLearning', 'Python'],
    isPublic: true,
    likedBy: ['user-001', 'user-002', 'user-003', 'user-005', 'user-olivia', 'user-mel', 'user-bikezh']
  },
  {
    id: 'thought-004',
    content: 'Tailwind CSS has completely changed my workflow. Here\'s how I set up my custom config.',
    authorId: 'user-002',
    username: 'Marcus Chen',
    authorImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    timestamp: '2023-09-17T11:08:00Z',
    likes: 76,
    comments: 14,
    commentData: [],
    shares: 9,
    tags: ['CSS', 'Tailwind', 'WebDev'],
    isPublic: true,
    likedBy: ['user-001', 'user-005', 'user-loretta', 'user-bikezh']
  },
  {
    id: 'thought-005',
    content: 'The psychology behind effective UX design - my insights after 5 years in the field.',
    authorId: 'user-003',
    username: 'Sarah Johnson',
    authorImage: 'https://randomuser.me/api/portraits/women/68.jpg',
    timestamp: '2023-09-13T15:37:00Z',
    likes: 182,
    comments: 43,
    commentData: [],
    shares: 32,
    tags: ['UX', 'Psychology', 'Design'],
    isPublic: true,
    likedBy: ['user-001', 'user-002', 'user-004', 'user-005', 'user-olivia', 'user-mel']
  },
  {
    id: 'thought-006',
    content: 'Content marketing strategies that actually worked for our startup in 2023.',
    authorId: 'user-005',
    username: 'Elena Rodriguez',
    authorImage: 'https://randomuser.me/api/portraits/women/90.jpg',
    timestamp: '2023-09-18T10:23:00Z',
    likes: 98,
    comments: 21,
    commentData: [],
    shares: 15,
    tags: ['Marketing', 'ContentStrategy', 'Startup'],
    isPublic: true,
    likedBy: ['user-001', 'user-002', 'user-003', 'user-olivia', 'user-loretta']
  },
  {
    id: 'thought-007',
    content: 'My minimalist desk setup that boosted my productivity by 30%.',
    authorId: 'user-003',
    username: 'Sarah Johnson',
    authorImage: 'https://randomuser.me/api/portraits/women/68.jpg',
    timestamp: '2023-09-19T08:45:00Z',
    likes: 124,
    comments: 19,
    commentData: [],
    shares: 7,
    tags: ['Productivity', 'Workspace', 'Minimalism'],
    isPublic: true,
    likedBy: ['user-001', 'user-002', 'user-004', 'user-005', 'user-mel', 'user-bikezh']
  }
]; 