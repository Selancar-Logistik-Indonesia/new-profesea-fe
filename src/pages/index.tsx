import { Button, Container, Grid, Typography } from "@mui/material";
import { ReactNode } from "react";
import LandingPageLayout from "src/@core/layouts/LandingPageLayout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faArrowTrendUp, faBriefcase, faMapMarked, faUsersViewfinder } from '@fortawesome/free-solid-svg-icons'
import i18n from "i18next";

import { useTranslation, initReactI18next } from "react-i18next";
import ns1 from 'src/lang/id.json';
import ns2 from 'src/lang/en.json';

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

import { styled } from '@mui/material/styles'

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
        <Grid container>
            <Grid item xs={12} md={6} mt={20}>
                <Typography variant="h2" style={{ color: "Black", fontWeight: "Bold" }}>{t("landing_hero_title")}</Typography>
                <Typography variant="body1" mt={8}>{t("landing_hero_subtitle")}</Typography>

                <Container style={{ marginTop: 30 }}>
                    <Button style={{ marginRight: 20, backgroundColor: "32487A", color: "#FFFFFF" }} variant="contained">{t('b_apply_job')}</Button>
                    <Button style={{ backgroundColor: "FF9600", color: "#FFFFFF" }} variant="contained">{t('b_post_job')}</Button>
                </Container>
            </Grid>
            <Grid item xs={12} md={6} mt={3}>
                <center>
                    <BannerIllustration
                        alt='login-illustration'
                        src={`/images/ship.png`}
                    />
                </center>
            </Grid>
        </Grid>
        <Grid container spacing={6} mt={20}>
            <Grid item xs={12} sm={6} md={4}>
                <Card>
                    <CardContent sx={{ pt: 4 }}>
                        <Typography variant='h6' sx={{ mb: 2 }} style={{ color: "#424242" }}>
                            <FontAwesomeIcon width={40} height={200} icon={faBriefcase} />
                            Find Jobs
                        </Typography>
                        <Typography variant='body1'>
                            Find any jobs in the maritime industry that match your skills and interests.
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Card>
                    <CardContent sx={{ pt: 4 }}>
                        <Typography variant='h6' sx={{ mb: 2 }} style={{ color: "#424242" }}>
                            <FontAwesomeIcon width={40} height={200} icon={faUsersViewfinder} />
                            Find Candidate
                        </Typography>
                        <Typography variant='body1'>
                            Find the right candidate using our specific filters made for maritime industry jobs.
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Card>
                    <CardContent sx={{ pt: 4 }}>
                        <Typography variant='h6' sx={{ mb: 2 }} style={{ color: "#424242" }}>
                            <FontAwesomeIcon width={40} height={200} icon={faArrowTrendUp} />
                            Improve your Career
                        </Typography>
                        <Typography variant='body1'>
                            Improve your chance to become the star candidate and get picked by the employers using training and certification.
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

    </>
}

Main.guestGuard = false;
Main.authGuard = false;
Main.getLayout = (page: ReactNode) => <LandingPageLayout>{page}</LandingPageLayout>

export default Main;
