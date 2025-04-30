import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next/types'
import React, { ReactNode } from 'react'
import LandingPageLayout from 'src/@core/layouts/LandingPageLayout'

const ListTrainings = () => {
  return null
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/trainings/all',
      permanent: false // gunakan true kalau URL sudah pasti diganti secara permanen
    }
  }
}

ListTrainings.guestGuard = false
ListTrainings.authGuard = false
ListTrainings.getLayout = (page: ReactNode) => <LandingPageLayout>{page}</LandingPageLayout>

export default ListTrainings
