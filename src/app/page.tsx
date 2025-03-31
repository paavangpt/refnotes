"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Brain, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex flex-col overflow-hidden relative">
            {/* Navbar */}
            <header className="border-b bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Brain className="h-8 w-8 text-purple-600" />
                            <div className="flex items-center mr-7">
                                <span className="font-bold text-black text-2xl">
                                    Ref
                                </span>
                                <span className="font-bold text-purple-600 text-2xl">
                                    Notes
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Button
                                onClick={() => router.push("/feed")}
                                className="bg-purple-600 hover:bg-purple-700 text-white"
                            >
                                Get Started
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                {/* Hero Section */}
                <section className="pt-20 lg:pt-28 flex justify-center items-center">
                    <div className="w-[50%] mx-auto px-4">
                        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
                            <div className="max-w-2xl text-center">
                                <h6 className="text-base">Please view at 90% zoom</h6>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
                                    Take smarter notes, share your thoughts
                                </h1>
                                <p className="text-xl text-gray-600 mb-8">
                                    RefNotes helps you organize your thoughts
                                    and collaborate with your network. Take
                                    notes, share insights, and connect with
                                    like-minded thinkers.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button
                                        onClick={() => router.push("/feed")}
                                        className="bg-purple-600 hover:bg-purple-700 hover:scale-[103%] hover:shadow-[0_0_10px_0px_rgba(138,43,226,0.2)] text-white text-lg py-6 px-8 cursor-pointer"
                                    >
                                        Get Started <ArrowRight />
                                    </Button>
                                </div>
                                <div className="mt-8 flex items-center gap-2 justify-center">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div
                                                key={i}
                                                className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-200"
                                            >
                                                <Image
                                                    src={`https://randomuser.me/api/portraits/${
                                                        i % 2 === 0
                                                            ? "women"
                                                            : "men"
                                                    }/${i + 40}.jpg`}
                                                    alt="User avatar"
                                                    width={32}
                                                    height={32}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-gray-600 text-sm">
                                        Joined by 5,000+ knowledge workers
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
            </main>

            <div></div>
            <img
                src="/home-page-preview.png"
                alt="Gradient"
                className="h-full aspect-auto bg-gradient-to-t from-white to-transparent z-10 rounded-t-2xl scale-[.8] shadow-[0_0_40px_0px_rgba(138,43,226,0.4)] overflow-hidden"
            />

            <div className="absolute z-10 w-[500px] scale-[65%] bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 scale-75 top-[120px] left-[-50px] opacity-50 hover:rotate-0 hover:opacity-100 duration-150 animate-float-left2 delay-75">
                <style jsx>{`
                    @keyframes floatLeft2 {
                        0% {
                            transform: translateY(0) rotate(-12deg) scale(0.75);
                            opacity: 0.5;
                        }
                        50% {
                            transform: translateY(-20px) rotate(-12deg)
                                scale(0.85);
                            opacity: 0.8;
                        }
                        100% {
                            transform: translateY(0) rotate(-12deg) scale(0.75);
                            opacity: 0.5;
                        }
                    }
                    .animate-float-left2 {
                        animation: floatLeft2 4s ease-in-out infinite;
                        animation-delay: -2s;
                    }
                `}</style>
                <div className="p-1 bg-gradient-to-r from-pink-500 to-orange-500"></div>
                <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                            <Image
                                src="https://randomuser.me/api/portraits/women/48.jpg"
                                alt="User avatar"
                                width={40}
                                height={40}
                            />
                        </div>
                        <div>
                            <h3 className="font-medium">UI/UX Design</h3>
                            <p className="text-sm text-gray-500">
                                Updated 3 days ago
                            </p>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <p className="text-sm text-gray-700">
                            # UI/UX Design Process ## Key Phases - Research and
                            Analysis - Wireframing and Prototyping - User
                            Testing and Feedback ## Timeline - April: Research
                            and Analysis - May: Design and Prototyping - June:
                            Testing and Iteration
                        </p>
                    </div>
                    <div className="flex gap-2 mt-4">
                        <span className="px-2 py-1 bg-pink-100 text-pink-700 text-xs rounded-full">
                            UI/UX
                        </span>
                        <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                            Design
                        </span>
                    </div>
                </div>
            </div>

            <div className="absolute z-10 w-[500px] scale-[65%] bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 scale-75 top-[340px] right-[-50px] opacity-50 hover:rotate-0 hover:opacity-100 duration-150 animate-float-right">
                <style jsx>{`
                    @keyframes floatRight {
                        0% {
                            transform: translateY(0) rotate(12deg) scale(0.75);
                            opacity: 0.5;
                        }
                        50% {
                            transform: translateY(-20px) rotate(12deg)
                                scale(0.85);
                            opacity: 0.8;
                        }
                        100% {
                            transform: translateY(0) rotate(12deg) scale(0.75);
                            opacity: 0.5;
                        }
                    }
                    .animate-float-right {
                        animation: floatRight 4s ease-in-out infinite;
                        animation-delay: 0s;
                    }
                `}</style>
                <div className="p-1 bg-gradient-to-r from-teal-500 to-cyan-500"></div>
                <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                            <Image
                                src="https://randomuser.me/api/portraits/men/47.jpg"
                                alt="User avatar"
                                width={40}
                                height={40}
                            />
                        </div>
                        <div>
                            <h3 className="font-medium">Team Building</h3>
                            <p className="text-sm text-gray-500">
                                Updated 1 day ago
                            </p>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <p className="text-sm text-gray-700">
                            Cognitive Behavioral Therapy (CBT) Key Activities:
                            Cognitive restructuring, Behavioral activation,
                            Mindfulness exercises. Timeline: April: Assessment,
                            May: Intervention, June: Follow-up.
                        </p>
                    </div>
                    <div className="flex gap-2 mt-4">
                        <span className="px-2 py-1 bg-teal-100 text-teal-700 text-xs rounded-full">
                            Team
                        </span>
                        <span className="px-2 py-1 bg-cyan-100 text-cyan-700 text-xs rounded-full">
                            Building
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
