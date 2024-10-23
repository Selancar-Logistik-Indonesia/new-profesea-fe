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
    if (user?.role == 'admin') return <AdminHomePage />

    if (user?.last_step === 'completed') {
      return <SocialFeed />
    } else {
      if (user?.role == 'Company') {
        return <Company />
      } else if (user?.role == 'Trainer') {
        return <Trainer />
      } else if (user?.role == 'Seafarer') {
        return <Candidate />
      }
    }
  }

  return <></>
}

Home.acl = {
  action: 'read',
  subject: 'home'
}

export default Home
