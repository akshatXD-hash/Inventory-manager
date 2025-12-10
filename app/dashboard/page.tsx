'use client'

import React from 'react'
import Sidebar from '../components/sidebar'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to sign-in if not authenticated
  if (status === 'unauthenticated') {
    router.push('/signin');
    return null;
  }

  // Show loading state
  if (status === 'loading') {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <p>Loading...</p>
      </div>
    );
  }

  // Extract name from email
  const getName = (email: string) => {
    const username = email.split('@')[0];
    // Capitalize first letter
    return username.charAt(0).toUpperCase() + username.slice(1);
  };

  const displayName = session?.user?.name || getName(session?.user?.email || '');

  return (
    <div className='min-h-screen bg-gray-50'>
      <Sidebar currentPath='/dashboard'/>
      <div className='p-8'>
        <h1 className='text-3xl font-bold'>
          Welcome back, {displayName}!
        </h1>
      </div>
    </div>
  )
}

export default Dashboard