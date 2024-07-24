// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardContent from '@mui/material/CardContent'

// ** Third Party Components
import { useKeenSlider } from 'keen-slider/react'
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import { HttpClient } from 'src/services'
// import Ads from 'src/contract/models/Ads'

import Ads from 'src/contract/models/Ads'

const Slides = (Ads: Ads[]) => {
  const components: JSX.Element[] = []

  const handleOnClickCTA = (cta: string) => {
    if (cta) {
      window.open(cta, '_blank')
    }
  }

  Ads.forEach((item, index: number) => {
    components.push(
      <Box key={index} className='keen-slider__slide'>
        <Box
          component='img'
          loading='lazy'
          src={item.show_case[0]}
          style={{
            width: '100%',
            aspectRatio: 1,
            objectFit: 'cover',
            borderRadius: '8px',
            boxShadow: '3 2px 4px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer'
          }}
          onClick={() => handleOnClickCTA(item.cta as unknown as string)}
        />
      </Box>
    )
  })

  return components
}

interface ISideAdProps {
  adslocation?: string
}

const SideAdProfile: React.FC<ISideAdProps> = ({ adslocation = 'home-page' }) => {
  const [Ads, getAds] = useState<Ads[]>([])
  useEffect(() => {
    loadAds()
  }, [])

  const loadAds = () => {
    HttpClient.get('/public/data/ads?take=100').then(response => {
      if (response.status != 200) {
        throw response.data.message ?? 'Something went wrong!'
      }
      const getSideAd = response?.data?.show_case.filter(
        (ad: any) => ad?.ads_placement === 'sidebar' && ad?.show === true && ad?.ads_location === adslocation
      )
      getAds(getSideAd)
    })
  }

  const handleOnClickCTA = (cta: string) => {
    if (cta) {
      window.open(cta, '_blank')
    }
  }

  // ** Hook
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

  if (Ads && Ads.length > 1) {
    return (
      <KeenSliderWrapper>
        <Card
          sx={{
            p: '24px',
            position: 'relative',
            borderRadius: '16px',
            backgroundColor: '#FFFFFF',
            boxShadow: 3,
            overflow: 'hidden'
          }}
        >
          <CardContent>
            {Ads.length && (
              <Box ref={sliderRef} className='keen-slider'>
                {Slides(Ads)}
              </Box>
            )}
          </CardContent>
        </Card>
      </KeenSliderWrapper>
    )
  } else if (Ads && Ads.length === 1) {
    return (
      <Box sx={{ p: '20px', borderRadius: '12px', backgroundColor: '#FFFFFF', boxShadow: 3, overflow: 'hidden' }}>
        <Box
          component='img'
          loading='lazy'
          src={Ads[0].show_case[0]}
          style={{
            width: '100%',
            aspectRatio: 1,
            objectFit: 'cover',
            borderRadius: '12px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer'
          }}
          onClick={() => handleOnClickCTA(Ads[0].cta as unknown as string)}
        />
      </Box>
    )
  } else return null
}

export default SideAdProfile
