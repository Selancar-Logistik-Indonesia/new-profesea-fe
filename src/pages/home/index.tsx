import { useAuth } from 'src/hooks/useAuth'
import Trainer from '../trainer'
import SocialFeed from '../socialfeed'
import Company from '../company'
import AdminHomePage from '../admin/'
import Candidate from '../candidate'
import DialogSuccess from '../loginevent/DialogSuccess'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { getOnboardingLink } from 'src/utils/helpers'
import { useRouter } from 'next/router'

const Home = () => {
  const [openBlockModal, setOpenBlockModal] = useState(true)
  const { user } = useAuth()
  const router = useRouter()
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
    if (user) {
      if (!user.email_verified_at) {
        return router.replace(`/verify-email/`)
      }

      if (user.role == 'admin') return <AdminHomePage />

      if (user.last_step === 'completed') {
        return <SocialFeed />
      } else {
        if (user.role == 'Company') {
          return <Company />
        } else if (user.role == 'Trainer') {
          return <Trainer />
        } else if (user.role == 'Seafarer') {
          return <Candidate />
        }

        const onboardingLink = getOnboardingLink(user)
        if (user.last_step === 'role-selection') {
          return router.replace(`/${user.last_step}`)
        }

        return router.replace(`/onboarding/${onboardingLink}/${user.last_step}`)
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
