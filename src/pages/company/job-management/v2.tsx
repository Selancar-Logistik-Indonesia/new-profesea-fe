import { Icon } from '@iconify/react'
import { Box, Button, Grid, Input, InputAdornment, TextField, Typography } from '@mui/material'

const JobManagement = () => {
  return (
    <Grid container spacing={10}>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography sx={{ color: '#32497A', fontSize: '32px', fontWeight: 700 }}>Job Management</Typography>
        <Button variant='contained' endIcon={<Icon icon='ph:plus' />} sx={{ padding: '8px 12px' }}>
          Create Job
        </Button>
      </Grid>
      <Grid item xs={12} sx={{ borderRadius: '8px', p: '26px', backgroundColor: '#FFF' }}>
        <Box sx={{ display: 'flex', gap: '36px' }}>
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <TextField
              variant='outlined'
              placeholder='Search'
              size='small'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start' sx={{ marginRight: '8px' }}>
                    <Icon icon='ph:magnifying-glass' fontSize={16} />
                  </InputAdornment>
                )
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <Box>
              <Icon icon='ph:funnel' fontSize={16} />
            </Box>
            <Button variant='outlined' size='small' sx={{ fontSize: 14, fontWeight: 400, textTransform: 'none' }}>
              Clear Filter
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

JobManagement.acl = {
  action: 'read',
  subject: 'user-job-management'
}

export default JobManagement
