import { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
// import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { CircularProgress, Select, MenuItem, Typography } from '@mui/material'
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import { useDashboard } from 'src/hooks/useDashboard'
import DashboardContext, { DashboardProvider } from 'src/context/DashboardContext'

export default function CardCompletionPercetage() {
  return (
    <DashboardProvider>
      <CardCompletionPercentageApp />
    </DashboardProvider>
  )
}

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props}  />
      </Box>
      <Box sx={{ minWidth:35}}>
        <Typography
          variant="body1"
          sx={{ color: 'text.secondary' }}
        > {`${props.value}`} %</Typography>
      </Box>
    </Box>
  );
}

const BorderLinearProgress = styled(LinearProgressWithLabel)(() => ({
  height: 10,
  borderRadius: 5
  
}));

function CardCompletionPercentageApp() {
  // ** Vars
  const { userCompletionPercentage } = useDashboard()
  const [candidate, setCandidate] = useState('onship')

  useEffect(() => {
    userCompletionPercentage(candidate)

  }, [])

  useEffect(() => {
    userCompletionPercentage(candidate)
  }, [candidate])

  return (
    <DashboardContext.Consumer>
      {({ totalCPGreen, totalCPOrange, totalCPRed, totalCandidate ,onLoading}) => {
        if (onLoading) {
          return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <CircularProgress sx={{ mt: 20 }} />
            </Box>
          )
        }

        return (
          <Card sx={{ maxHeight: '215px'}}>
            <CardContent sx={{ }}>
              <Grid container style={{ marginBottom:20 }}>
                <Grid item md={6} sm={12} lg={6}>
                  <div style={{ color: '#00000080', fontSize:'14px', fontFamily:"Inter" }}>Profile Completion Percentage</div>
                </Grid>
                <Grid item md={6} sm={12} lg={6}>
                  <Select
                    defaultValue={candidate}
                    name='candidate'
                    size='small'
                    style={{ float: 'right' }}
                    onChange={event => setCandidate(event.target.value)}
                  >
                    <MenuItem value={'onship'}> Seafarer </MenuItem>
                    <MenuItem value={'offship'}> Professional </MenuItem>
                  </Select>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item md={7} sm={12} lg={7}>
                  <div style={{ color: '#000000', fontSize:'14px', fontFamily:"Inter", fontWeight:600 }}>{totalCPGreen} </div>
                  <BorderLinearProgress  
                    value={(totalCPGreen/totalCandidate) * 100}  
                    color='success'
                  />
                  <div style={{ color: '#000000', fontSize:'14px', fontFamily:"Inter", fontWeight:600 }}>{totalCPOrange} </div>
                  <BorderLinearProgress 
                    value={(totalCPOrange/totalCandidate) * 100} 
                    color='warning'
                    
                  />
                  <div style={{ color: '#000000', fontSize:'14px', fontFamily:"Inter", fontWeight:600 }}>{totalCPRed}</div>
                  <BorderLinearProgress 
                    color='error'
                    value={(totalCPRed/totalCandidate) * 100} 
                  />
                </Grid>
                <Grid item md={5} sm={12} lg={5}>
                  <div style={{ float:'right'}}>
                    <div >Total {candidate == 'onship' ? "Seafarer" : "Professional"}</div>
                    <div style={{ 
                        textAlign:'right',
                        fontSize: '32px',
                        fontWeight: 700,
                        color: 'black',
                        fontFamily: 'Inter'}}
                    >{totalCandidate}</div>
                  </div>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )
      }}
    </DashboardContext.Consumer>
  )
}
