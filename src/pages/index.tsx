import { Button, Container, Grid, Typography } from "@mui/material";
import { ReactNode } from "react";
import LandingPageLayout from "src/@core/layouts/LandingPageLayout";
import landingPageStyle from "src/@core/styles/landing-page/landing-page";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import ns1 from 'src/lang/id.json';
import ns2 from 'src/lang/en.json';
import FeatureView from "src/views/landing-page/featureView";
import PricingView from "src/views/landing-page/pricingView";
import FindJobsView from "src/views/landing-page/findJobsView";

i18n.use(initReactI18next)
    .init({
        resources: {
            id: ns1,
            en: ns2
        },
        fallbackLng: "id",
        interpolation: {
            escapeValue: false
        }
    });

const Main = () => {
    const { t } = useTranslation();

    return (
        <>
            <Grid container style={landingPageStyle.bannerHero}>
                <Grid item xs={12} lg={6} md={12} pt={5} pl={10}>
                    <Typography variant="h1" style={{ color: "white" }}>{t("landing_hero_title")}</Typography>
                    <Typography fontSize={18} style={{ color: "white" }} mt={8}>{t("landing_hero_subtitle")}</Typography>

                    <Container style={{ marginTop: 30 }}>
                        <Button style={{ backgroundColor: "white", color: "#666CFF", marginRight: 10 }} variant="contained">{t('b_apply_job')}</Button>
                        <Button style={{ backgroundColor: "white", color: "#666CFF" }} variant="contained">{t('b_post_job')}</Button>
                    </Container>
                </Grid>
            </Grid>

            <FeatureView />

            <Grid marginY={20} container direction="column" alignItems="center" justifyContent="center">
                <Grid sx={{ width: "80%" }} item textAlign="center">
                    <Typography variant='h3' sx={{ mb: 5 }} color={"black"}>{t("landing_about_title")}</Typography>
                    <Typography fontSize={18} variant='body1'>{t("landing_about_subtitle")}</Typography>
                </Grid>
            </Grid>

            <PricingView />
            <FindJobsView />

            <Grid container spacing={6} mt={20}>
                <Grid item md={1} >
                    <Typography variant='h5' sx={{ mb: 2 }} color={"black"}>Company</Typography>
                    <Typography variant='body1'>Terms Of Service</Typography>
                    <Typography variant='body1'>Privacy Policy</Typography>
                    <Typography variant='body1'>FAQ</Typography>

                </Grid>
                <Grid item md={1}></Grid>
                <Grid item md={1} alignContent={'left'}>
                    <Typography variant='h5' sx={{ mb: 2 }} color={"black"}>Platform</Typography>
                    <Typography variant='body1'>Seafarer</Typography>
                    <Typography variant='body1'>Company</Typography>
                    <Typography variant='body1'>Trainer</Typography>

                </Grid>

                <Grid item md={4}></Grid>
                <Grid item md={5} alignContent={'right'} justifyItems="flex-end">
                    <Typography variant='body1'>We assist Maritime (Personnel & HR & Crew Managers) and Crew Management Companies in facilitating the easy connection of maritime professionals with each other.</Typography>
                    <Typography variant='body1'>Samudera Indonesia Building. 2th FlJl. Letjen S. Parman Kav 35, Kel. Kemanggisan
                        Kec. Palmerah, Jakarta 11480 - Indonesia. (0265) 311766</Typography>
                    <Typography variant='body1'>Trainer</Typography>
                </Grid>
            </Grid>
        </>
    );
}

Main.guestGuard = false;
Main.authGuard = false;
Main.getLayout = (page: ReactNode) => <LandingPageLayout>{page}</LandingPageLayout>

export default Main;
