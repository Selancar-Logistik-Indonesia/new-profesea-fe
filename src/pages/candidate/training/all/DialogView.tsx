import { Ref, forwardRef, ReactElement, useState } from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import Icon from 'src/@core/components/icon'
import Training from 'src/contract/models/training'
import moment from 'moment'
import { Avatar, Button, CircularProgress } from '@mui/material'
import { formatIDR, getCleanErrorMessage, getUserAvatar } from 'src/utils/helpers'
import { HttpClient } from 'src/services'


const Transition = forwardRef(function Transition(
    props: FadeProps & { children?: ReactElement<any, any> },
    ref: Ref<unknown>
) {
    return <Fade ref={ref} {...props} />
})


type ViewProps = {
    selectedItem: Training;
    visible: boolean;
    onCloseClick: VoidFunction;
    onStateChange: VoidFunction;
};

const DialogView = (props: ViewProps) => {
    const { selectedItem } = props;
    const [onLoading, setOnLoading] = useState(false);

    const handleClickBuy = async () => {
        setOnLoading(true);
        try {
            const response = await HttpClient.get(`/training/${selectedItem.id}/join`);
            if (response.status != 200) {
                throw response.data?.message ?? 'Unknow error';
            }

            selectedItem.joined_at = moment().format();
        } catch (error) {
            alert(getCleanErrorMessage(error));
        }

        setOnLoading(false);
    }

    return (
        <Dialog
            fullWidth
            open={props.visible}
            maxWidth='lg'
            scroll='body'
            onClose={props.onCloseClick}
            TransitionComponent={Transition}
        >
            <DialogContent
                sx={{
                    position: 'relative',
                    pb: theme => `${theme.spacing(8)} !important`,
                    px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                    pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                }}
            >
                <IconButton size='small' onClick={props.onCloseClick} sx={{ position: 'absolute', right: '1rem', top: '1rem' }} >
                    <Icon icon='mdi:close' />
                </IconButton>
                <Box sx={{ mb: 6, }}>
                    <Typography variant='h4' sx={{ mb: 3 }}>
                        Training: {selectedItem.title}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', mb: 6 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Box sx={{ width: 35 }}>
                            <Icon icon='mdi:calendar' />
                        </Box>
                        <Box sx={{ width: 120 }}>
                            <Typography>Date & time</Typography>
                        </Box>
                        <Box>
                            <Typography>{moment(selectedItem.schedule).format("dddd, DD MMM YYYY h:mm")}</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Box sx={{ width: 35 }}>
                            <Icon icon='mdi:label' />
                        </Box>
                        <Box sx={{ width: 120 }}>
                            <Typography>Category</Typography>
                        </Box>
                        <Box>
                            <Typography>{selectedItem?.category?.category}</Typography>
                        </Box>
                    </Box>
                </Box>

                <Box sx={{ mb: 6 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Typography variant='h6' mt={1} width={155}>{formatIDR(selectedItem.price)}</Typography>

                        {selectedItem.joined_at
                            ? (<Button disabled={true} variant='contained'>Joined</Button>)
                            : (
                                <Button disabled={onLoading} onClick={handleClickBuy} variant='contained'>
                                    {
                                        onLoading
                                            ? <CircularProgress size={21} />
                                            : "Buy It"
                                    }
                                </Button>
                            )}
                    </Box>
                </Box>

                <Box sx={{ mb: 6 }}>
                    <Typography variant='h6' mb={2}>Subject Matter Expert</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Box sx={{ mr: 3 }}>
                            <Avatar sx={{ height: 60, width: 60 }} src={getUserAvatar(selectedItem.trainer)} />
                        </Box>
                        <Box mt={1}>
                            <Typography variant='body1'>{selectedItem.trainer.name}</Typography>
                            <Typography variant='caption'>{selectedItem.trainer.email}</Typography>
                        </Box>
                    </Box>
                </Box>

                <Box sx={{ maxWidth: 720 }} component='div' dangerouslySetInnerHTML={{ __html: selectedItem.short_description }}></Box>
            </DialogContent>
        </Dialog >
    )
}

export default DialogView