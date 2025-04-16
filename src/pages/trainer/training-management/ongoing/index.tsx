import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Box, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { HttpClient } from 'src/services';
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import Training from 'src/contract/models/training';
import DialogEdit from '../all/DialogEdit';
import { v4 } from "uuid";
import DialogView from '../all/DialogView';

const OngoingTrainingScreen = () => {
    const [hookSignature, setHookSignature] = useState(v4())
    const [openEditModal, setOpenEditModal] = useState(false);
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

    const updateHandler = (row: Training) => {
        setSelectedItem(row);
        setOpenEditModal(true);
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
            <Grid container spacing={2} >
                {
                    dataCard.map((item) => {

                        return (
                            <Grid item xs={12} md={4} sx={{ marginTop: '-10px', marginBottom: '10px' }} key={item.id}>
                                <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
                                    <Grid item xs={12} >
                                        <CardContent>
                                            <Grid container sx={{ alignItems: 'center', justifyContent: 'center', marginBottom: '5px'  }}>
                                                <Grid item>
                                                    <Box component='img'
                                                        alt='logo'
                                                        src={item?.thumbnail ? item?.thumbnail : '/images/avatar.png'}
                                                        style={{
                                                            width: '450px',
                                                            height: '250px',
                                                            objectFit: 'cover',
                                                            borderRadius: '8px',
                                                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                                        }}
                                                        onClick={() => viewHandler(item)}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                                <Grid item onClick={() => viewHandler(item)}>
                                                    <Typography sx={{ fontWeight: 'bold', color: '#0a66c2' }} fontSize={14}>
                                                        {item.title}
                                                    </Typography>
                                                    <Typography sx={{ color: 'text.primary', mb: 1 }} fontSize={12}>
                                                        {item.category?.category}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Button
                                                        variant='contained'
                                                        color='primary'
                                                        size='small'
                                                        onClick={() => updateHandler(item)}
                                                    > EDIT
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Grid>
                                </Card>
                            </Grid>
                        )
                    })
                }

            </Grid>

            {selectedItem && (
                <>
                    <DialogEdit key={selectedItem.id} selectedItem={selectedItem}
                        visible={openEditModal}
                        onCloseClick={() => setOpenEditModal(!openEditModal)}
                        onStateChange={() => setHookSignature(v4())} />
                    <DialogView key={selectedItem.id} selectedItem={selectedItem}
                        visible={openViewModal}
                        onCloseClick={() => setOpenViewModal(!openViewModal)}
                        onStateChange={() => setHookSignature(v4())} />
                </>
            )}
        </>
    );
}

OngoingTrainingScreen.acl = {
    action: 'read',
    subject: 'user-training-management'
}

export default OngoingTrainingScreen
