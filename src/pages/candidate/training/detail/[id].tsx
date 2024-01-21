import { Icon } from "@iconify/react";
import { Avatar, Box, Button, CircularProgress, Grid, IconButton, Typography } from "@mui/material";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HttpClient } from "src/services";
import Training from "src/contract/models/training";
import { formatIDR, getUserAvatar } from "src/utils/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import PaymentDialog from "src/views/payment/PaymentDialog";

const TrainingDetailPage = () => {
    const router = useRouter();
    const trainingId = router.query.id;
    const [training, setTraining] = useState<Training | null>(null);
    const [openDialog, setOpenDialog] = useState(false);

    const handleClickBuy = async () => {
        setOpenDialog(!openDialog);
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
        getDetailTraining();
    }, []);

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
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Box sx={{ width: 35 }}>
                        <Icon icon='solar:calendar-bold-duotone' color='#32487A' fontSize={24}/>
                        </Box>
                        <Box sx={{ width: 120 }}>
                            <Typography>Date & time</Typography>
                        </Box>
                        <Box>
                            <Typography>{moment(training.schedule).format("dddd, DD MMM YYYY h:mm")}</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Box sx={{ width: 35 }}>
                            <Icon icon='solar:bookmark-circle-bold-duotone' color='#32487A' fontSize={24}/>
                        </Box>
                        <Box sx={{ width: 120 }}>
                            <Typography>Category</Typography>
                        </Box>
                        <Box>
                            <Typography>{training?.category?.category}</Typography>
                        </Box>
                    </Box>
                </Box>

                <Box sx={{ mb: 6 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Typography variant='h6' mt={1} width={155}>{formatIDR(training.price)}</Typography>

                        {training.joined_at
                            ? (<Button disabled={true} variant='contained' size='small'>Joined</Button>)
                            : (<Button onClick={handleClickBuy} variant='contained' size='small'>Buy It</Button>)}
                    </Box>
                </Box>

                <Box sx={{ mb: 6 }}>
                    <Typography variant="body2" color={"#32487A"} fontWeight="600" fontSize={16} mb={2}>Subject Matter Expert</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Box sx={{ mr: 3 }}>
                            <Avatar sx={{ height: 60, width: 60 }} src={getUserAvatar(training.trainer)} />
                        </Box>
                        <Box mt={1}>
                            <Typography variant='body1'>{training.trainer.name}</Typography>
                            <Typography variant='caption'>{training.trainer.email}</Typography>
                        </Box>
                    </Box>
                </Box>

                <Box sx={{ maxWidth: 720 }} component='div' dangerouslySetInnerHTML={{ __html: training.short_description }}></Box>
            </Grid>

            {openDialog && (<PaymentDialog onClose={() => setOpenDialog(!openDialog)} training={training} openDialog={openDialog} />)}
        </Grid>
    );
}

TrainingDetailPage.acl = {
    action: 'read',
    subject: 'home'
}

export default TrainingDetailPage;