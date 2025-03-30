"use client";

import React, { useState, useEffect } from "react";
import SocialCard from "./components/SocialCard";
import Navbar from "./components/Navbar";
import ThoughtCreator from "./components/ThoughtCreator";
import { useThoughtStore } from "@/store/useThoughtStore";
import { useUserStore } from "@/store/useUserStore";
import { useUserRelationshipStore } from "@/store/useUserRelationshipStore";
import Sidebar from "./components/Sidebar";

export default function Feed() {
    const { thoughts } = useThoughtStore();
    const { currentUser } = useUserStore();
    const { isFollowing } = useUserRelationshipStore();
    const [displayedThoughts, setDisplayedThoughts] = useState(thoughts);
    const [showCreator, setShowCreator] = useState(true);
    const [selectedThoughtId, setSelectedThoughtId] = useState<string | null>(null);

    // Update displayed thoughts when global thoughts or following relationships change
    useEffect(() => {
        if (thoughts && currentUser) {
            // Filter thoughts to show only from people you follow and your own
            const filtered = thoughts.filter(thought => {
                // Always show your own thoughts
                if (thought.authorId === currentUser.id) return true;
                // Show public thoughts from people you follow
                return thought.isPublic;
            });
            setDisplayedThoughts(filtered);
        }
    }, [thoughts, currentUser, isFollowing]);

    return (
        <div className="flex flex-col items-center justify-items-center h-screen pb-18 font-geologica">
            <div className="w-full h-full overflow-y-auto flex flex-col gap-4 pr-4 pb-10">

                {displayedThoughts.length === 0 ? (
                    <div className="text-center p-10 bg-white rounded-lg shadow-sm border border-[#ccc]">
                        <h3 className="text-xl font-medium text-gray-700 mb-2">
                            Your feed is empty
                        </h3>
                        <p className="text-gray-500">
                            Follow more users to see their thoughts here, or
                            create your own!
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
