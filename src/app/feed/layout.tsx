"use client";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ThoughtCreator from "./components/ThoughtCreator";

export default function FeedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-full w-full bg-[#FBFCFF] flex flex-col">
            <Navbar />
            <div className="flex-1 flex pt-5 gap-0">
                <Sidebar />
                <main className="flex-1 max-w-7xl mx-auto overflow-scroll">
                    {children}
                </main>
                <ThoughtCreator />
            </div>
        </div>
    );
}
