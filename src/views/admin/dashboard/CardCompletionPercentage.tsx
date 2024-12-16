import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
// import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { CircularProgress, Select, MenuItem } from '@mui/material'
import { useDashboard } from 'src/hooks/useDashboard'
import DashboardContext, { DashboardProvider } from 'src/context/DashboardContext'

export default function CardCompletionPercetage() {
  return (
    <DashboardProvider>
      <CardCompletionPercentageApp />
    </DashboardProvider>
  )
}

function CardCompletionPercentageApp() {
  // ** Vars
  const { userOverview, userProgressiveOverview } = useDashboard()
  const [candidate, setCandidate] = useState('seafarer')

  useEffect(() => {
    userProgressiveOverview(candidate)
    userOverview(candidate)
  }, [])

  useEffect(() => {
    userProgressiveOverview(candidate)
    userOverview(candidate)
  }, [candidate])

  return (
    <DashboardContext.Consumer>
      {onLoading => {
        if (onLoading) {
          return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <CircularProgress sx={{ mt: 20 }} />
            </Box>
          )
        }

        return (
          <Card>
            <CardContent sx={{ height: '215px' }}>
              <Grid>
                <Grid item md={6} sm={12} lg={6}>
                  <div>Profile Completion Percentage</div>
                </Grid>
                <Grid item md={6} sm={12} lg={6}>
                  <Select
                    defaultValue={candidate}
                    name='candidate'
                    size='small'
                    style={{ float: 'right' }}
                    onChange={event => setCandidate(event.target.value)}
                  >
                    <MenuItem value={'seafarer'}> Seafarer </MenuItem>
                    <MenuItem value={'professional'}> Professional </MenuItem>
                  </Select>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )
      }}
    </DashboardContext.Consumer>
  )
}
