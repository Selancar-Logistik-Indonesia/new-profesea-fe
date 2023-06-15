import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import Box, { BoxProps } from '@mui/material/Box'
import { ReactNode } from "react";
import LandingPageLayout from "src/@core/layouts/LandingPageLayout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faMapMarked } from '@fortawesome/free-solid-svg-icons'
import i18n from "i18next";

import { useTranslation, initReactI18next } from "react-i18next";
import ns1 from 'src/lang/id.json';
import ns2 from 'src/lang/en.json';
import { useRouter } from "next/router";

import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'

import { styled, useTheme } from '@mui/material/styles'

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
  const BannerIllustrationWrapper = styled(Box)<BoxProps>(({ theme }) => ({
    padding: theme.spacing(20),
    paddingRight: '0 !important',
    [theme.breakpoints.down('lg')]: {
      padding: theme.spacing(2)
    }
  }))
  
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
    const { t, i18n } = useTranslation();

    return <>
        <Grid container>
            <Grid item xs={12} md={6} mt={20}>
                <Typography variant="h3" style={{color: "Black"}}>Job & Career Platform for Seafarers</Typography>
                <Typography variant="body1" mt={8}>We assist Maritime (Personnel & HR & Crew Managers) and Crew Management Companies in facilitating the easy connection of maritime professionals with each other</Typography>

                <Container style={{ marginTop: 30 }}>
                    <Button style={{ marginRight: 20 }} variant="contained">{t('b_apply_job')}</Button>
                    <Button style={{ backgroundColor: "white", color: "#666CFF" }} variant="contained" startIcon={<FontAwesomeIcon icon={faAdd} />}>{t('b_post_job')}</Button>
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
                <Card>
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
                <Card>
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
            <Grid item  md={12}>
                <center>
                    <Typography variant='h3' sx={{ mb: 2 }} color={"black"}>
                        Global CV
                    </Typography>
                    <Typography variant='body1'>
                        You'll have chance to find a job and employee from all over the World via Profesea.
                    </Typography>
                </center>
            </Grid>
        </Grid>

    </>
}

Main.guestGuard = false;
Main.authGuard = false;
Main.getLayout = (page: ReactNode) => <LandingPageLayout>{page}</LandingPageLayout>

export default Main;
