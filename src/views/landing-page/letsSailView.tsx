import { Button, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const DiscoverView = () => {
    const { t } = useTranslation();

    return (

        <Grid sx={{ backgroundColor: '#2c2c2d', backgroundSize: 'cover', height: 150 }} marginY={0} container direction="column" alignItems="center" justifyContent="center">
            
            <Grid container mt={10} sx={{ mx: { xs: 5, md: 10 } }}>
                <Grid item lg={8} md={6} xs={12} textAlign={'left'} sx={{ mb: { xs: 5 } }}>
                    <Typography variant='h5' sx={{ mb: 5 }} color={"#ffffff"} fontWeight="600">{t("landing_lets_sail")}</Typography>
                </Grid>
                <Grid item lg={1} md={6} xs={12} textAlign={'left'} sx={{ mb: { xs: 5 } }}>
                </Grid>
                <Grid item lg={3} md={6} xs={12} textAlign={'left'} sx={{ mb: { xs: 5 } }}>
                    <Grid container>
                            <Button style={{ backgroundColor: "#ef6c00", color: "white", marginRight: 10 }} variant="contained">{t('landing_join_now')}</Button>
                            
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default DiscoverView;