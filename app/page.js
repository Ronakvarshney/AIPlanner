"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-cover bg-center" 
      style={{ backgroundImage: "url('/travel-concept-with-worldwide-landmarks.jpg')" }}> 

      {/* Navbar */}
      <Navbar />

      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content Section */}
      <div className="relative z-10 text-center text-white mt-24 px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg animate-fadeIn">
          Discover Your Next <span className="text-yellow-400">Adventure</span> With AI
        </h2>
        <span className="text-xl md:text-2xl mt-3 block font-medium text-gray-200">
          Personalized Itineraries at Your Fingertips
        </span>
        <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Your personal trip planner and travel creator, crafting custom itineraries tailored 
          to your interests and budget.
        </p>

        <Link href="/createtrip">
          <button className="mt-8 bg-gradient-to-r from-blue-500 to-indigo-600 hover:scale-105 text-white text-lg font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-xl">
            Get Started, It's Free
          </button>
        </Link>
      </div>

      {/* Floating Glassmorphic Card */}
      <div className="relative z-10 w-full flex justify-center items-center mt-44">
        <div className="bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-lg w-4/5 max-w-3xl border border-white/30 animate-slideUp">
          <h3 className="text-2xl font-bold text-white">Why Choose AI-Trip?</h3>
          <p className="text-gray-200 mt-2 text-lg">
            - Tailor-made itineraries based on your interests <br />
            - AI-powered recommendations for best destinations <br />
            - Budget-friendly trip planning & seamless experience
          </p>
        </div>
      </div>

     
    </div>
  );
}



