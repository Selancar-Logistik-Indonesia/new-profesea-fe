//import { faBriefcase, faChartLine, faUsers } from "@fortawesome/free-solid-svg-icons";
import { Box, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
//import discoverPageStyle from "src/@core/styles/discover/discover-page";

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
        
        <Grid container justifyContent="center" sx={{ background: 'linear-gradient(to right, #ececec, #eae6df)}' }} mt={0} pb={2} pt={10}>
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
                            <Grid item xs={12} sm={0.5}>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h3" style={{ color: "#32487A" }} fontWeight="800" mt={20}>{t("landing_discover_title")}</Typography>
                                <Typography fontSize={18} style={{ color: "#32487A" }} mt={2} align={"justify"}>{t("landing_discover_subtitle")}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={0.5}>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <img alt="Whatis" src='/images/img-whatis.png' style={{
                                    maxWidth: '150%',
                                    height: '380px',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '10%'
                                }} />
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