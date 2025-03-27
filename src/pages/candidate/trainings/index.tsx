import React from 'react'
import Box from '@mui/material/Box'
import { Tabs, Tab, Grid, Typography } from '@mui/material'
import AllTrainingScreen from './all'
import OngoingTrainingScreen from './ongoing'

import TrainingPartner from 'src/views/training/TrainingPartner'
import { useSearchParams } from 'next/navigation'

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
        flexDirection: {
          xs: 'column-reverse',
          md: 'row'
        }
      }}
    >
      <Grid item xs={12} md={3}>
        <TrainingPartner />
      </Grid>
      <Grid item xs={12} md={9}>
        <Box
          sx={{
            backgroundColor: '#FFFFFF',
            borderRadius: '5px'
          }}
        >
          <Tabs value={value} onChange={handleChange} aria-label='basic tabs example' centered variant='fullWidth'>
            <Tab label='Available Training' {...a11yProps(0)} />
            <Tab label='Joined Training' {...a11yProps(1)} />
            {/* <Tab
                label='In House Training'
                icon={<Icon icon='solar:bookmark-square-bold-duotone' fontSize={18} />}
                {...a11yProps(2)}
              /> */}
          </Tabs>
          <TabPanel value={value} index={0}>
            <OngoingTrainingScreen pageView={pageView} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <AllTrainingScreen />
          </TabPanel>

          {/* <TabPanel value={value} index={2}>
                <SeafarerInstantTraining />
              </TabPanel> */}
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
