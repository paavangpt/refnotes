import React, { useState } from "react";
import { Plus, Search } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";

interface NotesHeaderProps {
  onSearch: (query: string) => void;
  onCreateNote: () => void;
}

export default function NotesHeader({ onSearch, onCreateNote }: NotesHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { currentUser } = useUserStore();
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };
  
  return (
    <div className="p-4 border-b">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Notes</h1>
          {currentUser && (
            <p className="text-sm text-gray-500 mt-1">
              {currentUser.name}'s personal notes
            </p>
          )}
        </div>
        
        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="py-2 pl-10 pr-4 block w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
            />
          </div>
          
          <button
            onClick={onCreateNote}
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg flex items-center transition-colors duration-200 cursor-pointer"
          >
            <Plus className="h-4 w-4 mr-1" />
            <span>New Note</span>
          </button>
        </div>
      </div>
      <p className="text-gray-500 text-sm">
        {searchQuery
          ? `Showing ${filteredNotes.length} note${
              filteredNotes.length === 1 ? "" : "s"
            } matching "${searchQuery}"`
          : `You have ${notes.length} note${
              notes.length === 1 ? "" : "s"
            }`}
      </p>
    </div>
  );
} 