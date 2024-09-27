import { useAuth } from 'src/hooks/useAuth'
import Trainer from '../trainer'
import SocialFeed from '../socialfeed'
import Company from '../company'
import AdminHomePage from '../admin/'
import Candidate from '../candidate'
import DialogSuccess from '../loginevent/DialogSuccess'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

const Home = () => {
  const [openBlockModal, setOpenBlockModal] = useState(true)
  const { user } = useAuth()
  const searchParams = useSearchParams()
  const event = searchParams.get('event')

  if (event != null) {
    return (
      <DialogSuccess
        visible={openBlockModal}
        onCloseClick={() => {
          setOpenBlockModal(!openBlockModal)
          window.location.replace('/home')
        }}
      />
    )
  } else {
    if (user?.role == 'Company') {
      if (user?.build_profile_at == null) {
        return <Company />
      } else {
        return <SocialFeed />
      }
    }

    if (user?.role == 'Trainer') {
      if (user?.build_profile_at == null) {
        return <Trainer />
      } else {
        return <SocialFeed />
      }
    }
    if (user?.role == 'Seafarer') {
      if (user?.build_profile_at == null) {
        return <Candidate />
      } else {
        return <SocialFeed />
      }
    }
    if (user?.role == 'admin') {
      return <AdminHomePage />
    }
  }

  return <></>
}

Home.acl = {
  action: 'read',
  subject: 'home'
}

export default Home
