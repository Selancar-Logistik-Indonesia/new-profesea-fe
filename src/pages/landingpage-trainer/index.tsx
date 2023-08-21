import { Button, Grid, Typography, Box, Card, CardContent } from "@mui/material";
import { ReactNode } from "react";
import landingPageStyle from "src/@core/styles/landing-page/landing-page-trainer";
import { useTranslation } from "react-i18next";
import FooterView from "src/views/landing-page/footerView";
import Head from "next/head";
import themeConfig from "src/configs/themeConfig";
import OuterPageLayout from "src/@core/layouts/outer-components/OuterPageLayout";
// ** Icon Imports
//import Icon from 'src/@core/components/icon'
// ** Custom Components Imports
//import CustomAvatar from 'src/@core/components/mui/avatar'

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

            <Grid container sx={{
                ...landingPageStyle.bannerHero,
                height: { xs: 850, md: 850 }
            }}>
                <Grid item xs={12} xl={6} lg={6} md={6} sx={{ maxWidth: { xs: '100%' }, px: { xs: 5, md: 10 } }}>
                    <Box sx={{ display: "flex", flexDirection: 'column', mt: 2 }}>
                        <div className="ag-courses_item">
                            </div>

                            <div className="ag-courses_item">
                            </div>

                            <div className="ag-courses_item">
                            </div>

                            <div className="ag-courses_item">
                            </div>

                            <div className="ag-courses_item">
                                <a href="#" className="ag-courses-item_link">
                                    <div className="ag-courses-item_bg"></div>

                                    <div className="ag-courses-item_title">
                                        {t("landing_trainer_title_1")}
                                    </div>

                                    <div className="ag-courses-item_date-box">
                                        <span className="ag-courses-item_date">
                                            {t("landing_trainer_subtitle_1")}
                                        </span>
                                    </div>
                                </a>
                            </div>

                            <div className="ag-courses_item">
                                <a href="#" className="ag-courses-item_link">
                                    <div className="ag-courses-item_bg"></div>

                                    <div className="ag-courses-item_title">
                                        {t("landing_trainer_title_2")}
                                    </div>

                                    <div className="ag-courses-item_date-box">
                                        <span className="ag-courses-item_date">
                                            {t("landing_trainer_subtitle_2")}
                                        </span>
                                    </div>
                                </a>
                            </div>
                    </Box>
                    <Grid item xs={12} xl={6} lg={6} md={6} pt={2} sx={{
                    maxWidth: { xs: '90%' }, px: { xs: 5, md: 10 },
                    display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                    alignItems: "center"
                }}>
                    <Box mb={5}>
                        <Card sx={{ width: 320, height: 200, backgroundColor: '#101820' }} elevation={10}>
                            <CardContent sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <Typography variant='h5' sx={{ mb: 2 }} color={"#FFFFFF"} fontWeight="800">
                                    {t('b_to_trainer')}
                                </Typography>
                                <Typography variant='body2' sx={{ mb: 6.5, color: "#FFFFFF" }}>
                                    {t('b_to_trainer_detail')}
                                </Typography>
                                <Button href="/register" style={{ backgroundColor: "#ef6c00", color: "white", marginRight: 10 }} variant="contained">{t('landing_join_now')}</Button>
                            </CardContent>
                        </Card>
                    </Box>
                </Grid>
                </Grid>
                
            </Grid >

            <FooterView />
        </>
    );
}

Main.guestGuard = false;
Main.authGuard = false;
Main.getLayout = (page: ReactNode) => <OuterPageLayout>{page}</OuterPageLayout>

export default Main;
