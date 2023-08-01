import { faBriefcase, faChartLine, faUsers } from "@fortawesome/free-solid-svg-icons";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import discoverPageStyle from "src/@core/styles/discover/discover-page";

const DiscoverView = () => {
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
        <Grid container justifyContent="center" sx={{
            ...discoverPageStyle.bannerHero,
            height: { xxs: 660, xs: 550, md: 600 }
        }} mt={0} pb={2} pt={10}>
            <Grid item xs={12} ml={10} textAlign={'left'}>
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
            </Grid>
        </Grid>
    );
}

export default DiscoverView;