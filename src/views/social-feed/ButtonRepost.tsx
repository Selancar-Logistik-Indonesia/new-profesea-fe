import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material"
import Icon from "src/@core/components/icon";
import { useState } from "react";
import FeedCard from "./FeedCard";
import ISocialFeed from "src/contract/models/social_feed";
import { useSocialFeed } from "src/hooks/useSocialFeed";
import { getCleanErrorMessage } from "src/utils/helpers";

const ButtonRepost = (props: { post: ISocialFeed }) => {
    const { post } = props;
    const [dialogOpen, setOpenDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState('');
    const { updateStatus } = useSocialFeed();

    const handleUpdateStatus = async () => {
        setIsLoading(true);
        try {
            await updateStatus({
                content_type: 'text',
                content: content,
                feed_repost: JSON.stringify(post),
            });

            setContent('');
            setOpenDialog(false);
        } catch (error) {
            alert(getCleanErrorMessage(error))
        }

        setIsLoading(false);
    }

    return (
        <>
            <Button onClick={() => setOpenDialog(!dialogOpen)}
                sx={{ fontSize: '0.7rem', textTransform: 'none' }}
                size='small'
                color='primary'
                startIcon={<Icon icon='ic:round-repeat' fontSize={10} />}
            >
                Repost
            </Button >
            <Dialog sx={{ minWidth: { md: 320 } }} open={dialogOpen} onClose={() => setOpenDialog(!dialogOpen)}>
                <DialogTitle>
                    <Typography variant='h6' color={'#32487A'} fontWeight='600'>
                        Repost Feed
                    </Typography>
                </DialogTitle>

                <DialogContent>
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
                    <FeedCard item={post} withBottomArea={false} />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="error" onClick={() => setOpenDialog(!dialogOpen)}>
                        <Icon icon='material-symbols:cancel-outline' color='white' fontSize={19} />
                        Cancel
                    </Button>
                    <Button variant="contained" disabled={isLoading} onClick={handleUpdateStatus}>
                        <Icon icon='material-symbols:upload' color='white' fontSize={19} />
                        {isLoading ? <CircularProgress /> : 'Post'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ButtonRepost;