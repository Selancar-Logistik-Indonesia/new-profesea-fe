import { Theme } from '@mui/material'
import { SxProps } from '@mui/system'

const bannerHero: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'left',
  backgroundImage: 'url(/images/banner-landing-job.png)',
  backgroundSize: 'cover',
  backgroundPosition: {
    xs: '0% center',
    md: '85% center',
    lg: '85% center'
  },
  width: '100%',
  maxHeight: '350px'
}

const bannerAsset: SxProps<Theme> = {
  zIndex: 1,
  backgroundImage: 'url(/images/profesea-people3.png)',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center 100%',
  width: '100%',
  height: '100%'
}

const landingPageStyle = {
  bannerHero,
  bannerAsset
}

export default landingPageStyle
