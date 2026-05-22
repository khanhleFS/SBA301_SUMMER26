import React from 'react'

interface DockItemType {
  icon: React.ReactNode
  label: string
  onClick: () => void
  className?: string
}

interface DockProps {
  items: DockItemType[]
  className?: string
  position?: 'bottom' | 'left' | 'right' | 'top'
}

export default function Dock({ items, className = '' }: DockProps) {
  return (
    <div
      className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-surface-container-high border border-outline/10 shadow-lg ${className}`}
      role="toolbar"
      aria-label="Reader controls"
    >
      {items.map((item, index) => (
        <button
          key={index}
          onClick={item.onClick}
          title={item.label}
          className={`relative group w-10 h-10 flex items-center justify-center rounded-full bg-primary text-on-primary border border-white/10 cursor-pointer hover:brightness-110 active:scale-95 transition-all ${item.className ?? ''}`}
          aria-label={item.label}
        >
          {item.icon}
          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-outline/10 bg-surface-container-high text-on-surface px-2 py-0.5 text-[10px] font-bold shadow opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50 select-none">
            {item.label}
          </span>
        </button>
      ))}
    </div>
  )
}
