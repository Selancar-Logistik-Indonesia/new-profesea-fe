import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Card, CircularProgress, Grid, IconButton, List, ListItem, ListItemText, Typography } from "@mui/material";
import collect, { Collection } from "collect.js";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Pricing from "src/contract/models/pricing";
import { HttpClient } from "src/services";
import { formatIDR, toTitleCase } from "src/utils/helpers";

const PricingView = () => {
    const { t } = useTranslation();
    const [pricingType, setPricingType] = useState<string>();
    const [keys, setKeys] = useState<string[]>([]);
    const [pricings, setPricings] = useState<Collection<Pricing>>();

    const getPricing = async () => {
        const response = await HttpClient.get(`/public/data/pricing`);
        if (response.status != 200) {
            alert("Failed to get pricing data");
            
return;
        }

        const { pricing, keys } = response.data as { pricing: Pricing[], keys: string[] };
        const pricings = collect(pricing);

        setPricings(pricings);
        setKeys(keys);
        setPricingType(keys[0]);
    }

    useEffect(() => {
        getPricing();
    }, []);

    const buildPricingArea = () => {
        const items = pricings?.get(pricingType) as any;
        const keys = Object.entries(items);

        return keys.map(e => {
            if (e.at(0) == "pay-per-value") {
                return false;
            }

            const title = e.at(0) as string;
            const price = items[title].at(0).price;

            return (
                <Box sx={{ minWidth: 320, maxWidth: 320 }} height={850} mx={5} mt={5} key={title} padding={5} component={Card} textAlign="center">
                    <Typography mb={2} variant="h5">{toTitleCase(title)}</Typography>
                    {/* <Typography mb={2} fontWeight="body1" sx={{ textDecoration: "line-through", color: "grey" }} variant="h6">Rp50.000</Typography> */}
                    <Typography mb={2} variant="h5">{price > 0 ? formatIDR(price) : "Free"}</Typography>

                    {/* <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center">
                        <Grid item width={200}>
                            <Typography mb={2} variant="body1">per user/month paid annualy minimum of 3 users</Typography>
                        </Grid>
                    </Grid> */}

                    <Button fullWidth={true} type="button" variant="contained">Buy It</Button>
                    {/* <Typography my={3} variant="body1">Team Collaboration for any business</Typography> */}

                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {items[title].map((value: Pricing) => {

                            return (
                                <ListItem
                                    key={value.id}
                                    disableGutters>
                                    <IconButton size="small" aria-label="comment">
                                        <FontAwesomeIcon color="#66bb6a" icon={faCheckCircle} />
                                    </IconButton>

                                    <ListItemText primary={value.item.name} />
                                </ListItem>
                            )
                        })}
                    </List>
                </Box>
            );
        });
    }

    return (
        <Grid marginY={5} container direction="column" alignItems="center" justifyContent="center">
            <Grid mb={5} sx={{ width: "80%" }} item textAlign="center">
                <Typography variant='h4' sx={{ mb: 5 }} color={"#32487A"}>{t("landing_pricing_title")}</Typography>
                <Typography fontSize={14} variant='body1'>{t("landing_pricing_subtitle")}</Typography>
            </Grid>

            <Grid container direction="row" alignItems="center" justifyContent="center">
                {
                    keys.map(e => (
                        <Button sx={{ mx: 2 }} key={e} onClick={() => setPricingType(e)} variant={pricingType == e ? "contained" : undefined}>{e}</Button>
                    ))
                }
            </Grid>

            <Box display={'flex'} flexDirection={'row'} sx={{ overflowX: { xs: 'scroll', md: 'hidden' }, msScrollbarTrackColor: 'transparent', width: '100%', pb: 10, alignItems: { md: 'center' }, justifyContent: { md: 'center' } }}>
                {
                    !pricings ? (<CircularProgress />)
                        : buildPricingArea()
                }
            </Box>

            {/* 
            <Grid container
                direction="row"
                alignItems="center"
                justifyContent="center">
                <Grid width={320} height={420} mx={5} mt={5} padding={5} item component={Card} textAlign="center">
                    <Typography mb={2} variant="h5">Pay per Items</Typography>

                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center">
                        <Grid item width={200}>
                            <Typography mb={2} variant="body1">per user/month paid by your needs</Typography>
                        </Grid>
                    </Grid>

                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {payPerUsePlan.map((value) => {
                            let appendText = "";
                            if (value.quota) {
                                appendText = ` (${value.quota[2]})`;
                            }

                            return (
                                <ListItem
                                    key={value.key}
                                    disableGutters>
                                    <IconButton size="small" aria-label="comment">
                                        <FontAwesomeIcon color="#66bb6a" icon={faCheckCircle} />
                                    </IconButton>

                                    <ListItemText sx={{ maxWidth: 180 }} primary={value.itemName + appendText} />

                                    <ListItemSecondaryAction>
                                        <Button size="small" type="button" variant="contained">Buy It</Button>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )
                        })}
                    </List>
                </Grid>
            </Grid> */}

        </Grid>

    );
}

export default PricingView;