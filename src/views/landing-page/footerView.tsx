import { Box, Button, Container, Grid, IconButton, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import NavItemType from "src/contract/types/navItemType";
import { useRouter } from "next/router";
import Link from "next/link";

const FooterView = () => {
    const { locale } = useRouter();
    const navItems: NavItemType[] = [
        { title: 'Login', variant: 'contained', onClick: "/login" },
        { title: 'Register', variant: 'contained', onClick: "/register", sx: { backgroundColor: "#ffa000", ":hover": { backgroundColor: "#ef6c00" } } },
    ];

    return (
        <>
            <Grid container spacing={7} mt={2} px={10} sx={{ backgroundColor: '#98a9d1', backgroundSize: 'cover' }}>
                <Grid item md={2} >
                    <Typography variant='h5' sx={{ mb: 2 }} color={"#32487A"}>Company</Typography>
                    <Typography variant='body1' color={"#424242"}>Terms Of Service</Typography>
                    <Typography variant='body1' color={"#424242"}>Privacy Policy</Typography>
                    <Typography variant='body1' color={"#424242"}>FAQ</Typography>

                </Grid>
                <Grid item md={1} alignContent={'left'}>
                    <Typography variant='h5' sx={{ mb: 2 }} color={"#32487A"}>Platform</Typography>
                    <Typography variant='body1' color={"#424242"}>Seafarer</Typography>
                    <Typography variant='body1' color={"#424242"}>Company</Typography>
                    <Typography variant='body1' color={"#424242"}>Trainer</Typography>

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
                    <Typography variant='body1' color={"#424242"}>We assist Maritime (Personnel & HR & Crew Managers) and Crew Management Companies in facilitating the easy connection of maritime professionals with each other.</Typography>
                    <Typography mt={4} variant='body1' color={"#424242"}>Samudera Indonesia Building. 2th FlJl. Letjen S. Parman Kav 35, Kel. Kemanggisan Kec. Palmerah, Jakarta 11480 - Indonesia. (0265) 311766</Typography>

                    <Container disableGutters sx={{ marginTop: 5, marginBottom: 5 }}>
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
            <Grid id="footer" px={10} pb={5} container direction="row" alignItems="center" justifyContent="space-between" sx={{ backgroundColor: '#98a9d1', backgroundSize: 'cover' }}>
                <Grid item>
                    <Typography color="#32487A">&copy; 2023 All rights reserved. Profesea.</Typography>
                </Grid>
                <Grid item>
                    <IconButton>
                        <FontAwesomeIcon icon={faFacebook} color="#32487A"/>
                    </IconButton>
                    <IconButton>
                        <FontAwesomeIcon icon={faInstagram} color="#32487A"/>
                    </IconButton>
                    <IconButton>
                        <FontAwesomeIcon icon={faLinkedin} color="#32487A"/>
                    </IconButton>
                    <IconButton>
                        <FontAwesomeIcon icon={faTwitter} color="#32487A"/>
                    </IconButton>
                </Grid>
            </Grid>
        </>
    );
}

export default FooterView;