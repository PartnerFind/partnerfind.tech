'use client'

import { useSearchParams } from 'next/navigation'
import { ReactNode, Suspense } from 'react'

import Loading3Dots from '@/components/Loading3Dots'

export default function Template({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams()

  return (
    <Suspense fallback={<Loading3Dots />} key={searchParams.toString()}>
      {children}
    </Suspense>
  )
}