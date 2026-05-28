import React, { useState, useEffect } from 'react'

const ClickSparkle = () => {
  const [sparkles, setSparkles] = useState([])

  useEffect(() => {
    const handleClick = (e) => {
      // Don't trigger on buttons/links to avoid interfering, or just trigger everywhere (pointer-events-none makes it safe)
      const newSparkle = { id: Date.now() + Math.random(), x: e.clientX, y: e.clientY }
      setSparkles(prev => [...prev, newSparkle])
      
      setTimeout(() => {
        setSparkles(prev => prev.filter(s => s.id !== newSparkle.id))
      }, 500)
    }

    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  return (
    <>
      {sparkles.map(sparkle => (
        <div 
          key={sparkle.id} 
          className="pointer-events-none fixed z-[9999]"
          style={{ left: sparkle.x, top: sparkle.y }}
        >
          <svg viewBox="0 0 100 100" className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 overflow-visible text-primary animate-click-burst">
            <circle cx="50" cy="50" r="8" fill="none" stroke="currentColor" strokeWidth="5" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <line 
                key={deg}
                x1="50" y1="35" x2="50" y2="15" 
                stroke="currentColor" 
                strokeWidth="5" 
                strokeLinecap="round"
                style={{ transform: `rotate(${deg}deg)`, transformOrigin: '50px 50px' }} 
              />
            ))}
          </svg>
        </div>
      ))}
    </>
  )
}

export default ClickSparkle
