import { Icon } from "@iconify/react";
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { ChangeEvent, useRef, useState } from "react";
import { useSocialFeed } from "src/hooks/useSocialFeed";
import { getCleanErrorMessage } from "src/utils/helpers";
import ImageListPreview from "./ImageListPreview";

const ButtonUploadPhoto = () => {
    const [open, setOpen] = useState(false);
    const inputFile = useRef<HTMLInputElement>(null);
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { updateStatus } = useSocialFeed();
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
                attachments: inputFile.current?.files
            });

            setContent('');
            setOpen(false);
        } catch (error) {
            alert(getCleanErrorMessage(error))
        }

        setIsLoading(false);
    }

    return <>
        <Button onClick={openModalPhoto} size='small' variant='text' sx={{ textDecoration: 'none' }}>
            <Icon color="#378fe9" fontSize={22} icon='mdi:image' />
            <div style={{ marginLeft: 5 }}>Photo</div>
        </Button>
        <Dialog sx={{ minWidth: { md: 320 } }} open={open} onClose={() => setOpen(!open)}>
            <DialogTitle>Upload Photo</DialogTitle>
            <DialogContent>
                {
                    imagePreviewUrls.length > 0 && (
                        <ImageListPreview urls={imagePreviewUrls} />
                    )
                }

                <Box component='div' onClick={openModalPhoto} sx={{ display: imagePreviewUrls.length == 0 ? 'flex' : 'none', flexDirection: 'column', backgroundColor: "#eee", alignItems: 'center', justifyContent: 'center', width: { xs: '100%', md: 420 }, height: 240 }}>
                    <Icon icon='mdi:image' fontSize={110} />
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

        <input onChange={onFileSelected} ref={inputFile} type='file' multiple style={{ display: 'none' }} />
    </>
}

export default ButtonUploadPhoto;