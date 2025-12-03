'use client'

export default function Logo() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center shadow-lg">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <path
              d="M20 8L28 16L20 24L12 16L20 8Z"
              fill="currentColor"
              opacity="0.9"
            />
            <circle cx="20" cy="20" r="6" fill="currentColor" opacity="0.6" />
            <path
              d="M20 14L24 18L20 22L16 18L20 14Z"
              fill="currentColor"
              opacity="0.4"
            />
          </svg>
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary-400 rounded-full animate-pulse"></div>
      </div>
    </div>
  )
}

