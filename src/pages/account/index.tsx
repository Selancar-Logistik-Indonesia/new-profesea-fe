import React from 'react'
import { Grid } from '@mui/material'
import Subscription from 'src/layouts/components/Subscription'

const Candidate = () => {

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Subscription />
            </Grid>
        </Grid>
    )
}


Candidate.acl = {
    action: 'read',
    subject: 'home'
}
export default Candidate
