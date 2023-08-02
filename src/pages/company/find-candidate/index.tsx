import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { Autocomplete, Card, CardContent, CardHeader, Collapse, Grid, IconButton,  TextField,  Typography, useMediaQuery } from '@mui/material'
import { Icon } from '@iconify/react' 
import RecomendedView from 'src/views/find-candidate/RecomendedView'
import { IUser } from 'src/contract/models/user'
import { HttpClient } from 'src/services'  
import JobCategory from 'src/contract/models/job_category'  
import { AppConfig } from 'src/configs/api' 
import { useTheme } from '@mui/material/styles'
import RoleType from 'src/contract/models/role_type'
import VesselType from 'src/contract/models/vessel_type'

type Dokumen = {
  title: string 
  docType: string
}
const FindCandidate = () => {
//   function valuetext(value: number) { 
//     const rp = formatrup.format(value)

//    return ` ${rp}`
//  }
//  const formatrup = Intl.NumberFormat('id-ID', {
//    style: 'currency',
//    currency: 'IDR'
//  })
  const [listCandidate, setListCandidate] = useState<IUser[]>([]) 
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const [collapsed, setCollapsed] = useState<boolean>(true)
  const [collapsed2, setCollapsed2] = useState<boolean>(false)
  // const [collapsed3, setCollapsed3] = useState<boolean>(false)
  const [collapsed4, setCollapsed4] = useState<boolean>(false)
  const [collapsed5, setCollapsed5] = useState<boolean>(false)
  const [JobCategory, getJobCategory] = useState<any[]>([])  
  const [JobTitle, getJobTitle] = useState<any[]>([])  
  const [VesselType, getVesselType] = useState<any[]>([])  
  const [combocode, getCombocode] = useState<any[]>([]) 
  const [textCandidate, SetTextCandidate] = useState<any>('') 

  
  const [sJobCategory, setJobCategory] = useState<any>('')
  const [sJobTitle, setJobTitle] = useState<any>('')
  const [sVesselType, setVesselType] = useState<any>('')  
//  const [valueSalary, setValueSalary] = React.useState<number[]>([0, 100000000])
//  const handleChangeSalary = (event: Event, newValue: number | number[]) => {
//    setValueSalary(newValue as number[])
//  } 

  const getListCandidates = async () => {
    const response = await HttpClient.get('/candidate?page=1&take=25&search', {
      page: 1,
      take: 25,
      search: ''
    }) 
    // const { candidates } = response.data.data as { candidates: IUser[] } 
    const candidates = response.data.candidates.data
    setListCandidate(candidates)
 

     const res2 = await HttpClient.get(`/job-category?search=&page=1&take=250`)
     if (res2.status != 200) {
       throw res2.data.message ?? 'Something went wrong!'
     }
     getJobCategory(res2.data.categories.data)

    const res3 = await HttpClient.get(`/public/data/role-type?search=&page=1&take=250`)
    if (res3.status != 200) {
      throw res2.data.message ?? 'Something went wrong!'
    }
    getJobTitle(res3.data.roleTypes.data)

   const res4 = await HttpClient.get(`/public/data/vessel-type?search=&page=1&take=250`)
   if (res4.status != 200) {
     throw res4.data.message ?? 'Something went wrong!'
   }
   getVesselType(res4.data.vesselTypes.data)

    HttpClient.get(AppConfig.baseUrl + '/public/data/country?search=').then(response => {
      const code = response.data.countries
      for (let x = 0; x < code.length; x++) {
        const element = code[x]
        element.label = element.name + '(' + element.phonecode + ')'
      }
      getCombocode(code)
    })
    console.log(   { combocode })
    
  }
   const dokumen = [
     { title: 'Certificate of Competency', docType: 'COC' },
     { title: 'Certificate of Profeciency', docType: 'COP' },
     { title: 'Certificate of Recognition', docType: 'COR' },
     { title: 'Certificate of Endorsement', docType: 'COE' },
     { title: 'Other Certificate', docType: 'OTH' },
     { title: 'MCU Certificates', docType: 'MCU' }, 
   ]

  // const searchcity = async (q: any) => {
  //   setCountry(q)
  //   const resp = await HttpClient.get('/public/data/city?search=&country_id=' + q)
  //   if (resp.status != 200) {
  //     throw resp.data.message ?? 'Something went wrong!'
  //   }
  //   const code = resp.data.cities
  //   getComboCity(code)
  // }
 
  useEffect(() => {
    getListCandidates()
  }, [])

  const getdatapencarian = async () => {  
    const response = await HttpClient.get(
      '/candidate?page=1&take=25&search=' + textCandidate + '&vesseltype_id='+ sVesselType +'&roletype_id='+ sJobTitle +'&rolelevel_id='+sJobCategory,
      {
        page: 1,
        take: 25,
        search: ''
      }
    )
    const candidates = response.data.candidates.data
    setListCandidate(candidates)
 
  }
  useEffect(() => {
    getdatapencarian()
  }, [textCandidate, sVesselType, sJobTitle, sJobCategory])
  
  return (
    <Grid container spacing={2}>
      <Grid container spacing={6}>
        <Grid item lg={3} md={5} xs={12}>
          <Box mb={3}>
            <Card>
              <CardContent>
                <TextField
                  id='fullName'
                  // defaultValue={props.datauser.name}
                  label='Search Candidate Name'
                  variant='outlined'
                  fullWidth
                  sx={{ mb: 1 }}
                  onChange={e => SetTextCandidate(e.target.value)}
                />
              </CardContent>
            </Card>
          </Box>
          <Box mb={3}>
            <Card>
              <CardHeader
                title={
                  <Typography variant='body2' style={{ fontSize: '14px', color: '#424242' }}>
                    Role Level
                  </Typography>
                }
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
                    renderInput={params => <TextField {...params} label='Role Level' />}
                    onChange={(event: any, newValue: JobCategory | null) =>
                      newValue?.id ? setJobCategory(newValue.id) : setJobCategory('')
                    }
                  />
                </CardContent>
              </Collapse>
            </Card>
          </Box>
          <Box mb={3}>
            <Card>
              <CardHeader
                title={
                  <Typography variant='body2' style={{ fontSize: '14px', color: '#424242' }}>
                    Role Type
                  </Typography>
                }
                action={
                  <IconButton
                    size='small'
                    aria-label='collapse'
                    sx={{ color: '#424242' }}
                    onClick={() => setCollapsed2(!collapsed2)}
                  >
                    <Icon fontSize={20} icon={!collapsed2 ? 'mdi:chevron-down' : 'mdi:chevron-up'} />
                  </IconButton>
                }
              />
              <Collapse in={collapsed2}>
                <CardContent>
                  <Autocomplete
                    disablePortal
                    id='combo-box-demo'
                    options={JobTitle}
                    getOptionLabel={(option: RoleType) => option.name}
                    renderInput={params => <TextField {...params} label='Role Type' />}
                    onChange={(event: any, newValue: RoleType | null) =>
                      newValue?.id ? setJobTitle(newValue.id) : setJobTitle('')
                    }
                  />
                </CardContent>
              </Collapse>
            </Card>
          </Box>
          {/* <Box mb={3}>
            <Card>
              <CardHeader
                title={
                  <Typography variant='body2' style={{ fontSize: '14px', color: '#424242' }}>
                    Salary Range
                  </Typography>
                }
                action={
                  <IconButton
                    size='small'
                    aria-label='collapse3'
                    sx={{ color: 'text.secondary' }}
                    onClick={() => setCollapsed3(!collapsed3)}
                  >
                    <Icon fontSize={20} icon={!collapsed3 ? 'mdi:chevron-down' : 'mdi:chevron-up'} />
                  </IconButton>
                }
              />
              <Collapse in={collapsed3}>
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
                    size='small'
                  />
                </CardContent>
              </Collapse>
            </Card>
          </Box> */}
          <Box mb={3}>
            <Card>
              <CardHeader
                title={
                  <Typography variant='body2' style={{ fontSize: '14px', color: '#424242' }}>
                    Type of Vessel
                  </Typography>
                }
                action={
                  <IconButton
                    size='small'
                    aria-label='collapse4'
                    sx={{ color: '#424242' }}
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
                    id='combo-box-demo'
                    options={VesselType}
                    getOptionLabel={(option: VesselType) => option.name}
                    renderInput={params => <TextField {...params} label='Type of Vessel' />}
                    onChange={(event: any, newValue: VesselType | null) =>
                      newValue?.id ? setVesselType(newValue.id) : setVesselType('')
                    }
                  />
                </CardContent>
              </Collapse>
            </Card>
          </Box>
          <Box mb={3}>
            <Card>
              <CardHeader
                title={
                  <Typography variant='body2' style={{ fontSize: '14px', color: '#424242' }}>
                    License
                  </Typography>
                }
                action={
                  <IconButton
                    size='small'
                    aria-label='collapse5'
                    sx={{ color: 'text.secondary' }}
                    onClick={() => setCollapsed5(!collapsed5)}
                  >
                    <Icon fontSize={20} icon={!collapsed5 ? 'mdi:chevron-down' : 'mdi:chevron-up'} />
                  </IconButton>
                }
              />
              <Collapse in={collapsed5}>
                <CardContent>
                  <Autocomplete
                    disablePortal
                    id='code'
                    options={dokumen}
                    getOptionLabel={(option: Dokumen) => option.title}
                    // defaultValue={props.datauser?.country}
                    renderInput={params => <TextField {...params} label='License' sx={{ mb: 2 }} />}
                    // onChange={(event: any, newValue: Dokumen | null) =>
                    //   newValue?.id ? searchcity(newValue.id) : searchcity(0)
                    // }
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
