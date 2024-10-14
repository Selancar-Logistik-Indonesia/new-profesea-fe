import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'

const CarouselEvent = ({ children }: { children: React.ReactNode[] | null }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex === (children?.length ?? 0) - 1 ? 0 : prevIndex + 1))
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
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const swipeThreshold = 50

    if (distance > swipeThreshold) {
      setCurrentIndex(prevIndex => Math.min(prevIndex + 1, (children?.length ?? 1) - 1))
    }

    if (distance < -swipeThreshold) {
      setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0))
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
          transition: 'transform 0.5s ease',
          transform: `translateX(calc(-${currentIndex * 100}% - ${currentIndex * 24}px))`,
          gap: '24px'
        }}
      >
        {children?.map((item, index) => (
          <Box key={index} sx={{ minWidth: '100%' }}>
            {item}
          </Box>
        ))}
      </Box>
      <Box sx={{ mt: '12px', display: 'flex', gap: '8px', justifyContent: 'center' }}>
        {children?.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrentIndex(index)}
            sx={{
              width: '12px',
              height: '12px',
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
