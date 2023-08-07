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

                    <Container style={{ marginTop: 30, lineHeight: 3.5 }} sx={{ display: { xs: 'none', md: 'block' } }}>
                        <Grid container justifyContent="center" sx={{ backgroundColor: 'none' }} spacing={9} mt={0} mb={10}>
                            <Card sx={{ width: 320, height: 280, backgroundColor: '#F0F6FA', mr: 5 }} elevation={10}>
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
                            <Card sx={{ width: 320, height: 280, backgroundColor: '#F0F6FA' }} elevation={10}>
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
            <LetsSailView />

            <div className="box-wrapper">
                <figure className="shape-box shape-box_half">
                    <img src="https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" alt="" />
                    <div className="brk-abs-overlay z-index-0 bg-black opacity-60"></div>
                    <figcaption>
                        <div className="show-cont">
                            <h3 className="card-no">01</h3>
                            <h4 className="card-main-title">Design</h4>
                        </div>
                        <p className="card-content">Customer interactions, study and analysis of company branding through creative briefs. Creation of mock-up designs by using UI tools that simulate actions and pre-visualize the reactions.</p>
                        <a href="#" className="read-more-btn">Read More</a>
                    </figcaption>
                    <span className="after"></span>
                </figure>
                <figure className="shape-box shape-box_half">
                    <img src="https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=375&q=80" />
                    <div className="brk-abs-overlay z-index-0 bg-black opacity-60"></div>
                    <figcaption>
                        <div className="show-cont">
                            <h3 className="card-no">02</h3>
                            <h4 className="card-main-title">DEVELOP</h4>
                        </div>
                        <p className="card-content">Customer interactions, study and analysis of company branding through creative briefs. Creation of mock-up designs by using UI tools that simulate actions and pre-visualize the reactions.</p>
                        <a href="#" className="read-more-btn">Read More</a>
                    </figcaption>
                    <span className="after"></span>
                </figure>
                <figure className="shape-box shape-box_half">
                    <img src="https://images.unsplash.com/photo-1498075702571-ecb018f3752d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=757&q=80" />
                    <div className="brk-abs-overlay z-index-0 bg-black opacity-60"></div>
                    <figcaption>
                        <div className="show-cont">
                            <h3 className="card-no">03</h3>
                            <h4 className="card-main-title">RESEARCH</h4>
                        </div>
                        <p className="card-content">Customer interactions, study and analysis of company branding through creative briefs. Creation of mock-up designs by using UI tools that simulate actions and pre-visualize the reactions.</p>
                        <a href="#" className="read-more-btn">Read More</a>
                    </figcaption>
                    <span className="after"></span>
                </figure>
                <figure className="shape-box shape-box_half">
                    <img src="https://images.unsplash.com/photo-1534669740902-e09e38a6a29f?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80" />
                    <div className="brk-abs-overlay z-index-0 bg-black opacity-60"></div>
                    <figcaption>
                        <div className="show-cont">
                            <h3 className="card-no">04</h3>
                            <h4 className="card-main-title">PROMOTION</h4>
                        </div>
                        <p className="card-content">Customer interactions, study and analysis of company branding through creative briefs. Creation of mock-up designs by using UI tools that simulate actions and pre-visualize the reactions.</p>
                        <a href="#" className="read-more-btn">Read More</a>
                    </figcaption>
                    <span className="after"></span>
                </figure>
            </div>

            <div className="timeline">
                <div className="container left">
                    <div className="date">15 Dec</div>
                    <i className="icon fa fa-home"></i>
                    <div className="content">
                        <h2>Lorem ipsum dolor sit amet</h2>
                        <p>
                            Lorem ipsum dolor sit amet elit. Aliquam odio dolor, id luctus erat sagittis non. Ut blandit semper pretium.
                        </p>
                    </div>
                </div>
                <div className="container right">
                    <div className="date">22 Oct</div>
                    <i className="icon fa fa-gift"></i>
                    <div className="content">
                        <h2>Lorem ipsum dolor sit amet</h2>
                        <p>
                            Lorem ipsum dolor sit amet elit. Aliquam odio dolor, id luctus erat sagittis non. Ut blandit semper pretium.
                        </p>
                    </div>
                </div>
                <div className="container left">
                    <div className="date">10 Jul</div>
                    <i className="icon fa fa-user"></i>
                    <div className="content">
                        <h2>Lorem ipsum dolor sit amet</h2>
                        <p>
                            Lorem ipsum dolor sit amet elit. Aliquam odio dolor, id luctus erat sagittis non. Ut blandit semper pretium.
                        </p>
                    </div>
                </div>
                <div className="container right">
                    <div className="date">18 May</div>
                    <i className="icon fa fa-running"></i>
                    <div className="content">
                        <h2>Lorem ipsum dolor sit amet</h2>
                        <p>
                            Lorem ipsum dolor sit amet elit. Aliquam odio dolor, id luctus erat sagittis non. Ut blandit semper pretium.
                        </p>
                    </div>
                </div>
                <div className="container left">
                    <div className="date">10 Feb</div>
                    <i className="icon fa fa-cog"></i>
                    <div className="content">
                        <h2>Lorem ipsum dolor sit amet</h2>
                        <p>
                            Lorem ipsum dolor sit amet elit. Aliquam odio dolor, id luctus erat sagittis non. Ut blandit semper pretium.
                        </p>
                    </div>
                </div>
                <div className="container right">
                    <div className="date">01 Jan</div>
                    <i className="icon fa fa-certificate"></i>
                    <div className="content">
                        <h2>Lorem ipsum dolor sit amet</h2>
                        <p>
                            Lorem ipsum dolor sit amet elit. Aliquam odio dolor, id luctus erat sagittis non. Ut blandit semper pretium.
                        </p>
                    </div>
                </div>
            </div>

            <section id="timeline">
                <h1>A Flexbox Timeline</h1>
                <p className="leader">All cards must be the same height and width for space calculations on large screens.</p>
                <div className="demo-card-wrapper">
                    <div className="demo-card demo-card--step1">
                        <div className="head">
                            <div className="number-box">
                                <span>01</span>
                            </div>
                            <h2><span className="small">Subtitle</span> Technology</h2>
                        </div>
                        <div className="body">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta reiciendis deserunt doloribus consequatur, laudantium odio dolorum laboriosam.</p>
                            <img src="http://placehold.it/1000x500" alt="Graphic" />
                        </div>
                    </div>

                    <div className="demo-card demo-card--step2">
                        <div className="head">
                            <div className="number-box">
                                <span>02</span>
                            </div>
                            <h2><span className="small">Subtitle</span> Confidence</h2>
                        </div>
                        <div className="body">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta reiciendis deserunt doloribus consequatur, laudantium odio dolorum laboriosam.</p>
                            <img src="http://placehold.it/1000x500" alt="Graphic" />
                        </div>
                    </div>

                    <div className="demo-card demo-card--step3">
                        <div className="head">
                            <div className="number-box">
                                <span>03</span>
                            </div>
                            <h2><span className="small">Subtitle</span> Adaptation</h2>
                        </div>
                        <div className="body">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta reiciendis deserunt doloribus consequatur, laudantium odio dolorum laboriosam.</p>
                            <img src="http://placehold.it/1000x500" alt="Graphic" />
                        </div>
                    </div>

                    <div className="demo-card demo-card--step4">
                        <div className="head">
                            <div className="number-box">
                                <span>04</span>
                            </div>
                            <h2><span className="small">Subtitle</span> Consistency</h2>
                        </div>
                        <div className="body">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta reiciendis deserunt doloribus consequatur, laudantium odio dolorum laboriosam.</p>
                            <img src="http://placehold.it/1000x500" alt="Graphic" />
                        </div>
                    </div>

                    <div className="demo-card demo-card--step5">
                        <div className="head">
                            <div className="number-box">
                                <span>05</span>
                            </div>
                            <h2><span className="small">Subtitle</span> Conversion</h2>
                        </div>
                        <div className="body">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta reiciendis deserunt doloribus consequatur, laudantium odio dolorum laboriosam.</p>
                            <img src="http://placehold.it/1000x500" alt="Graphic" />
                        </div>
                    </div>
                </div>
            </section>

            <div className="row">
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
            </div>

            <FooterView />
        </>
    );
}

Main.guestGuard = false;
Main.authGuard = false;
Main.getLayout = (page: ReactNode) => <LandingPageLayout>{page}</LandingPageLayout>

export default Main;
