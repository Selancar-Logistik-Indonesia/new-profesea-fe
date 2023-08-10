//import { faBriefcase, faChartLine, faUsers } from "@fortawesome/free-solid-svg-icons";
import { Box, Grid, Typography, Link, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import discoverPageStyle from "src/@core/styles/discover/discover-page";

const DiscoverView = () => {
    const { t } = useTranslation();

    // const featureItems = [
    //     {
    //         key: "feat1",
    //         icon: faBriefcase,
    //         title: t('features.meetthecompanies.title'),
    //         description: t('features.meetthecompanies.subtitle'),
    //     },
    //     {
    //         key: "feat2",
    //         icon: faUsers,
    //         title: t('features.cvbuilder.title'),
    //         description: t('features.cvbuilder.subtitle'),
    //     },
    //     {
    //         key: "feat3",
    //         icon: faChartLine,
    //         title: t('features.careerassistance.title'),
    //         description: t('features.careerassistance.subtitle'),
    //     },
    //     {
    //         key: "feat4",
    //         icon: faChartLine,
    //         title: t('features.beavailable.title'),
    //         description: t('features.beavailable.subtitle'),
    //     },
    // ];

    return (
        <Grid container justifyContent="center" sx={{
            ...discoverPageStyle.bannerHero,
            height: { xxs: 660, xs: 550, md: 1580 }
        }} mt={0} pb={2} pt={10}>
            {/* <Grid item xs={12} ml={10} textAlign={'left'}>
                <Typography variant='h6' sx={{ mb: 5 }} color={"#ffffff"} fontWeight="600">{t("landing_discover_title")}</Typography>
                <Typography fontSize={18} variant='body1' style={{ color: "#ffffff" }}>{t("landing_discover_subtitle")}</Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography ml={10} mb={5} variant='h6' color={"#ffffff"} fontWeight="600">{t("landing_discover_item_title")}</Typography>
                <Box pb={3} width='100%' display={'flex'} flexDirection={'row'} sx={{ overflowX: { xs: 'scroll', lg: 'hidden' }, msScrollbarTrackColor: 'transparent', alignItems: { lg: 'center' }, justifyContent: { xs: 'left', lg: 'center' } }}>
                    {
                        featureItems.map((item, i) => (
                            <Box sx={{ minWidth: 320, maxWidth: 320, height: 200, ml: i == 0 ? 12 : 5 }} mt={2} key={item.key} padding={5} component={Card}>
                                <CardContent>
                                    <Typography fontSize={18} color={"#32487A"} fontWeight="600">{item.title}</Typography>
                                    <Typography fontSize={14} sx={{ mb: 4 }} variant='body1' style={{ color: "#424242" }}>
                                        {item.description}
                                    </Typography>
                                </CardContent>
                            </Box>
                        ))
                    }
                </Box>
            </Grid> */}

            <Grid item xs={11}>
                <Box>
                    <Grid container sx={{
                        p: 4,
                        display: 'flex',
                        alignItems: 'left',
                        justifyContent: 'left',
                        marginBottom: '10px',
                        marginLeft: '2px'
                    }}>

                        <Grid container spacing={6}>
                            <Grid item xs={12} sm={6}>
                                <figure className="shape-box shape-box_half">
                                    <img src="https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" alt="" />
                                    <div className="brk-abs-overlay z-index-0 bg-black opacity-60"></div>
                                    <figcaption>
                                        <div className="show-cont">
                                            <h3 className="card-no">01</h3>
                                            <h4 className="card-main-title">{t("landing_features_title_1")}</h4>
                                        </div>
                                        <p className="card-content">{t("landing_features_subtitle_1")}</p>
                                        <a href="#" className="read-more-btn">Read More</a>
                                    </figcaption>
                                    <span className="after"></span>
                                </figure>
                            </Grid>
                            <Grid item xs={12} sm={0.5}>
                            </Grid>
                            <Grid item xs={12} sm={4.5}>
                                <Typography variant="h4" style={{ color: "#FFFFFF" }} fontWeight="600" mt={6}>{t("landing_discover_title")}</Typography>
                                <Typography fontSize={16} style={{ color: "#FFFFFF" }} mt={2} align={"justify"}>{t("landing_discover_subtitle")}</Typography>
                                <Typography variant="h5" style={{ color: "#FFFFFF" }} fontWeight="600" mt={6}>Tidak ada yang lebih baik dari kami, Profesea adalah solusi yang tepat untuk Karir Maritim Anda !</Typography>
                            </Grid>
                            <Grid item xs={12} sm={1}>
                            </Grid>
                        </Grid>
                        <Grid container spacing={6}>
                            <Grid item xs={12} sm={6}>
                                <figure className="shape-box shape-box_half">
                                    <img src="https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" alt="" />
                                    <div className="brk-abs-overlay z-index-0 bg-black opacity-60"></div>
                                    <figcaption>
                                        <div className="show-cont">
                                            <h3 className="card-no">02</h3>
                                            <h4 className="card-main-title">{t("landing_features_title_2")}</h4>
                                        </div>
                                        <p className="card-content">{t("landing_features_subtitle_2")}</p>
                                        <a href="#" className="read-more-btn">Read More</a>
                                    </figcaption>
                                    <span className="after"></span>
                                </figure>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <figure className="shape-box shape-box_half">
                                    <img src="https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" alt="" />
                                    <div className="brk-abs-overlay z-index-0 bg-black opacity-60"></div>
                                    <figcaption>
                                        <div className="show-cont">
                                            <h3 className="card-no">03</h3>
                                            <h4 className="card-main-title">{t("landing_features_title_3")}</h4>
                                        </div>
                                        <p className="card-content">{t("landing_features_subtitle_3")}</p>
                                        <a href="#" className="read-more-btn">Read More</a>
                                    </figcaption>
                                    <span className="after"></span>
                                </figure>
                            </Grid>
                        </Grid>
                        <Grid container spacing={6}>
                            <Grid item xs={12} sm={6}>
                                <figure className="shape-box shape-box_half">
                                    <img src="https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" alt="" />
                                    <div className="brk-abs-overlay z-index-0 bg-black opacity-60"></div>
                                    <figcaption>
                                        <div className="show-cont">
                                            <h3 className="card-no">04</h3>
                                            <h4 className="card-main-title">{t("landing_features_title_4")}</h4>
                                        </div>
                                        <p className="card-content">{t("landing_features_subtitle_4")}</p>
                                        <a href="#" className="read-more-btn">Read More</a>
                                    </figcaption>
                                    <span className="after"></span>
                                </figure>
                            </Grid>
                            <Grid item xs={12} sm={0.5}>
                            </Grid>
                            <Grid item xs={12} sm={4.5}>
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant='h4' sx={{ mb: 5 }} color={"#ffffff"} fontWeight="600">{t("landing_lets_sail")}</Typography>
                                </Box>
                                <Box sx={{ flexShrink: 1 }}>
                                    <Link href="/register">
                                        <Button style={{ backgroundColor: "#ef6c00", color: "white", marginRight: 10 }} variant="contained">{t('landing_join_now')}</Button>
                                    </Link>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={1}>
                            </Grid>

                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
}

export default DiscoverView;