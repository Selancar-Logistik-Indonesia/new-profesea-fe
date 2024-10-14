import { Theme } from '@mui/material'
import { SxProps } from '@mui/system'

const bannerHero: SxProps<Theme> = {
  backgroundImage: 'url(/images/sail-opportunity.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: {
    xs: '100% center',
    md: '100% 40%'
  },
  height: { xs: 250, md: 380 }
}

const landingPageStyle = {
  bannerHero
}

export default landingPageStyle
