import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { Avatar, Button, Card, CardMedia, TextField } from '@mui/material'
import { useAuth } from 'src/hooks/useAuth'

export type ParamMain = {
    logo: string
    name: string
    waktu: string
    postcomment: string
};

const Postfeed = (props: any) => {
    const parentId = props['parentid'];
    const { user } = useAuth();
    const userPhoto = (user?.photo) ? user.photo : "/images/avatars/default-user.png";

    return (
        <Card>
            <CardMedia>
                <Grid container paddingRight={5} paddingTop={5} paddingBottom={5}>
                    <Grid item xs={4} md={2}>
                        <Box display="flex"
                            justifyContent="center"
                            alignItems="center" >
                            <Avatar src={userPhoto} alt='profile-picture' sx={{ height: 60, width: 60 }} />
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
                                />
                            </Grid>
                            <Grid item justifyContent="flex-end" sx={{ display: { xs: 12, md: 2, justifyContent: 'right' } }}>
                                <Button size='small' color='primary' variant='contained' > {parentId ? 'Post ' : 'Post '}</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardMedia>
        </Card>
    )
}

export default Postfeed
