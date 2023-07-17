// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => [
  {
    path: '/home',
    title: 'Home',
    icon: 'mdi:home-outline',
    action: 'read',
    subject: 'home'
  },
  {
    path: '/company',
    title: 'Home',
    icon: 'mdi:home-outline',
    action: 'read',
    subject: 'user-company'
  },
  {
    path: '/community',
    title: 'Community',
    icon: 'mdi:public',
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
    title: 'Find Jpb',
    icon: 'mdi:work',
    action: 'read',
    subject: 'find-job'
  },
  {
    path: '/candidate/training',
    title: 'My Training',
    icon: 'mdi:play',
    action: 'read',
    subject: 'seaferer-training'
  },
  {
    path: '/trainer/my-participant',
    title: 'List of Participant',
    icon: 'mdi:people',
    action: 'read',
    subject: 'user-my-participant'
  }
]

export default navigation
