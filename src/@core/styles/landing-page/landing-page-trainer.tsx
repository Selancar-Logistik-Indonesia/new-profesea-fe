import { Theme } from '@mui/material'
import { SxProps } from '@mui/system'

const bannerHero: SxProps<Theme> = {
  backgroundImage: 'url(/images/banner-landing-trainer2.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: {
    xs: '80% center',
    md: 'center center'
  },
  height: '350px'
}

const landingPageStyle = {
  bannerHero
}

export default landingPageStyle
