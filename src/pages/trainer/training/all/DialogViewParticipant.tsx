import { Ref, forwardRef, ReactElement, useState, useEffect, useCallback } from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import Icon from 'src/@core/components/icon'
import Training from 'src/contract/models/training'
import { Avatar, Button, CircularProgress, TextField } from '@mui/material'
import { HttpClient } from 'src/services'
import { getCleanErrorMessage, getUserAvatar } from 'src/utils/helpers'
import ITrainingParticipant from 'src/contract/models/training_participant'
import debounce from 'src/utils/debounce'

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
    const [trainingUsers, setTrainingUsers] = useState<ITrainingParticipant[]>([]);
    const [onLoading, setOnLoading] = useState(true);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const take = 25;

    const handleSearch = useCallback(
        debounce((value: string) => {
            setPage(1);
            setSearch(value);
        }, 500), []);

    const getParticipants = async () => {
        setOnLoading(true);
        try {
            const response = await HttpClient.get(`/training/${training.id}/participants`, {
                page: page,
                take: take,
                search: search
            });

            if (response.status != 200) {
                throw response.data?.message ?? "Something went wrong";
            }

            const { participants } = response.data as { participants: { data: ITrainingParticipant[], total: number, next_page_url: string } }
            setHasNextPage(!!participants.next_page_url);

            if (page == 1 && !!search) {
                setTrainingUsers(participants.data);
            } else {
                setTrainingUsers(old => {
                    const newItems = old;
                    participants.data.forEach(e => newItems.push(e));

                    return newItems;
                });
            }
        } catch (error) {
            alert(getCleanErrorMessage(error));
        }
        setOnLoading(false);
    }

    useEffect(() => {
        getParticipants();
    }, [page, search]);

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
                    <TextField onChange={(e) => handleSearch(e.target.value)} placeholder='Search..' variant='standard' />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                    {trainingUsers.length == 0 && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: 120, justifyContent: 'center' }}>
                            <Typography variant='caption'>No record found</Typography>
                        </Box>
                    )}

                    {!onLoading && trainingUsers.map(e => (
                        <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', mb: 4 }} key={e.id}>
                            <Box mr={2}>
                                <Avatar src={getUserAvatar(e.user)} />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center' }}>
                                <Typography lineHeight={1.4} variant='body1'>{e.user.name}</Typography>
                                <Typography lineHeight={1.4} variant='caption' fontSize={10}>{e.user.email}</Typography>
                            </Box>

                            <Box flexGrow={1} display={'flex'} flexDirection={'column'} alignItems={'end'}>
                                <Button size='small'>Open Profile</Button>
                            </Box>
                        </Box>
                    ))}

                    {onLoading && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: 120, justifyContent: 'center' }}>
                            <CircularProgress />
                        </Box>
                    )}

                    {!onLoading && hasNextPage && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
                            <Button onClick={() => {
                                if (hasNextPage) setPage((old) => old + 1);
                            }} variant='text'>Load More ..</Button>
                        </Box>
                    )}
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default DialogViewParticipant