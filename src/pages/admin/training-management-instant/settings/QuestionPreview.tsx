import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
// import { Box, Button, Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import { HttpClient } from 'src/services';
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import Training from 'src/contract/models/training';
// import Avatar from 'src/@core/components/mui/avatar';
// import { getUserAvatar } from 'src/utils/helpers';
// import Icon from 'src/@core/components/icon';
// import Link from 'next/link';

const QuestionPreview = () => {
    const [dataCard, setDataCard] = useState<Training[]>([]);

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

QuestionPreview.acl = {
    action: 'read',
    subject: 'seaferer-training-ongoing'
}

export default QuestionPreview
