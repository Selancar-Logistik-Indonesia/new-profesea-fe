import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Card, CircularProgress, Grid, IconButton, List, ListItem, ListItemText, Typography } from "@mui/material";
import collect, { Collection } from "collect.js";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Pricing from "src/contract/models/pricing";
import { useAuth } from "src/hooks/useAuth";
import { HttpClient } from "src/services";
import { formatIDR, getUserPlanType, toTitleCase } from "src/utils/helpers";
import PaymentSubscriptionDialog, { SelectedPlan } from "../payment/PaymentSubscriptionDialog";

const PricingView = () => {
    const { t } = useTranslation();
    const [pricingType, setPricingType] = useState<string>();
    const [keys, setKeys] = useState<string[]>([]);
    const [pricings, setPricings] = useState<Collection<Pricing>>();
    const { user } = useAuth();
    const router = useRouter();
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<SelectedPlan>();

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

    const handleButtonClick = (setPlan: SelectedPlan) => {
        if (user) {
            setSelectedPlan(setPlan);
            setOpenDialog(true);
            
return;
        }

        router.push('/register');
    }

    const buildPricingArea = () => {
        const items = pricings?.get(pricingType) as any;
        const keys = Object.entries(items);

        return keys.map(e => {
            const title = e.at(0) as string;
            const price = items[title].at(0).price;
            const accountType = items[title].at(0).account_type;
            const plan: SelectedPlan = {
                planName: toTitleCase(`${accountType} ${title}`),
                planType: title,
                price: price,
            };

            // skip for pay-per-value, not ready yet!
            if (title == "pay-per-value") {
                return null;
            }

            return (
                <Box sx={{ minWidth: 310, maxWidth: 310 }} height={850} mx={5} mt={5} key={title} padding={5} component={Card} textAlign="center">
                    <Typography mb={2} variant="h5">{toTitleCase(title)}</Typography>
                    {
                        title == "pay-per-value"
                            ? (
                                <Grid
                                    container
                                    spacing={0}
                                    direction="column"
                                    alignItems="center"
                                    justifyContent="center">
                                    <Grid item width={200}>
                                        <Typography mb={2} variant="body1">Wants only specific feature we have?</Typography>
                                    </Grid>
                                </Grid>
                            )
                            : (<Typography mb={2} variant="h5">{price > 0 ? formatIDR(price) : "Free"}</Typography>)
                    }

                    <Button disabled={getUserPlanType(user) == title} onClick={() => handleButtonClick(plan)} fullWidth={true} type="button" variant="contained">
                        {['pay-per-value', 'basic'].includes(title) ? "Try It" : "Buy It"}
                    </Button>

                    {title != "pay-per-value" && (
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
                    )}
                </Box>
            );
        });
    }

    return (
        <>
            <Grid marginY={5} container direction="column" alignItems="center" justifyContent="center">
                <Grid mb={5} sx={{ width: "80%" }} item textAlign="center">
                    <Typography variant='h4' sx={{ mb: 5 }} color={"#32487A"}>{t("landing_pricing_title")}</Typography>
                    <Typography fontSize={14} variant='body1'>{t("landing_pricing_subtitle")}</Typography>
                </Grid>

                <Grid container direction="row" alignItems="center" justifyContent="center">
                    {user && (
                        <Typography variant="h4" sx={{ my: 5 }}>Plan for {user.team.teamName}</Typography>
                    )}

                    {!user && keys.map(e => (
                        <Button sx={{ mx: 2 }} key={e} onClick={() => setPricingType(e)} variant={pricingType == e ? "contained" : undefined}>{e}</Button>
                    ))}
                </Grid>

                <Box display={'flex'} flexDirection={'row'} sx={{ overflowX: { xs: 'scroll', md: 'hidden' }, msScrollbarTrackColor: 'transparent', width: '100%', pb: 10, alignItems: { md: 'center' }, justifyContent: { md: 'center' } }}>
                    {!pricings ? (<CircularProgress />) : buildPricingArea()}
                </Box>
            </Grid>

            {selectedPlan && (<PaymentSubscriptionDialog trxAbleType="subscription" onClose={() => setOpenDialog(!openDialog)} openDialog={openDialog} selectedPlan={selectedPlan} />)}
        </>
    );
}

export default PricingView;