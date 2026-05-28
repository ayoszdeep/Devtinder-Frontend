import React, { useEffect, useState, useRef } from 'react'

const COLORS = {
  darkpink: 'rgba(236, 72, 153, 0.35)',
  lightorange: 'rgba(255, 115, 0, 0.35)',
}

const MouseGlow = () => {
  const [pos, setPos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const targetRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const posRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const requestRef = useRef()

  const [color, setColor] = useState(() => {
    const t = document.documentElement.getAttribute('data-theme')
    return COLORS[t] || COLORS.darkpink
  })

  useEffect(() => {
    const updateTarget = () => {
      targetRef.current = {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      }
    }

    // Pick a new random target every 3 seconds
    const interval = setInterval(updateTarget, 3000)

    const animate = () => {
      // Smoothly interpolate current position towards target position
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.015
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.015
      
      setPos({ x: posRef.current.x, y: posRef.current.y })
      requestRef.current = requestAnimationFrame(animate)
    }

    requestRef.current = requestAnimationFrame(animate)

    const obs = new MutationObserver(() => {
      const t = document.documentElement.getAttribute('data-theme')
      setColor(COLORS[t] || COLORS.darkpink)
    })
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    return () => {
      clearInterval(interval)
      cancelAnimationFrame(requestRef.current)
      obs.disconnect()
    }
  }, [])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background: `radial-gradient(800px at ${pos.x}px ${pos.y}px, ${color}, transparent 70%)`,
      }}
    />
  )
}

export default MouseGlow