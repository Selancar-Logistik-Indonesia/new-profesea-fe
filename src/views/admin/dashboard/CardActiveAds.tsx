// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { CardHeader, CircularProgress } from '@mui/material'
import DashboardContext, { DashboardProvider } from 'src/context/DashboardContext'
import { useDashboard } from 'src/hooks/useDashboard'
import { useEffect } from 'react'
import { Avatar } from '@mui/material'

const CardActiveAds = () => {
  return (
    <DashboardProvider>
      <CardActiveAdsApp />
    </DashboardProvider>
  )
}

const renderList = (arr: any[]) => {
  if (arr && arr.length) {
    return arr.map((item, index: number) => {
      return (
        <Box
          key={item.name}
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: index !== arr.length - 1 ? 7.25 : undefined
          }}
        >
          {/* <img width={34} height={34} alt={item.name} src={item.photo} /> */}
          <Box sx={{ ml: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', mr: 2, flexDirection: 'column' }}>
              <Grid container sx={{ width: 300, gap: 2 }}>
                <Grid item md={2} sx={{}}>
                  <Avatar
                    variant='rounded'
                    sx={{ height: 50, width: 50 }}
                    src={JSON.parse(item.attachments)[0]}
                  ></Avatar>
                </Grid>
                <Grid item md={8} sx={{ marginLeft: '20px' }}>
                  <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                    {item.description}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end' }}>
              <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                {item.ctr ? item.ctr : 0} &nbsp;
              </Typography>
              <Typography variant='body2' sx={{ fontWeight: 600, color: '#00000080' }}>
                Clicks
              </Typography>
            </Box>
          </Box>
        </Box>
      )
    })
  } else {
    return null
  }
}

const CardActiveAdsApp = () => {
  // ** Vars
  const { dataAdsList } = useDashboard()

  useEffect(() => {
    dataAdsList()
  }, [])

  return (
    <DashboardContext.Consumer>
      {({ dataAds, onLoading }) => {
        if (onLoading) {
          return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <CircularProgress sx={{ mt: 20 }} />
            </Box>
          )
        }

        return (
          <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
            <CardHeader
              title={
                <Typography variant='body2' style={{ fontSize: '18px', fontWeight: '600', color: '#32487A' }}>
                  Active Ads
                </Typography>
              }
            ></CardHeader>
            <CardContent>{renderList(dataAds)}</CardContent>
          </Card>
        )
      }}
    </DashboardContext.Consumer>
  )
}

export default CardActiveAds
