import { faArrowLeft, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Card, Grid, IconButton, Link, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Training from "src/contract/models/training";
import Transaction from "src/contract/models/transactions";
import { HttpClient } from "src/services";
import { formatIDR } from "src/utils/helpers";
import collect from 'collect.js';

const TransactionDetailPage = () => {
    const router = useRouter();
    const trxId = router.query.id;
    const [trx, setTrx] = useState<Transaction>();

    const getTransaction = async () => {
        const response = await HttpClient.get(`/transaction/${trxId}`);
        if (response.status != 200) {
            toast.error("Failed to load the page");

            return;
        }

        setTrx(response.data.transaction);
    };

    const copyLinkToClipboard = (text?: string) => {
        navigator.clipboard.writeText(text ?? "");
        toast.success("Copied to clipboard");
    }

    useEffect(() => {
        getTransaction();
    }, []);

    return (
        <Grid container>
            <Grid item xs={12} sx={{ p: 10, backgroundColor: 'white' }}>
                <Box sx={{ mb: 6, display: 'flex', flexDirection: 'rows', alignItems: 'center' }}>
                    <IconButton LinkComponent={Link} href="/candidate/training">
                        <FontAwesomeIcon icon={faArrowLeft} color='text.primary' />
                    </IconButton>
                    <Typography variant="body2" color={"#32487A"} fontWeight="600" fontSize={18} ml={5}>
                        Transaction Detail
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'row', mb: 6, justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Box sx={{ width: 80 }}>
                            <Typography variant="body2">Order ID</Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2" color='#333'>{trx?.trx_id}</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Box sx={{ width: 90 }}>
                            <Typography variant="body2">Order Date</Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2" color='#333'>{moment(trx?.created_at).format(`d/M/Y hh:mm:ss`)}</Typography>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', mb: 6 }}>
                    {trx?.trx_detail.map(e => {
                        const item = e.trxable as Training

                        return (
                            <Card key={e.id} elevation={3} sx={{ my: 5 }}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Box component='img' src={item.thumbnail} width={100} />
                                    </ListItemAvatar>
                                    <ListItemText>
                                        <Box>
                                            <Typography variant="body1" fontSize={24}>{item.title}</Typography>
                                            <Typography variant="caption">{formatIDR(item.price)}</Typography>
                                        </Box>
                                    </ListItemText>
                                </ListItem>
                            </Card>
                        );
                    })}

                    <Box my={2}>
                        <Typography variant="caption">Jumlah yang harus dibayar:</Typography>
                        <Typography variant="body1" fontSize={24}>{formatIDR(collect(trx?.trx_detail).sum('item_price') as number)}</Typography>
                    </Box>

                    <Box my={2}>
                        <Typography variant="caption">Virtual account:</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                            <Box component='img' src={trx?.bank_logo} sx={{ height: 25, mr: 5 }} />

                            <Typography sx={{ mr: 5 }} variant="body1" fontSize={24}>{trx?.account_number}</Typography>
                            <IconButton onClick={() => copyLinkToClipboard(trx?.account_number)}>
                                <FontAwesomeIcon icon={faCopy} />
                            </IconButton>
                        </Box>
                    </Box>

                    <Box my={2}>
                        <Typography variant="caption">Status:</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                            <Typography variant="body1" fontSize={24}>Menunggu Pembayaran</Typography>
                        </Box>
                    </Box>

                    <Box my={2}>
                        <Typography variant="caption">Bayar sebelum:</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                            <Typography variant="body1" fontSize={24}>{moment(trx?.expiration_date).format("DD MMMM Y hh:mm:ss")}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}

TransactionDetailPage.acl = {
    action: 'read',
    subject: 'home'
}

export default TransactionDetailPage;