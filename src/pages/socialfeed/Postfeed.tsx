import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { Button, Card, CardMedia, TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useAuth } from 'src/hooks/useAuth'

export type ParamMain = {
    logo: string
    name: string
    waktu: string
    postcomment: string
};

const ProfilePicture = styled('img')(({ theme }) => ({
    width: 75,
    height: 75,
    borderRadius: theme.shape.borderRadius,
    border: `5px solid ${theme.palette.common.white}`,
    [theme.breakpoints.down('md')]: {
        marginBottom: theme.spacing(4)
    }
}));

const Postfeed = (props: any) => {
    const parentId = props['parentid'];
    const { user } = useAuth();
    const userPhoto = (user?.photo) ? user.photo : "/images/avatars/default-user.png";

    return (
        <Card>
            <CardMedia>
                <Grid container paddingRight={5} paddingTop={5} paddingBottom={5}>
                    <Grid xs={2}>
                        <Box display="flex"
                            justifyContent="center"
                            alignItems="center" >
                            <ProfilePicture src={userPhoto} alt='profile-picture' sx={{ borderRadius: '130px' }} />
                        </Box>
                    </Grid>
                    <Grid xs={10} >
                        <Grid container justifyContent="flex-end">
                            <Grid xs={12} md={12} mb={3}>
                                <TextField
                                    id="standard-multiline-static"
                                    multiline
                                    fullWidth
                                    rows={3.7}
                                    placeholder="Start a post"
                                    variant="standard"
                                />
                            </Grid>
                            <Grid justifyContent="flex-end" sx={{ display: { xs: 12, md: 2, justifyContent: 'right' } }}>
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
