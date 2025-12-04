'use client'

// Importações absolutas das bandeiras
const PtFlag = require('../../../public/flags/pt').PtFlag
const EnFlag = require('../../../public/flags/en').EnFlag
const EsFlag = require('../../../public/flags/es').EsFlag

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

