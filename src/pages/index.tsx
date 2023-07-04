import { Button, Container, Grid, IconButton, List, ListItem, ListItemText, Typography } from "@mui/material";
import { ReactNode } from "react";
import LandingPageLayout from "src/@core/layouts/LandingPageLayout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarked, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from "react-i18next";
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import landingPageStyle from "src/@core/styles/landing-page/landing-page";

i18n.use(initReactI18next) // passes i18n down to react-i18next
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

const featureItems = [
    {
        icon: faMapMarked,
        title: "Pinpoint Matching with Profesea",
        description: "Cancun is back, better than ever! Over a hundred Mexico resorts have reopened and the state tourism minister predicts Cancun will draw as many visitors in 2006 as it did two years ago.",
    },
    {
        icon: faMapMarked,
        title: "Global CV",
        description: "You'll have chance to find a job and employee from all over the World via Profesea.",
    },
    {
        icon: faMapMarked,
        title: "Optimised Candidate Pool via Industry Specific Filters",
        description: "Companies have a chance to find the most suitable employee at shortest time via our Technically Oriented Maritime Specialized Database.",
    },
];

const planItems = [
    "Ticketing System",
    "Email, chat, voice, social messaging",
    "Help center",
    "Standard bots",
    "Prebuilt analytics dashboard",
    "1.000+ apps intergrations",
    "Pre-defined responses (macros)",
    "Custom business rules",
    "Online support from the Zendesk team",
];

const Main = () => {
    const { t } = useTranslation();

    return <>
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

        <Grid container justifyContent="center" sx={{ backgroundColor: 'none' }} spacing={9} mt={10}>
            {
                featureItems.map(item => (
                    <Grid item key={item.title}>
                        <Card sx={{ width: 420, height: 180 }} elevation={0}>
                            <CardContent>
                                <Typography variant='h6' sx={{ mb: 2 }}>
                                    <FontAwesomeIcon width={40} height={200} icon={item.icon} />
                                    {item.title}
                                </Typography>
                                <Typography variant='body1'>
                                    {item.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))
            }
        </Grid>

        <Grid marginY={20} container direction="column" alignItems="center" justifyContent="center">
            <Grid sx={{ width: "80%" }} item textAlign="center">
                <Typography variant='h3' sx={{ mb: 5 }} color={"black"}>{t("landing_about_title")}</Typography>
                <Typography fontSize={18} variant='body1'>{t("landing_about_subtitle")}</Typography>
            </Grid>
        </Grid>

        <Grid marginY={20} container direction="column" alignItems="center" justifyContent="center">
            <Grid sx={{ width: "80%" }} item textAlign="center">
                <Typography variant='h3' sx={{ mb: 5 }} color={"black"}>{t("landing_pricing_title")}</Typography>
                <Typography fontSize={18} variant='body1'>{t("landing_pricing_subtitle")}</Typography>
            </Grid>

            <Grid container
                direction="row"
                alignItems="center"
                justifyContent="center">
                {
                    [1, 2, 3].map(i => (
                        <Grid mx={10} mt={5} key={i} padding={5} item component={Card} textAlign="center">
                            <Typography mb={2} variant="h5">Business</Typography>
                            <Typography mb={2} fontWeight="body1" sx={{ textDecoration: "line-through", color: "grey" }} variant="h6">Rp50.000</Typography>
                            <Typography mb={2} variant="h5">Rp30.000</Typography>

                            <Grid
                                container
                                spacing={0}
                                direction="column"
                                alignItems="center"
                                justifyContent="center">
                                <Grid item width={200}>
                                    <Typography mb={2} variant="body1">per user/month paid annualy minimum of 3 users</Typography>
                                </Grid>
                            </Grid>


                            <Button fullWidth={true} type="button" variant="contained">Buy It</Button>
                            <Typography my={3} variant="body1">Team Collaboration for any business</Typography>

                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                {planItems.map((value) => (
                                    <ListItem
                                        key={value}
                                        disableGutters>
                                        <IconButton size="small" aria-label="comment">
                                            <FontAwesomeIcon color="#66bb6a" icon={faCheckCircle} />
                                        </IconButton>

                                        <ListItemText primary={value} />
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                    ))
                }
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
