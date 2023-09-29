import { Button, Card, CircularProgress, List, ListItem, ListItemText, Typography } from "@mui/material";
import collect, { Collection } from "collect.js";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Pricing from "src/contract/models/pricing";
import { useAuth } from "src/hooks/useAuth";
import { HttpClient } from "src/services";
import { formatIDR, getUserPlanType, toTitleCase } from "src/utils/helpers";
import PaymentSubscriptionDialog, { SelectedPlan } from "../payment/PaymentSubscriptionDialog";
import Box, { BoxProps } from '@mui/material/Box'
import Grid, { GridProps } from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import { Icon } from "@iconify/react";

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

        if (user) {
            setPricingType(user.team.teamName);
        } else {
            setPricingType(keys[0]);
        }
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

    const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
        position: 'relative',
        padding: theme.spacing(11.25, 36),
        backgroundColor: hexToRGBA(theme.palette.primary.main, 0.04),
        [theme.breakpoints.down('xl')]: {
            padding: theme.spacing(11.25, 20)
        },
        [theme.breakpoints.down('md')]: {
            textAlign: 'center'
        },
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(10, 5)
        }
    }))

    const GridStyled = styled(Grid)<GridProps>(({ theme }) => ({
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.down('md')]: {
            order: -1
        }
    }))

    const Img = styled('img')(({ theme }) => ({
        bottom: 0,
        right: 144,
        width: 130,
        position: 'absolute',
        [theme.breakpoints.down('md')]: {
            width: 200,
            position: 'static'
        },
        [theme.breakpoints.down('sm')]: {
            width: 180
        }
    }))

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
                pricingItems: items[title],
            };

            return (
                <Box sx={{ minWidth: 310, maxWidth: 310 }} height={750} mx={5} mt={5} key={title} padding={5} component={Card} textAlign="center">
                    <Typography mb={2} variant="h6" style={{ fontSize: '18px', fontWeight: '600', color: '#32487A' }}>{toTitleCase(title)}</Typography>
                    {
                        title == "pay-per-value"
                            ? (
                                <Grid
                                    container
                                    spacing={0}
                                    direction="column"
                                    alignItems="center"
                                    justifyContent="center">
                                    <Grid item width={160}>
                                        <Typography mb={2} variant="body1">Wants only specific feature we have?</Typography>
                                    </Grid>
                                </Grid>
                            )
                            : (<Typography mb={2} variant="h6">{price > 0 ? formatIDR(price) : "Free"}</Typography>)
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
                                        <Icon
                                            fontSize='large'
                                            icon={'solar:verified-check-line-duotone'}
                                            style={{ fontSize: '18px', marginRight: '5' }}
                                        />

                                        <ListItemText primary={value.item.fname} />
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
            <BoxWrapper>
                <Grid container spacing={5}>
                    <Grid item xs={12} md={8}>
                        <Typography variant='h4' sx={{ mb: 2.5, color: 'primary.main' }}>
                            {t("landing_pricing_title")}
                        </Typography>
                        <Typography sx={{ mb: 10, color: 'text.secondary' }}>
                            {t("landing_pricing_subtitle")}
                        </Typography>
                        {user && (
                            <Typography variant="h6" sx={{ my: 5 }}>Plan for {user.team.teamName}</Typography>
                        )}

                        {!user && keys.map(e => (
                            <Button sx={{ mx: 2 }} key={e} onClick={() => setPricingType(e)} variant={pricingType == e ? "contained" : undefined}>{e}</Button>
                        ))}
                        {/* <Button variant='contained'>Start 14-day FREE trial</Button> */}
                    </Grid>
                    <GridStyled item xs={12} md={4}>
                        <Img alt='pricing-cta-avatar' src='/images/pages/pricing-cta-illustration.png' />
                    </GridStyled>
                </Grid>
            </BoxWrapper>

            <Grid marginY={5} container direction="column" alignItems="center" justifyContent="center">
                <Box display={'flex'} flexDirection={'row'} sx={{ overflowX: { xs: 'scroll', md: 'hidden' }, msScrollbarTrackColor: 'transparent', width: '100%', pb: 10, alignItems: { md: 'center' }, justifyContent: { md: 'center' } }}>
                    {!pricings ? (<CircularProgress />) : buildPricingArea()}
                </Box>
            </Grid>

            {selectedPlan && (<PaymentSubscriptionDialog trxAbleType="subscription" onClose={() => setOpenDialog(!openDialog)} openDialog={openDialog} selectedPlan={selectedPlan} />)}
        </>
    );
}

export default PricingView;