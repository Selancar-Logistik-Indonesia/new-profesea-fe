import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Card, Grid, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { v4 } from "uuid";

type PlanType = {
    key: string;
    itemName: string;
    avail: string[];
    quota?: any;
}

const PricingView = () => {
    const { t } = useTranslation();
    const [pricingType, setPricingType] = useState<'company' | 'candidate'>('company');

    const candidatePlan: PlanType[] = [
        { key: v4(), itemName: "Direct messages to connection", avail: ['basic', 'pro', 'star'] },
        { key: v4(), itemName: "Direct messages to non-connection", avail: ['pro', 'star'] },
        { key: v4(), itemName: "Direct messages to recruiter inbox", avail: ['star'] },
        { key: v4(), itemName: "Private browsing", avail: ['basic', 'pro', 'star'] },
        { key: v4(), itemName: "Who viewed your profile", avail: ['basic', 'pro', 'star'] },
        { key: v4(), itemName: "Who viewed your profile insight availability", avail: ['basic', 'pro', 'star'], quota: ['20 days', '60 days', '90 days'] },
        { key: v4(), itemName: "Job applied", avail: ['basic', 'pro', 'star'], quota: ['5/month', '30/month', 'Unlimited'] },
        { key: v4(), itemName: "Job application ranking", avail: ['pro', 'star'] },
        { key: v4(), itemName: "Job application status (opened/not opened)", avail: ['star'] },
        { key: v4(), itemName: "Certificate tracking", avail: ['star'] },
        { key: v4(), itemName: "Automatic profile booster (7 days/month)", avail: ['star'] },
    ];

    const companyPlan: PlanType[] = [
        { key: v4(), itemName: "Direct messages to applicants", avail: ['basic', 'pro', 'star'] },
        { key: v4(), itemName: "Talent Recommendation", avail: ['basic', 'pro', 'star'] },
        { key: v4(), itemName: "Direct messages to non-applicants", avail: ['pro', 'star'] },
        { key: v4(), itemName: "Basic filters", avail: ['basic', 'pro', 'star'] },
        { key: v4(), itemName: "Advance search using keywords", avail: ['pro', 'star'] },
        { key: v4(), itemName: "Advance filters", avail: ['star'] },
        { key: v4(), itemName: "Project Management (save combinations of custom filters, categorize)", avail: ['star'] },
        { key: v4(), itemName: "Candidate recommendations based on filters, certificate completeness, and availability", avail: ['star'] },
        { key: v4(), itemName: "Job post", avail: ['basic', 'pro', 'star'], quota: ['2/month', '10/month', 'Unlimited'] },
        { key: v4(), itemName: "Automatic job booster (7 days/month)", avail: ['star'] },
    ];

    const payPerUsePlan: PlanType[] = [
        { key: v4(), itemName: "Direct Message to non-connection", avail: [] },
        { key: v4(), itemName: "Direct Message to recruiter inbox", avail: [] },
        { key: v4(), itemName: "Job Applied (amount/month)", avail: [] },
        { key: v4(), itemName: "Automatic profile booster (7 days/month)", avail: [] },
    ];

    return (
        <Grid marginY={5} container direction="column" alignItems="center" justifyContent="center">
            <Grid mb={5} sx={{ width: "80%" }} item textAlign="center">
                <Typography variant='h4' sx={{ mb: 5 }} color={"#32487A"}>{t("landing_pricing_title")}</Typography>
                <Typography fontSize={14} variant='body1'>{t("landing_pricing_subtitle")}</Typography>
            </Grid>

            <Grid container direction="row" alignItems="center" justifyContent="center">
                <Button onClick={() => setPricingType('company')} variant={pricingType == 'company' ? "contained" : undefined}>Company</Button>
                <Button onClick={() => setPricingType('candidate')} variant={pricingType == 'candidate' ? "contained" : undefined} sx={{ marginLeft: 4 }}>Candidate</Button>
            </Grid>

            <Box display={'flex'} flexDirection={'row'} sx={{ overflowX: 'scroll', msScrollbarTrackColor: 'transparent', width: '100%', pb: 10, alignItems: { md: 'center' }, justifyContent: { md: 'center' } }}>
                {
                    ['Basic', 'Pro', 'Star'].map((item, n) => {
                        let planItems = pricingType == 'company' ? companyPlan : candidatePlan;
                        planItems = planItems.filter(e => e.avail.includes(item.toLowerCase()));

                        return (
                            <Box sx={{ minWidth: 320, maxWidth: 320 }} height={850} mx={5} mt={5} key={item} padding={5} component={Card} textAlign="center">
                                <Typography mb={2} variant="h5">{item}</Typography>
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
                                    {planItems.map((value) => {
                                        let appendText = "";
                                        if (value.quota) {
                                            appendText = ` (${value.quota[n]})`;
                                        }

                                        return (
                                            <ListItem
                                                key={value.key}
                                                disableGutters>
                                                <IconButton size="small" aria-label="comment">
                                                    <FontAwesomeIcon color="#66bb6a" icon={faCheckCircle} />
                                                </IconButton>

                                                <ListItemText primary={value.itemName + appendText} />
                                            </ListItem>
                                        )
                                    })}
                                </List>
                            </Box>
                        )
                    })
                }
            </Box>

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
            </Grid>
        </Grid>

    );
}

export default PricingView;