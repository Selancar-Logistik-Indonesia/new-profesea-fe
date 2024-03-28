// import { useTheme } from '@emotion/react'
import { Button, Divider, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Head from 'next/head'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import OuterPageLayout from 'src/@core/layouts/outer-components/OuterPageLayout'
import landingPageStyle from 'src/@core/styles/landing-page/landing-page-job'
import themeConfig from 'src/configs/themeConfig'
import FooterView from 'src/views/landing-page/footerView'

const Jobs = () => {
  const { t } = useTranslation()
  // const theme = useTheme()

  return (
    <>
      <Head>
        <title>{`${themeConfig.templateName} - ${t('landing_hero_title')}`}</title>
        <meta name='description' content={`${themeConfig.templateName} - ${t('landing_about_subtitle')}`} />
        <meta name='keywords' content={`${t('app_keyword')}`} />
        <meta name='viewport' content='initial-scale=0.8, width=device-width' />
      </Head>
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
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <Typography
            variant='h1'
            style={{ color: '#FFFFFF', fontSize: '46px', fontWeight: '800', letterSpacing: 0.6 }}
            sx={{ maxWidth: { xs: '100%', md: '50%' }, px: { xs: 2, md: 4, whiteSpace: 'null' } }}
          >
            Jobs
          </Typography>
          <Typography
            variant='h2'
            style={{ color: '#FFFFFF', fontSize: '24px', fontWeight: '500', letterSpacing: 0.6 }}
            sx={{ maxWidth: { xs: '100%', md: '50%' }, px: { xs: 2, md: 4 }, mt: 2 }}
          >
            Find Jobs
          </Typography>
        </Grid>
        <Grid item container xs={12} md={10}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', p: 2 }}>
              <Button variant='text'>Seafarer</Button>
              <Divider sx={{ mx: 1, borderRight: 2 }} />
              <Button variant='text'>Non Seafarer</Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <FooterView />
    </>
  )
}

Jobs.guestGuard = false
Jobs.authGuard = false
Jobs.getLayout = (page: ReactNode) => <OuterPageLayout>{page}</OuterPageLayout>

export default Jobs
