"use client";

import { useEffect, useState } from 'react';
import { useUser } from '@/hooks/useUser';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Edit, Save } from 'lucide-react';

export default function ProfilePage() {
  const { user, isLoading, error, fetchUser, updateUser } = useUser();
  const [editMode, setEditMode] = useState(false);
  const [bio, setBio] = useState('');

  useEffect(() => {
    // For demo - in real app would use auth session
    if (!user) {
      fetchUser('user-001');
    }
  }, []); // Empty dependency array to run only once

  useEffect(() => {
    if (user?.bio) {
      setBio(user.bio);
    }
  }, [user?.bio]);

  const handleUpdateBio = async () => {
    if (!user) return;
    
    try {
      await updateUser({ bio });
      setEditMode(false);
    } catch (error) {
      console.error('Failed to update bio:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-100"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-bg-100 flex items-center justify-center">
        <div className="bg-red-50 text-red-500 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-bg-100 flex items-center justify-center">
        <div className="bg-bg-300 p-8 rounded-xl shadow-lg text-center">
          <h1 className="text-2xl font-bold mb-4">User Not Found</h1>
          <p className="text-text-200">Please log in to view your profile.</p>
          <Button 
            className="mt-4 bg-primary-100 hover:bg-primary-200 text-white"
            onClick={() => fetchUser('user-001')}
          >
            Load Demo User
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-100 pt-20 px-4">
      <div className="max-w-4xl mx-auto bg-bg-300 rounded-xl shadow-sm overflow-hidden">
        {/* Cover Photo Area */}
        <div className="h-48 bg-gradient-to-r from-primary-100/30 to-accent-100/50 relative">
          <div className="absolute -bottom-16 left-8 border-4 border-white rounded-full overflow-hidden h-32 w-32">
            {user.avatar ? (
              <Image 
                src={user.avatar} 
                alt={user.name} 
                width={128} 
                height={128} 
                className="object-cover"
              />
            ) : (
              <div className="bg-accent-100 h-full w-full flex items-center justify-center">
                <User className="h-12 w-12 text-primary-200" />
              </div>
            )}
          </div>
        </div>
        
        {/* Profile Info */}
        <div className="pt-20 px-8 pb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-text-100">{user.name}</h1>
              <p className="text-accent-200">{user.email}</p>
              <div className="mt-1 text-base text-text-200">
                <span className="inline-block bg-primary-100/10 text-primary-200 px-2 py-0.5 rounded-full text-xs font-medium">
                  {user.role === 'pro' ? 'Pro Member' : 
                   user.role === 'admin' ? 'Admin' : 'Member'}
                </span>
                <span className="ml-3">Joined {new Date(user.joinedDate).toLocaleDateString()}</span>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="border-primary-100 text-primary-100 hover:bg-primary-100/10"
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Done
                </>
              ) : (
                <>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>
          
          <div className="flex gap-6 text-base mb-8">
            <div>
              <span className="text-text-200">Following</span>
              <p className="text-lg font-semibold text-text-100">{user.following}</p>
            </div>
            <div>
              <span className="text-text-200">Followers</span>
              <p className="text-lg font-semibold text-text-100">{user.followers}</p>
            </div>
          </div>
          
          <div className="border-t border-bg-200 pt-6">
            <h2 className="text-lg font-semibold mb-3">About</h2>
            
            {editMode ? (
              <div className="space-y-4">
                <Input
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about yourself..."
                  className="bg-bg-100"
                />
                <Button 
                  onClick={handleUpdateBio}
                  className="bg-primary-100 hover:bg-primary-200 text-white"
                >
                  Save Bio
                </Button>
              </div>
            ) : (
              <p className="text-text-100 whitespace-pre-wrap">
                {user.bio || "No bio yet. Click Edit Profile to add one."}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 