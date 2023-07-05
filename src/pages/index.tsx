import { Button, Container, Grid, Typography } from "@mui/material";
import { ReactNode } from "react";
import LandingPageLayout from "src/@core/layouts/LandingPageLayout";
import landingPageStyle from "src/@core/styles/landing-page/landing-page";
import { useTranslation, initReactI18next } from "react-i18next";
import FeatureView from "src/views/landing-page/featureView";
import FindJobsView from "src/views/landing-page/findJobsView";
import FindCandidateView from "src/views/landing-page/findCandidateView";
import i18n from "i18next";
import ns1 from 'src/lang/id.json';
import ns2 from 'src/lang/en.json';
import FooterView from "src/views/landing-page/footerView";

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        // the translations
        // (tip move them in a JSON file and import them,
        // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
        resources: {
            id: ns1,
            en: ns2
        },

        // if you're using a language detector, do not define the lng optio
        fallbackLng: "id",

        interpolation: {
            escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        }
    });
const Main = () => {
    const { t } = useTranslation();

    return (
        <>
            <Grid container style={landingPageStyle.bannerHero}>
                <Grid item xs={12} xl={6} lg={8} md={12} pt={5} pl={10}>
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

            <FindJobsView id="findJobSection" />
            <FindCandidateView id="findCandidate" />

            <FooterView />
        </>
    );
}

Main.guestGuard = false;
Main.authGuard = false;
Main.getLayout = (page: ReactNode) => <LandingPageLayout>{page}</LandingPageLayout>

export default Main;
