import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
// ** Icon Imports
// import Icon from 'src/@core/components/icon'

// ** Types
// import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Components Imports
// import CustomChip from 'src/@core/components/mui/chip'
import DashboardContext, { DashboardProvider } from 'src/context/DashboardContext'
import { useDashboard } from 'src/hooks/useDashboard'
import { useEffect } from 'react'
import { Avatar, CardActionArea, CircularProgress, Divider } from '@mui/material'

const TopPostCompany = () => {
  return (
    <DashboardProvider>
      <TopPostCompanyApp />
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
            mb: index !== arr.length - 1 ? 14 : undefined
          }}
        >
          {/* <img width={34} height={34} alt={item.name} src={item.photo} /> */}
          <Box sx={{ ml: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', mr: 2, flexDirection: 'column' }}>
              <Grid container sx={{ width: 200, gap: 3 }}>
                <Grid item md={2} sx={{}}>
                  <Avatar sx={{ height: 50, width: 50 }} src={item.photo}></Avatar>
                </Grid>
                <Grid item md={8} sx={{ marginLeft: '20px' }}>
                  <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                    {item.name}
                  </Typography>
                  <Typography variant='body2' sx={{ fontWeight: 500, color: '#00000080' }}>
                    {item.total_post} Job Posting
                  </Typography>

                  {/* <Typography variant='caption'>{item.subtitle}</Typography> */}
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end' }}>
              <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                {item.active_job} &nbsp;
              </Typography>
              <Typography variant='body2' sx={{ fontWeight: 600, color: '#00000080' }}>
                Jobs
              </Typography>
              {/* <CustomChip
                    skin='light'
                    size='small'
                    label={item.chipText}
                    color={item.chipColor}
                    sx={{ ml: 4.5, height: 20, fontSize: '0.75rem', fontWeight: 500 }}
                  /> */}
            </Box>
          </Box>
        </Box>
      )
    })
  } else {
    return null
  }
}

const TopPostCompanyApp = () => {
  const { statTopList } = useDashboard()

  useEffect(() => {
    statTopList({ contribType: 'jobpost' })
  }, [])

  return (
    <DashboardContext.Consumer>
      {({ dataTopCompany, onLoading }) => {
        if (onLoading) {
          return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <CircularProgress sx={{ mt: 20 }} />
            </Box>
          )
        }

        return (
          <>
            <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
              <CardHeader
                title={
                  <Typography variant='body2' style={{ fontSize: '18px', fontWeight: '600', color: '#32487A' }}>
                    Employer
                  </Typography>
                }
                titleTypographyProps={{ sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' } }}
                // action={
                //   <OptionsMenu
                //     options={['Last 28 Days', 'Last Month', 'Last Year']}
                //     iconButtonProps={{ size: 'small', className: 'card-more-options' }}
                //   />
                // }
              />
              <CardContent sx={{ pb: theme => `${theme.spacing(6.5)} !important`, mt: 3 }}>
                {/* <Box sx={{ mb: 0.5, display: 'flex', alignItems: 'center', '& svg': { mr: 0.5, color: 'success.main' } }}>
                    <Typography variant='h5' sx={{ mr: 0.5 }}>
                      28,468
                    </Typography>
                    <Icon icon='mdi:menu-up' fontSize='1.875rem' />
                    <Typography variant='body2' sx={{ fontWeight: 600, color: 'success.main' }}>
                      62%
                    </Typography>
                  </Box> */}

                {/* <Typography component='p' variant='caption' sx={{ mb: 5 }}>
                    Last 1 Year Visits
                  </Typography> */}
                {renderList(dataTopCompany)}
              </CardContent>
            </Card>
            <div style={{ backgroundColor: 'white' }}>
              <Divider component='div' />
              <CardActionArea>
                <CardContent style={{ textAlign: 'center' }}>
                  <Link href='/admin/company-and-job-management/'>View All Employees</Link>
                </CardContent>
              </CardActionArea>
            </div>
            <div style={{ height: 50 }}></div>
          </>
        )
      }}
    </DashboardContext.Consumer>
  )
}

export default TopPostCompany
