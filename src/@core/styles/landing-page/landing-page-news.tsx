import { Theme } from '@mui/material'
import { SxProps } from '@mui/system'

const bannerHero: SxProps<Theme> = {
  backgroundImage: 'url(/images/news-banner.png)',
  backgroundSize: 'cover',
  backgroundPosition: {
    xs: '85% center'
  },
  minHeight: {
    xs: '170px',
    lg: '380px'
  }
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

const bannerLogo: SxProps<Theme> = {
  width: '35%',
  height: '200px',
  backgroundImage: 'url(/images/white-logo-profesea.png)',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center'
}

const landingStyleNews = {
  bannerHero,
  highlightedCardNewsWrapper,
  cardNewsWrapper,
  stickyTabs,
  bannerLogo
}

export default landingStyleNews
