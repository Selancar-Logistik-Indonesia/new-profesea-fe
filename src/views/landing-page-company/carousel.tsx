import React from 'react'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import { useKeenSlider } from 'keen-slider/react'
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import { Grid, IconButton, Typography } from '@mui/material'
import { Icon } from '@iconify/react'

const Slides = (items: any[]) => {
  return items.map((arr, index) => (
    <Box key={index} className='keen-slider__slide'>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography align={'center'} fontSize={28} fontWeight={700} mb={4}>
          {arr.title}
        </Typography>
        <Box
          sx={{
            backgroundImage: `url(${arr.img})`,
            backgroundRepeat: `no-repeat`,
            backgroundSize: 'cover',
            width: '100%',
            maxWidth: '225px',
            aspectRatio: '1'
          }}
        />
        <Typography fontSize={24} align='center' sx={{ width: '100%', maxWidth: 400, mt: 4 }}>
          {arr.description}
        </Typography>
      </Box>
    </Box>
  ))
}

const Arrow = ({
  direction,
  onClick,
  disabled
}: {
  direction: 'left' | 'right'
  onClick?: () => void
  disabled?: boolean
}) => (
  <IconButton
    onClick={onClick}
    disabled={disabled}
    sx={{
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      [direction === 'left' ? 'left' : 'right']: 50,
      zIndex: 10
    }}
  >
    {direction === 'left' ? (
      <Icon icon='mdi:chevron-left' fontSize={48} />
    ) : (
      <Icon icon='mdi:chevron-right' fontSize={48} />
    )}
  </IconButton>
)

const Carousel = ({ items, timer }: { items: any[]; timer?: number }) => {
  const theme = useTheme()
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>(
    {
      slides: { spacing: 100 },
      loop: true,
      initial: 0,
      rtl: theme.direction === 'rtl'
    },
    [
      slider => {
        let mouseOver = false
        let timeout: number | ReturnType<typeof setTimeout>
        const clearNextTimeout = () => {
          clearTimeout(timeout as number)
        }
        const nextTimeout = () => {
          clearTimeout(timeout as number)
          if (mouseOver) return
          timeout = setTimeout(() => {
            slider.next()
          }, timer ?? 5000)
        }
        slider.on('created', () => {
          slider.container.addEventListener('mouseover', () => {
            mouseOver = true
            clearNextTimeout()
          })
          slider.container.addEventListener('mouseout', () => {
            mouseOver = false
            nextTimeout()
          })
          nextTimeout()
        })
        slider.on('dragStarted', clearNextTimeout)
        slider.on('animationEnded', nextTimeout)
        slider.on('updated', nextTimeout)
      }
    ]
  )

  return (
    <Grid item container xs={12}>
      <KeenSliderWrapper>
        {items.length && (
          <Box ref={sliderRef} className='keen-slider'>
            {Slides(items)}
          </Box>
        )}
        <Arrow direction='left' onClick={() => slider?.current?.prev()} />
        <Arrow direction='right' onClick={() => slider?.current?.next()} />
      </KeenSliderWrapper>
    </Grid>
  )
}

export default Carousel
