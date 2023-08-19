// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => [
  {
    path: '/home',
    title: 'Home',
    icon: 'solar:home-smile-bold-duotone',
    action: 'read',
    subject: 'home'
  },
  {
    path: '/company',
    title: 'Home',
    icon: 'solar:home-smile-bold-duotone',
    action: 'read',
    subject: 'user-company'
  },
  {
    path: '/community',
    title: 'Community',
    icon: 'solar:command-bold-duotone',
    action: 'read',
    subject: 'user-community'
  },
  {
    path: '/company/job-management',
    title: 'Manage Job',
    icon: 'solar:case-minimalistic-bold-duotone',
    action: 'read',
    subject: 'user-job-management'
  },
  {
    path: '/trainer/training',
    title: 'Manage Training',
    icon: 'solar:book-bookmark-bold-duotone',
    action: 'read',
    subject: 'user-training-management'
  },
  {
    path: '/company/find-candidate',
    title: 'Find Candidate',
    icon: 'solar:glasses-bold-duotone',
    action: 'read',
    subject: 'user-find-candidate'
  },
  {
    path: '/candidate/find-job',
    title: 'Find Job',
    icon: 'solar:boombox-bold-duotone',
    action: 'read',
    subject: 'seaferer-jobs'
  },
  {
    path: '/candidate/training',
    title: 'My Training',
    icon: 'solar:notebook-bookmark-bold-duotone',
    action: 'read',
    subject: 'seaferer-training'
  },
  {
    path: '/pricing',
    title: 'Pricing',
    icon: 'solar:tag-price-bold-duotone',
    action: 'read',
    subject: 'PricingPage'
  }
]

export default navigation
