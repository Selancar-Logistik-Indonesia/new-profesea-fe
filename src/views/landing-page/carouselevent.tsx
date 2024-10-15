import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'

const CarouselEvent = ({ children }: { children: React.ReactNode[] | null }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex === React.Children.count(children) - 1 ? 0 : prevIndex + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [children])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart !== null && touchEnd !== null) {
      const distance = touchStart - touchEnd
      const swipeThreshold = 50

      if (distance > swipeThreshold) {
        setCurrentIndex(prevIndex => Math.min(prevIndex + 1, React.Children.count(children) - 1))
      }

      if (distance < -swipeThreshold) {
        setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0))
      }
    }

    setTouchStart(null)
    setTouchEnd(null)
  }

  return (
    <Box
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      sx={{ position: 'relative', width: '100%', overflow: 'hidden' }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          transition: 'transform 0.5s ease',
          transform: `translateX(calc(-${currentIndex * 100}% - ${currentIndex * 24}px))`,
          gap: '24px'
        }}
      >
        {React.Children.map(children, (child, index) => (
          <Box key={index} sx={{ minWidth: '100%' }}>
            {child}
          </Box>
        ))}
      </Box>
      <Box sx={{ mt: '24px', display: 'flex', gap: '8px', justifyContent: 'center' }}>
        {React.Children.map(children, (_, index) => (
          <Box
            key={index}
            onClick={() => setCurrentIndex(index)}
            sx={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: currentIndex === index ? 'primary.main' : 'grey.400',
              cursor: 'pointer'
            }}
          />
        ))}
      </Box>
    </Box>
  )
}

export default CarouselEvent
