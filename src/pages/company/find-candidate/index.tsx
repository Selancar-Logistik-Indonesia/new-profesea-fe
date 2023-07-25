import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { Autocomplete, Card, CardContent, CardHeader, Collapse, Grid, IconButton, Tab, Tabs, TextField,   Slider, Typography, useMediaQuery } from '@mui/material'
import { Icon } from '@iconify/react' 
import RecomendedView from 'src/views/find-candidate/RecomendedView'
import { IUser } from 'src/contract/models/user'
import { HttpClient } from 'src/services'  
import JobCategory from 'src/contract/models/job_category'  
import Countries from 'src/contract/models/country'
import { AppConfig } from 'src/configs/api'
import City from 'src/contract/models/city'
import { useTheme } from '@mui/material/styles'
const FindCandidate = () => {
  function valuetext(value: number) { 
    const rp = formatrup.format(value)

   return ` ${rp}`
 }
 const formatrup = Intl.NumberFormat('id-ID', {
   style: 'currency',
   currency: 'IDR'
 })
  const [listCandidate, setListCandidate] = useState<IUser[]>([]) 
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const [collapsed, setCollapsed] = useState<boolean>(true)
  const [collapsed2, setCollapsed2] = useState<boolean>(false)
  const [collapsed3, setCollapsed3] = useState<boolean>(false)
  const [collapsed4, setCollapsed4] = useState<boolean>(false)
  const [JobCategory, getJobCategory] = useState<any[]>([]) 
  const [idposition, setPosition] = useState<any>(0)  
  const [idcountry, setCountry] = useState<any>()
  const [combocity, getComboCity] = useState<any[]>([])
  const [idcity, setCombocity] = useState<any>(0)
  const [combocode, getCombocode] = useState<any[]>([]) 
 const [valueSalary, setValueSalary] = React.useState<number[]>([0, 100000000])
 const handleChangeSalary = (event: Event, newValue: number | number[]) => {
   setValueSalary(newValue as number[])
 }
 const position = [
   { label: 'Onship', id: 0 },
   { label: 'Offship', id: 1 }
 ]

  const getListCandidates = async () => {
    const response = await HttpClient.get('/candidate?page=1&take=25&search', {
      page: 1,
      take: 25,
      search: ''
    })

    const { candidates } = response.data as { candidates: IUser[] }
    setListCandidate(candidates)
 

     const res2 = await HttpClient.get(`/job-category?search=&page=1&take=250`)
     if (res2.status != 200) {
       throw res2.data.message ?? 'Something went wrong!'
     }
     getJobCategory(res2.data.categories.data)
     
    HttpClient.get(AppConfig.baseUrl + '/public/data/country?search=').then(response => {
      const code = response.data.countries
      for (let x = 0; x < code.length; x++) {
        const element = code[x]
        element.label = element.name + '(' + element.phonecode + ')'
      }
      getCombocode(code)
    })
    console.log({ idposition }, { idcountry }, { idcountry }, { idcity })
    
  }
  const searchcity = async (q: any) => {
    setCountry(q)
    const resp = await HttpClient.get('/public/data/city?search=&country_id=' + q)
    if (resp.status != 200) {
      throw resp.data.message ?? 'Something went wrong!'
    }
    const code = resp.data.cities
    getComboCity(code)
  }

  useEffect(() => {
    getListCandidates()
  }, [])
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
  // const [color, getColor] = useState<any>('#FFFFFF')
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    // getColor('#FFFFFF')
  }

  return (
    <Grid container spacing={2}>
      <Grid container spacing={6}>
        <Grid item lg={3} md={5} xs={12}>
          <Box mb={3}>
            <Card>
              <CardHeader
                titleTypographyProps={{ variant: 'subtitle2', color: '#424242' }}
                title='Category'
                action={
                  <IconButton
                    size='small'
                    aria-label='collapse'
                    sx={{ color: '#424242' }}
                    onClick={() => setCollapsed(!collapsed)}
                  >
                    <Icon fontSize={20} icon={!collapsed ? 'mdi:chevron-down' : 'mdi:chevron-up'} />
                  </IconButton>
                }
              />
              <Collapse in={collapsed}>
                <CardContent>
                  <Autocomplete
                    disablePortal
                    id='combo-box-demo'
                    options={JobCategory}
                    getOptionLabel={(option: JobCategory) => option.name}
                    renderInput={params => <TextField {...params} label='Job Category' />}
                    onChange={(event: any, newValue: JobCategory | null) =>
                      newValue?.id ? /*setCatId(newValue.id) : setCatId(0)*/ '' : ''
                    }
                  />
                </CardContent>
              </Collapse>
            </Card>
          </Box>
          <Box mb={3}>
            <Card>
              <CardHeader
                titleTypographyProps={{ variant: 'body2' }}
                title='Salary Range'
                action={
                  <IconButton
                    size='small'
                    aria-label='collapse'
                    sx={{ color: 'text.secondary' }}
                    onClick={() => setCollapsed2(!collapsed2)}
                  >
                    <Icon fontSize={20} icon={!collapsed2 ? 'mdi:chevron-down' : 'mdi:chevron-up'} />
                  </IconButton>
                }
              />
              <Collapse in={collapsed2}>
                <CardContent>
                  <br></br>
                  <Slider
                    getAriaLabel={() => 'Rp'}
                    min={0}
                    step={100000}
                    max={100000000}
                    value={valueSalary}
                    onChange={handleChangeSalary}
                    valueLabelDisplay='on'
                    valueLabelFormat={valuetext}
                  />
                </CardContent>
              </Collapse>
            </Card>
          </Box>
          <Box mb={3}>
            <Card>
              <CardHeader
                titleTypographyProps={{ variant: 'body2' }}
                title='Availability'
                action={
                  <IconButton
                    size='small'
                    aria-label='collapse'
                    sx={{ color: 'text.secondary' }}
                    onClick={() => setCollapsed3(!collapsed3)}
                  >
                    <Icon fontSize={20} icon={!collapsed3 ? 'mdi:chevron-down' : 'mdi:chevron-up'} />
                  </IconButton>
                }
              />
              <Collapse in={collapsed3}>
                <CardContent>
                  <Autocomplete
                    disablePortal
                    id='position'
                    options={!position ? [{ label: 'Loading...', id: 0 }] : position}
                    renderInput={params => <TextField {...params} label='Position' sx={{ mb: 2 }} />}
                    onChange={(event: any, newValue: any | null) => setPosition(newValue)}
                  />
                </CardContent>
              </Collapse>
            </Card>
          </Box>
          <Box mb={3}>
            <Card>
              <CardHeader
                titleTypographyProps={{ variant: 'body2' }}
                title='Location'
                action={
                  <IconButton
                    size='small'
                    aria-label='collapse'
                    sx={{ color: 'text.secondary' }}
                    onClick={() => setCollapsed4(!collapsed4)}
                  >
                    <Icon fontSize={20} icon={!collapsed4 ? 'mdi:chevron-down' : 'mdi:chevron-up'} />
                  </IconButton>
                }
              />
              <Collapse in={collapsed4}>
                <CardContent>
                  <Autocomplete
                    disablePortal
                    id='code'
                    options={combocode}
                    getOptionLabel={(option: Countries) => option.nicename}
                    // defaultValue={props.datauser?.country}
                    renderInput={params => <TextField {...params} label='Code' sx={{ mb: 2 }} />}
                    onChange={(event: any, newValue: Countries | null) =>
                      newValue?.id ? searchcity(newValue.id) : searchcity(0)
                    }
                  />
                  <Autocomplete
                    disablePortal
                    id='city'
                    // value={props.datauser.address?.city}
                    options={combocity}
                    getOptionLabel={(option: City) => option.city_name}
                    renderInput={params => <TextField {...params} label='City' sx={{ mb: 2 }} />}
                    onChange={(event: any, newValue: City | null) =>
                      newValue?.id ? setCombocity(newValue.id) : setCombocity(0)
                    }
                  />
                </CardContent>
              </Collapse>
            </Card>
          </Box>
        </Grid>
        <Grid item lg={9} md={7} xs={12}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    boxSizing: 'border-box',
                    background: '#FFFFFF',
                    border: '1px solid rgba(76, 78, 100, 0.12)',
                    borderRadius: '10px'
                  }}
                >
 
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
                    // marginTop: '10px',
                    direction: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'top',
                    alignContent: 'top'
                  }}
                >
                  <Grid item xs={12}>
                       <Box padding={5}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sx={!hidden ? { alignItems: 'stretch' } : {}}>
                            <Grid container spacing={6}>
                              <Grid item xs={12}>
                                <Typography variant='h6' color={'#32487A'} fontWeight='600'>
                                  {' '}
                                  Find Candidate
                                </Typography>
                                <Typography fontSize={16} style={{ color: '#424242' }} marginTop={2} marginBottom={5}>
                                  Based on your profile and search history
                                </Typography>
                                <RecomendedView listCandidate={listCandidate} />
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Box>
   
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

FindCandidate.acl = {
  action: 'read',
  subject: 'find-candidate'
}
export default FindCandidate
