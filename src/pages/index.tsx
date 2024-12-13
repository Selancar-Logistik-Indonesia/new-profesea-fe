import { Grid } from '@mui/material'
import { ReactNode, useEffect, useState } from 'react'
import LandingPageLayout from 'src/@core/layouts/LandingPageLayout'
import { useTranslation } from 'react-i18next'
import SailOpportuniyView from 'src/views/landing-page/sailOpportunityView'
import FooterView from 'src/views/landing-page/footerView'
import Head from 'next/head'
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'
import Spinner from 'src/@core/components/spinner'
import NewsView from 'src/views/landing-page/newsView'
import SuccessStoryView from 'src/views/landing-page/SuccessStoryView'
import OurBenefitView from 'src/views/landing-page/ourBenefitView'
import TrainerPlatformView from 'src/views/landing-page/trainerPlatformView'
import RecruiterPlatformView from 'src/views/landing-page/recruiterPlatformView'
import HeaderBannerView from 'src/views/landing-page/headerBannerView'
import OurFeatureView from 'src/views/landing-page/ourFeatureView'
import OurPartnerView from 'src/views/landing-page/ourPartnerView'
import SeafarerPlatformView from 'src/views/landing-page/seafarerPlatformView'
import ProfessionalPlatformView from 'src/views/landing-page/professionalPlatformView'

const Main = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const auth = useAuth()
  const [isNavigating, setIsNavigating] = useState(true)

  useEffect(() => {
    if (auth.user) {
      router.replace('/home')
    } else {
      setIsNavigating(false)
    }
  }, [auth])

  if (isNavigating) return <Spinner />

  return (
    <>
      <Head>
        <title>{`${t('landing_hero_title')}`}</title>
        <meta name='description' content={`${t('landing_hero_subtitle')}`} />
        <meta name='keywords' content={`${t('app_keyword')}`} />
        <meta name='viewport' content='initial-scale=0.8, width=device-width' />
        <meta name='og:title' content={`${t('landing_hero_title')}`} />
        <meta name='og:description' content={`${t('landing_hero_subtitle')}`} />
        <meta property='og:image' content='images/logosamudera.png' />
      </Head>
      <Grid container>
        <HeaderBannerView />
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: '32px', md: '64px' },
            py: { xs: '32px', md: '64px' },
            px: { xs: 0, md: '120px' }
          }}
        >
          <OurPartnerView />
          <OurFeatureView />
          <SeafarerPlatformView />
          <ProfessionalPlatformView />
          <RecruiterPlatformView />
          <TrainerPlatformView />
          <OurBenefitView />
          <SuccessStoryView />
          <NewsView />
          <SailOpportuniyView />
        </Grid>
        <FooterView />
      </Grid>
    </>
  )
}

Main.guestGuard = false
Main.authGuard = false
Main.getLayout = (page: ReactNode) => <LandingPageLayout>{page}</LandingPageLayout>

export default Main
