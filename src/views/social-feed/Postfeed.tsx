import Box from '@mui/material/Box'
import { Avatar, Button, Card, CircularProgress, TextField } from '@mui/material'
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
        <Card sx={{ padding: { xs: 3, md: 5 } }}>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Box mr={3} mt={1}>
                    <Avatar src={getUserAvatar(user!)} alt='profile-picture' sx={{ height: 50, width: 50 }} />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <TextField
                        multiline
                        fullWidth
                        rows={3}
                        placeholder="Start a post"
                        variant="standard"
                        onChange={(e) => setContent(e.target.value)}
                    />
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', mt: 3, alignItems: 'end' }}>
                <Button sx={{ width: 45 }} disabled={isLoading} onClick={handleUpdateStatus} size='small' color='primary' variant='contained' >
                    {isLoading ? <CircularProgress /> : "Post"}
                </Button>
            </Box>
        </Card>
    )
}

export default Postfeed
