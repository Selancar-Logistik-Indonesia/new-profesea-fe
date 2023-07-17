// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Avatar, Button, Divider } from '@mui/material'

export type ParamJobVacncy = {
    judul: string
    namapt: string
    lokasi: string
    waktu: string
}

type userProps = {
    datauser: any
}

const Profile = (props: userProps) => {
    const userPhoto = (props.datauser?.photo) ? props.datauser.photo : "/images/avatars/default-user.png";

    return (
        <Grid container>
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <Box display='flex' justifyContent='center' alignItems='center' mb={3}>
                            <Avatar src={userPhoto} alt='profile-picture' sx={{ width: 80, height: 80 }} />
                        </Box>
                        <Box display='flex' justifyContent='center' alignItems='center'>
                            <Typography variant='body1' sx={{ color: 'text.primary', textTransform: 'uppercase' }}>
                                {props.datauser?.name}
                            </Typography>
                        </Box>
                        <Box display='flex' justifyContent='center' alignItems='center'>
                            <Typography sx={{ color: 'text.secondary' }}> {props.datauser?.industry?.name}</Typography>
                        </Box>
                        <Divider sx={{ marginTop: '10px' }} />
                        <Box display='flex' justifyContent='center' alignItems='center'>

                            <Typography variant='body1' sx={{ color: '#424242', fontWeight: 600 }}>

                                <a href={props.datauser?.website} target='_blank'>
                                    {props.datauser?.website}
                                </a>

                            </Typography>
                        </Box>
                        <Box display='flex' justifyContent='center' alignItems='center'>
                            <Button
                                variant='contained'
                                sx={{ width: '100%', padding: 1, margin: 2, minWidth: '100%' }}
                                href={'/company'}
                            >
                                Edit My Profile
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default Profile
