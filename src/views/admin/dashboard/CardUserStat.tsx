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
  const { userOverview, userProgressiveOverview } = useDashboard()

  useEffect(() => {
    userProgressiveOverview(timeframe)
    userOverview(timeframe)
  }, [])

  useEffect(() => {
    userProgressiveOverview(timeframe)
    userOverview(timeframe)
  }, [timeframe])

  const formatTimeframe = (timeframe: string) => {
    if (timeframe == 'daily') {
      return 'Yesterday'
    } else if (timeframe == 'weekly') {
      return 'Last Week'
    } else if (timeframe == 'monthly') {
      return 'Last Month'
    }

    return ''
  }

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
        totalTrainerVerified,
        progressTotalUsers,
        progressTotalSeafarer,
        progressTotalProfessional,
        progressTotalCompany,
        progressTotalTrainer
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

        const upIcon = <img src='/images/arrow-up.svg' style={{ width: '15px', height: '15px' }} />
        const downIcon = <img src='/images/arrow-down.svg' style={{ width: '15px', height: '15px' }} />
        const upColor = '#1FE08F'
        const downColor = '#FF0027'

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
                  {timeframe != 'all' && (
                    <div>
                      <span color={progressTotalUsers >= 0 ? (progressTotalUsers > 0 ? upColor : '') : downColor}>
                        {progressTotalUsers >= 0 ? (progressTotalUsers > 0 ? upIcon : '') : downIcon}&nbsp;
                        {progressTotalUsers > 0 ? ' +' + progressTotalUsers : progressTotalUsers} &nbsp;
                      </span>
                      <span className={style['from']}>From </span>
                      <span className={style['time-info']}>{formatTimeframe(timeframe)} </span>
                    </div>
                  )}
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
                  {timeframe != 'all' && (
                    <div>
                      <span color={progressTotalSeafarer >= 0 ? (progressTotalSeafarer > 0 ? upColor : '') : downColor}>
                        {progressTotalSeafarer >= 0 ? (progressTotalSeafarer > 0 ? upIcon : '') : downIcon} &nbsp;
                        {progressTotalSeafarer > 0 ? ' +' + progressTotalSeafarer : progressTotalSeafarer} &nbsp;
                      </span>
                      <span className={style['from']}>From </span>
                      <span className={style['time-info']}>{formatTimeframe(timeframe)} </span>
                    </div>
                  )}
                </Grid>
                <Grid item height={h} md={6} sm={12} lg={6} sx={{ padding: pd }}>
                  <div className={style['total-secondary-user-label']}>Total Verified Professional</div>
                  <div className={style['total-secondary-user-number']}>{totalProfessionalVerified}</div>
                  <div className={style['total-secondary-user-label']}>Total Registration</div>
                  <div className={style['total-third-user-number']}>{totalProfessional}</div>
                  {timeframe != 'all' && (
                    <div>
                      <span
                        color={
                          progressTotalProfessional >= 0 ? (progressTotalProfessional > 0 ? upColor : '') : downColor
                        }
                      >
                        {progressTotalProfessional >= 0 ? (progressTotalProfessional > 0 ? upIcon : '') : downIcon}
                        &nbsp;
                        {progressTotalProfessional} &nbsp;
                      </span>
                      <span className={style['from']}>From </span>
                      <span className={style['time-info']}>{formatTimeframe(timeframe)} </span>
                    </div>
                  )}
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
                  {timeframe != 'all' && (
                    <div>
                      <span color={progressTotalCompany >= 0 ? (progressTotalCompany > 0 ? upColor : '') : downColor}>
                        {progressTotalCompany >= 0 ? (progressTotalCompany > 0 ? upIcon : '') : downIcon}&nbsp;
                        {progressTotalCompany > 0 ? ' +' + progressTotalCompany : progressTotalCompany} &nbsp;
                      </span>
                      <span className={style['from']}>From </span>
                      <span className={style['time-info']}>{formatTimeframe(timeframe)} </span>
                    </div>
                  )}
                </Grid>
                <Grid item height={h} md={6} sm={12} lg={6} sx={{ padding: pd }}>
                  <div className={style['total-secondary-user-label']}>Total Verified Training Center</div>
                  <div className={style['total-secondary-user-number']}>{totalTrainerVerified}</div>
                  <div className={style['total-secondary-user-label']}>Total Registration</div>
                  <div className={style['total-third-user-number']}>{totalTrainer}</div>
                  {timeframe != 'all' && (
                    <div>
                      <span color={progressTotalTrainer >= 0 ? (progressTotalTrainer > 0 ? upColor : '') : downColor}>
                        {progressTotalTrainer >= 0 ? (progressTotalTrainer > 0 ? upIcon : '') : downIcon}&nbsp;
                        {progressTotalTrainer > 0 ? ' +' + progressTotalTrainer : progressTotalTrainer} &nbsp;
                      </span>
                      <span className={style['from']}>From </span>
                      <span className={style['time-info']}>{formatTimeframe(timeframe)} </span>
                    </div>
                  )}
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
