// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
    return [
        {
            path: '/home',
            title: 'Home',
            icon: 'mdi:home-outline',
            action: 'read',
            subject: 'home',
        },
        {
            path: '/second-page',
            title: 'Second Page',
            icon: 'mdi:email-outline',
            action: 'read',
            subject: 'second-page',
        },
        {
            path: '/acl',
            title: 'Access Control',
            icon: 'mdi:shield-outline',
            action: 'read',
            subject: 'acl-page',
        }
    ]
}

export default navigation
