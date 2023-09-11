// import { Icon } from "@iconify/react";
import { Box, CircularProgress, Grid, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HttpClient } from "src/services";
import Training from "src/contract/models/training";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import AnswerResult from "src/contract/models/answer_result";
import FormScore from "./FormScore";
import { TrainingProvider } from "src/context/TrainingContext";

const TrainingResultPage = () => {
    return (
        <TrainingProvider>
            <TrainingResultPageApp />
        </TrainingProvider>
    )
}

const TrainingResultPageApp = () => {
    const router = useRouter();
    const trainingId = router.query.id;
    const userId = router.query.uid;
    const [training, setTraining] = useState<Training | null>(null);
    
    const [dataCard, setDataCard] = useState<AnswerResult[]>([]);

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
    

    return (!training && !dataCard )? (<CircularProgress />) : (
        <Grid container>
            <Grid item xs={12} sx={{ p: 10, backgroundColor: 'white' }}>
                <Box sx={{ mb: 6, display: 'flex', flexDirection: 'rows', alignItems: 'center' }}>
                    <IconButton onClick={() => router.back()}>
                        <FontAwesomeIcon icon={faArrowLeft} color='text.primary' />
                    </IconButton>
                    <Typography variant="body2" color={"#32487A"} fontWeight="600" fontSize={18} ml={5}>
                        Training : {training?.title}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', mb: 6 }}>
                        {dataCard.map((item, index) => {

                            return (
                                <>
                                <Grid container spacing={2} sx={{ padding:1 }} key={index}>
                                <Grid item xs={9}>                                            
                                    <Typography sx={{ fontWeight: 'bold' }} fontSize={16}>
                                        {index+1}. {item?.question?.question}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}> 
                                    <Grid container sx={{ alignItems: 'center', justifyContent: 'center' }}>
                                    { item.form_type === 'ft' && (
                                        <FormScore id={trainingId} result_id={item.id} user_id={item.user_id}></FormScore>
                                    )}
                                    { item.form_type === 'mc' && item?.score > 0 && (
                                        <Typography sx={{ fontWeight: 'bold' }} fontSize={16}>
                                            {item?.score}
                                        </Typography>
                                    )}
                                    </Grid>
                                </Grid>
                                </Grid>
                                </>
                            )
                        })}
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