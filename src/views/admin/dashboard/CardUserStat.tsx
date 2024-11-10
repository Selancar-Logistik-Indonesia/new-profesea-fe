import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
// import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { CircularProgress, Select, MenuItem } from '@mui/material'
import DashboardContext, { DashboardProvider } from 'src/context/DashboardContext'
import { useDashboard } from 'src/hooks/useDashboard'
import { useEffect } from 'react'

import style from './CardUserStat.module.css'

const CardUserStat = () => {
  return (
    <DashboardProvider>
      <CardUserStatApp />
    </DashboardProvider>
  )
}

const CardUserStatApp = () => {
  const [timeframe, setTimeFrame] = useState('all')

  // ** Vars
  const { userOverview } = useDashboard()

  useEffect(() => {
    userOverview()
  }, [])

  return (
    <DashboardContext.Consumer>
      {({
        onLoading,
        totalUsers,
        totalSeafarerVerified,
        totalSeafarer,
        totalCompanyVerified,
        totalCompany,
        totalProfessional,
        totalProfessionalVerified,
        totalTrainer,
        totalTrainerVerified
      }) => {
        if (onLoading) {
          return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <CircularProgress sx={{ mt: 20 }} />
            </Box>
          )
        }

        const h = '140px'
        const pd = '10px'

        return (
          <Card sx={{ border: 0, boxShadow: 0, color: 'black', backgroundColor: '#FFFFFF' }}>
            <CardContent sx={{ height: '430px' }}>
              <Grid
                height={h}
                container
                rowSpacing={5}
                sx={{
                  '--Grid-borderWidth': '1px',
                  borderBottom: 'var(--Grid-borderWidth) solid',
                  borderColor: 'divider'
                }}
              >
                <Grid item height={h} md={6} sm={12} lg={6} sx={{ padding: pd }}>
                  <div className={style['total-user-label']}>Total Users</div>
                  <div className={style['total-user-number']}>{totalUsers}</div>
                  <div>
                    <span>+5</span> <span className={style['from']}>From</span>{' '}
                    <span className={style['time-info']}>Yesterday</span>
                  </div>
                </Grid>
                <Grid item height={h} md={6} sm={12} lg={6}>
                  <Select
                    defaultValue={timeframe}
                    name='timeframe'
                    size='small'
                    style={{ float: 'right' }}
                    onChange={event => setTimeFrame(event.target.value)}
                  >
                    <MenuItem value={'all'}> All </MenuItem>
                    <MenuItem value={'daily'}> Daily </MenuItem>
                    <MenuItem value={'weekly'}> Weekly </MenuItem>
                    <MenuItem value={'monthly'}> Monthly </MenuItem>
                  </Select>
                </Grid>
              </Grid>
              <Grid height={h} container>
                <Grid
                  item
                  height={h}
                  md={6}
                  sm={12}
                  lg={6}
                  sx={{
                    borderRight: '1px solid #4242421f',
                    padding: pd
                  }}
                >
                  <div className={style['total-secondary-user-label']}>Total Verified Seafarer</div>
                  <div className={style['total-secondary-user-number']}>{totalSeafarerVerified}</div>
                  <div className={style['total-secondary-user-label']}>Total Registration</div>
                  <div className={style['total-third-user-number']}>{totalSeafarer}</div>
                  <div>
                    <span>+5</span> <span className={style['from']}>From</span>{' '}
                    <span className={style['time-info']}>Yesterday</span>
                  </div>
                </Grid>
                <Grid item height={h} md={6} sm={12} lg={6} sx={{ padding: pd }}>
                  <div className={style['total-secondary-user-label']}>Total Verified Professional</div>
                  <div className={style['total-secondary-user-number']}>{totalProfessionalVerified}</div>
                  <div className={style['total-secondary-user-label']}>Total Registration</div>
                  <div className={style['total-third-user-number']}>{totalProfessional}</div>
                  <div>
                    <span>+5</span> <span className={style['from']}>From</span>{' '}
                    <span className={style['time-info']}>Yesterday</span>
                  </div>
                </Grid>
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
                    borderRight: '1px solid #4242421f',
                    padding: pd
                  }}
                >
                  <div className={style['total-secondary-user-label']}>Total Verified Company</div>
                  <div className={style['total-secondary-user-number']}>{totalCompanyVerified}</div>
                  <div className={style['total-secondary-user-label']}>Total Registration</div>
                  <div className={style['total-third-user-number']}>{totalCompany}</div>
                  <div>
                    <span>+5</span> <span className={style['from']}>From</span>{' '}
                    <span className={style['time-info']}>Yesterday</span>
                  </div>
                </Grid>
                <Grid item height={h} md={6} sm={12} lg={6} sx={{ padding: pd }}>
                  <div className={style['total-secondary-user-label']}>Total Verified Training Center</div>
                  <div className={style['total-secondary-user-number']}>{totalTrainerVerified}</div>
                  <div className={style['total-secondary-user-label']}>Total Registration</div>
                  <div className={style['total-third-user-number']}>{totalTrainer}</div>
                  <div>
                    <span>+5</span> <span className={style['from']}>From</span>{' '}
                    <span className={style['time-info']}>Yesterday</span>
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

export default CardUserStat
