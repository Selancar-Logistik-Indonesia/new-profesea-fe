import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Autocomplete, CardHeader, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { HttpClient } from 'src/services';
// import { AxiosError } from 'axios';
// import { toast } from 'react-hot-toast';
import Training from 'src/contract/models/training';
// import Avatar from 'src/@core/components/mui/avatar';
// import { getUserAvatar } from 'src/utils/helpers';
// import Icon from 'src/@core/components/icon';
// import Link from 'next/link';
import EssayForm from 'src/views/instant-training/EssayForm';
import MultipleForm from 'src/views/instant-training/MultipleForm';

const types = [
  { id: 'ft', name: 'Essay' },
  { id: 'mc', name: 'Multiple Choice' },
]

const answers = [1,2,3,4,5]

const QuestionForm = (props : { training_id : any}) => {
    const [dataCard, setDataCard] = useState<Training| null>(null);
    const [typeQue, setTypeQue] = useState<any>('');
    const [answer, setAnswer] = useState<any>(0);

    const getDetailTraining = async () => {
        const resp = await HttpClient.get(`/training/${props.training_id}`);
        if (resp.status != 200) {
            alert(resp.data?.message ?? "");

            return;
        }
        setDataCard(resp.data.training);
    }

    useEffect(() => {
        getDetailTraining();
    }, []);

    return (
        <Grid item xs={12} >
            <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' , mt:-3}}>
                <CardHeader title={
                    <Typography variant="body2" fontWeight="600" fontSize={18}>
                        Title : {dataCard?.title}
                    </Typography>}>
                </CardHeader>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={types}  
                                getOptionLabel={(option:any) => option.name}
                                renderInput={(params) => <TextField {...params} label="Choose Type Question" />}
                                onChange={(event: any, newValue: any | null)=> (newValue) ? setTypeQue(newValue) : setTypeQue('')}
                            />
                        </Grid>
                        <Grid item xs={6}>
                        {typeQue?.id === 'mc' && (
                            <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={answers}
                            renderInput={(params) => <TextField {...params} label="Total Answer" />}
                            onChange={(event: any, newValue: any | null)=> (newValue) ? setAnswer(newValue) : setAnswer(0)}
                            />
                        )}
                        </Grid>
                        <Grid item xs={12}>
                        {typeQue?.id === 'ft' && (
                            <EssayForm training_id={props.training_id}></EssayForm>
                        )}
                        {typeQue?.id === 'mc' && (
                            <MultipleForm training_id={props.training_id} answer={answer}></MultipleForm>
                        )}                    
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    )
    
}

QuestionForm.acl = {
    action: 'read',
    subject: 'seaferer-training-ongoing'
}

export default QuestionForm
