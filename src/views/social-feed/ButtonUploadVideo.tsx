import { Icon } from "@iconify/react";
import { Box, Button, CardMedia, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { ChangeEvent, useRef, useState } from "react";
import { useSocialFeed } from "src/hooks/useSocialFeed";
import { getCleanErrorMessage } from "src/utils/helpers";

const ButtonUploadVideo = () => {
    const [open, setOpen] = useState(false);
    const inputFile = useRef<HTMLInputElement>(null);
    const videoPreview = useRef<HTMLVideoElement>(null);
    const [content, setContent] = useState('');
    const [isVideoSelected, setVideoSelected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { updateStatus } = useSocialFeed();

    const onFileSelected = (evt: ChangeEvent<HTMLInputElement>) => {
        const mfile = evt.target?.files?.item(0);
        if (!mfile) {
            return;
        }

        const objUrl = URL.createObjectURL(mfile);
        videoPreview.current!.src = objUrl;
        videoPreview.current!.load();
        setVideoSelected(true);
    }

    const openModalVideo = () => {
        inputFile.current?.click();
        setOpen(true);
        setVideoSelected(false);
    }

    const handleUpdateStatus = async () => {
        setIsLoading(true);
        try {
            await updateStatus({
                content_type: 'videos',
                content: content,
                attachments: inputFile.current?.files
            });

            setContent('');
            setOpen(false);
        } catch (error) {
            alert(getCleanErrorMessage(error))
        }

        setIsLoading(false);
    }

    return (
        <>
            <Button onClick={openModalVideo} size='small' variant='text' sx={{ textDecoration: 'none' }}>
                <Icon color='#5f9b41' fontSize={22} icon='solar:videocamera-add-bold-duotone' />
                <div style={{ marginLeft: 5 }}>Video</div>
            </Button>
            <Dialog sx={{ minWidth: { md: 320 } }} open={open} onClose={() => setOpen(!open)}>
                <DialogTitle>
                    <Typography variant='h6' color={'#32487A'} fontWeight='600'>
                        Upload Video
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <CardMedia
                        sx={{ width: { xs: '100%', md: 420 }, display: isVideoSelected ? 'block' : 'none' }}
                        component='video'
                        ref={videoPreview}
                        controls
                    />

                    <Box
                        component='div'
                        onClick={openModalVideo}
                        sx={{
                            display: !isVideoSelected ? 'flex' : 'none',
                            flexDirection: 'column',
                            backgroundColor: '#eee',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: { xs: '100%', md: 420 },
                            height: 240
                        }}
                    >
                        <Icon icon='mdi:play' fontSize={110} />
                    </Box>

                    <TextField
                        disabled={isLoading}
                        sx={{ mt: 4 }}
                        value={content}
                        multiline
                        fullWidth
                        rows={4}
                        placeholder='Write a caption'
                        variant='standard'
                        onChange={e => setContent(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color='error' onClick={() => setOpen(!open)}>
                        <Icon icon='material-symbols:cancel-outline' color='white' fontSize={19} />
                        Cancel
                    </Button>

                    <Button variant='contained' disabled={isLoading} onClick={handleUpdateStatus}>
                        <Icon icon='material-symbols:upload' color='white' fontSize={19} />
                        {isLoading ? <CircularProgress /> : 'Upload'}
                    </Button>
                </DialogActions>
            </Dialog>

            <input onChange={onFileSelected} ref={inputFile} type='file' style={{ display: 'none' }} />
        </>
    )
}

export default ButtonUploadVideo;