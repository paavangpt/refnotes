import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Flame } from "lucide-react";
import { useThoughtStore } from "@/store/useThoughtStore";

function TrendingThoughts() {
    const { thoughts } = useThoughtStore();

    // Get top 5 trending thoughts (sorted by likes, comments and shares)
    const trendingThoughts = thoughts
        .filter((thought) => thought.isPublic)
        .sort((a, b) => {
            const aEngagement = a.likes + a.comments + a.shares;
            const bEngagement = b.likes + b.comments + b.shares;
            return bEngagement - aEngagement;
        })
        .slice(0, 10);

    return (
        <div className="bg-white rounded-lg shadow-[0_0_10px_-2px_rgba(138,43,226,0.2)] overflow-hidden border border-[#ccc] flex flex-col">
            <div className="flex justify-between items-center bg-[#a287dd] px-6 p-3 text-white sticky top-0 z-10">
                <h3 className="font-medium flex items-center">
                    <Flame className="h-4 w-4 mr-2" />
                    Trending Thoughts
                </h3>
                <Link
                    href="/trending"
                    className="text-md text-primary-100 hover:underline cursor-pointer underline"
                >
                    See all
                </Link>
            </div>

            <div className="overflow-y-auto max-h-[400px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                {trendingThoughts.map((thought) => (
                    <Link
                        key={thought.id}
                        href={`/thought/${thought.id}`}
                        className="flex items-start py-3 px-5 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                    >
                        <div className="w-8 h-8 rounded-full overflow-hidden relative flex-shrink-0 mr-2">
                            <Image
                                src={thought.authorImage}
                                alt={thought.username}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs font-medium text-gray-700 mb-0.5">
                                {thought.username}
                            </p>
                            <h4 className="text-sm text-gray-800 line-clamp-2">
                                {thought.content.substring(0, 60)}
                                {thought.content.length > 60 && "..."}
                            </h4>
                            <div className="flex text-xs text-gray-500 gap-4 mt-1">
                                <span>{thought.likes} likes</span>
                                <span>{thought.comments} comments</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default TrendingThoughts;
