import { Box, Grid, IconButton, Typography, Divider } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { useTranslation } from "react-i18next";

const FooterView = () => {
    const { t } = useTranslation();

    return (
        <Grid sx={{ backgroundColor: '#98a9d1', backgroundSize: 'cover', px: { xs: 5, md: 10 } }} pt={5} pb={5} container id="footer">

            <Grid xs={12} md={4} item sx={{ mt: { xs: 7 } }}>
                <Grid container>
                    <Grid item xs={12} textAlign={'left'} justifyItems="flex-end">
                        <Box
                            component="img"
                            sx={{ width: 150 }}
                            alt="The Profesea logo"
                            title="Profesea"
                            src="/images/logosamudera.png"
                        />
                        <Typography fontSize={16} variant='body1' style={{ color: "#424242" }}>{t("landing_footer_title")}</Typography>
                        <Divider sx={{ my: '0 !important' }} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} md={5} sx={{ px: { md: 10 } }}>
                <Grid container mt={6}>
                    <Grid item md={4} xs={6}>
                        <Typography variant='h5' sx={{ mb: 2 }} color={"#32487A"} fontWeight="600">Company</Typography>
                        <Typography mt={1.7} variant='body1' color={"#424242"}>Terms Of Service</Typography>
                        <Typography mt={1.7} variant='body1' color={"#424242"}>Privacy Policy</Typography>
                        <Typography mt={1.7} variant='body1' color={"#424242"}>FAQ</Typography>
                    </Grid>
                    <Grid item md={4} xs={6} alignContent={'left'}>
                        <Typography variant='h5' sx={{ mb: 2 }} color={"#32487A"} fontWeight="600">Platform</Typography>
                        <Typography mt={1.7} variant='body1' color={"#424242"}>Seafarer</Typography>
                        <Typography mt={1.7} variant='body1' color={"#424242"}>Company</Typography>
                        <Typography mt={1.7} variant='body1' color={"#424242"}>Trainer</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid xs={12} md={3} item sx={{ px: { md: 10 } }}>
                <Grid container>
                    <Grid item mt={5}>
                        <Typography mt={2} fontSize={16} color={"#32487A"}>Our Social Media</Typography>
                        <IconButton>
                            <FontAwesomeIcon icon={faFacebook} color="#32487A" />
                        </IconButton>
                        <IconButton>
                            <FontAwesomeIcon icon={faInstagram} color="#32487A" />
                        </IconButton>
                        <IconButton>
                            <FontAwesomeIcon icon={faLinkedin} color="#32487A" />
                        </IconButton>
                        <IconButton>
                            <FontAwesomeIcon icon={faTwitter} color="#32487A" />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12} textAlign={'left'} justifyItems="flex-end">
                        <Divider sx={{ my: '0 !important' }} />
                        <Typography mt={1} variant='body1' color={"#424242"}>Jl. Letjen S. Parman Kav. 35 Palmerah Jakarta Barat, DKI Jakarta, 11480</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid xs={12} md={12} item sx={{ mt: { xs: 7 } }}>
                <Typography color="#32487A" align="center">&copy; 2023 PT Selancar Logistik Indonesia. All Rights Reserved. Profesea</Typography>
            </Grid>
        </Grid>
    );
}

export default FooterView;