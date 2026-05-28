import React, { useEffect, useState } from 'react'

const COLORS = {
  darkpink: 'rgba(236, 72, 153, 0.06)',
}

const MouseGlow = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [color, setColor] = useState(() => {
    const t = document.documentElement.getAttribute('data-theme')
    return COLORS[t] || COLORS.darkpink
  })

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', move, { passive: true })

    const obs = new MutationObserver(() => {
      const t = document.documentElement.getAttribute('data-theme')
      setColor(COLORS[t] || COLORS.darkpink)
    })
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    return () => {
      window.removeEventListener('mousemove', move)
      obs.disconnect()
    }
  }, [])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-20"
      style={{
        background: `radial-gradient(600px at ${pos.x}px ${pos.y}px, ${color}, transparent 70%)`,
      }}
    />
  )
}

export default MouseGlow