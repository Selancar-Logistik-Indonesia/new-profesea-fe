import { Theme } from '@mui/material'
import { SxProps } from '@mui/system'

const bannerHero: SxProps<Theme> = {
  backgroundImage: 'url(/images/banner-landing-trainer.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: {
    xs: '0% center',
    md: '85% center',
    lg: '85% center'
  },
  maxHeight: '350px'
}

const landingPageStyle = {
  bannerHero
}

export default landingPageStyle
