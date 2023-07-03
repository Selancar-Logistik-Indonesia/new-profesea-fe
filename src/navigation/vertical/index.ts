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
            path: '/admin/accounts/',
            title: 'Accounts',
            icon: 'mdi:user',
            action: 'read',
            subject: 'accounts',
        },
        {
            path: '#',
            title: 'Master Data',
            icon: 'mdi:email-outline',
            action: 'read',
            subject: 'second-page',
            children: [
                {
                    title: "Job Category",
                    path: "/admin/master/job-categories",
                    subject: "/master/job-categories",
                    action: "read",
                },
                {
                    title: "Training Category",
                    path: "/admin/master/training-categories",
                    subject: "/master/training-categories",
                    action: "read",
                },
                {
                    title: "Role Level",
                    path: "/admin/master/role-level",
                    subject: "/master/role-level",
                    action: "read",
                },
            ]
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
