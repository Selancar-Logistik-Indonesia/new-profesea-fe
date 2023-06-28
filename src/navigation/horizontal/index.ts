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
        subject: 'second-page',
    },
    {
        path: '/job-management',
        title: 'Manage Job',
        icon: 'mdi:work',
        action: 'read',
        subject: 'second-page',
    },
    {
        path: '/find-candidate',
        title: 'Find Candidate',
        icon: 'mdi:people',
        action: 'read',
        subject: 'acl-page',
    }
]

export default navigation
