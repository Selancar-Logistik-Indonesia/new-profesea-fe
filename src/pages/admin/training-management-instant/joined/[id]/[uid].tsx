import { Icon } from "@iconify/react";
import { Box, Button, CircularProgress, Grid, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HttpClient } from "src/services";
import Training from "src/contract/models/training";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import AnswerResult from "src/contract/models/answer_result";
import { toast } from "react-hot-toast";
import { getCleanErrorMessage } from "src/utils/helpers";
import FormScore from "./FormScore";

const TrainingResultPage = () => {
    const router = useRouter();
    const trainingId = router.query.id;
    const userId = router.query.uid;
    const [training, setTraining] = useState<Training | null>(null);
    
    const [dataCard, setDataCard] = useState<AnswerResult[]>([]);
    console.log(router.query.uid)

    const getListAnswerResult = async () => {
            const resp = await HttpClient.get(`/training/${trainingId}/result?user_id=${userId}`);
            if (resp.status != 200) {
                throw resp.data.message ?? "Something went wrong!";
            }

            const rows = resp.data.results;
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
        getListAnswerResult();
        getDetailTraining();
    }, []);


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

                            return (
                                <>
                                <Grid item xs={9}>                                            
                                    <Typography sx={{ fontWeight: 'bold' }} fontSize={16}>
                                        {index+1}. {item?.question?.question}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}> 
                                    <Grid container sx={{ alignItems: 'center', justifyContent: 'center' }}>
                                    { item?.score <= 0 && (
                                        <FormScore></FormScore>
                                    )}
                                    { item.form_type === 'mc' && item?.score > 0 && (
                                        <Typography sx={{ fontWeight: 'bold' }} fontSize={16}>
                                            {item?.score}
                                        </Typography>
                                    )}
                                    </Grid>
                                </Grid>
                                </>
                            )
                        })}
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
}

TrainingResultPage.acl = {
    action: 'read',
    subject: 'home'
}

export default TrainingResultPage;