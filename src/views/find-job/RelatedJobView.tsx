import { Icon } from "@iconify/react";
import { Avatar, Box, Card, Grid, Paper, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import Job from "src/contract/models/job";
import { HttpClient } from "src/services";

const RelatedJobView = () => {
    const [jobDetailSugestion, setJobDetailSugestion] = useState<Job[]>([]);

    useEffect(() => {
        HttpClient.get('/job?take=4&page=1').then(response => {
            const jobs = response.data.jobs.data
            setJobDetailSugestion(jobs)
        })
    }, [])

    return (
        <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
            <Grid item xs={12} sm={12}>
                <Grid sx={{ padding: 5 }} container style={{ maxHeight: '100vh', overflow: 'auto' }}>
                    {jobDetailSugestion.map(item => {
                        const license: any[] = Object.values((item?.license != undefined) ? item?.license : '');

                        return (
                            <Grid item xs={12} md={12} key={item?.id}>
                                <Paper sx={{ marginTop: '10px', border: '1px solid #eee', height: 'auto' }} elevation={0}>
                                    <Link style={{ textDecoration: 'none' }} href={`/candidate/job/?id=${item?.id}`}>
                                        <Box height={65}
                                            sx={{
                                                display: 'flex',
                                                alignContent: 'center',
                                                '& svg': { color: 'text.secondary' }
                                            }}
                                        >
                                            <Box sx={{ display: 'flex', justifyContent: 'center' }} mt={2} ml={2} mr={3}>
                                                <Avatar
                                                    src={item?.company?.photo ? item?.company?.photo : '/images/avatars/default-user.png'}
                                                    alt='profile-picture'
                                                    sx={{ width: 50, height: 50 }}
                                                />
                                            </Box>
                                            <Box
                                                sx={{ display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }}
                                                marginTop={2}
                                            >
                                                <Typography sx={{ fontWeight: 'bold', color: '#0a66c2', mb: 1 }} fontSize={14}>
                                                    {item?.role_type?.name ?? '-'}
                                                </Typography>
                                                <Typography sx={{ color: 'text.primary', mb: 1 }} fontSize={12}>
                                                    {item?.company?.name ?? '-'}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Link>
                                    <Box
                                        sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'left' }}
                                        ml={2}
                                        mr={3}
                                        mt={2}
                                    >
                                        <Box
                                            sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }}
                                            mb={0}
                                        >
                                            <Icon icon='solar:case-minimalistic-bold-duotone' color='#32487A' fontSize={'20px'} />
                                            <Typography sx={{ color: 'text.primary' }} ml='0.5rem' mt='0.2rem' fontSize={12}>
                                                {item?.rolelevel?.levelName} -
                                            </Typography>
                                            <Typography sx={{ color: 'text.primary' }} ml='0.5rem' mt='0.2rem' fontSize={12}>
                                                {item?.category?.name}
                                            </Typography>
                                        </Box>

                                        <Box
                                            sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }}
                                            mb={2}
                                        >
                                            <Icon icon='solar:square-academic-cap-bold-duotone' color='#32487A' fontSize={'20px'} />
                                            <Typography sx={{ color: 'text.primary' }} ml='0.5rem' mt='0.2rem' fontSize={12}>
                                                {item?.degree?.name}
                                            </Typography>
                                        </Box>

                                        <Box
                                            sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }}
                                            mb={2}
                                        >
                                            <Grid item container>
                                                <Grid xs={1}>
                                                    <Icon icon='solar:medal-ribbons-star-bold-duotone' color='#32487A' fontSize={'20px'} />
                                                </Grid>
                                                <Grid xs={10}>
                                                    <Typography
                                                        sx={{
                                                            color: 'text.primary',
                                                            display: '-webkit-box',
                                                            overflow: 'hidden',
                                                            WebkitBoxOrient: 'vertical',
                                                            WebkitLineClamp: 2,
                                                        }}
                                                        ml='0.5rem'
                                                        mt='0.2rem'
                                                        fontSize={12}
                                                    >
                                                        {license.map(e => e.title).join(', ')}
                                                    </Typography>
                                                </Grid>
                                            </Grid>                                            
                                        </Box>
                                    </Box>
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Grid>
        </Card>
    );
}

export default RelatedJobView;