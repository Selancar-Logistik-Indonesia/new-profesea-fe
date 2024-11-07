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

const CardActiveAds = () => {
  return (
    <DashboardProvider>
      <CardActiveAdsApp />
    </DashboardProvider>
  )
}

const CardActiveAdsApp = () => {
  // ** Vars
  const { statOfCandidateOff } = useDashboard()

  useEffect(() => {
    statOfCandidateOff()
  }, [])

  return (
    <DashboardContext.Consumer>
      {({ onLoading }) => {
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
                <Typography
                  variant='body2'
                  style={{ fontSize: '18px', fontWeight: '600', color: '#32487A' }}
                ></Typography>
              }
            ></CardHeader>
            <CardContent>
              <Grid container spacing={2}></Grid>
            </CardContent>
          </Card>
        )
      }}
    </DashboardContext.Consumer>
  )
}

export default CardActiveAds
