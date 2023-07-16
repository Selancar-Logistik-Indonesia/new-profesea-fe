import { Box, Grid, IconButton, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";

const FooterView = () => {
    return (
        <Grid sx={{ backgroundColor: '#98a9d1', backgroundSize: 'cover' }} px={10} pt={5} pb={5} container id="footer">
            <Grid item xs={12} md={6} mt={2} px={10}>
                <Grid container>
                    <Grid item md={2}>
                        <Typography variant='h5' sx={{ mb: 2 }} color={"#32487A"}>Company</Typography>
                        <Typography mt={1.7} variant='body1' color={"#424242"}>Terms Of Service</Typography>
                        <Typography mt={1.7} variant='body1' color={"#424242"}>Privacy Policy</Typography>
                        <Typography mt={1.7} variant='body1' color={"#424242"}>FAQ</Typography>
                    </Grid>
                    <Grid item md={2} alignContent={'left'}>
                        <Typography variant='h5' sx={{ mb: 2 }} color={"#32487A"}>Platform</Typography>
                        <Typography mt={1.7} variant='body1' color={"#424242"}>Seafarer</Typography>
                        <Typography mt={1.7} variant='body1' color={"#424242"}>Company</Typography>
                        <Typography mt={1.7} variant='body1' color={"#424242"}>Trainer</Typography>
                    </Grid>
                    <Grid mt={10} item md={12} alignContent={'left'}>
                        <Typography color="#32487A">&copy; 2023 All rights reserved. Profesea.</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid xs={12} md={6} item direction="row" alignItems="center" justifyContent="space-between" sx={{ backgroundColor: '#98a9d1', backgroundSize: 'cover' }}>
                <Grid container>
                    <Grid item xs={12} textAlign={'left'} justifyItems="flex-end">
                        <Box
                            component="img"
                            sx={{ width: 150 }}
                            alt="The Profesea logo"
                            title="Profesea"
                            src="/images/logosamudera.png"
                        />
                        <Typography mt={2} variant='body1' color={"#424242"}>We assist Maritime (Personnel & HR & Crew Managers) and Crew Management Companies in facilitating the easy connection of maritime professionals with each other.</Typography>
                        <Typography mt={1} variant='body1' color={"#424242"}>Samudera Indonesia Building. 2th FlJl. Letjen S. Parman Kav 35, Kel. Kemanggisan Kec. Palmerah, Jakarta 11480 - Indonesia. (0265) 311766</Typography>
                    </Grid>
                    <Grid item mt={10}>
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
                </Grid>
            </Grid>
        </Grid>
    );
}

export default FooterView;