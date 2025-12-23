"use client"
import { signIn } from "next-auth/react";
import { Ruthie } from "next/font/google";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    // 1. Full-screen container: Clean white background, centered flex
    <div className="min-h-screen flex items-center justify-center p-4 bg-white dark:bg-gray-900 transition-colors duration-500">
      
      {/* 2. Main Content Area: Constrained width for clean reading */}
      <div className="text-center max-w-xl w-full">
        
        {/* 3. Modern, Fine Typography Heading */}
        <h1 className="text-6xl md:text-8xl font-light text-gray-900 dark:text-gray-100 mb-6 tracking-tight leading-none">
          Inventory <span className="font-extrabold">Manager</span>
        </h1>

        {/* 4. Description: Clean, readable, slightly muted text */}
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-md mx-auto font-serif italic">
          Your simple, powerful solution for managing stock and monitoring levels with clarity.
        </p>

        {/* 5. Minimalist Accent Line (Unique Visual Element) */}
        <div className="relative mb-12">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-1/3 mx-auto border-t border-gray-300 dark:border-gray-700"></div>
            </div>
        </div>

        {/* 6. Sign In Button: Prominent, high-contrast, and "floating" */}
        <div className="mt-20"> {/* Add extra vertical space to separate from the text block */}
            <button onClick={()=>{
              router.push("/signup");
            }}
             className="px-10 py-4 text-lg font-semibold text-white bg-indigo-600 rounded-xl shadow-2xl shadow-indigo-500/50 hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-70">
             Get Started
            </button>
        </div>

      </div>
    </div>
  );
}