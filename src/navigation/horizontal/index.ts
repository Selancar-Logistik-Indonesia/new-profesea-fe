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
    path: '/community',
    title: 'Community',
    icon: 'solar:users-group-two-rounded-bold-duotone',
    action: 'read',
    subject: 'user-community'
  },
  {
    path: '/list-alumni',
    title: 'Alumni',
    icon: 'ic:twotone-school',
    action: 'read',
    subject: 'user-alumni'
  },
  {
    path: '/company',
    title: 'Home',
    icon: 'solar:home-smile-bold-duotone',
    action: 'read',
    subject: 'user-company'
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
    icon: 'ic:round-person-search',
    action: 'read',
    subject: 'user-find-candidate'
  },
  {
    path: '/candidate/find-job',
    title: 'Find Job',
    icon: 'solar:boombox-bold-duotone',
    action: 'read',
    subject: 'seafarer-jobs'
  },
  {
    path: '/candidate/trainings',
    title: 'My Training',
    icon: 'solar:notebook-bookmark-bold-duotone',
    action: 'read',
    subject: 'seafarer-training'
  },
  {
    path: '/list-group',
    title: 'Group',
    icon: 'el:group',
    action: 'read',
    subject: 'home'
  }
  // {
  //   path: '/pricing',
  //   title: 'Pricing',
  //   icon: 'solar:tag-price-bold-duotone',
  //   action: 'read',
  //   subject: 'PricingPage' m,
  // }
]

export default navigation
