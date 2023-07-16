import { Button, Container, Grid, Typography } from "@mui/material";
import { ReactNode } from "react";
import LandingPageLayout from "src/@core/layouts/LandingPageLayout";
import landingPageStyle from "src/@core/styles/landing-page/landing-page";
import { useTranslation } from "react-i18next";
import FindJobsView from "src/views/landing-page/findJobsView";
import FindCandidateView from "src/views/landing-page/findCandidateView";
import FooterView from "src/views/landing-page/footerView";
import Head from "next/head";
import themeConfig from "src/configs/themeConfig";

const Main = () => {
    const { t } = useTranslation();

    return (
        <>
            <Head>
                <title>{`${themeConfig.templateName} - ${t('landing_hero_title')}`}</title>
                <meta name='description' content={`${themeConfig.templateName} - ${t('landing_about_subtitle')}`} />
                <meta name='keywords' content={`${t('app_keyword')}`} />
                <meta name='viewport' content='initial-scale=1, width=device-width' />
            </Head>

            <Grid container style={landingPageStyle.bannerHero}>
                <Grid item xs={12} xl={6} lg={8} md={12} pt={5} pl={10} mt={40}>
                    <Typography variant="h3" style={{ color: "#32487A" }}>{t("landing_hero_title")}</Typography>
                    <Typography fontSize={18} style={{ color: "#424242" }} mt={8}>{t("landing_hero_subtitle")}</Typography>

                    <Container style={{ marginTop: 30, lineHeight: 3.5 }}>
                        <Button style={{ backgroundColor: "#32487A", color: "white", marginRight: 10 }} variant="contained">{t('b_apply_job')}</Button>
                        <Button style={{ backgroundColor: "#32487A", color: "white" }} variant="contained">{t('b_post_job')}</Button>
                    </Container>
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
