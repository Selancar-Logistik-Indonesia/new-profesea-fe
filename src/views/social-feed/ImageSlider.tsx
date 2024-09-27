import React, { useState } from 'react'
import { Grid, Box, IconButton, CardMedia } from '@mui/material'
import { Icon } from '@iconify/react'

const Slides = ({ items, currentIndex }: { items: string[]; currentIndex: number }) => {
  return (
    <CardMedia
      component='img'
      src={items[currentIndex] ? items[currentIndex] : '/images/no-image.jpg'}
      alt={items[currentIndex]}
      loading='lazy'
      sx={{
        objectFit: 'contain',
        // width: '100%',
        maxHeight: '530px'
      }}
    />
  )
}

const ImageSlider = ({ items }: { items: string[] | undefined }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!items || items.length === 0) return null

  const handlePrev = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? items.length - 1 : prevIndex - 1))
  }

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex === items.length - 1 ? 0 : prevIndex + 1))
  }

  return (
    <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          flexGrow: 1,
          position: 'relative'
        }}
      >
        <IconButton
          onClick={handlePrev}
          sx={{
            borderRadius: '200px',
            backgroundColor: '#0A0C0F',
            zIndex: 3,
            position: 'absolute',
            left: '24px'
          }}
        >
          <Icon icon='mdi:chevron-left' fontSize={24} color='white' />
        </IconButton>
        <Slides items={items} currentIndex={currentIndex} />
        <IconButton
          onClick={handleNext}
          sx={{
            backgroundColor: '#0A0C0F',
            borderRadius: '200px',
            zIndex: 3,
            position: 'absolute',
            right: '24px'
          }}
        >
          <Icon icon='mdi:chevron-right' fontSize={24} color='white' />
        </IconButton>
      </Box>
    </Grid>
  )
}

export default ImageSlider
