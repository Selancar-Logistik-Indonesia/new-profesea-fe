import { Theme } from '@mui/material'
import { SxProps } from '@mui/system'

const bannerHero: SxProps<Theme> = {
  backgroundImage: 'url(/images/sail-opportunity.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: '0% center',
  height: 380
}

const landingPageStyle = {
  bannerHero
}

export default landingPageStyle
