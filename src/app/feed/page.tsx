"use client";

import React, { useState, useEffect } from "react";
import SocialCard from "./components/SocialCard";
import { useThoughtStore } from "@/store/useThoughtStore";
import { useUserStore } from "@/store/useUserStore";
import { useUserRelationshipStore } from "@/store/useUserRelationshipStore";

export default function Feed() {
    const { thoughts, showOnlyUserThoughts } = useThoughtStore();
    const { currentUser } = useUserStore();
    const { isFollowing } = useUserRelationshipStore();
    const [displayedThoughts, setDisplayedThoughts] = useState(thoughts);

    // Update displayed thoughts when global thoughts or following relationships change
    useEffect(() => {
        if (thoughts && currentUser) {
            // Filter thoughts based on the showOnlyUserThoughts flag
            let filtered;
            if (showOnlyUserThoughts) {
                // Show only the current user's thoughts
                filtered = thoughts.filter(thought => 
                    thought.authorId === currentUser.id
                );
            } else {
                // Show all public thoughts and user's own thoughts
                filtered = thoughts.filter(thought => {
                    // Always show your own thoughts
                    if (thought.authorId === currentUser.id) return true;
                    // Show public thoughts
                    return thought.isPublic;
                });
            }
            
            // Sort thoughts by timestamp, newest first
            const sortedThoughts = [...filtered].sort((a, b) => {
                return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
            });
            
            setDisplayedThoughts(sortedThoughts);
        }
    }, [thoughts, currentUser, isFollowing, showOnlyUserThoughts]);

    return (
        <div className="flex flex-col items-center justify-items-center h-screen pb-18 font-geologica">
            <div className="w-full h-full overflow-y-auto flex flex-col gap-4 pr-4 pb-10">

                {displayedThoughts.length === 0 ? (
                    <div className="text-center p-10 bg-white rounded-lg shadow-sm border border-[#ccc]">
                        <h3 className="text-xl font-medium text-gray-700 mb-2">
                            {showOnlyUserThoughts ? "You haven't posted any thoughts yet" : "Your feed is empty"}
                        </h3>
                        <p className="text-gray-500">
                            {showOnlyUserThoughts 
                                ? "Create a new thought to get started!"
                                : "Follow more users to see their thoughts here, or create your own!"}
                        </p>
                    </div>
                ) : (
                    displayedThoughts.map((thought) => (
                        <SocialCard
                            key={thought.id}
                            id={thought.id}
                            thoughtContent={thought.content}
                            authorId={thought.authorId}
                            authorImage={thought.authorImage}
                            username={thought.username}
                            likes={thought.likes}
                            likedBy={thought.likedBy}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
