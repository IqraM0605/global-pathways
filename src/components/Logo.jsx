import React from 'react'

export default function Logo({ size = 'md', dark = false }) {
  const sizes = {
    sm: { icon: 24, text: 'text-base' },
    md: { icon: 32, text: 'text-xl' },
    lg: { icon: 40, text: 'text-2xl' },
  }
  const s = sizes[size]

  return (
    <div className="flex items-center gap-2.5">
      <span className={`font-display font-bold ${s.text} ${dark ? 'text-white' : 'text-navy-900'} tracking-tight`}>
        Global<span className="text-gold-400">Pathways</span>
      </span>
    </div>
  )
}
