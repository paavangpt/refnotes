import React, { useState, useEffect, useRef, useCallback } from "react";
import { format } from "date-fns";
import {
    Bookmark,
    Palette,
    Tag,
    Trash2,
    X,
    Globe,
    Lock,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Note } from "@/data/mockNotes";
import { useNotesStore } from "@/store/useNotesStore";
import { useThoughtStore } from "@/store/useThoughtStore";
import { useUser } from "@/hooks/useUser";
import { toast, Toaster } from "react-hot-toast";

// Remove Radix UI Dialog imports
// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
//     DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";

// Generate a unique ID for new thoughts
const generateId = (): string => {
    return `thought-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

interface NoteDetailProps {
    note: Note;
}

export default function NoteDetail({ note }: NoteDetailProps) {
    const { updateNote, deleteNote, togglePinNote } = useNotesStore();
    const { addThought } = useThoughtStore();
    const { user } = useUser();

    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);
    const [tags, setTags] = useState<string[]>(note.tags);
    const [tagInput, setTagInput] = useState("");
    const [showTagInput, setShowTagInput] = useState(false);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const editorRef = useRef<HTMLDivElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const thoughtDialogRef = useRef<HTMLDivElement>(null);
    const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Selection and thought sharing states
    const [showSelectionPopup, setShowSelectionPopup] = useState(false);
    const [selectionPosition, setSelectionPosition] = useState({
        top: 0,
        left: 0,
    });
    const [selectedText, setSelectedText] = useState("");
    const [showThoughtDialog, setShowThoughtDialog] = useState(false);
    const [thoughtDialogPosition, setThoughtDialogPosition] = useState({
        top: 0,
        left: 0,
    });
    const [thoughtText, setThoughtText] = useState("");
    const [thoughtTags, setThoughtTags] = useState<string[]>([]);
    const [thoughtTagInput, setThoughtTagInput] = useState("");
    const [isPublic, setIsPublic] = useState(true);

    // Update local state when note prop changes
    useEffect(() => {
        setTitle(note.title);
        setContent(note.content);
        setTags(note.tags);
    }, [note]);

    // Save changes to store whenever content changes with debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            const updatedNote = {
                ...note,
                title,
                content,
                tags,
                updatedAt: new Date().toISOString(),
            };
            updateNote(updatedNote);
        }, 500); // Debounce for 500ms
        
        // Cleanup timeout on dependency change or component unmount
        return () => clearTimeout(timer);
    }, [title, content, tags, note, updateNote]);

    // Handle clicks outside the custom dialog to close it
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                showThoughtDialog &&
                thoughtDialogRef.current &&
                !thoughtDialogRef.current.contains(event.target as Node)
            ) {
                setShowThoughtDialog(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showThoughtDialog]);

    // Update content from contentEditable div
    const handleContentChange = () => {
        if (editorRef.current) {
            setContent(editorRef.current.innerText);
        }
    };

    // Handle text selection
    const handleTextSelection = () => {
        if (window.getSelection) {
            const selection = window.getSelection();
            const selectedText = selection?.toString().trim();

            if (selectedText && selectedText.length > 0) {
                // Get position for popup
                const range = selection?.getRangeAt(0);
                const rect = range?.getBoundingClientRect();

                if (rect) {
                    const position = {
                        top: rect.top, // Position at the selection
                        left: rect.left + rect.width / 2, // Center horizontally
                    };

                    setThoughtText(selectedText);
                    setThoughtTags([]);
                    setShowThoughtDialog(true);
                    setShowSelectionPopup(false);
                    setSelectionPosition(position);
                    // Also store the position for the thought dialog
                    setThoughtDialogPosition(position);
                    setSelectedText(selectedText);
                    setShowSelectionPopup(true);
                }
            } else {
                setShowSelectionPopup(false);
            }
        }
    };

    // Share the selected text as a thought
    const handleShareAsThought = () => {
        setThoughtText(selectedText);
        setThoughtTags([]);
        setShowThoughtDialog(true);
        setShowSelectionPopup(false);
    };

    // Add tag to thought
    const handleAddThoughtTag = () => {
        if (
            thoughtTagInput.trim() &&
            !thoughtTags.includes(thoughtTagInput.trim()) &&
            thoughtTags.length < 5
        ) {
            setThoughtTags([...thoughtTags, thoughtTagInput.trim()]);
            setThoughtTagInput("");
        }
    };

    // Remove tag from thought
    const handleRemoveThoughtTag = (tagToRemove: string) => {
        setThoughtTags(thoughtTags.filter((tag) => tag !== tagToRemove));
    };

    // Handle tag input keydown
    const handleThoughtTagKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Enter" || e.key === "," || e.key === " ") {
            e.preventDefault();
            handleAddThoughtTag();
        }
    };

    // Publish the thought
    const handlePublishThought = () => {
        if (!thoughtText.trim() || !user) return;

        const newThought = {
            id: generateId(),
            content: thoughtText.trim(),
            authorId: user.id,
            username: user.name,
            authorImage: user.avatar,
            timestamp: new Date().toISOString(),
            likes: 0,
            comments: 0,
            commentData: [],
            shares: 0,
            tags: thoughtTags.length > 0 ? thoughtTags : undefined,
            isPublic,
            likedBy: [],
        };

        // Add the thought to the store
        addThought(newThought);

        // Close dialog and show success message
        setShowThoughtDialog(false);
        setThoughtText("");
        setThoughtTags([]);
        setIsPublic(true);
        setShowSelectionPopup(false);

        toast.success("Nice thought, sent it out to the world!", {
            duration: 3000,
            style: {
                background: "#10b981",
                color: "#fff",
                borderRadius: "10px",
                padding: "16px",
            },
        });
    };

    const handleAddTag = () => {
        if (tagInput.trim() && !tags.includes(tagInput.trim())) {
            setTags([...tags, tagInput.trim()]);
            setTagInput("");
        }
        setShowTagInput(false);
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    const handleColorChange = (color: string) => {
        updateNote({
            ...note,
            color,
        });
        setShowColorPicker(false);
    };

    const selectNote = useNotesStore((state) => state.selectNote);

    const colors = [
        { name: "Default", value: "" },
        { name: "Purple", value: "#8b5cf6" },
        { name: "Blue", value: "#3b82f6" },
        { name: "Green", value: "#10b981" },
        { name: "Yellow", value: "#f59e0b" },
        { name: "Red", value: "#ef4444" },
        { name: "Pink", value: "#ec4899" },
    ];

    return (
        <div className="h-full flex flex-col bg-white pl-5 relative">
            {/* Toaster for notifications */}
            <Toaster position="bottom-right" />

            {/* Selection popup */}
            {/* {showSelectionPopup && (
                <div className="fixed z-50 bottom-10 right-10">
                    <button
                        onClick={handleShareAsThought}
                        className="flex items-center gap-1 px-3 py-1 bg-[#8881D8] text-white rounded-md text-lg hover:bg-purple-700 transition-colors cursor-pointer"
                    >
                        <Share2 className="h-3 w-3" />
                        Share as thought
                    </button>
                </div>
            )} */}

            {/* Custom Thought Dialog */}
            {showSelectionPopup && (
                <div
                    ref={thoughtDialogRef}
                    className="absolute z-50 bg-white rounded-lg border border-[#ccc] w-[450px] overflow-hidden bottom-5 right-5 shadow-[0_0_10px_-2px_rgba(138,43,226,0.2)] "
                    // style={{
                    //     top: `${thoughtDialogPosition.top}px`,
                    //     left: `${thoughtDialogPosition.left}px`,
                    //     transform: "translate(-50%, -50%)",
                    //     maxHeight: "80vh",
                    // }}
                >
                    {/* Dialog Header */}
                    <div className="px-4 py-3 border-b  flex justify-between items-center  bg-[#a287dd] text-white">
                        <h3 className="text-lg font-semibold">
                            Share as a Thought
                        </h3>
                        <button
                            onClick={() => setShowThoughtDialog(false)}
                            className="text-white cursor-pointer hover:bg-gray-50/30 p-1 rounded-full"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Dialog Content */}
                    <div className="p-4 flex flex-col gap-4 max-h-[calc(80vh-120px)] overflow-y-auto">
                        <textarea
                            value={thoughtText}
                            onChange={(e) => setThoughtText(e.target.value)}
                            className="w-full min-h-[150px] p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Edit your thought before sharing..."
                            autoFocus
                        />

                        {/* Tag input */}
                        <div className="flex items-center">
                            <input
                                type="text"
                                value={thoughtTagInput}
                                onChange={(e) =>
                                    setThoughtTagInput(e.target.value)
                                }
                                onKeyDown={handleThoughtTagKeyDown}
                                placeholder="Add tags (comma or space to separate)"
                                className="flex-1 p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <button
                                onClick={handleAddThoughtTag}
                                className="ml-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-md"
                            >
                                Add +
                            </button>
                        </div>

                        {/* Tags display */}
                        {thoughtTags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                                {thoughtTags.map((tag, index) => (
                                    <div
                                        key={index}
                                        className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full flex items-center"
                                    >
                                        {tag}
                                        <button
                                            onClick={() =>
                                                handleRemoveThoughtTag(tag)
                                            }
                                            className="ml-1 text-gray-400 hover:text-gray-600"
                                        >
                                            <X className="h-3 w-3 cursor-pointer" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Visibility toggle */}
                        <div className="flex items-center mt-2 justify-between  ">
                            <button
                                onClick={() => setIsPublic(!isPublic)}
                                className="flex items-center gap-1 text-xs cursor-pointer px-3 py-2 border rounded-full border-gray-300"
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
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setShowSelectionPopup(false)}
                                    className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handlePublishThought}
                                    disabled={!thoughtText.trim()}
                                    className={`px-4 py-2 rounded-md text-white ${
                                        !thoughtText.trim()
                                            ? "bg-gray-300 cursor-not-allowed"
                                            : "bg-purple-600 hover:bg-purple-700"
                                    } cursor-pointer`}
                                >
                                    Publish
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            {/* Title */}
            <div className="px-4 pt-8 flex justify-between">
                <div className=" flex gap-3">
                    <div
                        onChange={handleContentChange}
                        contentEditable
                        className="w-fit text-xl font-semibold outline-none"
                        suppressContentEditableWarning
                    >
                        {title}
                    </div>
                    <button
                        onClick={() => togglePinNote(note.id)}
                        className="text-gray-500 hover:text-purple-500 transition-colors cursor-pointer"
                        title={note.isPinned ? "Unpin note" : "Pin note"}
                    >
                        <Bookmark
                            className={`h-5 w-5 ${
                                note.isPinned
                                    ? "text-purple-500 fill-purple-500"
                                    : ""
                            }`}
                        />
                    </button>
                </div>
                {/* <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Note title"
                    className="w-full text-xl font-semibold outline-none"
                    style={{ backgroundColor: "transparent" }}
                /> */}
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center pl-5 gap-4">
                    <span className="text-sm text-gray-500">
                        {format(
                            new Date(note.updatedAt),
                            "MMM d, yyyy 'at' h:mm a"
                        )}
                    </span>
                    {note.color && (
                        <div
                            className="h-5 w-5 rounded-full"
                            style={{ backgroundColor: `${note.color}80` }}
                        ></div>
                    )}
                </div>
            </div>

            {/* Color picker */}
            {showColorPicker && (
                <div className="absolute right-12 top-16 p-3 bg-white shadow-lg rounded-lg border z-10">
                    <div className="flex flex-wrap gap-2">
                        {colors.map((color) => (
                            <button
                                key={color.name}
                                onClick={() => handleColorChange(color.value)}
                                className={`w-6 h-6 rounded-full border ${
                                    color.value === note.color
                                        ? "ring-2 ring-offset-2 ring-purple-500"
                                        : ""
                                }`}
                                style={{
                                    backgroundColor: color.value || "#f9fafb",
                                }}
                                title={color.name}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Tag input */}
            {showTagInput && (
                <div className="px-4 pt-2">
                    <div className="flex items-center">
                        <input
                            type="text"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={(e) =>
                                e.key === "Enter" && handleAddTag()
                            }
                            placeholder="Add a tag..."
                            className="flex-1 p-2 outline-none text-md"
                            autoFocus
                        />
                        <button
                            onClick={handleAddTag}
                            className="p-1 text-purple-500 hover:text-purple-700 cursor-pointer"
                        >
                            Add
                        </button>
                        <button
                            onClick={() => setShowTagInput(false)}
                            className="p-1 text-gray-500 hover:text-gray-700 cursor-pointer"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            )}

            {/* Tags */}
            {tags.length > 0 && (
                <div className="px-4 py-2">
                    <div className="flex flex-wrap gap-1">
                        {tags.map((tag, index) => (
                            <div
                                key={index}
                                className="px-2 py-0.5 bg-gray-100 text-gray-600 text-sm border border-[#eee] rounded-full flex items-center"
                            >
                                {tag}
                                <button
                                    onClick={() => handleRemoveTag(tag)}
                                    className="ml-1 text-gray-400 hover:text-gray-600 cursor-pointer"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Content - Obsidian-like editor */}
            <div className="flex-1 overflow-auto px-4 pb-4 grid grid-cols-1 gap-4 mt-5">
                <textarea
                    ref={textAreaRef}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyUp={handleTextSelection}
                    onMouseUp={handleTextSelection}
                    placeholder="Write your note here using Markdown..."
                    className="w-full h-full outline-none resize-none p-2 font-mono text-lg bg-transparent"
                    style={{ height: "calc(100vh - 200px)" }}
                />
            </div>
        </div>
    );
}
