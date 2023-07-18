import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { Avatar, Button, Card, CardMedia, CircularProgress, TextField } from '@mui/material'
import { useAuth } from 'src/hooks/useAuth'
import { getCleanErrorMessage, getUserAvatar } from 'src/utils/helpers';
import { useSocialFeed } from 'src/hooks/useSocialFeed';
import { useState } from 'react';

const Postfeed = () => {
    const { user } = useAuth();
    const { updateStatus } = useSocialFeed();
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleUpdateStatus = async () => {
        setIsLoading(true);
        try {
            await updateStatus({
                content_type: 'text',
                content: content
            });

            setContent('');
        } catch (error) {
            alert(getCleanErrorMessage(error))
        }

        setIsLoading(false);
    }

    return (
        <Card>
            <CardMedia>
                <Grid container paddingRight={5} paddingTop={5} paddingBottom={5}>
                    <Grid item xs={4} md={2}>
                        <Box display="flex"
                            justifyContent="center"
                            alignItems="center" >
                            <Avatar src={getUserAvatar(user!)} alt='profile-picture' sx={{ height: 60, width: 60 }} />
                        </Box>
                    </Grid>
                    <Grid item xs={8} md={10}>
                        <Grid container justifyContent="flex-end">
                            <Grid item xs={12} md={12} mb={3}>
                                <TextField
                                    id="standard-multiline-static"
                                    multiline
                                    fullWidth
                                    rows={3.7}
                                    placeholder="Start a post"
                                    variant="standard"
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </Grid>
                            <Grid item justifyContent="flex-end" sx={{ display: { xs: 12, md: 2, justifyContent: 'right' } }}>
                                <Button disabled={isLoading} onClick={handleUpdateStatus} size='small' color='primary' variant='contained' >
                                    {isLoading ? <CircularProgress /> : "Post"}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardMedia>
        </Card>
    )
}

export default Postfeed
