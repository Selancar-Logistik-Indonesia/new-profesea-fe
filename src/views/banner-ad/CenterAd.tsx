import { Box, Card, CardContent } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Ads from 'src/contract/models/Ads'
import { HttpClient } from 'src/services'

import { useTheme } from '@mui/material/styles'

// ** Third Party Components
import { useKeenSlider } from 'keen-slider/react'
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'

interface ICenterAdProps {
  adsLocation?: string
}

const Slides = (Ads: Ads[]) => {
  const components: JSX.Element[] = []

  const handleOnClickCTA = (cta: string, id: number) => {
    HttpClient.post(`/public/data/ads/update-ctr/${id}`).then(response => {
      if (response.status != 200) {
        throw response.data.message ?? 'Something went wrong!'
      }
    })
    if (cta) {
      window.open(cta, '_blank')
    }
  }

  Ads.forEach((item, index: number) => {
    components.push(
      <Box key={index} className='keen-slider__slide'>
        <Box
          component='img'
          src={item.show_case[0]}
          style={{
            width: '100%',
            objectFit: 'cover',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer'
          }}
          onClick={() => handleOnClickCTA(item.cta as unknown as string, item.id)}
        />
      </Box>
    )
  })

  return components
}

const CenterAd: React.FC<ICenterAdProps> = ({ adsLocation = 'home-page' }) => {
  const [ads, setAds] = useState<Ads[]>([])

  const loadAds = () => {
    HttpClient.get('/public/data/ads?take=100').then(response => {
      if (response.status != 200) {
        throw response.data.message ?? 'Something went wrong!'
      }
      const getSideAd = response?.data?.show_case.filter(
        (ad: any) => ad?.ads_placement === 'in-between-content' && ad?.show === true && ad?.ads_location === adsLocation
      )
      setAds(getSideAd)
    })
  }

  useEffect(() => {
    loadAds()
  }, [])

  const handleOnClickCTA = (cta: string, id: number) => {
    HttpClient.post(`/public/data/ads/update-ctr/${id}`).then(response => {
      if (response.status != 200) {
        throw response.data.message ?? 'Something went wrong!'
      }
    })
    if (cta) {
      window.open(cta, '_blank')
    }
  }

  const theme = useTheme()
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
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
          }, 4000)
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

  if (ads && ads.length > 1) {
    return (
      <KeenSliderWrapper>
        <Card sx={{ position: 'relative', border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
          <CardContent>
            {ads.length && (
              <Box ref={sliderRef} className='keen-slider'>
                {Slides(ads)}
              </Box>
            )}
          </CardContent>
        </Card>
      </KeenSliderWrapper>
    )
  } else if (ads && ads.length === 1) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: 0,
          boxShadow: 0,
          padding: 6,
          color: 'common.white',
          backgroundColor: '#FFFFFF'
        }}
      >
        <Box
          component='img'
          src={ads[0].show_case[0]}
          style={{
            width: '100%',
            objectFit: 'cover',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer'
          }}
          onClick={() => handleOnClickCTA(ads[0].cta as unknown as string, ads[0].id)}
        />
      </Box>
    )
  } else return null
}

export default CenterAd
