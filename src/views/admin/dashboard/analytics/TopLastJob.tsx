import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'

import DashboardContext, { DashboardProvider } from 'src/context/DashboardContext'
import { useDashboard } from 'src/hooks/useDashboard'
import { useEffect } from 'react'
import { CardActionArea, CircularProgress, Divider } from '@mui/material'

const TopLastJob = () => {
  return (
    <DashboardProvider>
      <TopLastJobApp />
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
            mb: index !== arr.length - 1 ? 10.3 : undefined
          }}
        >
          {/* <img width={34} height={34} alt={item.name} src={item.photo} /> */}
          <Box sx={{ ml: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', mr: 2, flexDirection: 'column' }}>
              <Grid>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {item.category_name}
                </Typography>
                <Typography variant='body2' sx={{ fontWeight: 500, color: '#00000080' }}>
                  {item.company_name}
                </Typography>

                {/* <Typography variant='caption'>{item.subtitle}</Typography> */}
              </Grid>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end' }}>
              <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                {item.total_applicants} Applicants
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

const TopLastJobApp = () => {
  const { dataLastJobList } = useDashboard()

  useEffect(() => {
    dataLastJobList()
  }, [])

  return (
    <DashboardContext.Consumer>
      {({ dataLastJob, onLoading }) => {
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
                  Last Job
                </Typography>
              }
              titleTypographyProps={{ sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' } }}
            />
            <CardContent sx={{ pb: theme => `${theme.spacing(6.5)} !important` }}>
              {renderList(dataLastJob)}
            </CardContent>
            <Divider component='div' />
            <CardActionArea>
              <CardContent style={{ textAlign: 'center' }}>
                <Link href='/admin/company-and-job-management/'>View All Jobs</Link>
              </CardContent>
            </CardActionArea>
          </Card>
        )
      }}
    </DashboardContext.Consumer>
  )
}

export default TopLastJob
