import { Grid, Typography, Card, CardContent, CardHeader, Box } from '@mui/material'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import FooterView from 'src/views/landing-page/footerView'
import Head from 'next/head'
import themeConfig from 'src/configs/themeConfig'
import fsPromises from 'fs/promises'
import path from 'path'
import LandingPageLayout from 'src/@core/layouts/LandingPageLayout'

export async function getServerSideProps() {
  const filePath = path.join(process.cwd(), 'public/assets/privacypolicy/id.html')
  const data = await fsPromises.readFile(filePath)

  return {
    props: {
      tosContent: data.toString('utf-8')
    }
  }
}

const Privacy = (props: { tosContent: string }) => {
  const { t } = useTranslation()

  return (
    <>
      <Head>
        <title>{`${themeConfig.templateName} - ${t('landing_privacy_title')}`}</title>
        <meta name='description' content={`${themeConfig.templateName} - ${t('landing_privacy_description')}`} />
        <meta name='keywords' content='tos, term of service, term and condition' />
        <meta name='viewport' content='initial-scale=0.8, width=device-width' />
        <meta property='og:title' content={`${themeConfig.templateName} - ${t('landing_privacy_title')}`} />
        <meta property='og:description' content={`${themeConfig.templateName} - ${t('landing_privacy_description')}`} />
        <meta property='og:image' content='images/logoprofesea.png' />
      </Head>

      <Grid container p={5}>
        <Grid item xs={12}>
          <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF', padding: 5 }}>
            <CardHeader
              title={
                <Typography variant='h6' color={'#32487A'} fontWeight='600'>
                  Kebijakan Privasi
                </Typography>
              }
            />
            <CardContent>
              <Box component='div' dangerouslySetInnerHTML={{ __html: props.tosContent }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <FooterView />
    </>
  )
}

Privacy.guestGuard = false
Privacy.authGuard = false
Privacy.getLayout = (page: ReactNode) => <LandingPageLayout>{page}</LandingPageLayout>

export default Privacy
