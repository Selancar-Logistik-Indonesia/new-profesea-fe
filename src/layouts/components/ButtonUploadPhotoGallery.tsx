import { Icon } from "@iconify/react";
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle,   Typography } from "@mui/material";
import { ChangeEvent, useRef, useState } from "react";
// import { useSocialFeed } from "src/hooks/useSocialFeed";
import { HttpClient } from "src/services";
import { getCleanErrorMessage } from "src/utils/helpers";
import ImageListPreview from "./ImageListPreview";

const ButtonUploadPhotoGallery = () => {
    const [open, setOpen] = useState(false);
    const inputFile = useRef<HTMLInputElement>(null);
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    // const { updateStatus } = useSocialFeed();
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
            debugger;
            const formData = new FormData()
            formData.append('content', content)
            formData.append('content_type', 'images')
            if (inputFile.current && inputFile.current.files) {
              const files = inputFile.current.files
              for (let i = 0; i < files.length; i++) {
                const file = files[i]
                formData.append('image_file[]', file)
                console.log(`Selected file name: ${file.name}`)
                // Do whatever you want with the individual file
              }
            }
 
            const response = await HttpClient.post('/user/gallery', formData)
            if (response.status != 200) {
              throw response.data?.message ?? 'Something went wrong'
            }
 
 
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
                        <Icon icon='mdi:image' fontSize={110} />
                    </Box>
 
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="error" onClick={() => setOpen(!open)}>
                        <Icon icon='material-symbols:cancel-outline' color='white' fontSize={19} />
                        Cancel
                    </Button>
                    <Button variant="contained" disabled={isLoading} onClick={handleUpdateStatus}>
                        <Icon icon='material-symbols:upload' color='white' fontSize={19} />
                        {isLoading ? <CircularProgress /> : 'Upload'}
                    </Button>
                </DialogActions>
            </Dialog>

            <input onChange={onFileSelected} ref={inputFile} type='file' multiple style={{ display: 'none' }} />
        </>
    )
}

export default ButtonUploadPhotoGallery;