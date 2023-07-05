import { Box, Button, Container, Divider, Grid, IconButton, Typography } from "@mui/material";
import { ReactNode } from "react";
import LandingPageLayout from "src/@core/layouts/LandingPageLayout";
import landingPageStyle from "src/@core/styles/landing-page/landing-page";
import { useTranslation, initReactI18next } from "react-i18next";
import FeatureView from "src/views/landing-page/featureView";
import PricingView from "src/views/landing-page/pricingView";
import FindJobsView from "src/views/landing-page/findJobsView";
import FindCandidateView from "src/views/landing-page/findCandidateView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";
import NavItemType from "src/contract/types/navItemType";
import i18n from "i18next";
import ns1 from 'src/lang/id.json';
import ns2 from 'src/lang/en.json';

const navItems: NavItemType[] = [
    { title: 'Login', variant: 'contained', onClick: "/login" },
    { title: 'Register', variant: 'contained', onClick: "/register", sx: { backgroundColor: "#ffa000", ":hover": { backgroundColor: "#ef6c00" } } },
];

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
    const { locale } = useRouter();

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

            <PricingView />
            <FindJobsView />
            <FindCandidateView />

            <Grid container spacing={6} mt={18} px={15}>
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
                <Grid item md={5} alignContent={'right'} textAlign={'right'} justifyItems="flex-end">
                    <Box
                        component="img"
                        sx={{ width: 150 }}
                        alt="The Profesea logo"
                        title="Profesea"
                        src="/images/logosamudera.png"
                    />
                    <Typography variant='body1'>We assist Maritime (Personnel & HR & Crew Managers) and Crew Management Companies in facilitating the easy connection of maritime professionals with each other.</Typography>
                    <Typography mt={4} variant='body1'>Samudera Indonesia Building. 2th FlJl. Letjen S. Parman Kav 35, Kel. Kemanggisan Kec. Palmerah, Jakarta 11480 - Indonesia. (0265) 311766</Typography>

                    <Container disableGutters sx={{ marginTop: 5 }}>
                        {
                            navItems.map(item => {
                                return (
                                    <Link href={item.onClick} key={item.title} locale={locale}>
                                        <Button size='small' type='button' variant={item.variant} sx={{ ...item.sx, mr: 1, ml: 1 }} >
                                            {item.title}
                                        </Button>
                                    </Link>
                                );
                            })
                        }
                    </Container>
                </Grid>
            </Grid>

            <Divider sx={{ marginTop: 10 }} variant="middle" />

            <Grid px={15} pb={20} container direction="row" alignItems="center" justifyContent="space-between">
                <Grid item>
                    <Typography>&copy; 2023 All rights reserved. Profesea.</Typography>
                </Grid>
                <Grid item>
                    <IconButton>
                        <FontAwesomeIcon icon={faFacebook} />
                    </IconButton>
                    <IconButton>
                        <FontAwesomeIcon icon={faInstagram} />
                    </IconButton>
                    <IconButton>
                        <FontAwesomeIcon icon={faLinkedin} />
                    </IconButton>
                    <IconButton>
                        <FontAwesomeIcon icon={faTwitter} />
                    </IconButton>
                </Grid>
            </Grid>
        </>
    );
}

Main.guestGuard = false;
Main.authGuard = false;
Main.getLayout = (page: ReactNode) => <LandingPageLayout>{page}</LandingPageLayout>

export default Main;
