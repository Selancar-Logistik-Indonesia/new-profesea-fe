import { Icon } from "@iconify/react";
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { ChangeEvent, useRef, useState } from "react"; 
import { useGroupFeed } from "src/hooks/useGroupFeed"; 
import { getCleanErrorMessage } from "src/utils/helpers";
import ImageListPreview from "./ImageListPreview";

const ButtonUploadPhotoGroup = (id:any) => {
    const [open, setOpen] = useState(false);
    const inputFile = useRef<HTMLInputElement>(null);
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { updateStatus } = useGroupFeed();
    const [imagePreviewUrls, setPreviewUrls] = useState<string[]>([]);

    const onFileSelected = (evt: ChangeEvent<HTMLInputElement>) => {
        const mfiles = evt.target?.files;
        if (!mfiles) {
            return;
        }

        setPreviewUrls([]);
        const urls = [];
        for (const file of mfiles) {
            urls.push(URL.createObjectURL(file));
        }

        setPreviewUrls(urls);
    }

    const openModalPhoto = () => {
        inputFile.current?.click();
        setOpen(true);
        setPreviewUrls([]);
    }

    const handleUpdateStatus = async () => {
        setIsLoading(true);
        try {
            await updateStatus({
                content_type: 'images',
                content: content,
                attachments: inputFile.current?.files,
                group_id : id.id
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
            <Button onClick={openModalPhoto} size='small' variant='text' sx={{ textDecoration: 'none' }}>
                <Icon color='#378fe9' fontSize={22} icon='solar:gallery-add-bold-duotone' />
                <div style={{ marginLeft: 5 }}>Photo</div>
            </Button>
            <Dialog sx={{ minWidth: { md: 320 } }} open={open} onClose={() => setOpen(!open)}>
                <DialogTitle>
                    <Typography variant='h6' color={'#32487A'} fontWeight='600'>
                        Upload Photo
                    </Typography>
                </DialogTitle>

                <DialogContent>
                    {imagePreviewUrls.length > 0 && <ImageListPreview urls={imagePreviewUrls} />}

                    <Box
                        component='div'
                        onClick={openModalPhoto}
                        sx={{
                            display: imagePreviewUrls.length == 0 ? 'flex' : 'none',
                            flexDirection: 'column',
                            backgroundColor: '#eee',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: { xs: '100%', md: 420 },
                            height: 240
                        }}
                    >
                        <Icon icon='solar:gallery-bold-duotone' fontSize={110} />
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
                    <Button variant="outlined" size="small" color="error" onClick={() => setOpen(!open)}>
                        <Icon icon='material-symbols:cancel-outline' color='error' fontSize={19} />
                        Cancel
                    </Button>
                    <Button variant="contained" size="small" disabled={isLoading} onClick={handleUpdateStatus}>
                        <Icon icon='material-symbols:upload' color='white' fontSize={19} />
                        {isLoading ? <CircularProgress /> : 'Upload'}
                    </Button>
                </DialogActions>
            </Dialog>

            <input onChange={onFileSelected} ref={inputFile} type='file' multiple style={{ display: 'none' }} />
        </>
    )
}

export default ButtonUploadPhotoGroup;