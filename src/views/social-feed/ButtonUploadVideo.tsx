import { Icon } from "@iconify/react";
import { Box, Button, CardMedia, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
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
                attachments: inputFile.current?.files?.item(0)
            });

            setContent('');
            setOpen(false);
        } catch (error) {
            alert(getCleanErrorMessage(error))
        }

        setIsLoading(false);
    }

    return <>
        <Button onClick={openModalVideo} size='small' variant='text' sx={{ textDecoration: 'none' }}>
            <Icon fontSize={22} icon='mdi:videocam' />
            <div style={{ marginLeft: 5 }}>Video</div>
        </Button>
        <Dialog sx={{ minWidth: { md: 320 } }} open={open} onClose={() => setOpen(!open)}>
            <DialogTitle>Upload Video</DialogTitle>
            <DialogContent>
                <CardMedia sx={{ width: { xs: '100%', md: 420 }, display: isVideoSelected ? 'block' : 'none' }} component='video' ref={videoPreview} controls />

                <Box component='div' onClick={openModalVideo} sx={{ display: !isVideoSelected ? 'flex' : 'none', flexDirection: 'column', backgroundColor: "#eee", alignItems: 'center', justifyContent: 'center', width: { xs: '100%', md: 420 }, height: 240 }}>
                    <Icon icon='mdi:play' fontSize={110} />
                </Box>

                <TextField
                    disabled={isLoading}
                    sx={{ mt: 4 }}
                    value={content}
                    multiline
                    fullWidth
                    rows={4}
                    placeholder="Write a caption"
                    variant="standard"
                    onChange={(e) => setContent(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button sx={{ color: 'text.secondary' }} onClick={() => setOpen(!open)}>Cancel</Button>
                <Button disabled={isLoading} onClick={handleUpdateStatus}>
                    {
                        isLoading
                            ? <CircularProgress />
                            : 'Upload'
                    }
                </Button>
            </DialogActions>
        </Dialog>

        <input onChange={onFileSelected} ref={inputFile} type='file' style={{ display: 'none' }} />
    </>
}

export default ButtonUploadVideo;