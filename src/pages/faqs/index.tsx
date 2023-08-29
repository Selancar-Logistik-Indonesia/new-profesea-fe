import { Grid, Typography, Card, CardContent, CardHeader, Box } from "@mui/material";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import FooterView from "src/views/landing-page/footerView";
import Head from "next/head";
import themeConfig from "src/configs/themeConfig";
import OuterPageLayout from "src/@core/layouts/outer-components/OuterPageLayout";
import fsPromises from 'fs/promises';
import path from "path";

export async function getServerSideProps() {
  const filePath = path.join(process.cwd(), 'assets/faq/id.html');
  const data = await fsPromises.readFile(filePath);

  return {
    props: {
      tosContent: data.toString('utf-8')
    }
  }
}
 
const FAQS = (props: { tosContent: string }) => {
  const { t } = useTranslation();

    return (
        <>
            <Head>
                <title>{`${themeConfig.templateName} - ${t('landing_hero_title')}`}</title>
                <meta name='description' content={`${themeConfig.templateName} - ${t('landing_about_subtitle')}`} />
                <meta name='keywords' content={`${t('app_keyword')}`} />
                <meta name='viewport' content='initial-scale=0.8, width=device-width' />
            </Head>

            <Grid container>
              <Grid item xs={12}>
                <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
                  <CardHeader
                    title={
                      <Typography variant='h6' color={'#32487A'} fontWeight='600'>
                        FAQ
                      </Typography>
                    }
                  />
                    <CardContent>
                    <Box component='div' dangerouslySetInnerHTML={{ __html: props.tosContent }}></Box>
                    </CardContent>
                </Card>
              </Grid>
            </Grid >

            <FooterView />
        </>
    );
}

FAQS.guestGuard = false;
FAQS.authGuard = false;
FAQS.getLayout = (page: ReactNode) => <OuterPageLayout>{page}</OuterPageLayout>

export default FAQS;
