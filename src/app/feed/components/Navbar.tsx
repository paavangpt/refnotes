"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Search,
    Settings,
    LogOut,
    User,
    MessageSquare,
    BookOpen,
    Brain,
    LifeBuoy,
    Mail,
} from "lucide-react";
import { useUser } from "@/hooks/useUser";
import HydrationErrorFix from "@/components/HydrationErrorFix";

export default function Navbar() {
    // Use state to track if component is mounted (client-side)
    const [isMounted, setIsMounted] = useState(false);
    const [activeTab, setActiveTab] = useState("feed");
    const { user, isLoading, fetchUser, logout } = useUser();
    const [hamburgerOpen, setHamburgerOpen] = useState(false);
    const hamburgerRef = useRef<HTMLDivElement>(null);
    
    // Get current pathname
    const pathname = usePathname() || '';

    // Determine active tab based on pathname
    useEffect(() => {
        if (pathname.includes("/feed")) {
            setActiveTab("feed");
        } else if (pathname.includes("/profile") || pathname.includes("/my-thoughts")) {
            setActiveTab("My Thoughts");
        }
    }, [pathname]);

    // Set mounted state to true when component mounts
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Load user data when component mounts - ONLY ONCE
    useEffect(() => {
        // For demo purposes, we're loading a specific user.
        // In a real app, this would use a token or session ID
        if (!user) {
            fetchUser("user-001");
        }
    }, []); // Empty dependency array to run only once

    // Close hamburger menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                hamburgerRef.current &&
                !hamburgerRef.current.contains(event.target as Node)
            ) {
                setHamburgerOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleHamburgerMenu = useCallback(() => {
        setHamburgerOpen((prev) => !prev);
    }, []);

    return (
        <HydrationErrorFix>
            <nav className="relative z-50 font-raleway bg-white shadow-[0_1px_10px_-2px_rgba(0,0,0,0.1)]">
                <div className="max-w-screen-2xl mx-auto px-2 sm:px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Left Section - Hamburger and Search */}
                        <div className="flex items-center">
                            {/* Hamburger Menu */}
                            <div
                                className="flex relative"
                                ref={hamburgerRef}
                            >
                                <button
                                    onClick={toggleHamburgerMenu}
                                    className="p-2 rounded-md hover:bg-bg-100 cursor-pointer transition-all duration-200"
                                    aria-label="Menu"
                                >
                                    <Image
                                        src="/hamburger-menu.svg"
                                        alt="Menu"
                                        width={28}
                                        height={28}
                                        className="text-text-100"
                                    />
                                </button>

                                <div className="flex items-center mr-7">
                                    <span className="font-bold text-black text-xl">
                                        Ref
                                    </span>
                                    <span className="font-bold text-[#8881D8] text-xl">
                                        Notes
                                    </span>
                                </div>

                                {hamburgerOpen && (
                                    <div className="absolute top-[110%] left-0 mt-2 w-56 bg-white text-gray-800 rounded-md border-0 shadow-lg animate-in fade-in-50 zoom-in-95 z-50">
                                        <div className="py-1">
                                            <button
                                                className={`w-full text-left px-3 py-1.5 font-medium transition-colors duration-150 cursor-pointer ${
                                                    pathname.includes("/feed") 
                                                    ? "bg-[#8881D8]/20 text-[#6d63d9]" 
                                                    : "hover:bg-gray-100"
                                                }`}
                                                onClick={() => {
                                                    setActiveTab("feed");
                                                    setHamburgerOpen(false);
                                                }}
                                            >
                                                Community Feed
                                            </button>

                                            <button
                                                className={`w-full text-left px-3 py-1.5 font-medium transition-colors duration-150 cursor-pointer ${
                                                    pathname.includes("/profile") || pathname.includes("/my-thoughts")
                                                    ? "bg-[#8881D8]/20 text-[#6d63d9]" 
                                                    : "hover:bg-gray-100"
                                                }`}
                                                onClick={() =>
                                                    setHamburgerOpen(false)
                                                }
                                            >
                                                Your Notes
                                            </button>

                                            <button
                                                className={`w-full text-left px-3 py-1.5 font-medium transition-colors duration-150 cursor-pointer ${
                                                    pathname.includes("/chat") 
                                                    ? "bg-[#8881D8]/20 text-[#6d63d9]" 
                                                    : "hover:bg-gray-100"
                                                }`}
                                                onClick={() =>
                                                    setHamburgerOpen(false)
                                                }
                                            >
                                                Chat with RefMind
                                            </button>

                                            <div className="h-px bg-gray-200 my-1"></div>

                                            <button
                                                className={`w-full text-left px-3 py-1.5 font-medium transition-colors duration-150 cursor-pointer ${
                                                    pathname.includes("/support") 
                                                    ? "bg-[#8881D8]/20 text-[#6d63d9]" 
                                                    : "hover:bg-gray-100"
                                                }`}
                                                onClick={() =>
                                                    setHamburgerOpen(false)
                                                }
                                            >
                                                Support Us
                                            </button>

                                            <button
                                                className={`w-full text-left px-3 py-1.5 font-medium transition-colors duration-150 cursor-pointer ${
                                                    pathname.includes("/contact") 
                                                    ? "bg-[#8881D8]/20 text-[#6d63d9]" 
                                                    : "hover:bg-gray-100"
                                                }`}
                                                onClick={() =>
                                                    setHamburgerOpen(false)
                                                }
                                            >
                                                Contact Us
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Search Bar */}
                            <div className="relative w-96 bg-white rounded-lg overflow-hidden">
                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none z-10">
                                    <Search className="h-4 w-4 text-primary-100" />
                                </div>
                                <Input
                                    type="search"
                                    placeholder="Search..."
                                    className="w-full pl-10 pr-3 py-2 bg-gray-100 border-0 text-text-100 placeholder:text-accent-200/70 focus-visible:ring-0 focus-visible:border-0 focus:outline-none rounded-md h-10 transition-all duration-200 cursor-text font-raleway text-base selection:bg-gray-200 overscroll-y-auto"
                                />
                            </div>
                        </div>

                        {/* Right Section - Navigation + Profile */}
                        <div className="flex items-center space-x-2">
                            {/* Navigation Tabs */}
                            <div className="flex items-center mr-4 gap-2">
                                <Link href="/feed">
                                    <button
                                        className={`px-5 py-2 text-base font-medium rounded-md transition-all duration-200 cursor-pointer ${
                                            pathname.includes("/feed")
                                                ? "bg-[#8881D8] text-white shadow-sm"
                                                : "text-text-100 hover:bg-[#8881D8]/20 hover:text-[#7069d0] hover:shadow-sm"
                                        }`}
                                    >
                                        Feed
                                    </button>
                                </Link>
                                <Link href="/profile">
                                    <button
                                        className={`px-5 py-2 text-base font-medium rounded-md transition-all duration-200 cursor-pointer ${
                                            pathname.includes("/profile") || pathname.includes("/my-thoughts")
                                                ? "bg-[#8881D8] text-white shadow-sm"
                                                : "text-text-100 hover:bg-[#8881D8]/20 hover:text-[#7069d0] hover:shadow-sm"
                                        }`}
                                    >
                                        My Thoughts
                                    </button>
                                </Link>
                            </div>

                            {/* Profile Dropdown */}
                            <div className="flex items-center">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="relative h-fit overflow-hidden rounded-full border-2 border-[#8881D8] shadow-[0_4px_8px_rgba(136,129,216,0.3)] transition-all duration-200 p-0 mr-2 cursor-pointer"
                                        >
                                            {isMounted && user ? (
                                                <Image
                                                    src={user.avatar}
                                                    alt={`${user.name}'s profile picture`}
                                                    width={33}
                                                    height={33}
                                                    className="rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-9 h-9 rounded-full bg-accent-100 flex items-center justify-center">
                                                    <User className="h-5 w-5 text-primary-100" />
                                                </div>
                                            )}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        className="w-56 bg-white text-gray-800 rounded-md border-0 shadow-lg animate-in fade-in-50 zoom-in-95 z-50 py-1"
                                        align="end"
                                        forceMount
                                        sideOffset={5}
                                    >
                                        <div className="px-3 py-2 text-sm font-medium text-gray-500">
                                            My Account
                                        </div>

                                        <Link href="/profile">
                                            <DropdownMenuItem className="flex cursor-pointer items-center px-3 py-1.5 text-sm hover:bg-gray-100 focus:bg-gray-100 outline-none">
                                                <span>Profile</span>
                                                <span className="ml-auto text-xs text-gray-400">
                                                    ⌘ P
                                                </span>
                                            </DropdownMenuItem>
                                        </Link>

                                        <DropdownMenuItem className="flex cursor-pointer items-center px-3 py-1.5 text-sm hover:bg-gray-100 focus:bg-gray-100 outline-none">
                                            <span>Settings</span>
                                            <span className="ml-auto text-xs text-gray-400">
                                                ⌘ S
                                            </span>
                                        </DropdownMenuItem>

                                        <DropdownMenuSeparator className="h-px bg-gray-200 my-1" />

                                        <DropdownMenuItem
                                            className="flex cursor-pointer items-center px-3 py-1.5 text-sm hover:bg-gray-100 focus:bg-gray-100 outline-none"
                                            onClick={logout}
                                        >
                                            <span>Log out</span>
                                            <span className="ml-auto text-xs text-gray-400">
                                                ⌘ Q
                                            </span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </HydrationErrorFix>
    );
}
