// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
// import Icon from 'src/@core/components/icon'

// ** Types
// import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Components Imports
// import CustomChip from 'src/@core/components/mui/chip'
import OptionsMenu from 'src/@core/components/option-menu'
import DashboardContext, { DashboardProvider } from 'src/context/DashboardContext'
import { useDashboard } from 'src/hooks/useDashboard'
import { useEffect } from 'react'
import { CircularProgress } from '@mui/material'

const TopCommunityContributor = () => {
  return (
      <DashboardProvider>
          <TopCommunityContributorApp />
      </DashboardProvider>
  )
}

const renderList = (arr: any[]) => {
  if (arr && arr.length) {
  
      return arr.map((item, index:number) => {

          return (
            <Box
              key={item.name}
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: index !== arr.length - 1 ? 7.25 : undefined
              }}
            >
              <img width={34} height={34} alt={item.name} src={item.photo} />
              <Box
                sx={{ ml: 3, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <Box sx={{ mr: 2, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                    {item.name}
                  </Typography>
                  {/* <Typography variant='caption'>{item.subtitle}</Typography> */}
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                    {item.total_post}
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

const TopCommunityContributorApp = () => {
  const { statTopList } = useDashboard();

  useEffect(() => {
    statTopList({contribType:'community'});
  }, []);

  return (
    <DashboardContext.Consumer>
        {({ dataTopCommunity, onLoading }) => {
          
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
                  title='Top Community Contributor'
                  titleTypographyProps={{ sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' } }}
                  action={
                    <OptionsMenu
                      options={['Last 28 Days', 'Last Month', 'Last Year']}
                      iconButtonProps={{ size: 'small', className: 'card-more-options' }}
                    />
                  }
                />
                <CardContent sx={{ pb: theme => `${theme.spacing(6.5)} !important` }}>
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
                  {renderList(dataTopCommunity)}
                </CardContent>
              </Card>
            )

            }}
      </DashboardContext.Consumer>
              
      );
}

export default TopCommunityContributor
