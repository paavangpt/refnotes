import React from "react";
import Image from "next/image";
import { useThoughtStore } from "@/store/useThoughtStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users } from "lucide-react";

export default function LikedByList({ likedBy }: { likedBy: string[] }) {
    const { thoughts } = useThoughtStore();

    return (
        <div className="py-2">
            <h3 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                <Users size={16} />
                <span>Liked by {likedBy.length} people</span>
            </h3>

            <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-3">
                    {likedBy.map((userId) => {
                        // Find thought that has this user's info based on likedBy
                        const userThought = thoughts.find(
                            (t) =>
                                t.authorId === userId ||
                                (t.likedBy && t.likedBy.includes(userId))
                        );

                        const userName = userThought?.username || "User";
                        const userImage =
                            userThought?.authorImage ||
                            "https://randomuser.me/api/portraits/lego/1.jpg";

                        return (
                            <div
                                key={userId}
                                className="flex items-center gap-3"
                            >
                                <div className="relative w-8 h-8 rounded-full overflow-hidden">
                                    <Image
                                        src={userImage}
                                        alt={userName}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="font-medium text-sm">
                                        {userName}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </ScrollArea>
        </div>
    );
} 