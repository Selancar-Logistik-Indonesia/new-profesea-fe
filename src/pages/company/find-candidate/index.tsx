import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { Card, CardContent, Grid, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Icon } from '@iconify/react'
import Profile from 'src/layouts/components/Profile'
import Feed from 'src/layouts/components/Feed'
import SideAd from 'src/views/banner-ad/sidead'
import RecomendedView from 'src/views/find-candidate/RecomendedView'
import { HttpClient } from 'src/services'
import { IUser } from 'src/contract/models/user'

const FindCandidate = () => {
    const theme = useTheme()
    const hidden = useMediaQuery(theme.breakpoints.down('md'))
    const [page, setPage] = useState(1);
    const [take, setTake] = useState(25);
    const [listCandidate, setListCandidate] = useState<IUser[]>([]);

    const vacancy = [
        {
            judul: 'Junior Electrical',
            namapt: 'PT Samudera Indonesia ',
            lokasi: 'Jakarta,Indonesia',
            waktu: '1 minute ago',
        },
        {
            judul: 'Junior Electrical 2',
            namapt: 'PT Samudera Indonesia',
            lokasi: 'Jakarta,Indonesia',
            waktu: '2 minute ago',
        }];

    const paramcomment = [
        {
            name: 'Lerian Febriana, A.Md.Kom  ',
            skill: 'Electrical Cadet',
            location: 'Jakarta',
        }, {
            name: 'Fadil Shahab',
            skill: 'IT Enginering',
            location: 'Jakarta',
        },
    ]

    const getListCandidates = async () => {
        const response = await HttpClient.get('/candidate?page=1&take=25&search', {
            page: page,
            take: take,
            search: '',
        });

        const { candidates } = response.data as { candidates: IUser[] };
        setListCandidate(candidates);
    }

    useEffect(() => {
        getListCandidates();
    }, [page, take]);

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid container xs={12} md={10} sx={!hidden ? { alignItems: "stretch" } : {}}>
                    <Grid container spacing={6} sx={{ marginTop: '1px' }}>
                        <Grid item lg={4} md={5} xs={12}>
                            <Profile vacancy={vacancy} />
                            <Grid container mt={3} mb={3}>
                                <Grid item xs={12}>
                                    <Card>
                                        <CardContent>
                                            <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center' }} display={'flex'}>
                                                <Icon icon={'arcticons:connect-you'} fontSize={30} />
                                                <Typography variant='body1' sx={{ color: "#424242", fontWeight: 600 }}> Total Conected :250</Typography>
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
                <SideAd />
            </Grid>
        </Box>
    );
}

FindCandidate.acl = {
    action: 'read',
    subject: 'home'
};

export default FindCandidate
