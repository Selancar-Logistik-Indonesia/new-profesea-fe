import { Button, Grid, Typography, Box } from "@mui/material";
import { ReactNode } from "react";
import landingPageStyle from "src/@core/styles/landing-page/landing-page-trainer";
import { useTranslation } from "react-i18next";
import FooterView from "src/views/landing-page/footerView";
import Head from "next/head";
import themeConfig from "src/configs/themeConfig";
import OuterPageLayout from "src/@core/layouts/outer-components/OuterPageLayout";

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
                <Grid item xs={12} xl={6} lg={6} md={6} pt={5} sx={{ maxWidth: { xs: '90%' }, px: { xs: 5, md: 10 } }}>
                    <Box sx={{ display: "flex", flexDirection: 'column', mt: 30 }}>
                        <Box mb={4} mt={10}>
                            <Typography variant="h4" style={{ color: "#32487A" }} fontWeight="600">{t("landing_trainer_title_1")}</Typography>
                            <Typography fontSize={16} style={{ color: "#424242" }}>{t("landing_trainer_subtitle_1")}</Typography>
                        </Box>
                        <Box mb={4}>
                            <Typography variant="h4" style={{ color: "#32487A" }} fontWeight="600">{t("landing_trainer_title_2")}</Typography>
                            <Typography fontSize={16} style={{ color: "#424242" }}>{t("landing_trainer_subtitle_2")}</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} xl={6} lg={6} md={6} pt={5} sx={{
                    maxWidth: { xs: '90%' }, px: { xs: 5, md: 10 },
                    display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                    alignItems: "center"
                }}>
                    <Box mb={20}>
                        <Button variant="contained">Register Here</Button>
                    </Box>
                </Grid>
            </Grid >

            <FooterView />
        </>
    );
}

Main.guestGuard = false;
Main.authGuard = false;
Main.getLayout = (page: ReactNode) => <OuterPageLayout>{page}</OuterPageLayout>

export default Main;
