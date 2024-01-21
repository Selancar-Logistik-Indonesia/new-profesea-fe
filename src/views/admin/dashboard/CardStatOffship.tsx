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

const CardStatOffship = () => {
  return (
      <DashboardProvider>
          <CardStatOffshipApp />
      </DashboardProvider>
  )
}

const renderList = (arr: any[]) => {
  if (arr && arr.length) {
  
      return arr.map((item) => {

          return (
            <Grid item xs={12} sm={6} md={6} key={item?.gender} >
              <Grid container>
                <Grid item xs={6} sx={{ display: 'flex', alignItems: 'flex-center', justifyContent: 'flex-end' }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                    <Typography >
                      {item?.gender === 'm' && (
                      <img src={'/images/cards/card-stats-img-1.png'} height={50} />
                      )}
                      {item?.gender === 'f' && (                        
                      <img src={'/images/cards/card-stats-img-2.png'} height={50} />
                      )}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', alignItems: 'flex-center', justifyContent: 'flex-center' }}>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                    <Typography variant='h5' sx={{ ml: 3.5 }}>                      
                    {item.total_user}
                    </Typography>
                  </Box>
                </Grid>
                
              </Grid>
            </Grid>
          )
      })
  } else {
      return null
  }
}

const CardStatOffshipApp = () => {
  // ** Vars
  const { statOfCandidateOff } = useDashboard();

  useEffect(() => {
    statOfCandidateOff();
  }, []);

  return (
    <DashboardContext.Consumer>
        {({ dataOffship, onLoading }) => {
          
            if (onLoading) {
            
                return (
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <CircularProgress sx={{ mt: 20 }} />
                        </Box>
                    );
            }

            return (
              <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
                <CardHeader
                  title={
                    <Typography variant='body2' style={{ fontSize: '18px', fontWeight: '600' ,color: '#32487A' }}>
                      Candidate : Off-Ship
                    </Typography>
                  }
                >
                </CardHeader>
                <CardContent>
                  <Grid container spacing={2}>
                    {renderList(dataOffship)}
                  </Grid>
                </CardContent>
              </Card>
            )
          }}
    </DashboardContext.Consumer>
          
      );
}

export default CardStatOffship
