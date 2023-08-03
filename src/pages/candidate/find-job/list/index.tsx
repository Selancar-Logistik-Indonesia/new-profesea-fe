import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { Grid, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import RecomendedView from 'src/views/find-job/RecomendedView'
import { HttpClient } from 'src/services'
import Job from 'src/contract/models/job'
import InfiniteScroll from 'react-infinite-scroll-component'
type filterType = {
    filter: any;
    search: string;
    aSearch: any[];
};

const FindJob = (props:filterType) => {
    const theme = useTheme()
    const hidden = useMediaQuery(theme.breakpoints.down('md'))
    const [listJob, setListJob] = useState<Job[]>([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [hasNextPage, setHasNextPage] = useState(true);
    const [total, setTotal] = useState(0);
    const [perPage, setPerPage] = useState(9);

    const getListJobs = async () => {
        const response = await HttpClient.get(
            `/job?search=${search}&roletype_id=${props?.filter?.roletype}&category_id=${props?.filter?.category}&rolelevel_id=${props?.filter?.level}&edugrade_id=${props?.filter?.education}&page=${page}&take=${perPage}`);
        const jobs = response.data.jobs.data;
        if(jobs?.total == null){
            setTotal(jobs?.total)
        }
        if(jobs?.next_page_url == null){
            setHasNextPage(jobs?.next_page_url)
        }
        setListJob(jobs);
    }

    useEffect(() => {
        getListJobs();
    }, [page, search, perPage, props.filter]);


    const onPageChange = () => {
        const mPage = page + 1;
        setSearch('');
        setPage(mPage);
        setPerPage(15);
    }

    return (
        <Box padding={5}>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={!hidden ? { alignItems: "stretch" } : {}}>
                    <Grid container spacing={6} >
                        <Grid item xs={12}>
                            <Typography variant="body2" color={"#32487A"} fontWeight="600" fontSize={18}> Find Job</Typography>
                            <Typography fontSize={12} style={{ color: "#424242" }} marginTop={2} marginBottom={5}>Search & Apply Job Based on your profile and your experience</Typography>
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
