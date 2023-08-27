import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { HttpClient } from 'src/services';
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import Training from 'src/contract/models/training';
import Icon from 'src/@core/components/icon';
import Link from 'next/link';

const SeafererInstantTraining = () => {
    const [dataCard, setDataCard] = useState<Training[]>([]);

    const getListTraining = async () => {
        try {
            const resp = await HttpClient.get(`/training?search=&page=1&take=25&instant=1`);
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

    useEffect(() => {
        getListTraining();
    }, []);

    return (
        <Grid container spacing={2} mt={1}>
            {dataCard.map((item) => {

                return (
                    <Grid item xs={12} md={4} sx={{ marginTop: '-10px', marginBottom: '10px' }} key={item.id}>
                        <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
                            <Grid item xs={12} >
                                <CardContent>
                                    <Grid container sx={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <Grid item component={Link} href={`/candidate/training/in-house/${item.id}`}>
                                            <img
                                                alt='logo'
                                                src={item?.thumbnail ? item?.thumbnail : '/images/icon-trainer.png'}
                                                style={{
                                                    width: '100%',
                                                    height: '200px',
                                                    objectFit: "fill",
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                        <Grid item component={Link} href={`/candidate/training/detail/${item.id}`}>
                                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }} mb={1} >
                                                <Icon icon='solar:bookmark-circle-bold-duotone' color='#32487A' />
                                                <Typography sx={{ fontWeight: 'bold', color: '#0a66c2'}} ml="0.5rem" mt="0.2rem" fontSize={14}>
                                                    {item.title}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }} mb={2} >
                                                <Icon icon='solar:tag-horizontal-bold-duotone' color='#32487A' />
                                                <Typography sx={{ color: 'text.primary' }} ml="0.5rem" mt="0.2rem" fontSize={12}>
                                                    {item.category?.category}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid container sx={{ alignItems: 'right', justifyContent: 'right' }}>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }} mb={2} >
                                            <Button size='small' LinkComponent={Link} variant='contained' color='primary' href={`/candidate/training/in-house/${item.id}`}>
                                                {(item?.score > 0) ? `(Score - ${item?.score})  Re-Test` : 'Try It'  } 
                                            </Button>
                                        </Box>
                                    </Grid>
                                </CardContent>
                            </Grid>
                        </Card>
                    </Grid>
                )
            })}
        </Grid>
    );
}

SeafererInstantTraining.acl = {
    action: 'read',
    subject: 'seaferer-training'
}

export default SeafererInstantTraining
