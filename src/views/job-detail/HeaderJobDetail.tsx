import { Icon } from '@iconify/react'
import { Box, Button, Grid, Typography } from '@mui/material'
import React from 'react'
import Job from 'src/contract/models/job'
import ShareArea from 'src/pages/candidate/job/ShareArea'

interface IHeaderJobDetailProps {
  jobDetail: Job | null
  onApplied: boolean
  handleApply: () => void
}

const HeaderJobDetail: React.FC<IHeaderJobDetailProps> = ({ jobDetail, onApplied, handleApply }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        pb: '10px',
        borderBottom: theme => `1px solid ${theme.palette.divider}`
      }}
    >
      <Box sx={{ width: '70%' }}>
        <Grid container>
          <Grid xs={12}>
            <Typography ml='0.7rem' mt='0.2rem' sx={{ fontWeight: 'bold', color: '#0a66c2' }} fontSize={20}>
              <strong>{jobDetail?.role_type?.name}</strong>
            </Typography>
            <Typography sx={{ color: 'text.primary' }} ml='0.7rem' mt='0.2rem' fontSize={12}>
              {jobDetail?.company?.name} | {jobDetail?.city?.city_name}, {jobDetail?.country?.name}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ width: '30%' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} textAlign={'end'}>
            {onApplied == false ? (
              <>
                <Button
                  onClick={handleApply}
                  variant='contained'
                  color='primary'
                  size='small'
                  startIcon={<Icon icon='iconoir:submit-document' fontSize={10} />}
                  sx={{ width: '100%' }}
                >
                  Apply Job
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant='contained'
                  color='primary'
                  size='small'
                  startIcon={<Icon icon='iconoir:submit-document' fontSize={10} />}
                >
                  Applied
                </Button>
              </>
            )}
          </Grid>
          <Grid item xs={12} md={6} textAlign={'end'}>
            <ShareArea
              subject={`Job For ${jobDetail?.role_type?.name}.`}
              url={`/candidate/job/?id=${jobDetail?.id}`}
            ></ShareArea>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default HeaderJobDetail
