'use client'

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { FcSettings } from 'react-icons/fc';
import { FiBarChart2 } from 'react-icons/fi';
import { GoArchive } from 'react-icons/go';
import { PiPackage } from 'react-icons/pi';

function Sidebar({
    currentPath = "/dashboard"
}: {
    currentPath: string
}) {
    // Define a modern accent color (e.g., a vibrant blue)
    const ACCENT_COLOR_CLASSES = 'text-indigo-400';
    const HOVER_BG_CLASSES = 'hover:bg-gray-700/50'; 
    const ACTIVE_BG_CLASSES = 'bg-gray-700 shadow-inner border-l-4 border-indigo-500'; 
    const { data: session, status } = useSession();

    const navigation = [
        { name: "Dashboard", href: "/dashboard", icon: FiBarChart2 },
        { name: "Inventory", href: "/inventory", icon: PiPackage },
        { name: "Add Product", href: "/add-product", icon: FaPlus },
    ];

    const settings = [
        { name: "Settings", href: "/settings", icon: FcSettings }
    ];

    // Helper to determine if a link is active
    const isActive = (href: string) => currentPath === href;

    return (
        // KEY CHANGE HERE: 
        // Changed 'fixed' to 'sticky'. 
        // Added 'top-0' and 'h-screen' to make it fill height and stay pinned.
        // Added 'shrink-0' so it doesn't get squashed.
        <div className='sticky top-0 left-0 h-screen w-64 bg-gray-800 text-gray-100 p-4 sm:p-6 z-10 transition-all duration-300 shrink-0 flex flex-col'>
            
            {/* Logo/Header Section */}
            <div className='mb-10 pt-2'>
                <div className='flex items-center space-x-3'>
                    <GoArchive className={`w-8 h-8 ${ACCENT_COLOR_CLASSES}`} />
                    <span className='text-xl font-extrabold tracking-tight'>
                        Inventory<span className='font-light'>Manager</span>
                    </span>
                </div>
            </div>

            {/* Navigation Section - Added flex-grow so it pushes footer down naturally */}
            <nav className='space-y-6 flex-grow'>
                {/* Main Links */}
                <div>
                    <div className='text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2'>
                        Main Menu
                    </div>
                    <ul className='space-y-2'>
                        {navigation.map((item, key) => {
                            const IconComponent = item.icon;
                            const active = isActive(item.href);

                            return (
                                <li key={key}>
                                    <Link
                                        href={item.href}
                                        className={`flex items-center space-x-3 py-2 px-3 rounded-lg transition-all duration-200 
                                            ${active ? ACTIVE_BG_CLASSES : HOVER_BG_CLASSES} 
                                            ${active ? ACCENT_COLOR_CLASSES : 'text-gray-300'} 
                                            ${active ? 'font-semibold' : 'font-medium'}
                                        `}
                                    >
                                        <IconComponent className='w-5 h-5 flex-shrink-0' />
                                        <span className='text-sm'>{item.name}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                
                {/* Separator / Footer Links */}
                <div className='pt-4 border-t border-gray-700'>
                    <div className='text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2'>
                        System
                    </div>
                    <ul className='space-y-2'>
                        {settings.map((item, key) => {
                            const IconComponent = item.icon;
                            const active = isActive(item.href);

                            return (
                                <li key={key}>
                                    <Link
                                        href={item.href}
                                        className={`flex items-center space-x-3 py-2 px-3 rounded-lg transition-all duration-200 
                                            ${active ? ACTIVE_BG_CLASSES : HOVER_BG_CLASSES} 
                                            ${active ? ACCENT_COLOR_CLASSES : 'text-gray-300'} 
                                            ${active ? 'font-semibold' : 'font-medium'}
                                        `}
                                    >
                                        <IconComponent className='w-5 h-5 flex-shrink-0' />
                                        <span className='text-sm'>{item.name}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </nav>

            {/* User Profile Section - Changed from absolute to standard flex item to avoid layout breaks */}
            <div className='border-t border-gray-700 -mx-4 sm:-mx-6 px-4 sm:px-6 pt-4 mt-auto'>
                <div className='flex items-center justify-between'>
                    {/* User Info */}
                    <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold'>
                            {session?.user?.email?.charAt(0).toUpperCase()}
                        </div>
                        
                        <div className='flex flex-col'>
                            <span className='text-sm font-medium text-white max-w-[100px] truncate'>
                                {session?.user?.email?.split('@')[0]}
                            </span>
                            <span className='text-xs text-gray-400 max-w-[100px] truncate'>
                                {session?.user?.email}
                            </span>
                        </div>
                    </div>
                    
                    {/* Sign Out Button */}
                    <button
                        onClick={() => signOut({ callbackUrl: '/signin' })}
                        className='text-gray-400 hover:text-white text-sm whitespace-nowrap'
                    >
                        Sign out
                    </button>
                </div>
            </div>

        </div>
    );
}

export default Sidebar;