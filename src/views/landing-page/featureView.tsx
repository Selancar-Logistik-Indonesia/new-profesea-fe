import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";

const FeatureView = () => {
    const { t } = useTranslation();

    return (

        <Grid container justifyContent="center" sx={{ backgroundColor: '#101820' }} spacing={9} mt={0} mb={0}>
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

                        <Grid container spacing={12} mb={0}>
                            <Grid item xs={12} sm={12} mb={-10}>
                                <Typography variant="h3" style={{ color: "#FFFFFF" }} fontWeight="800" mt={6} mb={20} textAlign="center">{t("landing_discover_item_title")}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={6}>
                            <Grid item xs={12} sm={6}>

                                <div className="ag-courses_item">
                                    <a href="#" className="ag-courses-item_link">
                                        <div className="ag-courses-item_bg"></div>

                                        <div className="ag-courses-item_title">
                                            {t("landing_features_title_1")}
                                        </div>

                                        <div className="ag-courses-item_date-box">
                                            <span className="ag-courses-item_date">
                                                {t("landing_features_subtitle_1")}
                                            </span>
                                        </div>
                                    </a>
                                </div>

                                <div className="ag-courses_item">
                                    <a href="#" className="ag-courses-item_link">
                                        <div className="ag-courses-item_bg"></div>

                                        <div className="ag-courses-item_title">
                                            {t("landing_features_title_2")}
                                        </div>

                                        <div className="ag-courses-item_date-box">
                                            <span className="ag-courses-item_date">
                                                {t("landing_features_subtitle_2")}
                                            </span>
                                        </div>
                                    </a>
                                </div>
                                
                            <div className="ag-courses_item">
                                    <a href="#" className="ag-courses-item_link">
                                        <div className="ag-courses-item_bg"></div>

                                        <div className="ag-courses-item_title">
                                            {t("landing_features_title_3")}
                                        </div>

                                        <div className="ag-courses-item_date-box">
                                            <span className="ag-courses-item_date">
                                                {t("landing_features_subtitle_3")}
                                            </span>
                                        </div>
                                    </a>
                                </div>
                                
                                {/* 
                                <Typography variant="h4" style={{ color: "#000000" }} fontWeight="900" mt={6}>{t("landing_features_title_1")}</Typography>
                                <Typography fontSize={18} style={{ color: "#000000" }} mt={2} align={"justify"}>{t("landing_features_subtitle_1")}</Typography> */}
                            </Grid>
                            <Grid item xs={12} sm={6} mt={20}>
                                <div className="ag-courses_item">
                                    <a href="#" className="ag-courses-item_link">
                                        <div className="ag-courses-item_bg"></div>

                                        <div className="ag-courses-item_title">
                                            {t("landing_features_title_4")}
                                        </div>

                                        <div className="ag-courses-item_date-box">
                                            <span className="ag-courses-item_date">
                                                {t("landing_features_subtitle_4")}
                                            </span>
                                        </div>
                                    </a>
                                </div>
                                <div className="ag-courses_item">
                                    <a href="#" className="ag-courses-item_link">
                                        <div className="ag-courses-item_bg"></div>

                                        <div className="ag-courses-item_title">
                                            {t("landing_features_title_5")}
                                        </div>

                                        <div className="ag-courses-item_date-box">
                                            <span className="ag-courses-item_date">
                                                {t("landing_features_subtitle_5")}
                                            </span>
                                        </div>
                                    </a>
                                </div>
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