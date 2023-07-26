import { Ref, forwardRef, ReactElement } from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import Icon from 'src/@core/components/icon'
import Training from 'src/contract/models/training'
import { Avatar, Button, Divider, TextField } from '@mui/material'

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

const DialogViewParticipant = (props: ViewProps) => {
    const training = props.selectedItem;

    return (
        <Dialog
            fullWidth
            open={props.visible}
            maxWidth='sm'
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
                <Box sx={{ mb: 6 }}>
                    <Typography variant='h5'>{training.title}</Typography>
                    <Typography variant='body2' sx={{ mb: 3 }}>Total Participants: {training.count_participant}</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end', mb: 4 }}>
                    <TextField placeholder='Search..' variant='standard' />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                        <Box mr={2}>
                            <Avatar />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center' }}>
                            <Typography lineHeight={1.4} variant='body1'>Username</Typography>
                            <Typography lineHeight={1.4} variant='caption' fontSize={10}>Username</Typography>
                        </Box>

                        <Divider color='red' />

                        <Box flexGrow={1} display={'flex'} flexDirection={'column'} alignItems={'end'}>
                            <Button size='small'>Open Profile</Button>
                        </Box>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default DialogViewParticipant