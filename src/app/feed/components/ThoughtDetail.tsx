import React, { useState } from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { useSelectedThoughtStore } from "@/store/useSelectedThoughtStore";
import { useThoughtStore } from "@/store/useThoughtStore";
import { useUserStore } from "@/store/useUserStore";
import { Heart, X, Send, Users } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Comment as CommentType } from "@/data/mockThoughts";
import Comment from "./Comment";
import LikedByList from "./LikedByList";

export default function ThoughtDetail() {
    const { thoughts, likeThought, unlikeThought, addComment } =
        useThoughtStore();
    const { currentUser } = useUserStore();
    const { selectedThoughtId, setSelectedThoughtId } =
        useSelectedThoughtStore();
    const [newComment, setNewComment] = useState("");
    const [showLikedBy, setShowLikedBy] = useState(false);

    // Find the thought based on the selected ID from the store
    const thought = thoughts.find((t) => t.id === selectedThoughtId);

    if (!thought || !currentUser) {
        return null;
    }

    const isLiked = thought.likedBy?.includes(currentUser.id) || false;
    const timeAgo = formatDistanceToNow(new Date(thought.timestamp), {
        addSuffix: true,
    });

    const handleClose = () => {
        setSelectedThoughtId(null);
    };

    const handleLike = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isLiked) {
            unlikeThought(thought.id, currentUser.id);
        } else {
            likeThought(thought.id, currentUser.id);
        }
    };

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!newComment.trim()) return;

        const comment: CommentType = {
            id: uuidv4(),
            text: newComment,
            authorId: currentUser.id,
            authorName: currentUser.name,
            authorImage: currentUser.avatar,
            timestamp: new Date().toISOString(),
        };

        addComment(thought.id, comment);
        setNewComment("");
    };

    return (
        <div className="max-w-[520px] w-full h-1/2 mr-5 bg-white rounded-lg shadow-md border border-[#ccc] overflow-hidden">
            <div className="p-4">
                {/* Header with user info and close button */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden">
                            <Image
                                src={thought.authorImage}
                                alt={thought.username}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800">
                                {thought.username}
                            </h3>
                            <p className="text-xs text-gray-500">{timeAgo}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleClose}
                        className="text-gray-500 hover:text-gray-700 cursor-pointer"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Thought content */}
                <div className="mb-4">
                    <p className="text-gray-800">{thought.content}</p>
                </div>

                {/* Tags */}
                {thought.tags && thought.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {thought.tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Engagement stats */}
                <div className="flex items-center justify-between border-t border-b border-gray-100 py-2 mb-4">
                    <div className="flex items-center gap-4">
                        <button
                            className={`flex items-center gap-1 px-3 py-1 rounded-md cursor-pointer ${
                                isLiked
                                    ? "text-red-500"
                                    : "text-gray-600 hover:bg-gray-50"
                            }`}
                            onClick={handleLike}
                        >
                            <Heart
                                size={18}
                                fill={isLiked ? "#ef4444" : "none"}
                            />
                            <span>Like</span>
                        </button>
                        <button
                            className="flex items-center gap-1 text-sm cursor-pointer"
                            onClick={() => setShowLikedBy(true)}
                        >
                            <span className="text-gray-600">
                                {thought.likes} likes
                            </span>
                        </button>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">
                            {thought.comments} comments
                        </span>
                        <span className="text-sm text-gray-600">
                            {thought.shares} shares
                        </span>
                    </div>
                </div>

                {/* Comments section */}
                <div>
                    <h4 className="font-medium text-gray-700 mb-3">Comments</h4>

                    {/* Comment input */}
                    <form
                        onSubmit={handleCommentSubmit}
                        className="flex gap-2 mb-4"
                    >
                        <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                            <Image
                                src={currentUser.avatar}
                                alt={currentUser.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex-1 flex items-center gap-2">
                            <input
                                type="text"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Write a comment..."
                                className="flex-1 bg-[#f4f3fd] rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200 text-base"
                            />
                            <Button
                                type="submit"
                                size="sm"
                                className={`rounded-full p-2 h-auto ${
                                    !newComment.trim()
                                        ? "bg-[#8881D8] hover:bg-[#7069d0]"
                                        : "bg-[#b8b2ec] cursor-not-allowed"
                                }`}
                                disabled={!newComment.trim()}
                            >
                                <Send size={16} />
                            </Button>
                        </div>
                    </form>

                    {/* Comment list - scrollable area */}
                    <ScrollArea className="h-[350px] pr-4">
                        {thought.commentData &&
                        thought.commentData.length > 0 ? (
                            <div>
                                {thought.commentData.map((comment) => (
                                    <Comment
                                        key={comment.id}
                                        comment={comment}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-4">
                                No comments yet. Be the first to comment!
                            </p>
                        )}
                    </ScrollArea>
                </div>
            </div>

            {/* Liked by dialog */}
            <Dialog open={showLikedBy} onOpenChange={setShowLikedBy}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Liked by</DialogTitle>
                    </DialogHeader>
                    <LikedByList likedBy={thought.likedBy || []} />
                </DialogContent>
            </Dialog>
        </div>
    );
}
