import { Theme } from '@mui/material'
import { SxProps } from '@mui/system'

const bannerHero: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  backgroundImage: 'url(/images/bg-landing-company.png)',
  backgroundSize: 'cover',
  backgroundPosition: {
    xs: '5% 100%',
    md: '60% 100%'
  },
  height: { xs: '450px', md: '550px', lg: '550px' }
}

const bannerAsset: SxProps<Theme> = {
  backgroundImage: 'url(/images/profesea-people2.png)',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center 100%',
  maxWidth: '625px',
  height: '100%',
  width: '100%'
}

const bannerBottom: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'flex-end',
  backgroundImage: 'url(/images/bg-landing-company2.png)',
  backgroundSize: 'cover',
  backgroundPosition: {
    xs: '35% center',
    md: '45% center'
  },
  height: { xs: '450px', md: '500px' }
}

const landingPageStyle = {
  bannerHero,
  bannerAsset,
  bannerBottom
}

export default landingPageStyle
