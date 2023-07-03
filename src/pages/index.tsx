import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import { ReactNode } from "react";
import LandingPageLayout from "src/@core/layouts/LandingPageLayout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faMapMarked } from '@fortawesome/free-solid-svg-icons'
import i18n from "i18next";

import { useTranslation, initReactI18next } from "react-i18next";
import ns1 from 'src/lang/id.json';
import ns2 from 'src/lang/en.json';

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

import { styled } from '@mui/material/styles'
import landingPageStyle from "src/@core/styles/landing-page/landing-page";

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

const BannerIllustration = styled('img')(({ theme }) => ({
    maxWidth: '40rem',
    [theme.breakpoints.down('lg')]: {
        maxWidth: '30rem'
    },
    [theme.breakpoints.down('md')]: {
        maxWidth: '48rem'
    }
}))

const Main = () => {
    const { t } = useTranslation();

    return <>
        <Grid container style={landingPageStyle.bannerHero}>
            <Grid item xs={12} md={6} mt={20} paddingX={5} >
                <Typography variant="h3" style={{ color: "white" }}>{t("landing_hero_title")}</Typography>
                <Typography variant="body1" style={{ color: "white" }} mt={8}>{t("landing_hero_subtitle")}</Typography>

                <Container style={{ marginTop: 30 }}>
                    <Button style={{ backgroundColor: "white", color: "#666CFF", marginRight: 10 }} variant="contained">{t('b_apply_job')}</Button>
                    <Button style={{ backgroundColor: "white", color: "#666CFF" }} variant="contained">{t('b_post_job')}</Button>
                </Container>
            </Grid>
        </Grid>
        <Grid container spacing={6} mt={20}>
            <Grid item xs={12} sm={6} md={4}>
                <Card elevation={0}>
                    <CardContent sx={{ pt: 4 }}>
                        <Typography variant='h6' sx={{ mb: 2 }}>
                            <FontAwesomeIcon width={40} height={200} icon={faMapMarked} />
                            Pinpoint Matching with Profesea
                        </Typography>
                        <Typography variant='body1'>
                            Cancun is back, better than ever! Over a hundred Mexico resorts have reopened and the state tourism minister
                            predicts Cancun will draw as many visitors in 2006 as it did two years ago.
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Card elevation={0}>
                    <CardContent sx={{ pt: 4 }}>
                        <Typography variant='h6' sx={{ mb: 2 }}>
                            <FontAwesomeIcon width={40} height={200} icon={faMapMarked} />
                            Global CV
                        </Typography>
                        <Typography variant='body1'>
                            You'll have chance to find a job and employee from all over the World via Profesea.
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Card elevation={0}>
                    <CardContent sx={{ pt: 4 }}>
                        <Typography variant='h6' sx={{ mb: 2 }}>
                            <FontAwesomeIcon width={40} height={200} icon={faMapMarked} />
                            Optimised Candidate Pool via Industry Specific Filters
                        </Typography>
                        <Typography variant='body1'>
                            Companies have a chance to find the most suitable employee at shortest time via our Technically Oriented Maritime Specialized Database.
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
        <Grid container spacing={6} mt={20}>
            <Grid item md={12}>
                <center>
                    <Typography variant='h3' sx={{ mb: 2 }} color={"black"}>{t("landing_about_title")}</Typography>
                    <Typography variant='body1'>{t("landing_about_subtitle")}</Typography>
                </center>
            </Grid>
        </Grid>
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
}

Main.guestGuard = false;
Main.authGuard = false;
Main.getLayout = (page: ReactNode) => <LandingPageLayout>{page}</LandingPageLayout>

export default Main;
