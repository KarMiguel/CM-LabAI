'use client'

interface FlagIconProps {
  country: 'br' | 'us' | 'es'
  className?: string
  size?: number
}

export default function FlagIcon({ country, className = '', size = 20 }: FlagIconProps) {
  const aspectRatio = 0.75
  const height = size * aspectRatio

  const flags = {
    br: (
      <svg width={size} height={height} viewBox="0 0 20 15" className={className}>
        <rect width="20" height="15" fill="#009739" />
        <path d="M10 0 L20 7.5 L10 15 L0 7.5 Z" fill="#FEDD00" />
        <circle cx="10" cy="7.5" r="4.5" fill="#012169" />
        <path
          d="M10 4.5 L10.5 6 L12 6.2 L10.8 7.2 L11 8.7 L10 8 L9 8.7 L9.2 7.2 L8 6.2 L9.5 6 Z"
          fill="#FEDD00"
        />
      </svg>
    ),
    us: (
      <svg width={size} height={height} viewBox="0 0 20 15" className={className}>
        <rect width="20" height="15" fill="#B22234" />
        <rect width="20" height="1.15" fill="#FFFFFF" y="1.15" />
        <rect width="20" height="1.15" fill="#FFFFFF" y="2.3" />
        <rect width="20" height="1.15" fill="#FFFFFF" y="3.45" />
        <rect width="20" height="1.15" fill="#FFFFFF" y="4.6" />
        <rect width="20" height="1.15" fill="#FFFFFF" y="5.75" />
        <rect width="20" height="1.15" fill="#FFFFFF" y="6.9" />
        <rect width="8" height="7.5" fill="#3C3B6E" />
        <g fill="#FFFFFF">
          <circle cx="1.5" cy="1.2" r="0.35" />
          <circle cx="3" cy="1.2" r="0.35" />
          <circle cx="4.5" cy="1.2" r="0.35" />
          <circle cx="6" cy="1.2" r="0.35" />
          <circle cx="7.5" cy="1.2" r="0.35" />
          <circle cx="2.25" cy="2.4" r="0.35" />
          <circle cx="3.75" cy="2.4" r="0.35" />
          <circle cx="5.25" cy="2.4" r="0.35" />
          <circle cx="6.75" cy="2.4" r="0.35" />
          <circle cx="1.5" cy="3.6" r="0.35" />
          <circle cx="3" cy="3.6" r="0.35" />
          <circle cx="4.5" cy="3.6" r="0.35" />
          <circle cx="6" cy="3.6" r="0.35" />
          <circle cx="7.5" cy="3.6" r="0.35" />
          <circle cx="2.25" cy="4.8" r="0.35" />
          <circle cx="3.75" cy="4.8" r="0.35" />
          <circle cx="5.25" cy="4.8" r="0.35" />
          <circle cx="6.75" cy="4.8" r="0.35" />
          <circle cx="1.5" cy="6" r="0.35" />
          <circle cx="3" cy="6" r="0.35" />
          <circle cx="4.5" cy="6" r="0.35" />
          <circle cx="6" cy="6" r="0.35" />
          <circle cx="7.5" cy="6" r="0.35" />
          <circle cx="2.25" cy="7.2" r="0.35" />
          <circle cx="3.75" cy="7.2" r="0.35" />
          <circle cx="5.25" cy="7.2" r="0.35" />
          <circle cx="6.75" cy="7.2" r="0.35" />
        </g>
      </svg>
    ),
    es: (
      <svg width={size} height={height} viewBox="0 0 20 15" className={className}>
        <rect width="20" height="5" fill="#AA151B" y="0" />
        <rect width="20" height="5" fill="#F1BF00" y="5" />
        <rect width="20" height="5" fill="#AA151B" y="10" />
        <rect x="9" y="6" width="2" height="3" fill="#AA151B" opacity="0.2" rx="0.2" />
      </svg>
    ),
  }

  return flags[country]
}

