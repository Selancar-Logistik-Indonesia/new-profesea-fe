import { Icon } from '@iconify/react'
import { Box, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { IUser } from 'src/contract/models/user'
import { HttpClient } from 'src/services'

type activities = {
  total_connected: string
  total_visitor: string
  total_post_feed: string
  total_post_job: string
  total_applied_job: string
  total_post_thread: string
}

const AnalyticData = (props: { icon: string; value?: string; type: string; description: string }) => {
  const { icon, value, type, description } = props

  return (
    <Grid
      item
      xs={true}
      sx={{
        flexGrow: 1,
        display: 'flex',
        borderRadius: '4px',
        py: '12px',
        px: '8px',
        gap: '8px',
        backgroundColor: '#FAFAFA'
      }}
    >
      <Icon icon={icon} fontSize={24} />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <Typography>{`${value ?? 0} ${type}`}</Typography>
        <Typography>{description}</Typography>
      </Box>
    </Grid>
  )
}

const Analytics = ({ dataUser }: { dataUser: IUser }) => {
  const [activities, getActivities] = useState<activities>()

  useEffect(() => {
    HttpClient.get('/user/statistics?user_id=' + dataUser.id).then(response => {
      const connections = response.data.total_connected
      getActivities(connections)
    })
  }, [dataUser])

  return (
    <Box sx={{ p: '24px', borderRadius: '4px', backgroundColor: '#FFFFFF' }}>
      <Typography sx={{ mb: '24px', color: 'black', fontSize: 20, fontWeight: 'bold', textTransform: 'uppercase' }}>
        analytics
      </Typography>
      <Grid container sx={{ display: 'flex', gap: '9.2px' }}>
        <AnalyticData
          icon='mdi:people'
          value={activities?.total_visitor}
          type='Total visitor'
          description="Discover who's visited your profile"
        />
        <AnalyticData
          icon='material-symbols:post-outline-rounded'
          value={activities?.total_visitor}
          type='Total visitor'
          description="Discover who's visited your profile"
        />
        <AnalyticData
          icon='material-symbols:work'
          value={activities?.total_visitor}
          type='Total visitor'
          description="Discover who's visited your profile"
        />
        <AnalyticData
          icon='mdi:people'
          value={activities?.total_visitor}
          type='Total visitor'
          description="Discover who's visited your profile"
        />
      </Grid>
    </Box>
  )
}

export default Analytics
