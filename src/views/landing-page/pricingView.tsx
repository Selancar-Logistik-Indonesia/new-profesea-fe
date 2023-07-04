import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Grid, IconButton, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const PricingView = () => {
    const { t } = useTranslation();

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

    return (
        <Grid marginY={20} container direction="column" alignItems="center" justifyContent="center">
            <Grid mb={5} sx={{ width: "80%" }} item textAlign="center">
                <Typography variant='h3' sx={{ mb: 5 }} color={"black"}>{t("landing_pricing_title")}</Typography>
                <Typography fontSize={18} variant='body1'>{t("landing_pricing_subtitle")}</Typography>
            </Grid>

            <Grid container direction="row" alignItems="center" justifyContent="center">
                <Button variant="contained">Company</Button>
                <Button sx={{ marginLeft: 4 }}>Candidate</Button>
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

    );
}

export default PricingView;