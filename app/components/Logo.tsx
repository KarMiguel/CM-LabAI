'use client'

import Image from 'next/image'

export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <Image
        src="/logo.png"
        alt="CM LabAi Logo"
        width={80}
        height={80}
        className="object-contain"
        priority
      />
    </div>
  )
}
