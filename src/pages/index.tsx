import { Button, Container, Grid, Typography, Card, CardContent } from "@mui/material";
import { ReactNode } from "react";
import LandingPageLayout from "src/@core/layouts/LandingPageLayout";
import landingPageStyle from "src/@core/styles/landing-page/landing-page";
import { useTranslation } from "react-i18next";
import FindJobsView from "src/views/landing-page/findJobsView";
import DiscoverView from "src/views/landing-page/discoverView";
import FeatureView from "src/views/landing-page/featureView";
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
                    <Typography variant="h4" style={{ color: "#FFFFFF" }} fontWeight="900" mt={1}>{t("landing_hero_title")}</Typography>
                    <Typography fontSize={18} style={{ color: "#FFFFFF" }} fontWeight="500" mt={2}>{t("landing_hero_subtitle")}</Typography>

                    <Container style={{ marginTop: 70, lineHeight: 3.5 }} sx={{ display: { xs: 'none', md: 'block' } }}>
                        <Grid container justifyContent="center" sx={{ backgroundColor: 'none' }} spacing={9} mt={0} mb={10}>
                            <Card sx={{ width: 320, height: 200, backgroundColor: '#F0F6FA', mr: 5 }} elevation={10}>
                                <CardContent sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>                                    
                                    <Typography variant='h5' sx={{ mb: 2 }} color={"#000000"} fontWeight="800">
                                        {t('b_to_seafarer')}
                                    </Typography>
                                    <Typography variant='body2' sx={{ mb: 6.5, color: "#000000" }}>
                                        {t('b_to_seafarer_detail')}
                                    </Typography>
                                    <Button href="/register" style={{ backgroundColor: "#ef6c00", color: "white", marginRight: 10 }} variant="contained">{t('landing_join_now')}</Button>
                                </CardContent>
                            </Card>
                            <Card sx={{ width: 320, height: 200, backgroundColor: '#F0F6FA' }} elevation={10}>
                                <CardContent sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                    <Typography variant='h5' sx={{ mb: 2 }} color={"#000000"} fontWeight="800">
                                        {t('b_to_professional')}
                                    </Typography>
                                    <Typography variant='body2' sx={{ mb: 6.5, color: "#000000" }}>
                                        {t('b_to_professional_detail')}
                                    </Typography>
                                    <Button href="/register" style={{ backgroundColor: "#ef6c00", color: "white", marginRight: 10 }} variant="contained">{t('landing_join_now')}</Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Container>
                </Grid>
            </Grid>

            <Grid container justifyContent="center" sx={{ backgroundColor: 'none', py: 10, display: { xs: 'flex', md: 'none' } }}>
                <Grid item sx={{ mb: 10, mx: 5 }}>
                    <Card sx={{ width: 320, height: 280, backgroundColor: '#F0F6FA' }} elevation={5}>
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
                            <Button href="/register" style={{ backgroundColor: "#ef6c00", color: "white", marginRight: 10 }} variant="contained">{t('landing_join_now')}</Button>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item sx={{ mx: 5 }}>
                    <Card sx={{ width: 320, height: 280, backgroundColor: '#F0F6FA' }} elevation={5}>
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
                            <Button href="/register" style={{ backgroundColor: "#ef6c00", color: "white", marginRight: 10 }} variant="contained">{t('landing_join_now')}</Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <FindJobsView id="findJobSection" />
            <DiscoverView />
            <FeatureView />
            <LetsSailView />

            {/* <div className="row">
                <div className="example-1 card">
                    <div className="wrapper">
                        <div className="date">
                            <span className="day">12</span>
                            <span className="month">Aug</span>
                            <span className="year">2016</span>
                        </div>
                        <div className="data">
                            <div className="content">
                                <span className="author">Jane Doe</span>
                                <h1 className="title"><a href="#">Boxing icon has the will for a couple more fights</a></h1>
                                <p className="text">The highly anticipated world championship fight will take place at 10am and is the second major boxing blockbuster in the nation after 43 years.</p>
                                <label htmlFor="show-menu" className="menu-button"><span></span></label>
                            </div>
                            <input type="checkbox" id="show-menu" />
                            <ul className="menu-content">
                                <li>
                                    <a href="#" className="fa fa-bookmark-o"></a>
                                </li>
                                <li><a href="#" className="fa fa-heart-o"><span>47</span></a></li>
                                <li><a href="#" className="fa fa-comment-o"><span>8</span></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="example-2 card">
                    <div className="wrapper">
                        <div className="header">
                            <div className="date">
                                <span className="day">12</span>
                                <span className="month">Aug</span>
                                <span className="year">2016</span>
                            </div>
                            <ul className="menu-content">
                                <li>
                                    <a href="#" className="fa fa-bookmark-o"></a>
                                </li>
                                <li><a href="#" className="fa fa-heart-o"><span>18</span></a></li>
                                <li><a href="#" className="fa fa-comment-o"><span>3</span></a></li>
                            </ul>
                        </div>
                        <div className="data">
                            <div className="content">
                                <span className="author">Jane Doe</span>
                                <h1 className="title"><a href="#">Stranger Things: The sound of the Upside Down</a></h1>
                                <p className="text">The antsy bingers of Netflix will eagerly anticipate the digital release of the Survive soundtrack, out today.</p>
                                <a href="#" className="button">Read more</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            <FooterView />
        </>
    );
}

Main.guestGuard = false;
Main.authGuard = false;
Main.getLayout = (page: ReactNode) => <LandingPageLayout>{page}</LandingPageLayout>

export default Main;
