import React, { useState, useEffect, useCallback } from 'react'
import Box from '@mui/material/Box'
import { Tabs, Tab, useMediaQuery, Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Icon } from '@iconify/react'
import JobApplied from './applied'
import JobDetail from './detail'
import UserSaved from './saved'
import Job from 'src/contract/models/job'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

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
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

const UserJob = () => {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  const jobId = params.get('id')
  const tabs = params.get('tabs')

  const [jobDetail, setJobDetail] = useState<Job>()
  const [value, setValue] = useState<string>(tabs || '1')
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const searchParams = new URLSearchParams(params.toString())
      searchParams.set(name, value)

      return searchParams.toString()
    },
    [params]
  )

  const firstLoad = useCallback(() => {
    if (jobId) {
      HttpClient.get(`${AppConfig.baseUrl}/job/${jobId}`).then(response => {
        setJobDetail(response.data.job)
      })
    }
  }, [jobId])

  useEffect(() => {
    if (tabs === null) {
      router.push(`${pathname}?${createQueryString('tabs', '1')}`)
    }
    firstLoad()
  }, [])

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
    router.push(`${pathname}?${createQueryString('tabs', newValue)}`)
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
                  {...a11yProps(1)}
                  value='1'
                />
                <Tab
                  label='List Applicant'
                  icon={<Icon icon='solar:users-group-rounded-bold-duotone' fontSize={18} />}
                  {...a11yProps(2)}
                  value='2'
                />
                <Tab
                  label='Applicant Saved'
                  icon={<Icon icon='solar:user-heart-rounded-bold-duotone' fontSize={18} />}
                  {...a11yProps(3)}
                  value='3'
                />
              </Tabs>
            </Box>
            <Grid
              container
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                boxSizing: 'border-box',
                background: '#FFFFFF',
                border: '1px solid rgba(76, 78, 100, 0.12)',
                borderRadius: '10px',
                marginTop: '10px',
                direction: 'row',
                justifyContent: 'flex-start',
                alignItems: 'top',
                alignContent: 'top'
              }}
            >
              <Grid item xs={12} sx={{ pt: '10px' }}>
                <TabPanel value={parseInt(value, 10)} index={1}>
                  <JobDetail jobDetail={jobDetail} />
                </TabPanel>
                <TabPanel value={parseInt(value, 10)} index={2}>
                  <JobApplied jobDetail={jobDetail} />
                </TabPanel>
                <TabPanel value={parseInt(value, 10)} index={3}>
                  <UserSaved />
                </TabPanel>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

UserJob.acl = {
  action: 'read',
  subject: 'user-job-detail'
}
export default UserJob
