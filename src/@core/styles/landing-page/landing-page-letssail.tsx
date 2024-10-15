import { Theme } from '@mui/material'
import { SxProps } from '@mui/system'

const bannerHero: SxProps<Theme> = {
  backgroundImage: `url(/images/sail-opportunity.jpg), linear-gradient(-180deg, rgba(74, 73, 73, 0.00) 0%, rgba(0, 0, 0, 1) 100%)`,
  backgroundSize: 'cover',
  backgroundColor: 'gray',
  backgroundBlendMode: 'overlay',
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
