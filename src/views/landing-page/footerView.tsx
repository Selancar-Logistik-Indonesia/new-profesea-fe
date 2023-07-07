import { Box, Button, Container, Divider, Grid, IconButton, Typography } from "@mui/material";
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
            <Grid container spacing={6} mt={18} px={15}>
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
                <Grid item md={5} alignContent={'right'} textAlign={'right'} justifyItems="flex-end">
                    <Box
                        component="img"
                        sx={{ width: 150 }}
                        alt="The Profesea logo"
                        title="Profesea"
                        src="/images/logosamudera.png"
                    />
                    <Typography variant='body1'>We assist Maritime (Personnel & HR & Crew Managers) and Crew Management Companies in facilitating the easy connection of maritime professionals with each other.</Typography>
                    <Typography mt={4} variant='body1'>Samudera Indonesia Building. 2th FlJl. Letjen S. Parman Kav 35, Kel. Kemanggisan Kec. Palmerah, Jakarta 11480 - Indonesia. (0265) 311766</Typography>

                    <Container disableGutters sx={{ marginTop: 5 }}>
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
            <Divider sx={{ marginTop: 10 }} variant="middle" />
            <Grid id="footer" px={15} pb={20} container direction="row" alignItems="center" justifyContent="space-between">
                <Grid item>
                    <Typography>&copy; 2023 All rights reserved. Profesea.</Typography>
                </Grid>
                <Grid item>
                    <IconButton>
                        <FontAwesomeIcon icon={faFacebook} />
                    </IconButton>
                    <IconButton>
                        <FontAwesomeIcon icon={faInstagram} />
                    </IconButton>
                    <IconButton>
                        <FontAwesomeIcon icon={faLinkedin} />
                    </IconButton>
                    <IconButton>
                        <FontAwesomeIcon icon={faTwitter} />
                    </IconButton>
                </Grid>
            </Grid>
        </>
    );
}

export default FooterView;