import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { Grid, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import RecomendedView from 'src/views/find-job/RecomendedView'
import { HttpClient } from 'src/services'
import Job from 'src/contract/models/job'

const FindJob = () => {
    const theme = useTheme()
    const hidden = useMediaQuery(theme.breakpoints.down('md'))
    const [listJob, setListJob] = useState<Job[]>([]);

    const getListJobs = async () => {
        const response = await HttpClient.get('/job?page=1&take=25&search', {
            page: 1,
            take: 25,
            search: '',
        });

        const jobs = response.data.jobs.data;
        setListJob(jobs);
    }

    useEffect(() => {
        getListJobs();
    }, []);

    return (
        <Box padding={5}>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={!hidden ? { alignItems: "stretch" } : {}}>
                    <Grid container spacing={6} >
                        <Grid item xs={12}>
                            <Typography variant="h6" color={"#32487A"} fontWeight="600"> Find Job</Typography>
                            <Typography fontSize={16} style={{ color: "#424242" }} marginTop={2} marginBottom={5}>Based on your profile and search history</Typography>
                            <RecomendedView listJob={listJob} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

FindJob.acl = {
    action: 'read',
    subject: 'find-job'
};

export default FindJob
