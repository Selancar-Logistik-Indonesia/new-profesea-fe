import { Breadcrumbs, Link, Typography } from '@mui/material'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { MdNavigateNext } from 'react-icons/md'
import CommunityDetail from 'src/views/community/CommunityDetail'

const CommunityDetailPage = () => {
  const [admin, setIsAdmin] = useState()
  const [selectedCommunity, setSelectedCommunity] = useState<any>()
  const params = useSearchParams()
  console.log(admin)

  return (
    <>
      <Breadcrumbs
        separator={<MdNavigateNext fontSize={'17px'} color='black' />}
        aria-label='breadcrumb'
        sx={{ ml: 1, mb: 4 }}
      >
        <Link key='1' href='/' sx={{ textDecoration: 'none' }}>
          <Typography
            sx={{
              color: '#32497A',
              fontSize: '14px',
              fontWeight: 400
            }}
          >
            Home
          </Typography>
        </Link>
        <Link key='2' href={'/admin/community-management/'} sx={{ textDecoration: 'none' }}>
          <Typography
            sx={{
              color: '#32497A',
              fontSize: '14px',
              fontWeight: 400
            }}
          >
            Community Management
          </Typography>
        </Link>
        <Typography
          key='3'
          sx={{
            color: '#949EA2',
            fontSize: '14px',
            fontWeight: 400,
            cursor: 'pointer'
          }}
        >
          {selectedCommunity?.name}
        </Typography>
      </Breadcrumbs>
      <CommunityDetail
        setSelectedCommunity={setSelectedCommunity}
        setIsAdmin={setIsAdmin}
        communityId={params.get('id')}
      />
    </>
  )
}

CommunityDetailPage.acl = {
  action: 'read',
  subject: 'admin-community-management'
}

export default CommunityDetailPage
