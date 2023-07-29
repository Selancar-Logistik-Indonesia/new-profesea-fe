import { Button, Container, Grid, Typography, Card, CardContent } from "@mui/material";
import { ReactNode } from "react";
import LandingPageLayout from "src/@core/layouts/LandingPageLayout";
import landingPageStyle from "src/@core/styles/landing-page/landing-page";
import { useTranslation } from "react-i18next";
import FindJobsView from "src/views/landing-page/findJobsView";
import DiscoverView from "src/views/landing-page/discoverView";
import LetsSailView from "src/views/landing-page/letsSailView";
import FooterView from "src/views/landing-page/footerView";
import Head from "next/head";
import themeConfig from "src/configs/themeConfig";
// ** Icon Imports
import Icon from 'src/@core/components/icon'
// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

const Main = () => {
    const { t } = useTranslation();

    return (
        <>
            <Head>
                <title>{`${themeConfig.templateName} - ${t('landing_hero_title')}`}</title>
                <meta name='description' content={`${themeConfig.templateName} - ${t('landing_about_subtitle')}`} />
                <meta name='keywords' content={`${t('app_keyword')}`} />
                <meta name='viewport' content='initial-scale=0.8, width=device-width' />
            </Head>

            <Grid container sx={landingPageStyle.bannerHero}>
                <Grid item xs={12} xl={6} lg={8} md={12} pt={5} mt={20} mb={10} sx={{ maxWidth: { xs: '90%' }, px: { xs: 5, md: 10 } }}>
                    <Typography variant="h4" style={{ color: "#32487A" }} fontWeight="600">{t("landing_hero_title")}</Typography>
                    <Typography fontSize={16} style={{ color: "#424242" }} mt={2}>{t("landing_hero_subtitle")}</Typography>

                    <Container style={{ marginTop: 30, lineHeight: 3.5 }}>
                        <Grid container justifyContent="center" sx={{ backgroundColor: 'none' }} spacing={9} mt={0} mb={10}>
                            <Card sx={{ width: 320, height: 280, backgroundColor: '#4c98cf12' }} elevation={10}>
                                <CardContent sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                    <CustomAvatar skin='light' sx={{ width: 56, height: 56, mb: 2 }}>
                                        <Icon icon='noto-v1:ship' fontSize='2rem' />
                                    </CustomAvatar>
                                    <Typography variant='h6' sx={{ mb: 2 }}>
                                    {t('b_to_seafarer')}
                                    </Typography>
                                    <Typography variant='body2' sx={{ mb: 6.5, color: "#424242" }}>
                                    {t('b_to_seafarer_detail')}
                                    </Typography>
                                    <Button style={{ backgroundColor: "#32487A", color: "white", marginRight: 10 }} variant="contained">{t('landing_join_now')}</Button>
                                </CardContent>
                            </Card>
                            &nbsp; &nbsp;
                            <Card sx={{ width: 320, height: 280, backgroundColor: '#4c98cf12' }} elevation={10}>
                                <CardContent sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                    <CustomAvatar skin='light' sx={{ width: 56, height: 56, mb: 2 }}>
                                        <Icon icon='noto:man-office-worker-light-skin-tone' fontSize='2rem' />
                                    </CustomAvatar>
                                    <Typography variant='h6' sx={{ mb: 2 }}>
                                    {t('b_to_professional')}
                                    </Typography>
                                    <Typography variant='body2' sx={{ mb: 6.5, color: "#424242" }}>
                                    {t('b_to_professional_detail')}
                                    </Typography>
                                    <Button style={{ backgroundColor: "#32487A", color: "white", marginRight: 10 }} variant="contained">{t('landing_join_now')}</Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Container>
                </Grid>
            </Grid>
            <FindJobsView id="findJobSection" />
            <DiscoverView></DiscoverView>
            <LetsSailView></LetsSailView>
            <FooterView />
        </>
    );
}

Main.guestGuard = false;
Main.authGuard = false;
Main.getLayout = (page: ReactNode) => <LandingPageLayout>{page}</LandingPageLayout>

export default Main;
