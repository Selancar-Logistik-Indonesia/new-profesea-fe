import { Theme } from '@mui/material'
import { SxProps } from '@mui/system'

const bannerHero: SxProps<Theme> = {
  backgroundImage: 'url(/images/banner-website.png)',
  backgroundSize: 'cover',
  backgroundPosition: {
    xs: '60% 40%',
    md: '60% 40%'
  },
  height: '100%'
}

const bannerAsset: SxProps<Theme> = {
  backgroundImage: 'url(/images/profesea-people.png)',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: {
    lg: 'center 30px',
    xl: 'center 50px'
  },
  height: {
    lg: '65%',
    xl: '100%'
  },
  width: '95%'
}

const SeafarerView: SxProps<Theme> = {
  backgroundImage: `url(/images/seafarer-platform-banner.webp), linear-gradient(90deg, rgba(74, 73, 73, 0.00) 0%, rgba(0, 0, 0, 5) 100%)`,
  backgroundSize: { xs: '350%', md: '120%' },
  backgroundPosition: { xs: 'center 60%', md: '100% center' },
  backgroundBlendMode: 'overlay',
  backgroundColor: 'gray',
  height: { xs: '800px', md: '622px' }
}

const ProfessionalView: SxProps<Theme> = {
  backgroundImage: `url(/images/professional-platform-banner.webp), linear-gradient(-90deg, rgba(74, 73, 73, 0.00) 0%, rgba(0, 0, 0, 5) 100%)`,
  backgroundSize: { xs: '350%', md: '120%' },
  backgroundPosition: { xs: '60% 40%', md: '0% 40%' },
  backgroundBlendMode: 'overlay',
  backgroundColor: 'gray',
  height: { xs: '800px', md: '622px' }
}

const RecruiterView: SxProps<Theme> = {
  backgroundImage: 'url(/images/recruiter-platform-banner.webp)',
  backgroundSize: 'cover',
  backgroundPosition: { xs: '0% 0%', md: '80% center' },
  width: '100%',
  height: { xs: '226px', md: '100%' }
}

const SailOpportunity: SxProps<Theme> = {
  backgroundImage: `url(/images/sail-opportunity.webp), linear-gradient(-180deg, rgba(74, 73, 73, 0.00) 0%, rgba(0, 0, 0, 1) 100%)`,
  backgroundSize: { xs: '205%', md: 'cover' },
  backgroundColor: 'gray',
  backgroundBlendMode: 'overlay',
  backgroundPosition: {
    xs: '85% 60%',
    md: '100% 40%'
  },
  height: { xs: 250, md: 380 }
}

const landingPageStyle = {
  bannerHero,
  bannerAsset,
  SeafarerView,
  ProfessionalView,
  RecruiterView,
  SailOpportunity
}

export default landingPageStyle
