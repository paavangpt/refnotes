import React from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { Comment as CommentType } from "@/data/mockThoughts";

export default function Comment({ comment }: { comment: CommentType }) {
    const timeAgo = formatDistanceToNow(new Date(comment.timestamp), {
        addSuffix: true,
    });

    return (
        <div className="flex gap-2 mb-4">
            <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                <Image
                    src={comment.authorImage}
                    alt={comment.authorName}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="flex-1">
                <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between items-start">
                        <h4 className="text-sm font-semibold text-gray-800">
                            {comment.authorName}
                        </h4>
                        <span className="text-xs text-gray-500">{timeAgo}</span>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">{comment.text}</p>
                </div>
            </div>
        </div>
    );
} 