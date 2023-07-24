// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import { Button, Divider } from '@mui/material'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { IUser } from 'src/contract/models/user'
import FieldPreference from 'src/contract/models/field_preference'
import { getUserRoleName } from 'src/utils/helpers'

export type ParamJobVacncy = {
    judul: string
    namapt: string
    lokasi: string
    waktu: string
}

type userProps = {
    datauser: IUser | null
}

const ProfilePicture = styled('img')(({ theme }) => ({
    width: 85,
    height: 85,
    borderRadius: theme.shape.borderRadius,
    border: `5px solid ${theme.palette.common.white}`,
    [theme.breakpoints.down('md')]: {
        marginBottom: theme.spacing(4)
    }
}))

const Profile = (props: userProps) => {
    const [facebook, setFacebook] = useState<any>('-')
    const [instagram, setInstagram] = useState<any>('-')
    const [linkedin, setLinkedin] = useState<any>('-')
    const [selectedItem, setSelectedItem] = useState<FieldPreference | null>(null)

    useEffect(() => {
        HttpClient.get('/user/field-preference', { user_id: props.datauser?.id }).then(response => {
            const { fieldPreference } = response.data as { fieldPreference: FieldPreference };
            setSelectedItem(fieldPreference)
        });

        HttpClient.get(AppConfig.baseUrl + '/user/sosmed?page=1&take=100').then(response => {
            const code = response.data.sosmeds.data
            for (const element of code) {
                if (element.sosmed_type == 'Facebook') {
                    setFacebook(element.sosmed_address)
                }
                if (element.sosmed_type == 'Instagram') {
                    setInstagram(element.sosmed_address)
                }
                if (element.sosmed_type == 'Linkedin') {
                    setLinkedin(element.sosmed_address)
                }
            }
        });
    }, [])

    return (
        <Grid container>
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <Box display='flex' justifyContent='center' alignItems='center'>
                            <ProfilePicture src={props.datauser?.photo} alt='profile-picture' />
                        </Box>

                        <Box display='flex' justifyContent='center' alignItems='center'>
                            <Typography fontSize={12} sx={{ color: '#32487A', fontWeight: 600, textTransform: 'uppercase' }}>
                                {props.datauser?.name}
                            </Typography>
                        </Box>

                        <Divider sx={{ mt: theme => `${theme.spacing(4)} !important` }} />
                        <Box sx={{ pt: 2, pb: 1 }}>
                            <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2.7 }} display={'flex'}>
                                <Icon icon={'material-symbols:corporate-fare-rounded'} fontSize={24} color={'#32487A'} />
                                <Typography fontSize={12} sx={{ color: '#424242', fontWeight: 400 }}>
                                    {props.datauser?.industry?.name}
                                </Typography>
                            </Box>
                            <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2.7 }} display={'flex'}>
                                <Icon icon={'material-symbols:mail'} fontSize={24} color={'#32487A'} />
                                <Typography fontSize={12} sx={{ color: '#424242', fontWeight: 400 }}>
                                    {props.datauser?.email}
                                </Typography>
                            </Box>
                            <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2.7 }} display={'flex'}>
                                <Icon icon={'material-symbols:badge-rounded'} fontSize={24} color={'#32487A'} />
                                <Typography fontSize={12} sx={{ color: '#424242', fontWeight: 400 }}>
                                    {getUserRoleName(props.datauser?.team)}
                                </Typography>
                            </Box>
                        </Box>
                        <Divider sx={{ mt: theme => `${theme.spacing(4)} !important` }} />
                        {props.datauser?.role == 'Seafarer' && (
                            <Box>
                                <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2.7, mt: 2.7 }} display={'flex'}>
                                    <Icon icon={'clarity:briefcase-solid'} fontSize={24} color={'#32487A'} />
                                    <Typography variant='body1' sx={{ color: '#424242', fontWeight: 'bold' }}>
                                        Role :
                                    </Typography>
                                    <Typography fontSize={12} sx={{ color: '#424242', fontWeight: 400 }}>
                                        {selectedItem?.role_type?.name}
                                    </Typography>
                                </Box>
                                <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2.7, mt: 2.7 }} display={'flex'}>
                                    <Icon icon={'fontisto:ship'} fontSize={24} color={'#32487A'} />
                                    <Typography variant='body1' sx={{ color: '#424242', fontWeight: 'bold' }}>
                                        Vessel :
                                    </Typography>
                                    <Typography fontSize={12} sx={{ color: '#424242', fontWeight: 400 }}>
                                        {selectedItem?.vessel_type?.name}
                                    </Typography>
                                </Box>
                                <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2.7, mt: 2.7 }} display={'flex'}>
                                    <Icon icon={'gis:route'} fontSize={24} color={'#32487A'} />
                                    <Typography variant='body1' sx={{ color: '#424242', fontWeight: 'bold' }}>
                                        Region Of Travel :
                                    </Typography>
                                    <Typography fontSize={12} sx={{ color: '#424242', fontWeight: 400 }}>
                                        {selectedItem?.region_travel?.name}
                                    </Typography>
                                </Box>
                            </Box>
                        )}

                        {props.datauser?.role != 'Seafarer' && (
                            <Box>
                                <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2.7, mt: 2.7, display: 'flex', flexDirection: 'row' }}>
                                    <Box width={22} textAlign='center'>
                                        <img src='/images/logos/facebook.png' alt='Facebook' height='20' />
                                    </Box>
                                    <Typography fontSize={12} sx={{ color: '#0a66c2', fontWeight: 400 }}>
                                        <a href={facebook} target='_blank' style={{ textDecoration: 'none' }}>
                                            {facebook}
                                        </a>
                                    </Typography>
                                </Box>
                                <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2.7, mt: 2.7 }} display={'flex'}>
                                    <Box width={22} textAlign='center'>
                                        <img src='/images/logos/instagram.png' alt='Instagram' height='20' />
                                    </Box>
                                    <Typography fontSize={12} sx={{ color: '#0a66c2', fontWeight: 400 }}>
                                        <a href={instagram} target='_blank' style={{ textDecoration: 'none' }}>
                                            {instagram}
                                        </a>
                                    </Typography>
                                </Box>
                                <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2.7, mt: 2.7 }} display={'flex'}>
                                    <Box width={22} textAlign='center'>
                                        <img src='/images/logos/linkedin.png' alt='Linkedin' height='20' />
                                    </Box>
                                    <Typography fontSize={12} sx={{ color: '#0a66c2', fontWeight: 400 }}>
                                        <a href={linkedin} target='_blank' style={{ textDecoration: 'none' }}>
                                            {linkedin}
                                        </a>
                                    </Typography>
                                </Box>
                            </Box>
                        )}
                        <Box display='flex' justifyContent='center' alignItems='center'>
                            {props.datauser?.role == 'Seafarer' && (
                                <Link style={{ width: '100%', minWidth: '100%' }} href={'/candidate'}>
                                    <Button variant='contained' sx={{ width: '100%', mt: 7, minWidth: '100%' }}>
                                        <Icon fontSize='large' icon={'material-symbols:edit'} color={'primary'} style={{ fontSize: '24px' }} />
                                    </Button>
                                </Link>
                            )}
                            {props.datauser?.role == 'Company' && (
                                <Link style={{ width: '100%', minWidth: '100%' }} href={'/company'}>
                                    <Button variant='contained' sx={{ width: '100%', mt: 7, minWidth: '100%' }}>
                                        <Icon fontSize='large' icon={'material-symbols:edit'} color={'primary'} style={{ fontSize: '24px' }} />
                                    </Button>
                                </Link>
                            )}
                            {props.datauser?.role == 'Trainer' && (
                                <Link style={{ width: '100%', minWidth: '100%' }} href={'/trainer'}>
                                    <Button variant='contained' sx={{ width: '100%', mt: 7, minWidth: '100%' }}>
                                        <Icon fontSize='large' icon={'material-symbols:edit'} color={'primary'} style={{ fontSize: '24px' }} />
                                    </Button>
                                </Link>
                            )}
                        </Box>

                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default Profile
