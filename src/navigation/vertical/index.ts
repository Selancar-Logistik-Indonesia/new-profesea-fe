// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
    return [
      //general section
      {
        path: '/home',
        title: 'Home',
        icon: 'mdi:home-outline',
        action: 'read',
        subject: 'home'
      },

       // non-admin section
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
      subject: 'seaferer-training'
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
        path: '/job-management',
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
        path: '/trainer/my-participant',
        title: 'List of Participant',
        icon: 'mdi:people',
        action: 'read',
        subject: 'user-my-participant'
      },

      // admin section
      {
        path: '/admin/accounts/',
        title: 'Accounts',
        icon: 'mdi:user',
        action: 'read',
        subject: 'admin-accounts'
      },
      {
        path: '/admin/job-management/',
        title: 'Job Management',
        icon: 'mdi:clipboard-account',
        action: 'read',
        subject: 'admin-job-management'
      },
      {
        path: '/admin/training-management/',
        title: 'Training Management',
        icon: 'mdi:play',
        action: 'read',
        subject: 'admin-training-management'
      },
      {
        path: '/admin/subcription-management/',
        title: 'Subcription Management',
        icon: 'mdi:cash',
        action: 'read',
        subject: 'admin-subcription-management'
      },
      {
        path: '/admin/ads-management/',
        title: 'Ads Management',
        icon: 'mdi:currency-usd',
        action: 'read',
        subject: 'admin-ads-management'
      },
      {
        path: '/admin/community-management/',
        title: 'Community Management',
        icon: 'mdi:account-group',
        action: 'read',
        subject: 'admin-community-management'
      },
      {
        path: '#',
        title: 'Master Data',
        icon: 'mdi:email-outline',
        action: 'read',
        subject: 'admin-master-data',
        children: [
          {
            title: 'Job Category',
            path: '/admin/master/job-categories',
            subject: 'master/job-categories',
            action: 'read'
          },
          {
            title: 'Training Category',
            path: '/admin/master/training-categories',
            subject: 'master/training-categories',
            action: 'read'
          },
          {
            title: 'Role Level',
            path: '/admin/master/role-level',
            subject: 'master/role-level',
            action: 'read'
          },
          {
            title: 'Forum',
            path: '/admin/master/forum',
            subject: 'master/forum',
            action: 'read'
          }
        ]
      }
    ]
}

export default navigation
