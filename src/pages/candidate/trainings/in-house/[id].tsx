import { Icon } from "@iconify/react";
import { Box, Button, CircularProgress, FormControl, FormControlLabel, Grid, IconButton, Radio, RadioGroup, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HttpClient } from "src/services";
import Training from "src/contract/models/training";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Question from "src/contract/models/question";
import { toast } from "react-hot-toast";
import { getCleanErrorMessage } from "src/utils/helpers";
import AnswerForm from "src/views/instant-training/AnswerForm";

const TrainingDetailPage = () => {
    const router = useRouter();
    const trainingId = router.query.id;
    const [training, setTraining] = useState<Training | null>(null);
    
    const [dataCard, setDataCard] = useState<Question[]>([]);

    const getListQuestion = async () => {
            const resp = await HttpClient.get(`/training/question?training_id=${trainingId}`);
            if (resp.status != 200) {
                throw resp.data.message ?? "Something went wrong!";
            }

            const rows = resp.data.questions;
            setDataCard(rows);
    }

    const getDetailTraining = async () => {
        const resp = await HttpClient.get(`/training/${trainingId}`);
        if (resp.status != 200) {
            alert(resp.data?.message ?? "");

            return;
        }

        setTraining(resp.data.training);
    }

    useEffect(() => {
        getListQuestion();
        getDetailTraining();
    }, []);

    const handleChangeMC = (event: React.ChangeEvent<HTMLInputElement>) => {
        const ans = JSON.parse((event.target as HTMLInputElement).value) as any
        console.log(ans);
        const json = {
            training_id: trainingId,
            question_id: ans?.question_id,
            answer_id: ans?.id
        }
        HttpClient.post('/training/answer/save' , json).then(response => {
            console.log(response);
        })
    };

    const finish = async () => {
        try
        {
            const resp = await HttpClient.post('/training/answer/submit', { training_id: trainingId});
            if (resp.status != 200) {
                throw resp.data.message ?? "Something went wrong!";
            }
            toast.success(` The test submited successfully!`);
        } catch (error) {
            toast.error(`Opps ${getCleanErrorMessage(error)}`);
        }
    }
    

    return !training ? (<CircularProgress />) : (
        <Grid container>
            <Grid item xs={12} sx={{ p: 10, backgroundColor: 'white' }}>
                <Box sx={{ mb: 6, display: 'flex', flexDirection: 'rows', alignItems: 'center' }}>
                    <IconButton onClick={() => router.back()}>
                        <FontAwesomeIcon icon={faArrowLeft} color='text.primary' />
                    </IconButton>
                    <Typography variant="body2" color={"#32487A"} fontWeight="600" fontSize={18} ml={5}>
                        Training : {training.title}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', mb: 6 }}>
                    <Grid container spacing={2} sx={{ padding:5 }}>
                        {dataCard.map((item, index) => {
                            const choices = item.choices as any[]

                            return (
                                <>
                                <Grid item xs={12}>                                            
                                    <Typography sx={{ fontWeight: 'bold' }} fontSize={16}>
                                        {index+1}. {item.question}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} ml={4}>  
                                { item.form_type === 'ft' && (                                          
                                    <AnswerForm training_id={trainingId} question_id={item?.id}></AnswerForm>
                                )}
                                { item.form_type === 'mc' && ( 
                                <FormControl>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        name="radio-buttons-group"
                                        onChange={handleChangeMC}
                                    >
                                        {choices.map((cho) => {
                                        
                                        return (
                                        <FormControlLabel value={JSON.stringify(cho)} control={<Radio />} label={cho?.answer} key={cho.id} />
                                        )
                                        })}
                                    </RadioGroup>
                                </FormControl>
                                )}
                                </Grid>
                                </>
                            )
                        })}
                    </Grid>
                </Box>
                <Grid container sx={{ alignItems: 'right', justifyContent: 'right' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }} >
                        <Button variant='contained' onClick={finish} startIcon={<Icon icon='ion:enter' fontSize={10} />}>
                            Finish Attemp
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
}

TrainingDetailPage.acl = {
    action: 'read',
    subject: 'home'
}

export default TrainingDetailPage;