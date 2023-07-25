import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Box, Button, Divider } from '@mui/material'
import { useEffect, useState } from 'react'
import { HttpClient } from 'src/services';
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import Training from 'src/contract/models/training';
import { v4 } from "uuid";
import DialogView from '../all/DialogView';
import Avatar from 'src/@core/components/mui/avatar'
import { getUserAvatar } from 'src/utils/helpers'
import Icon from 'src/@core/components/icon'

const SeafererOngoingTraining = () => {
    const [hookSignature, setHookSignature] = useState(v4())
    const [openViewModal, setOpenViewModal] = useState(false);
    const [dataCard, setDataCard] = useState<Training[]>([]);
    const [selectedItem, setSelectedItem] = useState<Training | null>(null);

    const getListTraining = async () => {
        try {
            const resp = await HttpClient.get(`/training?search=&page=1&take=25&ongoing=1`);
            if (resp.status != 200) {
                throw resp.data.message ?? "Something went wrong!";
            }

            const rows = resp.data.trainings.data;
            setDataCard(rows);
        } catch (error) {
            let errorMessage = "Something went wrong!";

            if (error instanceof AxiosError) {
                errorMessage = error?.response?.data?.message ?? errorMessage;
            }

            if (typeof error == 'string') {
                errorMessage = error;
            }

            toast.error(`Opps ${errorMessage}`);
        }
    }

    const viewHandler = (row: Training) => {
        setSelectedItem(row);
        setOpenViewModal(true);
    }

    useEffect(() => {
        getListTraining();
    }, [hookSignature]);

    return (
        <>
            <Grid container spacing={2} mt={1}>
                {dataCard.map((item) => {

                    return (
                        <Grid item xs={12} md={3} sx={{ marginTop: '-10px', marginBottom: '10px' }} key={item.id}>
                            <Card >
                                <Grid item xs={12} >
                                    <CardContent>
                                        <Grid container sx={{ alignItems: 'center', justifyContent: 'center' }}>
                                            <Grid item>
                                                <img
                                                    alt='logo'
                                                    src={item?.thumbnail ? item?.thumbnail : '/images/icon-trainer.png'}
                                                    style={{
                                                        width: '100%',
                                                        height: '200px',
                                                        objectFit: "fill",
                                                    }}
                                                    onClick={() => viewHandler(item)}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                            <Grid item onClick={() => viewHandler(item)}>
                                                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }} mb={1} >
                                                    <Icon icon='bxs:book' color='#32487A' />
                                                    <Typography sx={{ color: 'text.primary' }} ml="0.5rem" mt="0.2rem" fontSize={12}>
                                                    {item.title}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }} mb={2} >
                                                    <Icon icon='material-symbols:category-rounded' color='#32487A' />
                                                    <Typography sx={{ color: 'text.primary' }} ml="0.5rem" mt="0.2rem" fontSize={12}>
                                                    {item.category?.category}
                                                    </Typography>
                                                </Box>
                                                
                                            </Grid>
                                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }} mb={2} >
                                                <Button variant='contained' color='primary' onClick={() => viewHandler(item)}>
                                                    Buy
                                                </Button>
                                                </Box>
                                        </Grid>
                                        <Divider sx={{ my: '0 !important' }} />
                                        <Box
                                            height={65}
                                            sx={{
                                                display: 'flex',
                                                alignContent: 'center',
                                            }}
                                        >
                                            <Box sx={{ display: 'flex', justifyContent: 'center' }} mt={3} ml={2} mr={3}>
                                                <Avatar src={getUserAvatar(item.trainer)} alt='profile-picture' sx={{ width: 50, height: 50 }} />
                                            </Box>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }} marginTop={3}>
                                                <Typography sx={{ fontWeight: '600', color: 'text.primary', mb: 1 }} fontSize={16}>
                                                    {item?.trainer?.name}
                                                </Typography>
                                                <Typography sx={{ color: 'text.primary', mb: 1 }} fontSize={12}>
                                                    {item?.trainer?.username ?? "-"}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Grid>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>

            {selectedItem && (
                <DialogView key={selectedItem.id} selectedItem={selectedItem}
                    visible={openViewModal}
                    onCloseClick={() => setOpenViewModal(!openViewModal)}
                    onStateChange={() => setHookSignature(v4())} />
            )}
        </>
    );
}

SeafererOngoingTraining.acl = {
    action: 'read',
    subject: 'seaferer-training-ongoing'
}

export default SeafererOngoingTraining
