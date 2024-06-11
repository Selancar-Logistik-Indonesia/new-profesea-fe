import { Theme } from '@mui/material'
import { SxProps } from '@mui/system'

const bannerHero: SxProps<Theme> = {
  display: 'flex',
  position: 'relative',
  justifyContent: 'left',
  backgroundImage: 'url(/images/bg-landing-company.png)',
  backgroundSize: 'cover',
  backgroundPosition: {
    xs: 'center 0%',
    md: 'center 60%'
  },
  height: { xs: '350px', md: '450px', lg: '500px' }
}

const bannerAsset: SxProps<Theme> = {
  zIndex: 1,
  position: 'absolute',
  bottom: 0,
  right: { md: 0, lg: 8 },
  backgroundImage: 'url(/images/profesea-people2.png)',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center 100%',
  minWidth: '540px',
  //   height: '100%',
  aspectRatio: 1
}

const bannerBottom: SxProps<Theme> = {
  position: 'relative',
  backgroundImage: 'url(/images/bg-landing-company2.png)',
  backgroundSize: 'cover',
  backgroundPosition: {
    xs: '35% center',
    md: '45% center'
  },
  height: { xs: '300px', md: '400px' }
}

const landingPageStyle = {
  bannerHero,
  bannerAsset,
  bannerBottom
}

export default landingPageStyle
