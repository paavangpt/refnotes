import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TrendingThoughts from "./TrendingThoughts";
import { useUserStore } from "@/store/useUserStore";
import { useUserRelationshipStore, PublicUserInfo } from "@/store/useUserRelationshipStore";
import { UserPlus, Check } from "lucide-react";

function Sidebar() {
    const { currentUser } = useUserStore();
    const { getSuggestedUsers, followUser, unfollowUser, isFollowing } = useUserRelationshipStore();
    const [suggestedUsers, setSuggestedUsers] = useState<PublicUserInfo[]>([]);

    useEffect(() => {
        // Load suggested users whenever the current user changes
        if (currentUser) {
            // Get all users regardless of following status (we'll handle UI display with isFollowing)
            setSuggestedUsers(getSuggestedUsers(currentUser.id, 4));
        }
    }, [currentUser, getSuggestedUsers]);

    const handleFollowClick = (userId: string) => {
        if (isFollowing(userId)) {
            unfollowUser(userId);
        } else {
            followUser(userId);
        }
        // Don't refresh the suggested users list immediately
        // Let the UI update based on isFollowing status
    };

    return (
        <aside className="w-[28%] flex flex-col h-full sticky top-0 overflow-hidden px-6 pb-15 gap-5">
            {/* Add to your feed section */}
            <div className="bg-white rounded-lg shadow-[0_0_10px_-2px_rgba(138,43,226,0.2)] overflow-hidden border border-[#ccc] h-[40%]">
                <div className="flex justify-between items-center mb-3 bg-[#a287dd] px-6 p-3 text-white">
                    <h3 className="font-medium">
                        Add to your feed
                    </h3>
                    <Link
                        href="/discover"
                        className="text-md text-primary-100 hover:underline cursor-pointer underline"
                    >
                        View all
                    </Link>
                </div>

                <div className="px-5 py-3 flex flex-col gap-3">
                    {suggestedUsers.map((user) => (
                        <div
                            key={user.id}
                            className="flex items-center justify-between gap-4"
                        >
                            <div className="flex items-center gap-2">
                                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200">
                                    <Image
                                        src={user.avatar}
                                        alt={user.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="text-base font-medium text-gray-700">
                                        {user.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {user.followers} follower{user.followers !== 1 ? 's' : ''}
                                    </p>
                                </div>
                            </div>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleFollowClick(user.id)}
                                className={`text-sm h-7 px-3 py-0 border cursor-pointer ${
                                    isFollowing(user.id)
                                    ? "border-[#8881D8] text-[#8881D8] bg-[#8881D8]/10"
                                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                                }`}
                            >
                                {isFollowing(user.id) ? (
                                    <>
                                        <Check size={14} className="mr-1" /> Following
                                    </>
                                ) : (
                                    <>
                                        <UserPlus size={14} className="mr-1" /> Follow
                                    </>
                                )}
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Trending Thoughts */}
            <TrendingThoughts />
        </aside>
    );
}

export default Sidebar;
