import { Grid, Typography, Box, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { ReactNode } from 'react'
import landingPageStyle from 'src/@core/styles/landing-page/landing-page-trainer'
import { useTranslation } from 'react-i18next'
import FooterView from 'src/views/landing-page/footerView'
import Head from 'next/head'
import themeConfig from 'src/configs/themeConfig'
import LandingPageLayout from 'src/@core/layouts/LandingPageLayout'
import TrainingPartner from 'src/views/training/TrainingPartner'
import SeafarerOngoingTraining from './OngoingTraining'

const Main = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <>
      <Head>
        <title>{`${themeConfig.templateName} - ${t('landing_training_title')}`}</title>
        <meta name='description' content={`${themeConfig.templateName} - ${t('landing_training_description')}`} />
        <meta name='keywords' content={`${t('app_keyword')}`} />
        <meta name='viewport' content='initial-scale=0.8, width=device-width' />
        <meta name='og:title' content={`${themeConfig.templateName} - ${t('landing_training_title')}`} />
        <meta name='og:description' content={`${themeConfig.templateName} - ${t('landing_training_description')}`} />
        <meta property='og:image' content='images/logoprofesea.png' />
      </Head>
      <Box>
        <Grid container sx={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
          <Grid
            item
            xs={12}
            sx={{
              ...landingPageStyle.bannerHero,
              my: 2,
              mx: 12,
              pl: { xs: 4, md: 6 },
              display: 'flex',
              gap: 2,
              borderRadius: '10px',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <Box my={6}>
              <Typography
                variant='h1'
                style={{ color: '#FFFFFF', fontWeight: '800', letterSpacing: 0.6 }}
                sx={{
                  maxWidth: { xs: '100%', md: '50%' },
                  px: { xs: 2, md: 4, whiteSpace: 'null' },
                  mb: 4,
                  fontSize: { xs: 32, md: 48 }
                }}
              >
                {t('landing_trainer_title')}
              </Typography>
              <Typography
                variant='h2'
                style={{ color: '#FFFFFF', fontWeight: '500', letterSpacing: 0.6 }}
                sx={{ maxWidth: { xs: '100%', md: '50%' }, px: { xs: 2, md: 4 }, mt: 2, fontSize: { xs: 16, md: 20 } }}
              >
                {t('landing_trainer_subtitle')}
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            sx={{
              display: 'flex',
              flexDirection: {
                xs: 'column-reverse',
                lg: 'row'
              },
              mx: 12,
              justifyContent: 'center',
              gap: 4
            }}
          >
            <Grid item sx={{ width: { xs: '100%', md: '200px' } }}>
              <TrainingPartner />
            </Grid>
            <Grid
              item
              xs={true}
              sx={
                isXs
                  ? {
                      direction: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'stretch',
                      alignContent: 'top',
                      marginBottom: '10px'
                    }
                  : {
                      flexGrow: 1,
                      marginBottom: '10px'
                    }
              }
            >
              <Grid>
                <SeafarerOngoingTraining />
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
