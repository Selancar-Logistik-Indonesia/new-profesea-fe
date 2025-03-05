import { ReactNode } from 'react'
import { useTheme } from '@mui/material/styles'
import { Box, Button, Grid, Link, Typography, useMediaQuery } from '@mui/material'
import themeConfig from 'src/configs/themeConfig'
import { useTranslation } from 'react-i18next'
import Head from 'next/head'
import FooterView from 'src/views/landing-page/footerView'
import landingPageStyle from 'src/@core/styles/landing-page/landing-page-employer'
import LandingPageLayout from 'src/@core/layouts/LandingPageLayout'
import SectionTwo from 'src/views/employer/old component/sectionTwo'
import SectionThree from 'src/views/employer/old component/sectionThree'
import SectionFour from 'src/views/employer/old component/sectionFour'

const Main = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <>
      <Head>
        <title>{`${themeConfig.templateName} - ${t('landing_employer_title')}`}</title>
        <meta name='description' content={`${themeConfig.templateName} - ${t('landing_employer_description')}`} />
        <meta name='keywords' content={`${t('app_keyword')}`} />
        <meta name='viewport' content='initial-scale=0.8, width=device-width' />
        <meta name='og:title' content={`${themeConfig.templateName} - ${t('landing_employer_title')}`} />
        <meta name='og:description' content={`${themeConfig.templateName} - ${t('landing_employer_description')}`} />
        <meta property='og:image' content='images/logoprofesea.png' />
      </Head>
      <Grid container>
        <Grid item container sx={landingPageStyle.bannerHero}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Box sx={{ zIndex: 2, mt: { xs: -10, lg: -20 }, mx: 12 }}>
              <Typography
                variant='h1'
                sx={{ mb: 2, maxWidth: 700, fontSize: { xs: 32, md: 48 }, textShadow: '1px 1px 12px black' }}
                style={{ letterSpacing: 0.8, color: 'white', fontWeight: '800' }}
              >
                {t('landing_company_banner_hero')}
              </Typography>
              <Typography
                variant='h2'
                sx={{ mb: 5, maxWidth: 800, fontSize: { xs: 16, md: 20 }, textShadow: '1px 1px 12px black' }}
                style={{ letterSpacing: 0.8, color: 'white' }}
                dangerouslySetInnerHTML={{ __html: t('landing_company_banner_description') }}
              />
              <Link href='/register/recruiter'>
                <Button
                  style={{ backgroundColor: '#ef6c00', color: 'white' }}
                  sx={{ boxShadow: '1px 1px 5px black' }}
                  variant='contained'
                >
                  {t('landing_join_now_1')}
                </Button>
              </Link>
            </Box>
          </Box>
          {!isXs && <Box sx={landingPageStyle.bannerAsset} />}
        </Grid>
        <SectionTwo />
        <SectionThree />
        <SectionFour />
        <Grid item container sx={landingPageStyle.bannerBottom}>
          <Box sx={{ pr: 12, position: 'absolute', top: { xs: '25%', lg: '30%' }, left: '40%' }}>
            <Typography
              variant='h2'
              sx={{ mb: 2, maxWidth: 700, fontSize: { xs: 32, md: 48 }, textShadow: '1px 1px 12px black' }}
              style={{ letterSpacing: 0.8, color: 'white', fontWeight: '800' }}
              dangerouslySetInnerHTML={{ __html: t('landing_company_banner_bottom') }}
            />
            <Link href='/register/recruiter'>
              <Button
                style={{ backgroundColor: '#ef6c00', color: 'white' }}
                sx={{ boxShadow: '1px 1px 5px black' }}
                variant='contained'
              >
                {t('landing_join_now_2')}
              </Button>
            </Link>
          </Box>
        </Grid>
      </Grid>
      <FooterView />
    </>
  )
}

Main.guestGuard = false
Main.authGuard = false
Main.getLayout = (page: ReactNode) => <LandingPageLayout>{page}</LandingPageLayout>

export default Main
