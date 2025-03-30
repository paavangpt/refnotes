import React from "react";
import { format } from "date-fns";
import { Bookmark } from "lucide-react";
import { Note } from "@/data/mockNotes";
import { useNotesStore } from "@/store/useNotesStore";

interface NotesGridListProps {
    notes: Note[];
}

export default function NotesGridList({ notes }: NotesGridListProps) {
    const { selectedNoteId, selectNote } = useNotesStore();

    // Group notes by pinned status
    const pinnedNotes = notes.filter((note) => note.isPinned);
    const unpinnedNotes = notes.filter((note) => !note.isPinned);

    const renderNoteItem = (note: Note) => {
        return (
            <div
                key={note.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md shadow-[0_0_10px_-2px_rgba(138,43,226,0.1)] border-[#ccc] ${
                    note.color
                        ? `bg-opacity-10 bg-${note.color.replace("#", "")}`
                        : ""
                }`}
                style={{
                    backgroundColor: note.color ? `${note.color}20` : "",
                    borderColor: selectedNoteId === note.id ? "#8b5cf6" : "",
                }}
                onClick={() => selectNote(note.id)}
            >
                <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-lg truncate">
                        {note.title}
                    </h3>
                    {note.isPinned && (
                        <Bookmark className="h-5 w-5 text-purple-500 fill-purple-500" />
                    )}
                </div>

                <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                    {note.content
                        .replace(/#|`|_|\*|\[|\]/g, "")
                        .substring(0, 150)}
                    ...
                </p>

                <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-wrap gap-1">
                        {note.tags.slice(0, 2).map((tag, index) => (
                            <span
                                key={index}
                                className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                        {note.tags.length > 2 && (
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                                +{note.tags.length - 2}
                            </span>
                        )}
                    </div>
                    <p className="text-xs text-gray-500">
                        {format(new Date(note.updatedAt), "MMM d, yyyy")}
                    </p>
                </div>
            </div>
        );
    };

    if (notes.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-8 h-8 text-gray-400"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                        />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-1">
                    No notes yet
                </h3>
                <p className="text-gray-500">
                    Create a new note to get started
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {pinnedNotes.length > 0 && (
                <div>
                    <h2 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider">
                        Pinned
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {pinnedNotes.map(renderNoteItem)}
                    </div>
                </div>
            )}

            {unpinnedNotes.length > 0 && (
                <div>
                    <h2 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider">
                        Notes
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {unpinnedNotes.map(renderNoteItem)}
                    </div>
                </div>
            )}
        </div>
    );
} 