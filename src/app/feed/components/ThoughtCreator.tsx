"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useUser } from "@/hooks/useUser";
import { useThoughtStore } from "@/store/useThoughtStore";
import { Tag, X, Globe, Lock, Send, ImagePlus } from "lucide-react";

// Generate a unique ID for new thoughts
const generateId = (): string => {
    return `thought-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

// Common tags that users can select from
const SUGGESTED_TAGS = [
    "WebDev",
    "Design",
    "UI/UX",
    "JavaScript",
    "React",
    "CSS",
    "AI",
    "Python",
    "Productivity",
    "Career",
];

export default function ThoughtCreator() {
    const [content, setContent] = useState("");
    const [isPublic, setIsPublic] = useState(true);
    const [tags, setTags] = useState<string[]>([]);
    const [currentTag, setCurrentTag] = useState("");
    const [expandedView, setExpandedView] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const { user } = useUser();
    const { addThought } = useThoughtStore();

    // Auto-resize the textarea as content grows
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [content]);

    // Focus the textarea when the component expands
    useEffect(() => {
        if (expandedView && textareaRef.current) {
            textareaRef.current.focus();
        }
    }, [expandedView]);

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
        if (!expandedView && e.target.value.length > 0) {
            setExpandedView(true);
        }
    };

    const handleAddTag = () => {
        if (currentTag && !tags.includes(currentTag) && tags.length < 5) {
            setTags([...tags, currentTag]);
            setCurrentTag("");
        }
    };

    const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAddTag();
        } else if (e.key === "," || e.key === " ") {
            e.preventDefault();
            handleAddTag();
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    const handleSuggestedTagClick = (tag: string) => {
        if (!tags.includes(tag) && tags.length < 5) {
            setTags([...tags, tag]);
        }
    };

    const handlePostThought = () => {
        if (!content.trim() || !user) return;

        const newThought = {
            id: generateId(),
            content: content.trim(),
            authorId: user.id,
            username: user.name,
            authorImage: user.avatar,
            timestamp: new Date().toISOString(),
            likes: 0,
            comments: 0,
            commentData: [],
            shares: 0,
            tags: tags.length > 0 ? tags : undefined,
            isPublic: isPublic,
            likedBy: [],
        };

        // Use the global store to add the thought
        addThought(newThought);

        // Reset the form
        setContent("");
        setTags([]);
        setIsPublic(true);
        setExpandedView(false);
    };

    // If no user is logged in, don't render the component
    if (!user) {
        return null;
    }

    return (
        <div className=" h-fit max-w-xl w-full bg-white rounded-lg p-4 border border-[#eee] shadow-sm font-geologica mb-6">
            <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden relative flex-shrink-0">
                    <Image
                        src={user.avatar}
                        alt={user.name}
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="flex-1">
                    <textarea
                        ref={textareaRef}
                        placeholder="What's on your mind?"
                        value={content}
                        onChange={handleContentChange}
                        onClick={() => !expandedView && setExpandedView(true)}
                        className="w-full p-2 resize-none min-h-[40px] rounded-lg bg-[#f4f3fd] border-0 focus:ring-0 font-geologica placeholder:text-gray-500 text-gray-800 h-[80px]"
                        rows={expandedView ? 3 : 1}
                    />

                    <div className="mt-2">
                        <div className="flex flex-wrap gap-2 mb-2">
                            {tags.map((tag) => (
                                <div
                                    key={tag}
                                    className="inline-flex items-center px-2 py-1 rounded-full bg-[#f4f3fd] text-xs"
                                >
                                    #{tag}
                                    <button
                                        onClick={() => handleRemoveTag(tag)}
                                        className="ml-1 text-gray-500 hover:text-red-500 cursor-pointer"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            ))}

                            {tags.length < 5 && (
                                <div className="inline-flex items-center">
                                    <input
                                        type="text"
                                        placeholder={
                                            tags.length === 0
                                                ? "Add tags..."
                                                : ""
                                        }
                                        value={currentTag}
                                        onChange={(e) =>
                                            setCurrentTag(e.target.value)
                                        }
                                        onKeyDown={handleTagKeyDown}
                                        onBlur={handleAddTag}
                                        className="text-xs px-2 py-1 bg-transparent border-0 focus:ring-0 w-20"
                                    />
                                </div>
                            )}
                        </div>

                        {tags.length < 5 && (
                            <div className="flex flex-wrap gap-1 mb-2">
                                {SUGGESTED_TAGS.filter(
                                    (tag) => !tags.includes(tag)
                                )
                                    .slice(0, 8)
                                    .map((tag) => (
                                        <button
                                            key={tag}
                                            onClick={() =>
                                                handleSuggestedTagClick(tag)
                                            }
                                            className="text-sm px-2 py-1 rounded-full bg-gray-100 hover:bg-[#e9e7fc] text-gray-600 cursor-pointer"
                                        >
                                            #{tag}
                                        </button>
                                    ))}
                            </div>
                        )}
                    </div>

                    {/* Actions footer */}
                    <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setIsPublic(!isPublic)}
                                className="flex items-center gap-1 text-xs cursor-pointer px-3 py-1 border rounded-full border-[#ccc]"
                            >
                                {isPublic ? (
                                    <>
                                        <Globe
                                            size={16}
                                            className="text-green-500"
                                        />
                                        <span className="text-gray-600 text-sm">
                                            Public
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <Lock
                                            size={16}
                                            className="text-gray-500"
                                        />
                                        <span className="text-gray-600 text-sm">
                                            Private
                                        </span>
                                    </>
                                )}
                            </button>
                        </div>

                        <button
                            onClick={handlePostThought}
                            disabled={!content.trim()}
                            className={`px-4 py-1.5 rounded-full flex items-center gap-1 text-white ${
                                content.trim()
                                    ? "bg-[#8881D8] hover:bg-[#7069d0] cursor-pointer"
                                    : "bg-gray-300 cursor-not-allowed"
                            }`}
                        >
                            <Send size={16} />
                            <span>Post</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
