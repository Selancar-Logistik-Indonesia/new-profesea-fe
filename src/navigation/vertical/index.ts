// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
    return [
      //general section
      {
        path: '/home',
        title: 'Home',
        icon: 'solar:home-smile-bold-duotone',
        action: 'read',
        subject: 'home'
      },

      // non-admin section
      {
        path: '/community',
        title: 'Community',
        icon: 'solar:users-group-two-rounded-bold-duotone',
        action: 'read',
        subject: 'user-community'
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
        icon: 'solar:book-bookmark-bold-duotone',
        action: 'read',
        subject: 'seaferer-training'
      },
      // {
      //   path: '/pricing',
      //   title: 'Pricing',
      //   icon: 'solar:tag-price-bold-duotone',
      //   action: 'read',
      //   subject: 'seaferer-training'
      // },
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
        icon: 'solar:notebook-bookmark-bold-duotone',
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
      // {
      //   path: '/trainer/my-participant',
      //   title: 'List of Participant',
      //   icon: 'solar:user-hand-up-bold-duotone',
      //   action: 'read',
      //   subject: 'user-my-participant'
      // },

      // admin section
      {
        path: '/admin/accounts/',
        title: 'Accounts',
        icon: 'solar:user-bold-duotone',
        action: 'read',
        subject: 'admin-accounts'
      },
      {
        path: '/admin/job-management/',
        title: 'Job Management',
        icon: 'solar:suitcase-lines-bold-duotone',
        action: 'read',
        subject: 'admin-job-management'
      },
      {
        path: '#',
        title: 'Training Management',
        icon: 'solar:notebook-bookmark-bold-duotone',
        action: 'read',
        subject: 'admin-training-management',
        children: [
          {
            title: 'Training',
            path: '/admin/training-management/',
            subject: 'admin-training-management',
            action: 'read'
          },
          {
            title: 'Instant',
            path: '/admin/training-management-instant/',
            subject: 'admin-training-management',
            action: 'read'
          }
        ]
      },
      {
        path: '/admin/subcription-management/',
        title: 'Subcription Management',
        icon: 'solar:leaf-bold-duotone',
        action: 'read',
        subject: 'admin-subcription-management'
      },
      {
        path: '/admin/ads-management/',
        title: 'Ads Management',
        icon: 'solar:presentation-graph-bold-duotone',
        action: 'read',
        subject: 'admin-ads-management'
      },
      {
        path: '/admin/community-management/',
        title: 'Community Management',
        icon: 'solar:users-group-two-rounded-bold-duotone',
        action: 'read',
        subject: 'admin-community-management'
      },
      {
        path: '#',
        title: 'Master Data',
        icon: 'solar:notes-bold-duotone',
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
            title: 'Job Title',
            path: '/admin/master/role-type',
            subject: 'master/role-type',
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
          },
          {
            title: 'Vessel Type',
            path: '/admin/master/vessel-type',
            subject: 'master/vessel-type',
            action: 'read'
          }
        ]
      },
      {
        path: '/admin/master-news/',
        title: 'Master news',
        icon: 'iconamoon:news-fill',
        action: 'read',
        subject: 'admin-master-news'
      }
    ]
}

export default navigation
