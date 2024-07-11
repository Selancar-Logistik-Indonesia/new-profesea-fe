import { Theme } from '@mui/material'
import { SxProps } from '@mui/system'

const bannerHero: SxProps<Theme> = {
  backgroundImage: 'url(/images/banner-landing-trainer2.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: {
    xs: '50% center',
    md: '85% center',
    lg: '85% center'
  },
  minHeight: '350px'
}

const highlightedCardNewsWrapper: SxProps<Theme> = {
  width: '100%',
  display: 'flex',
  justifyContent: {
    xs: 'center',
    lg: 'flex-start'
  },
  alignItems: {
    xs: 'center',
    lg: 'flex-start'
  },
  gap: 4,
  flexDirection: {
    xs: 'column',
    lg: 'row'
  }
}

const cardNewsWrapper: SxProps<Theme> = {
  width: '100%',
  display: 'flex',
  gap: 4,
  flexDirection: {
    xs: 'column',
    lg: 'row'
  }
}

const stickyTabs: SxProps<Theme> = {
  // position: '-webkit-sticky',
  width: '100%',
  position: 'sticky',
  top: 0,
  zIndex: 999
}

const landingStyleNews = {
  bannerHero,
  highlightedCardNewsWrapper,
  cardNewsWrapper,
  stickyTabs
}

export default landingStyleNews
