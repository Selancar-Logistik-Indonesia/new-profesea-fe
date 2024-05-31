import { ReactNode } from 'react'
import { useTheme } from '@mui/material/styles'
import { Box, Button, Grid, Link, Typography, useMediaQuery } from '@mui/material'
import themeConfig from 'src/configs/themeConfig'
import { useTranslation } from 'react-i18next'
import Head from 'next/head'
import FooterView from 'src/views/landing-page/footerView'
import OuterPageLayout from 'src/@core/layouts/outer-components/OuterPageLayout'
import landingPageStyle from 'src/@core/styles/landing-page/landing-page-company'
import SectionTwo from 'src/views/landing-page-company/sectionTwo'
import SectionThree from 'src/views/landing-page-company/sectionThree'
import SectionFour from 'src/views/landing-page-company/sectionFour'

const Main = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <>
      <Head>
        <title>{`${themeConfig.templateName} - ${t('landing_hero_title')}`}</title>
        <meta name='description' content={`${themeConfig.templateName} - ${t('landing_about_subtitle')}`} />
        <meta name='keywords' content={`${t('app_keyword')}`} />
        <meta name='viewport' content='initial-scale=0.8, width=device-width' />
      </Head>
      <Grid container>
        <Grid item container sx={landingPageStyle.bannerHero}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Box sx={{ mt: { xs: -20, md: -30 }, pl: 10 }}>
              <Typography variant='h2' sx={{ mb: 2 }} color={'#FFFFFF'} fontWeight='800'>
                Pencarian Talenta Terbaik bersama Profesea
              </Typography>
              <Typography sx={{ mb: 5, fontSize: 20 }} color={'#FFFFFF'}>
                Akses ke sumber bakat profesional dan kru terbaik dari beragam keahlian serta pengalaman secara
                <span style={{ fontStyle: 'italic' }}> real-time </span>melalui platform digital maritim.
              </Typography>
              <Link href='/register/recruiter'>
                <Button style={{ backgroundColor: '#ef6c00', color: 'white' }} variant='contained'>
                  Gabung Sekarang
                </Button>
              </Link>
            </Box>
          </Grid>
          {!isXs && (
            <Grid item xs={5} sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Box sx={landingPageStyle.bannerAsset} />
            </Grid>
          )}
        </Grid>
        <SectionTwo />
        <SectionThree />
        <SectionFour />
        <Grid item container sx={landingPageStyle.bannerBottom}>
          <Grid
            item
            xs={6}
            sx={{
              pr: { xs: 10, md: 30, lg: 50 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'right'
            }}
          >
            <Box>
              <Typography variant='h2' sx={{ mb: 5 }} color={'#FFFFFF'} fontWeight='800'>
                Cari kandidat mudah di talent pool kami
              </Typography>
              <Link href='/register/recruiter'>
                <Button style={{ backgroundColor: '#ef6c00', color: 'white' }} variant='contained'>
                  Gabung Sekarang
                </Button>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <FooterView />
    </>
  )
}

Main.guestGuard = false
Main.authGuard = false
Main.getLayout = (page: ReactNode) => <OuterPageLayout>{page}</OuterPageLayout>

export default Main
