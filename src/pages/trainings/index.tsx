import { Grid, Typography, Box, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { ReactNode } from 'react'
import landingPageStyle from 'src/@core/styles/landing-page/landing-page-trainer'
import { useTranslation } from 'react-i18next'
import FooterView from 'src/views/landing-page/footerView'
import Head from 'next/head'
import themeConfig from 'src/configs/themeConfig'
import LandingPageLayout from 'src/@core/layouts/LandingPageLayout'
import { Stack } from '@mui/system'
import OngoingTrainingScreen from './OngoingTraining'

const Main = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <>
      <Head>
        <title>{`${themeConfig.templateName} - ${t('landing_hero_title')}`}</title>
        <meta name='description' content={`${themeConfig.templateName} - ${t('landing_about_subtitle')}`} />
        <meta name='keywords' content={`${t('app_keyword')}`} />
        <meta name='viewport' content='initial-scale=0.8, width=device-width' />
      </Head>
      <Box>
        <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
          <Grid
            item
            xs={12}
            md={10}
            sx={{
              ...landingPageStyle.bannerHero,
              my: 2,
              py: 6,
              pl: { xs: 4, md: 6 },
              display: 'flex',
              gap: 2,
              borderRadius: '10px',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <Typography
              variant='h1'
              style={{ color: '#FFFFFF', fontSize: '46px', fontWeight: '800', letterSpacing: 0.6 }}
              sx={{ maxWidth: { xs: '100%', md: '50%' }, px: { xs: 2, md: 4, whiteSpace: 'null' } }}
            >
              {t('landing_trainer_title')}
            </Typography>
            <Typography
              variant='h2'
              style={{ color: '#FFFFFF', fontSize: '24px', fontWeight: '500', letterSpacing: 0.6 }}
              sx={{ maxWidth: { xs: '100%', md: '50%' }, px: { xs: 2, md: 4 }, mt: 2 }}
            >
              {t('landing_trainer_subtitle')}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={10}
            sx={{
              display: 'flex',
              flexDirection: {
                xs: 'column-reverse',
                lg: 'row'
              },
              justifyContent: 'center',
              gap: 2
            }}
          >
            <Grid item xs={12} md={2.5}>
              <Box
                sx={{
                  p: 4,
                  my: 2,
                  borderColor: 'divider',
                  boxSizing: 'border-box',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '4px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  overflow: 'hidden'
                }}
              >
                <Typography sx={{ fontWeight: 'bold', color: 'text.primary' }} fontSize={18}>
                  Training Partners
                </Typography>
                <Stack spacing={2} mt={2}>
                  <Grid item sx={{ alignItems: 'center', justifyContent: 'center' }}>
                    <img
                      alt='logo'
                      src={'/images/training-partner1.jpg'}
                      style={{
                        width: '100%',
                        aspectRatio: '1',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                  </Grid>
                </Stack>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={9.5}
              sx={
                !hidden
                  ? {
                      direction: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'stretch',
                      alignContent: 'top',
                      marginBottom: '10px'
                    }
                  : {}
              }
            >
              <Grid>
                <OngoingTrainingScreen />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <FooterView />
    </>
  )
}

Main.guestGuard = false
Main.authGuard = false
Main.getLayout = (page: ReactNode) => <LandingPageLayout>{page}</LandingPageLayout>

export default Main
