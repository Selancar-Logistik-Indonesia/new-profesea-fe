// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => [
    {
        path: '/home',
        title: 'Home',
        icon: 'mdi:home-outline',
        action: 'read',
        subject: 'home',
    },
    {
        path: '/community',
        title: 'Community',
        icon: 'mdi:public',
        action: 'read',
        subject: 'community',
    },
    {
        path: '/job-management',
        title: 'Manage Job',
        icon: 'mdi:work',
        action: 'read',
        subject: 'job-management',
    },
    {
        path: '/find-candidate',
        title: 'Find Candidate',
        icon: 'mdi:people',
        action: 'read',
        subject: 'find-candidate',
    }
]

export default navigation
