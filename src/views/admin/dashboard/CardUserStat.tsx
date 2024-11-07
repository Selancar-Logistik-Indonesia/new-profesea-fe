// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
// import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { CircularProgress } from '@mui/material'
import DashboardContext, { DashboardProvider } from 'src/context/DashboardContext'
import { useDashboard } from 'src/hooks/useDashboard'
import { useEffect } from 'react'

const CardUserStat = () => {
  return (
    <DashboardProvider>
      <CardUserStatApp />
    </DashboardProvider>
  )
}

const CardUserStatApp = () => {
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

        const h = '140px'

        return (
          <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
            <CardContent sx={{ height: '420px' }}>
              <Grid
                height={h}
                container
                rowSpacing={5}
                sx={{
                  '--Grid-borderWidth': '1px',
                  borderBottom: 'var(--Grid-borderWidth) solid',
                  borderColor: 'divider'
                }}
              ></Grid>
              <Grid height={h} container>
                <Grid
                  item
                  height={h}
                  md={6}
                  sm={12}
                  lg={6}
                  sx={{
                    borderRight: '1px solid #4242421f'
                  }}
                ></Grid>
                <Grid item height={h} md={6} sm={12} lg={6}></Grid>
              </Grid>
              <Grid
                height={h}
                container
                sx={{
                  '--Grid-borderWidth': '1px',
                  borderTop: 'var(--Grid-borderWidth) solid',

                  borderColor: 'divider'
                }}
              >
                <Grid
                  item
                  height={h}
                  md={6}
                  sm={12}
                  lg={6}
                  sx={{
                    borderRight: '1px solid #4242421f'
                  }}
                ></Grid>
                <Grid item height={h} md={6} sm={12} lg={6}></Grid>
              </Grid>
            </CardContent>
          </Card>
        )
      }}
    </DashboardContext.Consumer>
  )
}

export default CardUserStat
