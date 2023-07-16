import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { Card, CardContent, Grid, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Icon } from '@iconify/react'
import Feed from 'src/layouts/components/Feed'
import RecomendedView from 'src/views/find-candidate/RecomendedView'
import { IUser } from 'src/contract/models/user'
import { HttpClient } from 'src/services'
import Profile from 'src/layouts/components/Profile'
import { useAuth } from 'src/hooks/useAuth'

const FindCandidate = () => {
    const theme = useTheme()
    const hidden = useMediaQuery(theme.breakpoints.down('md'))
    const [listCandidate, setListCandidate] = useState<IUser[]>([]);
    const { user } = useAuth();

    const getListCandidates = async () => {
        const response = await HttpClient.get('/candidate?page=1&take=25&search', {
            page: 1,
            take: 25,
            search: '',
        });

        const { candidates } = response.data as { candidates: IUser[] };
        setListCandidate(candidates);
    }

    useEffect(() => {
        getListCandidates();
    }, []);

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid container xs={12} md={10} sx={!hidden ? { alignItems: "stretch" } : {}}>
                    <Grid container spacing={6} sx={{ marginTop: '1px' }}>
                        <Grid item lg={4} md={5} xs={12}>
                            <Profile datauser={user} />
                            <Grid container mt={3} mb={3}>
                                <Grid item xs={12}>
                                    <Card>
                                        <CardContent>
                                            <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center' }} display={'flex'}>
                                                <Icon icon={'arcticons:connect-you'} fontSize={30} />  <Typography variant='body1' sx={{ color: "#424242", fontWeight: 600 }}> Total Conected :250</Typography>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                            <Feed />
                        </Grid>
                        <Grid item lg={8} md={7} xs={12}>
                            <Grid container spacing={6}>
                                <Grid item xs={12}>
                                    <Typography variant='h5'> Recommend for you</Typography>
                                    <Typography variant='body2' marginTop={2} marginBottom={5}> Based on your profile and search history</Typography>
                                    <RecomendedView listCandidate={listCandidate} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid xs={2} container display={'flex'} sx={{
                    direction: "row",
                    justifyContent: "flex-start",
                    alignContent: 'top',
                    alignItems: "stretch"
                }}>
                    <Grid xs={12}>
                        <Grid xs={12} sx={{
                            boxSizing: 'border-box',
                            background: '#FFFFFF',
                            border: '1px solid rgba(76, 78, 100, 0.12)',
                            borderRadius: '20px',
                            p: 4,
                            display: 'flex',
                            alignItems: 'stretch',
                            justifyContent: 'left',
                            marginBottom: '10px',
                            marginLeft: '20px',
                            height: '197px',
                            wrap: 'nowrap'
                        }}>

                        </Grid>
                        <Grid xs={12} sx={{
                            boxSizing: 'border-box',
                            background: '#FFFFFF',
                            border: '1px solid rgba(76, 78, 100, 0.12)',
                            borderRadius: '20px',
                            p: 4,
                            display: 'flex',
                            alignItems: 'stretch',
                            justifyContent: 'left',
                            marginBottom: '10px',
                            marginLeft: '20px',
                            height: '197px',
                            wrap: 'nowrap'
                        }}>

                        </Grid>
                        <Grid xs={12} sx={{
                            boxSizing: 'border-box',
                            background: '#FFFFFF',
                            border: '1px solid rgba(76, 78, 100, 0.12)',
                            borderRadius: '20px',
                            p: 4,
                            display: 'flex',
                            alignItems: 'stretch',
                            justifyContent: 'left',
                            marginBottom: '10px',
                            marginLeft: '20px',
                            height: '197px',
                            wrap: 'nowrap'
                        }}>

                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>


    )
}


FindCandidate.acl = {
    action: 'read',
    subject: 'home'
};
export default FindCandidate
