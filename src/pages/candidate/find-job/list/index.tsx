import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { Alert, AlertTitle, Grid, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import RecomendedView from 'src/views/find-job/RecomendedView'
import { HttpClient } from 'src/services'
import Job from 'src/contract/models/job'
import InfiniteScroll from 'react-infinite-scroll-component'
import RecomendedViewSubscribe from 'src/views/find-job/RecomendedViewSubscribe'

type filterType = {
    filter: any;
    search: string;
    aSearch: any[];
};

const FindJob = (props: filterType) => {
    const theme = useTheme()
    const hidden = useMediaQuery(theme.breakpoints.down('md'))
    const [listJob, setListJob] = useState<Job[]>([])
    const [listJobSubscribe, setListJobSubscribe] = useState<Job[]>([])
    const [page, setPage] = useState(1);
    // const [search, setSearch] = useState("");
    const [hasNextPage, setHasNextPage] = useState(true);
    const [total, setTotal] = useState(0);
    const [perPage, setPerPage] = useState(9);

    const getListJobs = async () => {
        const response = await HttpClient.get(
            `/job?search=${props?.search}&roletype_id=${props?.filter?.roletype}&category_id=${props?.filter?.category}&rolelevel_id=${props?.filter?.level}&edugrade_id=${props?.filter?.education}&page=${page}&take=${perPage}`);
        const jobs = response.data.jobs.data;
        if (jobs?.total == null) {
            setTotal(jobs?.total)
        }
        if (jobs?.next_page_url == null) {
            setHasNextPage(jobs?.next_page_url)
        }
        setListJob(jobs);
    }
    const getListJobsSubscribe = async () => {
        const response = await HttpClient.get(
            `/job?search=${props?.search}&roletype_id=${props?.filter?.roletype}&category_id=${props?.filter?.category}&rolelevel_id=${props?.filter?.level}&edugrade_id=${props?.filter?.education}&page=1&take=6`
        )
        const jobs = response.data.jobs.data

        setListJobSubscribe(jobs)
    }
    useEffect(() => {
        getListJobs()
    }, [page, props.search, perPage, props.filter])

    useEffect(() => {
        getListJobsSubscribe()
    }, [])


    const onPageChange = () => {
        const mPage = page + 1;
        setPage(mPage);
        setPerPage(15);
    }

    return (
        <Box padding={5}>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={!hidden ? { alignItems: "stretch" } : {}}>
                    <Grid container spacing={6} >
                        <Grid item xs={12}>
                            <Alert severity='info'>
                                <AlertTitle>Find & Apply Job</AlertTitle>
                                Based on <strong>your profile</strong> and <strong> your experience</strong>
                            </Alert>
                            <RecomendedViewSubscribe listJob={listJobSubscribe} />
                            <InfiniteScroll
                                dataLength={total}
                                next={onPageChange}
                                hasMore={hasNextPage}
                                loader={(<Typography mt={5} color={'text.secondary'}>Loading..</Typography>)}>
                                <RecomendedView listJob={listJob} />
                            </InfiniteScroll>
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
