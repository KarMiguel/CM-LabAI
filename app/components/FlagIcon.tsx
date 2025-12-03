'use client'

import { PtFlag } from '../../public/flags/pt'
import { EnFlag } from '../../public/flags/en'
import { EsFlag } from '../../public/flags/es'

interface FlagIconProps {
  country: 'br' | 'us' | 'es'
  className?: string
  size?: number
}

export default function FlagIcon({ country, className = '', size = 24 }: FlagIconProps) {
  const flags = {
    br: <PtFlag />,
    us: <EnFlag />,
    es: <EsFlag />,
  }

  return (
    <div 
      className={className}
      style={{ 
        width: size, 
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {flags[country]}
    </div>
  )
}

