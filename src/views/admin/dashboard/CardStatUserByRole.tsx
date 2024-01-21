// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { CircularProgress } from '@mui/material'
import DashboardContext, { DashboardProvider } from 'src/context/DashboardContext'
import { useDashboard } from 'src/hooks/useDashboard'
import { useEffect } from 'react'

const CardStatByRole = () => {
  return (
      <DashboardProvider>
          <CardStatByRoleApp />
      </DashboardProvider>
  )
}

const renderList = (arr: any[]) => {
  if (arr && arr.length) {
  
      return arr.map((item) => {

          return (
            <Grid item xs={12} sm={4} md={4} key={item?.team_id}>              
              <Card sx={{ overflow: 'visible', position: 'relative', border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
                <CardContent sx={{ pb: '0 !important' }}>
                  <Grid container>
                    <Grid item xs={6} sx={{ display: 'flex', alignItems: 'flex-center', justifyContent: 'flex-center' }}>
                      <Typography sx={{ mb: 1.5, fontWeight: 600, whiteSpace: 'nowrap', color: '#32487A'}} fontSize={18} >Total {item?.team_name}</Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                        <Typography variant='h3' sx={{ mr: 1.5 }}>
                          {item?.total_user}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                      {item?.team_name === 'Seafarer' && (
                        <img src={'/images/sailor.png'} height={120} />
                      )}
                      {item?.team_name === 'Company' && (
                        <img src={'/images/company.png'} height={120} />
                      )}
                      {item?.team_name === 'Trainer' && (
                        <img src={'/images/traine.png'} height={120} />
                      )}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          )
      })
  } else {
      return null
  }
}

const CardStatByRoleApp = () => {
  // ** Vars
  const { statOfUserByRole } = useDashboard();

  useEffect(() => {
    statOfUserByRole();
  }, []);

  return (
    <DashboardContext.Consumer>
        {({ dataTotalUser, onLoading }) => {
          
            if (onLoading) {
            
                return (
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <CircularProgress sx={{ mt: 20 }} />
                        </Box>
                    );
            }

            return (
                  renderList(dataTotalUser)
            )
          }}
    </DashboardContext.Consumer>
          
      );
}

export default CardStatByRole
