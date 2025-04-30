import { Suspense } from 'react'
import HomeContent from '@/components/HomeContent'
import React from 'react'

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  )
}

export const dynamic = 'force-static'
