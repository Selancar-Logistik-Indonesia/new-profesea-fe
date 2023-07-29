import { faBriefcase, faChartLine, faUsers } from "@fortawesome/free-solid-svg-icons";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import discoverPageStyle from "src/@core/styles/discover/discover-page";

const FeatureView = () => {
    const { t } = useTranslation();

    const featureItems = [
        {
            key: "feat1",
            icon: faBriefcase,
            title: t('features.meetthecompanies.title'),
            description: t('features.meetthecompanies.subtitle'),
        },
        {
            key: "feat2",
            icon: faUsers,
            title: t('features.cvbuilder.title'),
            description: t('features.cvbuilder.subtitle'),
        },
        {
            key: "feat3",
            icon: faChartLine,
            title: t('features.careerassistance.title'),
            description: t('features.careerassistance.subtitle'),
        },
        {
            key: "feat4",
            icon: faChartLine,
            title: t('features.beavailable.title'),
            description: t('features.beavailable.subtitle'),
        },
    ];

    return (

        <Grid container justifyContent="center" sx={discoverPageStyle.bannerHero} spacing={2} mt={0} mb={0}>
            <Grid container mt={10} sx={{ mx: { xs: 5, md: 2 } }}>
                <Grid item lg={12} md={6} xs={12} ml={10} textAlign={'left'} sx={{ mb: { xs: 5 } }}>
                    <Typography variant='h6' sx={{ mb: 5 }} color={"#ffffff"} fontWeight="600">{t("landing_discover_title")}</Typography>
                    <Typography fontSize={18} variant='body1' style={{ color: "#ffffff" }}>{t("landing_discover_subtitle")}</Typography>
                </Grid>
                <Grid item lg={12} md={6} xs={12} ml={10} textAlign={'left'} sx={{ mb: { xs: 1 } }}>
                    <Typography variant='h6' sx={{ mb: 2 }} color={"#ffffff"} fontWeight="600">{t("landing_discover_item_title")}</Typography>
                </Grid>
            </Grid>
            {
                featureItems.map(item => (
                    <Grid item key={item.key}>
                        <Card sx={{ width: 350, height: 150}} elevation={10}>
                            <CardContent>
                                <Typography fontSize={18} color={"#32487A"} fontWeight="600">{item.title}</Typography>
                                <Typography fontSize={16} sx={{ mb: 4 }} variant='body1' style={{ color: "#424242" }}>
                                    {item.description}
                                </Typography>
                            </CardContent>
                        </Card>

                    </Grid>
                ))
            }
        </Grid>
    );
}

export default FeatureView;