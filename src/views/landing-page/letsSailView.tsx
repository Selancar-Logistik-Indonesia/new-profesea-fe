import { Box, Button, Typography, Grid } from "@mui/material";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import landingPageStyle from "src/@core/styles/landing-page/landing-page-letssail";

const DiscoverView = () => {
    const { t } = useTranslation();

    return (

        <Grid container justifyContent="center" sx={landingPageStyle.bannerHero} mt={0} pb={2} pt={15}>
            <Grid item xs={12}>
                <Box>
                    <Grid container sx={{
                        p: 4,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '10px',
                        marginLeft: '2px'
                    }}>

                        <Grid container spacing={6}>
                            <Grid item xs={12} sm={2}>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                {/* <img alt="Whatis" src='/images/img-letssail.png' style={{
                                    maxWidth: '100%',
                                    height: '300px',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '10%'
                                }} /> */}
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <Typography variant='h3' sx={{ mb: 5 }} color={"#FFFFFF"} fontWeight="800" >{t("landing_lets_sail")}</Typography>
                                <Link href="/register">
                                    <Button style={{ backgroundColor: "#ef6c00", color: "white", marginRight: 10 }} variant="contained">{t('landing_join_now')}</Button>
                                </Link>
                            </Grid>
                            <Grid item xs={12} sm={1}>
                            </Grid>
                        </Grid>

                    </Grid>
                </Box>
            </Grid>
        </Grid>

        // <Box sx={{ px: { xs: 10, md: 20 }, display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#2c2c2d', backgroundSize: 'cover', height: 150 }}>
        //     <Box sx={{ flexGrow: 1 }}>
        //         <Typography variant='h4' sx={{ mb: 5 }} color={"#ffffff"} fontWeight="600">{t("landing_lets_sail")}</Typography>
        //     </Box>
        //     <Box sx={{ flexShrink: 1 }}>
        //         <Link href="/register">
        //             <Button style={{ backgroundColor: "#ef6c00", color: "white", marginRight: 10 }} variant="contained">{t('landing_join_now')}</Button>
        //         </Link>
        //     </Box>
        // </Box>
    );
}

export default DiscoverView;