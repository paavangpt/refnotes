"use client";

import React from "react";
import { useUserStore } from "@/store/useUserStore";
import { useNotesStore } from "@/store/useNotesStore";
import { Note } from "@/data/mockNotes";

import NotesNavbar from "./components/NotesNavbar";
import NotesCompactList from "./components/NotesCompactList";
import NotesGridList from "./components/NotesGridList";
import NoteDetail from "./components/NoteDetail";

export default function NotesPage() {
    const { currentUser } = useUserStore();
    const {
        notes,
        selectedNoteId,
        getUserNotes,
        getSelectedNote,
        addNote,
        selectNote,
    } = useNotesStore();

    const [searchQuery, setSearchQuery] = React.useState("");

    // Get notes for the current user
    const userNotes = React.useMemo(() => {
        if (!currentUser) return [];
        return getUserNotes(currentUser.id);
    }, [getUserNotes, currentUser, notes]);

    // Filter notes based on search query
    const filteredNotes = React.useMemo(() => {
        if (!searchQuery.trim()) return userNotes;

        const query = searchQuery.toLowerCase();
        return userNotes.filter(
            (note) =>
                note.title.toLowerCase().includes(query) ||
                note.content.toLowerCase().includes(query) ||
                note.tags.some((tag) => tag.toLowerCase().includes(query))
        );
    }, [userNotes, searchQuery]);

    // Get the selected note
    const selectedNote = getSelectedNote();

    // Handle search input change
    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    // Handle creating a new note
    const handleCreateNote = () => {
        if (!currentUser) return;

        addNote({
            userId: currentUser.id,
            title: "Untitled Note",
            content: "# Start writing here...",
            tags: [],
            color: "",
            isPinned: false,
            isPrivate: false,
        });
    };

    if (!currentUser) {
        return (
            <div className="h-screen w-full flex items-center justify-center">
                <p className="text-lg text-gray-500">
                    Please log in to view your notes.
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen bg-[#FAFCFF]">
            <NotesNavbar
                onSearch={handleSearch}
                onCreateNote={handleCreateNote}
            />

            <div className="flex-1 overflow-hidden">
                {selectedNote ? (
                    <div className="h-full flex">
                        <div className="w-80 overflow-y-auto hidden md:block shadow-[0_0_10px_-4px_rgba(138,43,226,0.5)] z-10">
                            <NotesCompactList notes={filteredNotes} />
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            <NoteDetail note={selectedNote} />
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 overflow-y-auto">
                        <NotesGridList notes={filteredNotes} />
                    </div>
                )}
            </div>
        </div>
    );
}
