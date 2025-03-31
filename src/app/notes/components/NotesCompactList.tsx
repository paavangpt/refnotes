import React from "react";
import { format } from "date-fns";
import { Bookmark } from "lucide-react";
import { Note } from "@/data/mockNotes";
import { useNotesStore } from "@/store/useNotesStore";

interface NotesCompactListProps {
    notes: Note[];
}

export default function NotesCompactList({ notes }: NotesCompactListProps) {
    const { selectedNoteId, selectNote } = useNotesStore();

    // Group notes by pinned status
    const pinnedNotes = notes.filter((note) => note.isPinned);
    const unpinnedNotes = notes.filter((note) => !note.isPinned);

    const renderNoteItem = (note: Note) => {
        return (
            <div
                key={note.id}
                className={`p-3 border rounded-lg mb-2 cursor-pointer transition-colors ${
                    selectedNoteId === note.id
                        ? "border-purple-500 bg-purple-50 shadow-[0_0_10px_-2px_rgba(138,43,226,0.2)]"
                        : "border-[#ccc] hover:border-purple-300 hover:bg-purple-50/50"
                }`}
                onClick={() => selectNote(note.id)}
            >
                <div className="flex items-center justify-between">
                    <h3 className="font-medium text-sm truncate">
                        {note.title}
                    </h3>
                    {note.isPinned && (
                        <Bookmark
                            size={14}
                            className="text-purple-500 fill-purple-500"
                        />
                    )}
                </div>
                <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                    {format(new Date(note.updatedAt), "MMM d, yyyy")}
                </p>
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
        <div className="bg-white p-5">
            {pinnedNotes.length > 0 && (
                <div>
                    <h2 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider">
                        Pinned
                    </h2>
                    <div className="space-y-2">
                        {pinnedNotes.map(renderNoteItem)}
                    </div>
                </div>
            )}

            {unpinnedNotes.length > 0 && (
                <div>
                    <h2 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider">
                        Notes
                    </h2>
                    <div className="space-y-2">
                        {unpinnedNotes.map(renderNoteItem)}
                    </div>
                </div>
            )}
        </div>
    );
} 