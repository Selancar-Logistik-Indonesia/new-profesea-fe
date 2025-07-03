import { Theme } from '@mui/material'
import { SxProps } from '@mui/system'

const Seafarer: SxProps<Theme> = {
  loading: 'lazy',
  backgroundImage: 'url(/images/seafarer-platform-banner.webp)',
  backgroundSize: '120%',
  backgroundPosition: 'center 25%'
}

const Professional: SxProps<Theme> = {
  loading: 'lazy',
  backgroundImage: 'url(/images/professional-platform-banner.webp)',
  backgroundSize: '110%',
  backgroundPosition: 'center 10%'
}

const Hospitality: SxProps<Theme> = {
  loading: 'lazy',
  backgroundImage: 'url(/images/hospitality-platform-banner.png)',
  backgroundSize: '110%',
  backgroundPosition: 'center 10%'
}

const Recruiter: SxProps<Theme> = {
  loading: 'lazy',
  backgroundImage: 'url(/images/recruiter-platform-banner.webp)',
  backgroundSize: '110%',
  backgroundPosition: '90% 30%'
}

const landingPageStyle = {
  Seafarer,
  Professional,
  Recruiter,
  Hospitality
}

export default landingPageStyle
