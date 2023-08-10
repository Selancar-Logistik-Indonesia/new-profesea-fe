import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";

const FeatureView = () => {
    const { t } = useTranslation();

    return (

        <Grid container justifyContent="center" sx={{ backgroundColor: '#FFFFFF' }} spacing={9} mt={0} mb={0}>

            <Grid item xs={11}>
                <Box>
                    <Grid container sx={{
                        p: 4,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '10px',
                        marginLeft: '2px'
                    }}>

                        <Grid container spacing={6}>

                        <Grid item xs={12} sm={12} alignItems={'center'} justifyContent={'center'}>
                                <Typography variant="h4" style={{ color: "#32487A" }} fontWeight="600" mt={6} alignItems="center" justifyContent={'center'}>Mengapa Memilih Profesea?</Typography>
                                <Typography fontSize={18} style={{ color: "#EF6C00" }} mt={2} mb={10} fontWeight="600">Solusi Profesea dapat mendukung bisnis dan karir anda di Dunia Maritim </Typography>
                            </Grid>

                            <Grid item xs={12} sm={2}>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                            <Typography variant="h4" style={{ color: "#000000" }} fontWeight="900" mt={6}>{t("landing_features_title_1")}</Typography>
                                <Typography fontSize={18} style={{ color: "#000000"}} mt={2} align={"justify"}>{t("landing_features_subtitle_1")}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <img alt="Whatis" src='/images/img-meetthecompanies.png' style={{
                                    maxWidth: '100%',
                                    height: '320px',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '10%'
                                }} />
                            </Grid>
                            <Grid item xs={12} sm={1}>
                            </Grid>
                        </Grid>

                        <Grid container spacing={6}>

                            <Grid item xs={12} sm={2}>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <img alt="Whatis" src='/images/img-createcv.png' style={{
                                    maxWidth: '100%',
                                    height: '320px',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '10%'
                                }} />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                            <Typography variant="h4" style={{ color: "#000000" }} fontWeight="900" mt={6}>{t("landing_features_title_2")}</Typography>
                                <Typography fontSize={20} style={{ color: "#000000" }} mt={2} align={"justify"}>{t("landing_features_subtitle_2")}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={1}>
                            </Grid>
                        </Grid>

                        <Grid container spacing={6}>
                            <Grid item xs={12} sm={2}>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                            <Typography variant="h4" style={{ color: "#000000" }} fontWeight="900" mt={6}>{t("landing_features_title_3")}</Typography>
                                <Typography fontSize={20} style={{ color: "#000000" }} mt={2} align={"justify"}>{t("landing_features_subtitle_3")}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <img alt="Whatis" src='/images/img-careerassistance.png' style={{
                                    maxWidth: '100%',
                                    height: '320px',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '10%'
                                }} />
                            </Grid>
                            <Grid item xs={12} sm={1}>
                            </Grid>
                        </Grid>

                        <Grid container spacing={6}>

                            <Grid item xs={12} sm={2}>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <img alt="Whatis" src='/images/img-availabledate.png' style={{
                                    maxWidth: '100%',
                                    height: '320px',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '10%'
                                }} />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Typography variant="h4" style={{ color: "#000000" }} fontWeight="900" mt={6}>{t("landing_features_title_4")}</Typography>
                                <Typography fontSize={20} style={{ color: "#000000"}} mt={2} align={"justify"}>{t("landing_features_subtitle_4")}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={1}>
                            </Grid>
                        </Grid>

                    </Grid>
                </Box>
            </Grid>

            {/* <Grid item xs={11}>
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
                            <Grid item xs={12} sm={12}>
                                <Typography variant="h5" style={{ color: "#424242" }} fontWeight="600" mt={6}>Mengapa Memilih Profesea?</Typography>
                                <Typography fontSize={16} style={{ color: "#424242" }} mt={2} align={"justify"}>Solusi Profesea dapat mendukung bisnis dan karir anda di Dunia Maritim </Typography>
                            </Grid>
                            <Grid item xs={12} sm={3}>
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
                            <Grid item xs={12} sm={3}>
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

                            <Grid item xs={12} sm={3}>
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
                            <Grid item xs={12} sm={3}>
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
                        </Grid>
                    </Grid>
                </Box>
            </Grid> */}
        </Grid>
    );
}

export default FeatureView;