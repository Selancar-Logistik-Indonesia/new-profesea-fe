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

const CardStatOnship = () => {
  return (
      <DashboardProvider>
          <CardStatOnshipApp />
      </DashboardProvider>
  )
}

const renderList = (arr: any[]) => {
  if (arr && arr.length) {
  
      return arr.map((item) => {

          return (
            <Grid item xs={12} sm={6} md={6} key={item?.gender}>
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

const CardStatOnshipApp = () => {
  // ** Vars
  const { statOfCandidateOn } = useDashboard();

  useEffect(() => {
    statOfCandidateOn();
  }, []);

  return (
    <DashboardContext.Consumer>
        {({ dataOnship, onLoading }) => {
          console.log(dataOnship)
            if (onLoading) {
            
                return (
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <CircularProgress sx={{ mt: 20 }} />
                        </Box>
                    );
            }

            return (
              <Card>
                <CardHeader
                  title={
                    <Typography variant='body2' style={{ fontSize: '18px', fontWeight: '600' ,color: '#32487A' }}>
                      Candidate : On-Ship
                    </Typography>
                  }
                >
                </CardHeader>
                <CardContent>
                  <Grid container spacing={2}>
                    {renderList(dataOnship)}
                  </Grid>
                </CardContent>
              </Card>
            )
          }}
    </DashboardContext.Consumer>
          
      );
}

export default CardStatOnship
