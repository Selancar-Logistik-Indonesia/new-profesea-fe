import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { ReactNode } from "react";
import LandingPageLayout from "src/@core/layouts/LandingPageLayout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faMapMarked } from '@fortawesome/free-solid-svg-icons'

const Main = () => {
    return <>
        <Grid container spacing={2}>
            <Grid item xs={6} md={6} mt={20}>
                <Typography variant="h3">Job & Career Platform for Seafarers</Typography>
                <Typography variant="body1" mt={8}>We assist Maritime (Personnel & HR & Crew Managers) and Crew Management Companies in facilitating the easy connection of maritime professionals with each other</Typography>

                <Container style={{ marginTop: 30 }}>
                    <Button style={{ marginRight: 20 }} variant="contained">Apply for job</Button>
                    <Button style={{ backgroundColor: "white", color: "#666CFF" }} variant="contained" startIcon={<FontAwesomeIcon icon={faAdd} />}>Post a job</Button>
                </Container>
            </Grid>
            <Grid item xs={6} md={6} mt={20}>
                <center>fake animation image</center>
            </Grid>
        </Grid>

        <Box
            mt={40}
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: "row",
                justifyContent: "center",
                '& > :not(style)': {
                    m: 1,
                    width: 300,
                    height: 309,
                },
            }}
        >
            <Paper elevation={3}>
                <Box sx={{
                    margin: 2,
                    marginBottom: 10,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <FontAwesomeIcon width={100} icon={faMapMarked} />
                    <Typography sx={{ flexGrow: 1 }} variant="h6">
                        Pinpoint Matching with creWin BullsEye
                    </Typography>
                </Box>
                <Container sx={{ margin: 2 }}>
                    Find easily seafarers and companies with our industry-specific search engine.
                </Container>
            </Paper>
            <Paper elevation={3}>
                <Box sx={{
                    margin: 2,
                    marginBottom: 10,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <FontAwesomeIcon width={100} icon={faMapMarked} />
                    <Typography sx={{ flexGrow: 1 }} variant="h6">
                        Global CV
                    </Typography>
                </Box>
                <Container sx={{ margin: 2 }}>
                    You'll have chance to find a job and employee from all over the World via creWin.
                </Container>
            </Paper>
            <Paper elevation={3}>
                <Box sx={{
                    margin: 2,
                    marginBottom: 10,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <FontAwesomeIcon width={100} icon={faMapMarked} />
                    <Typography sx={{ flexGrow: 1 }} variant="h6">
                        Optimised Candidate Pool via Industry Specific Filters
                    </Typography>
                </Box>

                <Container sx={{ margin: 2 }}>
                    Companies have a chance to find the most suitable employee at shortest time via our Technically Oriented Maritime Specialized Database.
                </Container>
            </Paper>
        </Box>
    </>
}

Main.guestGuard = false;
Main.authGuard = false;
Main.getLayout = (page: ReactNode) => <LandingPageLayout>{page}</LandingPageLayout>

export default Main;
