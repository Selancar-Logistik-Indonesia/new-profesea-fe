// ** React Imports
import React, { useState, useEffect } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import { Tabs, Tab, useMediaQuery } from '@mui/material'
import { Grid } from '@mui/material'
import { useForm } from 'react-hook-form'
// import Icon from 'src/@core/components/icon'
import { useTheme } from '@mui/material/styles'

import JobApplied from './applied'
import JobDetail from './detail'
import UserSaved from './saved'
import { Icon } from '@iconify/react'
import Job from 'src/contract/models/job'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'

type FormData = {
  companyName: string
  industryType: string
  country: string
  district: string
  city: string
  postalCode: string
  email: string
  code: string
  website: string
  phone: string
  address: string
  about: string
}
const UserJob = () => {
  const windowUrl = window.location.search
  const params = new URLSearchParams(windowUrl)
  const [jobDetail, setJobDetail] = useState<Job>()

  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  const firstload = () => {
    HttpClient.get(AppConfig.baseUrl + '/job/' + params.get('id')).then(response => {
      const job = response.data.job
      setJobDetail(job)
    })
  }

  // const firstload = async () => {

  // }
  useEffect(() => {
    firstload()
  }, [])

  const {} = useForm<FormData>({
    mode: 'onBlur'
  })
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
            {children}
            {/* <Typography>{children}</Typography> */}
          </Box>
        )}
      </div>
    )
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    }
  }

  const [value, setValue] = React.useState(0)
  const [color, getColor] = useState<any>('#FFFFFF')
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    getColor('#FFFFFF')
  }

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sx={
            !hidden
              ? {
                  direction: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'stretch',
                  alignContent: 'top',
                  marginBottom: '10px'
                }
              : {}
          }
        >
          <Grid item xs={12}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                boxSizing: 'border-box',
                background: '#FFFFFF',
                border: 0,
                borderRadius: '2px'
              }}
            >
              <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
                <Tab
                  label='Detail Job'
                  icon={<Icon icon='solar:case-minimalistic-bold-duotone' fontSize={18} />}
                  {...a11yProps(0)}
                />
                <Tab
                  label='List Applicant'
                  icon={<Icon icon='solar:users-group-rounded-bold-duotone' fontSize={18} />}
                  {...a11yProps(1)}
                />
                <Tab
                  label='Applicant Saved'
                  icon={<Icon icon='solar:user-heart-rounded-bold-duotone' fontSize={18} />}
                  {...a11yProps(2)}
                />
              </Tabs>
            </Box>
            <Grid
              container
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                boxSizing: 'border-box',
                background: color,
                border: '1px solid rgba(76, 78, 100, 0.12)',
                borderRadius: '10px',
                marginTop: '10px',
                direction: 'row',
                justifyContent: 'flex-start',
                alignItems: 'top',
                alignContent: 'top'
              }}
            >
              <Grid item xs={12}>
                <TabPanel value={value} index={0}>
                  <Grid item xs={12}>
                    <Grid item xs={9}></Grid>
                    <Grid md={12} xs={3} item justifyContent={'right'} marginTop={'10px'}></Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value={value} index={0}>
                  <JobDetail jobDetail={jobDetail}></JobDetail>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <JobApplied jobDetail={jobDetail}></JobApplied>
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <UserSaved></UserSaved>
                </TabPanel>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

// OngoingTraining.getLayout = (page: ReactNode) => <BlankLayoutWithAppBar>{page}</BlankLayoutWithAppBar>

// OngoingTraining.guestGuard = true

UserJob.acl = {
  action: 'read',
  subject: 'user-job-detail'
}
export default UserJob
