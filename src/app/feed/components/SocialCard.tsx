import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import { useThoughtStore } from "@/store/useThoughtStore";
import {
    MoreVertical,
    Edit,
    Trash,
    Heart,
    MessageCircle,
    ChevronRight,
    Users,
    Send,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Comment } from "@/data/mockThoughts";
import { useSelectedThoughtStore } from "@/store/useSelectedThoughtStore";

interface SocialCardProps {
    thoughtContent: string;
    authorId: string;
    authorImage: string;
    username: string;
    likes?: number;
    onContentChange?: (newContent: string) => void;
    id?: string;
    likedBy?: string[];
}

export default function SocialCard({
    thoughtContent,
    authorId,
    authorImage,
    username,
    likes: initialLikes = 0,
    onContentChange,
    id = "thought-default",
    likedBy = [],
}: SocialCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState(thoughtContent);
    const [comment, setComment] = useState("");
    const [likesCount, setLikesCount] = useState(initialLikes);
    const [likesData, setLikesData] = useState<string[]>(likedBy);
    const [showComments, setShowComments] = useState(false);

    // Get user info and thought store
    const { user } = useUser();
    const { thoughts, likeThought, unlikeThought, addComment } =
        useThoughtStore();

    // Get the current thought from the global store
    const currentThought = thoughts.find((t) => t.id === id);
    // Ensure commentData is always an array (even if undefined)
    const commentsData = Array.isArray(currentThought?.commentData)
        ? currentThought.commentData
        : [];
    const commentsCount = currentThought?.comments || 0;

    // Check if the current user is the author of this thought
    const isAuthor = user?.id === authorId;

    // Use a default image if no logged-in user is available
    const currentUserImage = user?.avatar || "/placeholder-avatar.jpg";
    const currentUserName = user?.name || "Anonymous";

    // Check if current user has liked the post
    const hasLiked = user && likesData.includes(user.id);

    useEffect(() => {
        // Update local state if props change
        setContent(thoughtContent);
        setLikesCount(initialLikes);
        setLikesData(likedBy);
    }, [thoughtContent, initialLikes, likedBy]);

    const handleContentSave = () => {
        setIsEditing(false);
        onContentChange?.(content);
    };

    const handleLike = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent navigation when clicking the like button
        e.preventDefault(); // Prevent default link behavior
        if (!user) return; // Don't do anything if no user is logged in

        if (hasLiked) {
            // Unlike the post - update local state and global store
            setLikesCount((prev) => Math.max(prev - 1, 0)); // Ensure likes don't go below 0
            setLikesData((prev) => prev.filter((id) => id !== user.id));
            unlikeThought(id, user.id);
        } else {
            // Like the post - update local state and global store
            setLikesCount((prev) => prev + 1);
            setLikesData((prev) => [...prev, user.id]);
            likeThought(id, user.id);
        }
    };

    const handleComment = (e?: React.MouseEvent) => {
        e?.stopPropagation(); // Prevent navigation when submitting a comment
        e?.preventDefault(); // Prevent default link behavior
        if (!comment.trim() || !user) return;

        // Create a new comment
        const newComment: Comment = {
            id: `comment-${Date.now()}`,
            text: comment,
            authorId: user.id,
            authorName: currentUserName,
            authorImage: currentUserImage,
            timestamp: new Date().toISOString(),
        };

        // Clear the input field and show comments section
        setComment("");
        setShowComments(true);

        // Add the comment to the global store
        addComment(id, newComment);
    };

    const handleToggleComments = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent navigation when clicking the comment button
        e.preventDefault(); // Prevent default link behavior
        setShowComments(!showComments);
    };

    const handleMenuClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent navigation when interacting with the menu
        e.preventDefault(); // Prevent default link behavior
    };

    const handleEditingClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent navigation when in editing mode
        e.preventDefault(); // Prevent default link behavior
    };

    const handleCommentInputClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent navigation when clicking the comment input
        e.preventDefault(); // Prevent default link behavior
    };

    const setSelectedThought = useSelectedThoughtStore(
        (state) => state.setSelectedThoughtId
    );
    // Get the most recent comment to display (if showing comments)
    const latestComment =
        commentsData.length > 0 ? commentsData[commentsData.length - 1] : null;

    return (
        <div
            className="block cursor-pointer"
            onClick={() => {
                setSelectedThought(id);
            }}
        >
            <div className="w-full rounded-lg p-4 bg-[#ffffff] drop-shadow-sm font-geologica transition duration-100 hover:shadow-[0_0_10px_-2px_rgba(138,43,226,0.2)] transition-colors duration-200 relative border border-[#eee]">
                {/* Make the whole card clickable but leave interactive elements untouched */}
                <Link
                    href={`/thought/${id}`}
                    className="absolute inset-0 z-0"
                    aria-label={`View details of ${username}'s thought`}
                ></Link>

                <div className="relative z-10">
                    <div className="flex items-start gap-3 mb-4">
                        <div className="w-10 h-full overflow-hidden relative flex flex-col">
                            <div className="h-10 w-full rounded-full overflow-hidden">
                                <img
                                    src={authorImage}
                                    alt={`${username}'s avatar`}
                                />
                            </div>
                            <div className="h-full w-10 bg-black"></div>
                        </div>
                        <div className="flex-1 relative">
                            <div className="mb-1 flex justify-between items-center">
                                <span className="font-medium text-gray-900">
                                    {username}
                                </span>

                                {isAuthor && (
                                    <div onClick={handleMenuClick}>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger className="focus:outline-none cursor-pointer">
                                                <MoreVertical className="h-5 w-5 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer" />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                                align="end"
                                                className="font-geologica"
                                            >
                                                <DropdownMenuItem
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        e.preventDefault();
                                                        setIsEditing(true);
                                                    }}
                                                    className="flex items-center gap-2 cursor-pointer"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                    <span>Edit</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="flex items-center gap-2 text-red-500 cursor-pointer">
                                                    <Trash className="h-4 w-4" />
                                                    <span>Delete</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                )}
                            </div>

                            {isEditing && isAuthor ? (
                                <div
                                    className="flex flex-col gap-2"
                                    onClick={handleEditingClick}
                                >
                                    <textarea
                                        value={content}
                                        onChange={(e) =>
                                            setContent(e.target.value)
                                        }
                                        className="w-full p-2 border border-gray-200 rounded-md font-geologica"
                                        rows={3}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                        }}
                                    />
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                setIsEditing(false);
                                            }}
                                            className="px-3 py-1 text-base text-gray-600 hover:bg-gray-100 rounded-md font-geologica cursor-pointer"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                handleContentSave();
                                            }}
                                            className="px-3 py-1 text-base text-white bg-[#8881D8] hover:bg-[#7069d0] rounded-md font-geologica cursor-pointer"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-gray-800 font-normal">
                                    {content}
                                </p>
                            )}

                            {/* Like info */}
                            {likesData.length > 0 && (
                                <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                                    <Users className="h-3 w-3" />
                                    <span>
                                        {likesCount} people liked this post
                                    </span>
                                </div>
                            )}

                            {/* Like and Comment buttons */}
                            <div className="flex items-center gap-4 mt-3">
                                <button
                                    onClick={handleLike}
                                    className={`flex items-center gap-1 text-sm cursor-pointer ${
                                        hasLiked
                                            ? "text-red-500"
                                            : "text-gray-500 hover:text-red-500"
                                    }`}
                                >
                                    <Heart
                                        className={`h-4 w-4 ${
                                            hasLiked ? "fill-red-500" : ""
                                        }`}
                                    />
                                    <span>{likesCount}</span>
                                </button>
                                <button
                                    onClick={handleToggleComments}
                                    className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#8881D8] cursor-pointer"
                                >
                                    <MessageCircle className="h-4 w-4" />
                                    <span>{commentsCount}</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Comments section - showing only the latest comment */}
                    {showComments && latestComment && (
                        <div
                            className="mt-3 border-t border-gray-100 pt-3"
                            onClick={handleCommentInputClick}
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="text-sm font-medium text-gray-700">
                                    Comments
                                </h4>
                                {commentsData.length > 1 && (
                                    <a
                                        href={`/thought/${id}`}
                                        className="text-xs text-primary-100 flex items-center gap-1 hover:underline cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // Don't prevent default here as we want the link to work
                                        }}
                                    >
                                        View all comments{" "}
                                        <ChevronRight className="h-3 w-3" />
                                    </a>
                                )}
                            </div>

                            <div className="space-y-3">
                                {/* Display only the latest comment */}
                                <div className="flex gap-2">
                                    <div className="w-6 h-6 rounded-full overflow-hidden relative flex-shrink-0">
                                        <Image
                                            src={latestComment.authorImage}
                                            alt={latestComment.authorName}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-2 text-sm flex-1">
                                        <div className="font-medium text-gray-900">
                                            {latestComment.authorName}
                                        </div>
                                        <p className="text-gray-800 text-sm">
                                            {latestComment.text}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Comment input section */}
                    <div
                        className="flex items-center gap-3 mt-4"
                        onClick={handleCommentInputClick}
                    >
                        <div className="w-8 h-8 rounded-full overflow-hidden relative">
                            <Image
                                src={currentUserImage}
                                alt="Your avatar"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex-1 h-10 flex items-center justify-center gap-2">
                            <input
                                type="text"
                                placeholder="Write a comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="flex-1 px-4 h-full text-base text-sm border-gray-200 rounded-full font-geologica bg-[#f4f3fd] outline-none"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        handleComment();
                                    }
                                }}
                            />
                            <button
                                className={`rounded-full h-full aspect-square flex items-center justify-center text-base text-white rounded-full font-geologica cursor-pointer duration-100 ${
                                    comment.trim()
                                        ? "bg-[#8881D8] hover:bg-[#7069d0]"
                                        : "bg-[#b8b2ec] cursor-not-allowed"
                                }`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    handleComment(e);
                                }}
                                disabled={!comment.trim()}
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
