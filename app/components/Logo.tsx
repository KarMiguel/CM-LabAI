'use client'

export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            {/* Frasco de laboratório */}
            <path
              d="M16 4 L20 4 L20 6 L22 6 L22 24 L20 26 L12 26 L10 24 L10 6 L12 6 L12 4 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Base do frasco */}
            <path
              d="M10 24 L22 24"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Componentes eletrônicos dentro do frasco */}
            <rect x="13" y="10" width="2" height="4" rx="1" fill="currentColor" opacity="0.8" />
            <rect x="15" y="9" width="2" height="5" rx="1" fill="currentColor" opacity="0.8" />
            <rect x="17" y="10" width="2" height="4" rx="1" fill="currentColor" opacity="0.8" />
          </svg>
        </div>
      </div>
    </div>
  )
}
