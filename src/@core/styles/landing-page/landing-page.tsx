import { Theme } from '@mui/material'
import { SxProps } from '@mui/system'

const bannerHero: SxProps<Theme> = {
  backgroundImage: 'url(/images/banner-website.png)',
  backgroundSize: 'cover',
  backgroundPosition: {
    xs: '60% 40%',
    md: '60% 40%'
  },
  height: '100%'
}

const bannerAsset: SxProps<Theme> = {
  backgroundImage: 'url(/images/profesea-people.png)',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: {
    md: 'center 40px',
    lg: 'center 50px'
  },
  height: {
    md: '50%',
    xl: '100%'
  },
  width: '100%'
}

const landingPageStyle = {
  bannerHero,
  bannerAsset
}

export default landingPageStyle
