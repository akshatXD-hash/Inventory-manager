'use client'

import React, { useEffect } from 'react'
import Sidebar from '../components/sidebar'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

// --- SHARED CARD HEIGHT (matches previous size) ---
const CARD_HEIGHT = 'min-h-[300px]'

// --- COMPONENT 1: Key Metrics Card ---
const KeyMetricsCard = () => (
  <div className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full ${CARD_HEIGHT}`}>
    <h3 className="text-lg font-bold text-slate-800">Key Metrics</h3>
  </div>
)

// --- COMPONENT 2: New Products Card ---
const NewProductsCard = () => (
  <div className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full ${CARD_HEIGHT}`}>
    <h3 className="text-lg font-bold text-slate-800">
      New products per week
    </h3>
  </div>
)

// --- COMPONENT 3: Stock Levels Card ---
const StockLevelsCard = () => (
  <div className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full ${CARD_HEIGHT}`}>
    <h3 className="text-lg font-bold text-slate-800">Stock Levels</h3>
  </div>
)

// --- COMPONENT 4: Efficiency Card ---
const EfficiencyCard = () => (
  <div className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full ${CARD_HEIGHT}`}>
    <h3 className="text-lg font-bold text-slate-800">Efficiency</h3>
  </div>
)

// --- MAIN DASHBOARD COMPONENT ---
function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-black">Loading...</p>
      </div>
    )
  }

  const getName = (email: string) => {
    const username = email.split('@')[0]
    return username.charAt(0).toUpperCase() + username.slice(1)
  }

  const displayName =
    session?.user?.name || getName(session?.user?.email || '')

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar currentPath="/dashboard" />

      <div className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-slate-800">
            Dashboard
          </h1>
          <p className="text-sm text-slate-500">
            Welcome back, {displayName}!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <KeyMetricsCard />
          <NewProductsCard />
          <StockLevelsCard />
          <EfficiencyCard />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
