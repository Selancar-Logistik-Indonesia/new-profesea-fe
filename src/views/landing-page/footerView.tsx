import { Box, Grid, IconButton, Typography, Divider } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { useTranslation } from "react-i18next";

const FooterView = () => {
    const { t } = useTranslation();

    return (
        <Grid sx={{ backgroundColor: '#000a22', backgroundSize: 'cover', px: { xs: 5, md: 10 } }} pt={5} pb={5} container id="footer">

            <Grid xs={12} md={4} item sx={{ mt: { xs: 7 } }}>
                <Grid container>
                    <Grid item xs={12} textAlign={'left'} justifyItems="flex-end">
                        <Box
                            component="img"
                            sx={{ width: 100 }}
                            alt="The Profesea logo"
                            title="Profesea"
                            src="/images/logosamudera.png"
                        />
                        <Typography variant='body1' style={{ color: "#ffffff" }}>{t("landing_footer_title")}</Typography>
                        <Divider sx={{ my: '0 !important' }} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} md={5} sx={{ px: { md: 10 } }}>
                <Grid container mt={6}>
                    <Grid item md={4} xs={6}>
                        <Typography sx={{ mb: 2 }} color={"#ef6c00"} fontSize={16}>Company</Typography>
                        <Typography mt={1.7} variant='body1' color={"#ffffff"}>Terms Of Service</Typography>
                        <Typography mt={1.7} variant='body1' color={"#ffffff"}>Privacy Policy</Typography>
                        <Typography mt={1.7} variant='body1' color={"#ffffff"}>FAQ</Typography>
                    </Grid>
                    <Grid item md={4} xs={6} alignContent={'left'}>
                        <Typography sx={{ mb: 2 }} color={"#ef6c00"} fontSize={16}>Platform</Typography>
                        <Typography mt={1.7} variant='body1' color={"#ffffff"}>Seafarer</Typography>
                        <Typography mt={1.7} variant='body1' color={"#ffffff"}>Recruiter</Typography>
                        <Typography mt={1.7} variant='body1' color={"#ffffff"}>Trainer</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid xs={12} md={3} item sx={{ px: { md: 10 } }}>
                <Grid container>
                    <Grid item mt={5}>
                        <Typography mt={2} fontSize={16} color={"#ef6c00"}>Our Social Media</Typography>
                        <IconButton>
                            <FontAwesomeIcon icon={faFacebook} color="#ffffff" />
                        </IconButton>
                        <IconButton>
                            <FontAwesomeIcon icon={faInstagram} color="#ffffff" />
                        </IconButton>
                        <IconButton>
                            <FontAwesomeIcon icon={faLinkedin} color="#ffffff" />
                        </IconButton>
                        <IconButton>
                            <FontAwesomeIcon icon={faTwitter} color="#ffffff" />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12} textAlign={'left'} justifyItems="flex-end">
                        <Divider sx={{ my: '0 !important' }} />
                        <Typography mt={1} variant='body1' color={"#ffffff"}>Jl. Letjen S. Parman Kav. 35 Palmerah Jakarta Barat, <br></br>DKI Jakarta, 11480</Typography>
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