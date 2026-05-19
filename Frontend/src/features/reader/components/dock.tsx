import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, MotionValue } from 'framer-motion'
import React, { Children, cloneElement, useEffect, useMemo, useRef, useState } from 'react'

interface DockItemProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  mouseCoordinate: MotionValue<number>
  spring: { mass: number; stiffness: number; damping: number }
  distance: number
  magnification: number
  baseItemSize: number
  position: 'bottom' | 'left' | 'right' | 'top'
}

function DockItem({ 
  children, 
  className = '', 
  onClick, 
  mouseCoordinate, 
  spring, 
  distance, 
  magnification, 
  baseItemSize,
  position
}: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isHovered = useMotionValue(0)
  const isHorizontal = position === 'bottom' || position === 'top'

  // Tính khoảng cách di chuột dựa trên trục của thanh Dock
  const mouseDistance = useTransform(mouseCoordinate, val => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      y: 0,
      width: baseItemSize,
      height: baseItemSize
    }
    const itemPos = isHorizontal ? rect.x : rect.y
    return val - itemPos - baseItemSize / 2
  })

  const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize])
  const size = useSpring(targetSize, spring)

  return (
    <motion.div
      ref={ref}
      style={{
        width: size,
        height: size
      }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center rounded-xl bg-surface-container border border-outline/15 shadow-md cursor-pointer outline-none select-none transition-colors hover:border-primary/45 ${className}`}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      {/* Truyền trạng thái hover động xuống các con để kích hoạt label hiển thị */}
      {Children.map(children, child => {
        if (React.isValidElement(child)) {
          return cloneElement(child, { isHovered, position } as any)
        }
        return child
      })}
    </motion.div>
  )
}

interface DockLabelProps {
  children: React.ReactNode
  className?: string
  isHovered?: MotionValue<number> // Nhận ngầm từ DockItem
  position?: 'bottom' | 'left' | 'right' | 'top' // Nhận ngầm từ DockItem
}

function DockLabel({ children, className = '', isHovered, position = 'bottom' }: DockLabelProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!isHovered) return
    const unsubscribe = isHovered.on('change', latest => {
      setIsVisible(latest === 1)
    })
    return () => unsubscribe()
  }, [isHovered])

  // Định vị trí nhãn Tooltip thông minh dựa trên tư thế của thanh Dock
  const labelClasses = useMemo(() => {
    if (position === 'left') {
      return 'left-14 top-1/2 -translate-y-1/2'
    }
    if (position === 'right') {
      return 'right-14 top-1/2 -translate-y-1/2'
    }
    if (position === 'top') {
      return 'top-14 left-1/2 -translate-x-1/2'
    }
    return '-top-9 left-1/2 -translate-x-1/2'
  }, [position])

  const initialAnim = useMemo(() => {
    if (position === 'left' || position === 'right') return { opacity: 0, x: 0 }
    return { opacity: 0, y: 0 }
  }, [position])

  const animateAnim = useMemo(() => {
    if (position === 'left') return { opacity: 1, x: 8 }
    if (position === 'right') return { opacity: 1, x: -8 }
    if (position === 'top') return { opacity: 1, y: 8 }
    return { opacity: 1, y: -8 }
  }, [position])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={initialAnim}
          animate={animateAnim}
          exit={initialAnim}
          transition={{ duration: 0.15 }}
          className={`absolute w-fit whitespace-pre rounded-md border border-outline/10 bg-surface-container-high text-on-surface px-2.5 py-1 text-[10px] font-bold shadow-md z-50 pointer-events-none select-none ${labelClasses} ${className}`}
          role="tooltip"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function DockIcon({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`flex items-center justify-center text-foreground ${className}`}>{children}</div>
}

interface DockItemType {
  icon: React.ReactNode
  label: string
  onClick: () => void
  className?: string
}

interface DockProps {
  items: DockItemType[]
  className?: string
  spring?: { mass: number; stiffness: number; damping: number }
  magnification?: number
  distance?: number
  panelHeight?: number
  dockHeight?: number
  baseItemSize?: number
  position?: 'bottom' | 'left' | 'right' | 'top'
}

export default function Dock({
  items,
  className = '',
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 60,
  distance = 150,
  panelHeight = 56,
  dockHeight = 90,
  baseItemSize = 44,
  position = 'bottom'
}: DockProps) {
  const mouseX = useMotionValue(Infinity)
  const mouseY = useMotionValue(Infinity)
  const isHovered = useMotionValue(0)
  
  const isHorizontal = position === 'bottom' || position === 'top'
  const mouseCoordinate = isHorizontal ? mouseX : mouseY

  const maxHeight = useMemo(
    () => Math.max(dockHeight, magnification + magnification / 2 + 4),
    [magnification, dockHeight]
  )
  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight])
  const height = useSpring(heightRow, spring)

  // Định hướng Flex cho thanh Dock, hoàn toàn KHÔNG sử dụng fixed định vị ở đây
  const panelPositionClasses = useMemo(() => {
    if (position === 'left' || position === 'right') {
      return 'flex flex-col items-center py-3 px-2'
    }
    return 'flex items-center px-3 py-1.5'
  }, [position])

  return (
    <motion.div 
      style={isHorizontal ? { height } : { width: height }} 
      className="max-w-full select-none"
    >
      <motion.div
        onMouseMove={({ pageX, pageY }) => {
          isHovered.set(1)
          if (isHorizontal) {
            mouseX.set(pageX)
          } else {
            mouseY.set(pageY)
          }
        }}
        onMouseLeave={() => {
          isHovered.set(0)
          mouseX.set(Infinity)
          mouseY.set(Infinity)
        }}
        className={`w-fit gap-2 rounded-2xl bg-surface-container-high/95 border border-outline/10 shadow-2xl backdrop-blur-md z-[101] ${panelPositionClasses} ${className}`}
        style={isHorizontal ? { height: panelHeight } : { width: panelHeight }}
        role="toolbar"
        aria-label="Application dock"
      >
        {items.map((item, index) => (
          <DockItem
            key={index}
            onClick={item.onClick}
            className={item.className}
            mouseCoordinate={mouseCoordinate}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
            position={position}
          >
            <DockIcon>{item.icon}</DockIcon>
            <DockLabel>{item.label}</DockLabel>
          </DockItem>
        ))}
      </motion.div>
    </motion.div>
  )
}
