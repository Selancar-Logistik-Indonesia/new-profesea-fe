import { Grid, Typography, Box, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { ReactNode } from 'react'
import landingPageStyle from 'src/@core/styles/landing-page/landing-page-trainer'
import { useTranslation } from 'react-i18next'
import FooterView from 'src/views/landing-page/footerView'
import Head from 'next/head'
import themeConfig from 'src/configs/themeConfig'
import OuterPageLayout from 'src/@core/layouts/outer-components/OuterPageLayout'
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
              p: 8,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <Typography
              // variant='h1'
              style={{ color: '#FFFFFF' }}
              mt={1}
              fontWeight='800'
              fontSize={28}
              sx={{ maxWidth: { xs: '80%', md: '60%' }, px: { xs: 2, md: 5, whiteSpace: 'null' } }}
            >
              {t('landing_trainer_title')}
            </Typography>
            <Typography
              // variant='h2'
              style={{ color: '#FFFFFF' }}
              fontWeight='500'
              fontSize={28}
              mt={4}
              sx={{ maxWidth: { xs: '68%', md: '60%' }, px: { xs: 2, md: 5 } }}
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
              gap: 3
            }}
          >
            <Grid item xs={12} md={2}>
              <Box
                sx={{
                  p: 4,
                  my: 2,
                  border: 0,
                  boxShadow: 0,
                  borderColor: 'divider',
                  boxSizing: 'border-box',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '2px',
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
                        width: '250px',
                        height: '250px',
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
              md={10}
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
Main.getLayout = (page: ReactNode) => <OuterPageLayout>{page}</OuterPageLayout>

export default Main
