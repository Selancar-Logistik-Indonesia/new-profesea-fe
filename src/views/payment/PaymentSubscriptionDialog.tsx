import { Icon } from "@iconify/react";
import { Box, Button, Card, CircularProgress, Dialog, DialogActions, DialogContent, Divider, FormControl, IconButton, InputLabel, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, MenuItem, Radio, Select, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import IBank from "src/contract/models/bank";
import { HttpClient } from "src/services";
import { formatIDR } from "src/utils/helpers";

type SelectedPlan = {
    planName: string,
    price: number,
    planType: string,
}

type Props = {
    openDialog: boolean,
    selectedPlan: SelectedPlan,
    trxAbleType: 'subscription' | 'pay-per-value',
    onClose: () => void,
}

const PaymentSubscriptionDialog = (props: Props) => {
    const [onLoading, setOnLoading] = useState<string[]>(['widget']);
    const [banks, setBanks] = useState<IBank[]>([]);
    const [selectedBank, setSelectedBank] = useState('');
    const [selectedDuration, setSelectedDuration] = useState<number>(1);
    const router = useRouter();

    const getListBanks = async () => {
        setOnLoading(['widget']);
        const response = await HttpClient.get('/transaction/virtual-account/bank');
        if (response.status != 200) {
            alert(response.data?.message ?? "Internal server error!");

            return;
        }

        setOnLoading([]);
        setBanks(response.data.banks);
    }

    const checkoutHander = async () => {
        if (!selectedBank) {
            toast.error('Bank is not selected', { position: 'bottom-right' });

            return;
        }

        setOnLoading(['checkout']);
        const response = await HttpClient.post('/transaction/create', {
            "payment_type": "VA",
            "bank_code": selectedBank,
            "trxable_ids": [props.selectedPlan.planType],
            "trxable_type": props.trxAbleType,
            "qty": selectedDuration,
        });

        if (response.status != 200) {
            alert(response.data?.message ?? "Internal server error!");

            return;
        }

        setOnLoading([]);
        router.push(`/transaction/detail/${response.data.transaction.trx_id}`);
    }

    useEffect(() => {
        getListBanks();
    }, []);

    return (
        <Dialog fullWidth={true} open={props.openDialog} onClose={() => props.onClose()}>
            <DialogActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Typography variant="body1" fontSize={24}>Transaction</Typography>
                <IconButton onClick={() => props.onClose()}>
                    <Icon icon='mdi:close' />
                </IconButton>
            </DialogActions>
            <DialogContent>
                <List>
                    <Card>
                        <ListItem>
                            <ListItemText>
                                <Typography variant="body1" fontSize={24}>{props.selectedPlan.planName}</Typography>
                            </ListItemText>
                        </ListItem>

                        <Box sx={{ mx: 5, mt: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel sx={{ fontSize: 16 }} id="demo-simple-select-label">Subscription Duration</InputLabel>
                                <Select
                                    variant="standard"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedDuration}
                                    label="Age"
                                    onChange={(e) => setSelectedDuration(parseInt(`${e.target.value}`))}
                                >
                                    {[1, 3, 6, 9, 12].map(e => (
                                        <MenuItem key={e} value={e}>{e} Month</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>

                        <Box mx={10} my={5}>
                            <Typography variant="caption">Jumlah yang harus dibayar:</Typography>
                            <Typography variant="body1" fontSize={24}>{formatIDR((props.selectedPlan.price * selectedDuration))}</Typography>
                        </Box>
                    </Card>
                </List>

                {onLoading.includes('widget') && banks.length == 0 && (
                    <CircularProgress />
                )}

                {(!onLoading.includes('widget') && banks.length > 0) && (
                    <>
                        <Typography variant="body1" mt={10} ml={5} mb={3} fontSize={20}>Pilih Bank</Typography>
                        <Divider />
                        <List>
                            {banks.map(e => (
                                <ListItem key={e.code} sx={{ cursor: 'pointer', backgroundColor: selectedBank == e.code ? '#bbdefb' : undefined }} onClick={() => setSelectedBank(e.code)}>
                                    <ListItemAvatar>
                                        <Box sx={{ backgroundImage: `url(${e.logo})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: 40, width: 100 }} />
                                    </ListItemAvatar>
                                    <Typography variant="body1">{e.name}</Typography>

                                    <ListItemSecondaryAction onClick={() => setSelectedBank(e.code)}>
                                        <Radio checked={selectedBank == e.code} />
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>

                        <Button onClick={checkoutHander} disabled={onLoading.includes('checkout')} sx={{ width: '100%', mt: 10 }} variant="contained">
                            {onLoading.includes('checkout') ? (<CircularProgress />) : 'Continue'}
                        </Button>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}

export {
    type SelectedPlan,
}
export default PaymentSubscriptionDialog;