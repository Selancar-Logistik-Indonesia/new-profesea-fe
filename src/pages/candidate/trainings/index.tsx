import React from 'react'
import Box from '@mui/material/Box'
import { Tabs, Tab, Grid, Typography, useTheme, useMediaQuery } from '@mui/material'
import AllTrainingScreen from './all'
import OngoingTrainingScreen from './ongoing'

import { useSearchParams } from 'next/navigation'
import TrainingPartnerSection from 'src/views/training/TrainingPartnerSection'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

const SeafarerTraining = ({ pageView = 'candidate' }: { pageView?: string }) => {
  const searchParams = useSearchParams()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const tab = searchParams.get('tab')

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    }
  }

  const [value, setValue] = React.useState(tab ? Number(tab) : 0)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Grid
      container
      spacing={4}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '40px'
      }}
    >
      <Grid item xs={12}>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            minHeight: isMobile ? '60vh' : '50vh',
            backgroundImage: `url('/images/hero-banner-2.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: isMobile ? 'center 30%' : 'center 10%', // 👈 Fokus ke bagian atas wajah
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            px: '40px',
            py: '60px',
            overflow: 'hidden',
            borderRadius: '24px'
          }}
        >
          {/* Gradient overlay */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: isMobile
                ? 'linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.1))'
                : 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
              zIndex: 1
            }}
          />

          {/* content */}
          <Box
            sx={{
              position: 'relative',
              zIndex: 2,
              maxWidth: '600px',
              top: isMobile ? '50px' : '',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}
          >
            <Typography sx={{ fontSize: '24px', fontWeight: 700, color: '#FFF' }}>
              Level Up Your Maritime Skills with the Right Training
            </Typography>
            <Typography sx={{ fontSize: '16px', color: '#FFF', fontWeight: 400 }}>
              Explore courses tailored to your profile. Track your enrollments and certifications, all in one place.
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <TrainingPartnerSection />
      </Grid>
      <Grid item xs={12}>
        <Box
          sx={{
            backgroundColor: '#FFFFFF',
            borderRadius: '5px'
          }}
        >
          <Tabs value={value} onChange={handleChange} aria-label='basic tabs example' centered variant='fullWidth'>
            <Tab label='Available Training' {...a11yProps(0)} />
            <Tab label='Joined Training' {...a11yProps(1)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <OngoingTrainingScreen pageView={pageView} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <AllTrainingScreen />
          </TabPanel>
        </Box>
      </Grid>
    </Grid>
  )
}

SeafarerTraining.acl = {
  action: 'read',
  subject: 'seafarer-training'
}

export default SeafarerTraining
