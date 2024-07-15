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
      xs={12}
      md={true}
      sx={{
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
        <Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>{`${value ?? 0} ${type}`}</Typography>
        <Typography sx={{ color: '#949EA2', fontSize: 14 }}>{description}</Typography>
      </Box>
    </Grid>
  )
}

const Analytics = (props: { dataUser: IUser }) => {
  const { dataUser } = props
  const [activities, getActivities] = useState<activities>()

  const loadActivities = async () => {
    const resp = await HttpClient.get('/public/data/user/statistics?user_id=' + dataUser?.id)
    if (resp.status != 200) {
      throw resp.data.message ?? 'Something went wrong!'
    }
    const code = resp.data
    getActivities(code)
  }

  useEffect(() => {
    loadActivities()
  }, [dataUser])

  return (
    <Box sx={{ p: '24px', borderRadius: '16px', backgroundColor: '#FFFFFF', boxShadow: 3, overflow: 'hidden' }}>
      <Typography sx={{ mb: '24px', color: 'black', fontSize: 20, fontWeight: 'bold', textTransform: 'uppercase' }}>
        analytics
      </Typography>
      <Grid container sx={{ display: 'flex', flexWrap: { md: 'nowrap' }, gap: '9.2px' }}>
        <AnalyticData
          icon='mdi:people'
          value={activities?.total_visitor}
          type='Total visitor'
          description="Discover who's visited your profile."
        />
        <AnalyticData
          icon='material-symbols:post-outline-rounded'
          value={activities?.total_post_feed}
          type='Total post feed'
          description='This count reflects your shared updates.'
        />
        {dataUser.team_id === 3 ? (
          <AnalyticData
            icon='material-symbols:work'
            value={activities?.total_post_job}
            type='Total post job'
            description="shows numbers of job listings you've posted."
          />
        ) : dataUser.team_id === 4 ? (
          <AnalyticData
            icon='material-symbols:library-books-sharp'
            value={'20'}
            type='Total post training'
            description="shows numbers of training listings you've posted."
          />
        ) : (
          <AnalyticData
            icon='material-symbols:work'
            value={activities?.total_applied_job}
            type='Total applied job'
            description="shows numbers of job listings you've applied."
          />
        )}
        <AnalyticData
          icon='mdi:people'
          value={activities?.total_post_thread}
          type='Total thread'
          description='Shows your initiated discussion threads.'
        />
      </Grid>
    </Box>
  )
}

export default Analytics
