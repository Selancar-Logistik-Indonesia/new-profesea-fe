import { Grid, Typography, Card, CardContent, CardHeader, Box } from "@mui/material";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import FooterView from "src/views/landing-page/footerView";
import Head from "next/head";
import themeConfig from "src/configs/themeConfig";
import OuterPageLayout from "src/@core/layouts/outer-components/OuterPageLayout";
import fsPromises from 'fs/promises';
import path from 'path'

export async function getServerSideProps() {
  let filePath = path.join(process.cwd(), 'assets/tos/en.html');
  const data = await fsPromises.readFile(filePath);

  return {
    props: {
      tosContent: data.toString('utf-8')
    }
  }
}

const Term = (props: { tosContent: string }) => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{`${themeConfig.templateName} - ${t('landing_hero_title')}`}</title>
        <meta name='description' content={`${themeConfig.templateName} - ${t('landing_about_subtitle')}`} />
        <meta name='keywords' content='tos, term of service, term and condition' />
        <meta name='viewport' content='initial-scale=0.8, width=device-width' />
      </Head>

      <Grid container>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={
                <Typography variant="h4" style={{ color: '#424242' }}>
                  Term And Condition
                </Typography>
              }
            />
            <CardContent>
              <Box component='div' dangerouslySetInnerHTML={{ __html: props.tosContent }}></Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <FooterView />
    </>
  );
}

Term.guestGuard = false;
Term.authGuard = false;
Term.getLayout = (page: ReactNode) => <OuterPageLayout>{page}</OuterPageLayout>

export default Term;
