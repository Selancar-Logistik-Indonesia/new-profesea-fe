import { Icon } from "@iconify/react";
import { Box, Button, Card, CircularProgress, Dialog, DialogActions, DialogContent, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Radio, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import IBank from "src/contract/models/bank";
import Training from "src/contract/models/training";
import { HttpClient } from "src/services";
import { formatIDR } from "src/utils/helpers";

type Props = {
    openDialog: boolean,
    training: Training,
}

const PaymentDialog = (props: Props) => {
    const [onLoading, setOnLoading] = useState(true);
    const [banks, setBanks] = useState<IBank[]>([]);
    const [selectedBank, setSelectedBank] = useState('');

    const getListBanks = async () => {
        setOnLoading(true);
        const response = await HttpClient.get('/transaction/virtual-account/bank');
        if (response.status != 200) {
            alert(response.data?.message ?? "Internal server error!");

            return;
        }

        setOnLoading(false);
        setBanks(response.data.banks);
    }

    useEffect(() => {
        getListBanks();
    }, []);

    return (
        <Dialog open={props.openDialog}>
            <DialogActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Typography variant="body1" fontSize={24}>Transaction</Typography>
                <IconButton>
                    <Icon icon='mdi:close' />
                </IconButton>
            </DialogActions>
            <DialogContent>
                <List>
                    <Card>
                        <ListItem>
                            <ListItemAvatar>
                                <Box component='img' src={props.training.thumbnail} width={100} />
                            </ListItemAvatar>
                            <ListItemText>
                                <Box>
                                    <Typography variant="body1" fontSize={24}>{props.training.title}</Typography>
                                    <Typography variant="caption">{formatIDR(props.training.price)}</Typography>
                                </Box>
                            </ListItemText>
                        </ListItem>

                        <Box mx={10} my={5}>
                            <Typography variant="caption">Jumlah yang harus dibayar:</Typography>
                            <Typography variant="body1" fontSize={24}>{formatIDR(props.training.price)}</Typography>
                        </Box>
                    </Card>
                </List>

                {onLoading && banks.length == 0 && (
                    <CircularProgress />
                )}

                {(!onLoading && banks.length > 0) && (
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

                        <Button sx={{ width: '100%', mt: 10 }} variant="contained">Continue</Button>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default PaymentDialog;