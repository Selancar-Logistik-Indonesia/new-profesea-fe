// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => [
  {
    path: '/home',
    title: 'Home',
    icon: 'ion:home-sharp',
    action: 'read',
    subject: 'home'
  },
  {
    path: '/company',
    title: 'Home',
    icon: 'ion:home-sharp',
    action: 'read',
    subject: 'user-company'
  },
  {
    path: '/community',
    title: 'Community',
    icon: 'fluent:people-community-24-filled',
    action: 'read',
    subject: 'user-community'
  },
  {
    path: '/company/job-management',
    title: 'Manage Job',
    icon: 'mdi:work',
    action: 'read',
    subject: 'user-job-management'
  },
  {
    path: '/trainer/training',
    title: 'Manage Training',
    icon: 'mdi:work',
    action: 'read',
    subject: 'user-training-management'
  },
  {
    path: '/company/find-candidate',
    title: 'Find Candidate',
    icon: 'mdi:people',
    action: 'read',
    subject: 'user-find-candidate'
  },
  {
    path: '/candidate/find-job',
    title: 'Find Job',
    icon: 'mdi:work',
    action: 'read',
    subject: 'seaferer-jobs'
  },
  {
    path: '/candidate/training',
    title: 'My Training',
    icon: 'ion:book-sharp',
    action: 'read',
    subject: 'seaferer-training'
  },
  {
    path: '/pricing',
    title: 'Pricing',
    icon: 'raphael:dollar',
    action: 'read',
    subject: 'PricingPage'
  }
]

export default navigation
