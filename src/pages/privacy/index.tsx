import { Grid, Typography, Card, CardContent, CardHeader, Box } from '@mui/material'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import FooterView from 'src/views/landing-page/footerView'
import Head from 'next/head'
import themeConfig from 'src/configs/themeConfig'
import OuterPageLayout from 'src/@core/layouts/outer-components/OuterPageLayout'
import fsPromises from 'fs/promises'
import path from 'path'

export async function getServerSideProps() {
  const filePath = path.join(process.cwd(), 'assets/privacypolicy/id.html')
  const data = await fsPromises.readFile(filePath)

  return {
    props: {
      tosContent: data.toString('utf-8')
    }
  }
}

const Term = (props: { tosContent: string }) => {
  const { t } = useTranslation()

  return (
    <>
      <Head>
        <title>{`${themeConfig.templateName} - ${t('landing_privacy_title')}`}</title>
        <meta name='description' content={`${themeConfig.templateName} - ${t('landing_privacy_description')}`} />
        <meta name='keywords' content='tos, term of service, term and condition' />
        <meta name='viewport' content='initial-scale=0.8, width=device-width' />
      </Head>

      <Grid container>
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

Term.guestGuard = false
Term.authGuard = false
Term.getLayout = (page: ReactNode) => <OuterPageLayout>{page}</OuterPageLayout>

export default Term
