import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { Autocomplete, Button, Card, CardContent, CardHeader, Chip, Collapse, FormControl, Grid, IconButton,  Input,   TextField,  Typography, useMediaQuery } from '@mui/material'
import { Icon } from '@iconify/react' 
import RecomendedView from 'src/views/find-candidate/RecomendedView'
import { IUser } from 'src/contract/models/user'
import { HttpClient } from 'src/services'  
import JobCategory from 'src/contract/models/job_category'  
import { AppConfig } from 'src/configs/api' 
import { useTheme } from '@mui/material/styles'
import RoleType from 'src/contract/models/role_type'
import VesselType from 'src/contract/models/vessel_type'
import InfiniteScroll from 'react-infinite-scroll-component'
import { GridPaginationModel } from '@mui/x-data-grid'
 
type Dokumen = {
  title: string 
  docType: string
}
const FindCandidate = () => {
  const [listCandidate, setListCandidate] = useState<IUser[]>([]) 
  const theme = useTheme()
    const windowUrl = window.location.search
   const params = new URLSearchParams(windowUrl)
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const [collapsed, setCollapsed] = useState<boolean>(true)
  const [collapsed2, setCollapsed2] = useState<boolean>(params.get('plan') === 'advance' ? false : true)
  const [JobCategory, getJobCategory] = useState<any[]>([])  
  const [JobTitle, getJobTitle] = useState<any[]>([])  
  const [VesselType, getVesselType] = useState<any[]>([])  
  const [combocode, getCombocode] = useState<any[]>([]) 
  const [textCandidate, SetTextCandidate] = useState<any>('')   
  const [sJobCategory, setJobCategory] = useState<any>('')
  const [sJobTitle, setJobTitle] = useState<any>('')
  const [sVesselType, setVesselType] = useState<any>('')  
   const [hasNextPage, setHasNextPage] = useState(true)
   const [total, setTotal] = useState(0)
   const [perPage, setPerPage] = useState(3)
      const [page, setPage] = useState(1)

  const getListCandidates = async () => {
    // const response = await HttpClient.get('/candidate?page=1&take=25&search', {
    //   page: 1,
    //   take: 3,
    //   search: ''
    // }) 
    // const candidates = response.data.candidates.data
    // setListCandidate(candidates)
 
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

 
  useEffect(() => {
    getListCandidates()
  }, [])

  const getdatapencarian = async () => {
    let allword = ''
    if (values.length > 0) allword = JSON.stringify(values)
    // let oneword = ''
    // if (valuesoneword.length > 0) oneword = JSON.stringify(valuesoneword)
    const response = await HttpClient.get(
       '/candidate?search=' +
         textCandidate +
         '&vesseltype_id=' +
         sVesselType +
         '&roletype_id=' +
         sJobTitle +
         '&rolelevel_id=' +
         sJobCategory +
         '&include_all_word=' +
         allword+
         '&page='+
         page+
         '&take='+perPage
        //  +
        // '&include_one_word=' +
        // oneword
         
       
     ) 
     debugger;
    const candidates = response.data.candidates
    if (candidates?.total == null) {
      setTotal(candidates?.total)
    }
    if (candidates?.next_page_url == null) {
      setHasNextPage(candidates?.next_page_url)
    }
    setListCandidate(candidates.data)
 
  }
  useEffect(() => {
    getdatapencarian()
  }, [textCandidate, sVesselType, sJobTitle, sJobCategory, page,  perPage])
   
  const onPageChange = () => {
    debugger;
  const mPage = page + 1
  setPage(mPage)
  setPerPage(15)
  }

  const [values, setValues] = useState<any[]>([])
  const [currValue, setCurrValue] = useState('')
  const [valuesoneword, setValuesOneWord] = useState<any[]>([])
  const [currValueoneword, setCurrValueOneWord] = useState('')
  const [valuesexclude, setValuesExclude] = useState<any[]>([])
  const [currValueexclude, setCurrValueExclude] = useState('')
  const [valueslitle, setValuesLitle] = useState<any[]>([])
  const [currValuelitle, setCurrValueLitle] = useState('')

  const handleKeyUp = (e: any) => {
    console.log(e.keyCode)
    if (e.keyCode == 32) {
       getdatapencarian()
     }
  }
  
  const handleKeyDown = (e: any,x:any) => {
     if (e.keyCode == 32) {
       if (x == 1) {
         setValues(oldState => [...oldState, e.target.value])
         setCurrValue('')
       } else if (x == 2) {
         setValuesOneWord(oldState => [...oldState, e.target.value])
         setCurrValueOneWord('')
       } else if (x == 3) {
         setValuesExclude(oldState => [...oldState, e.target.value])
         setCurrValueExclude('')
       } else if (x == 4) {
         setValuesLitle(oldState => [...oldState, e.target.value])
         setCurrValueLitle('')
       }
        
     }
  }
 

  const handleChange = (e: any,x:any) => {
    if (x == 1) {
      setCurrValue(e.value)
    } else if (x == 2) {
      setCurrValueOneWord(e.value)
    } else if (x == 3) {
      setCurrValueExclude(e.value)
    } else if (x == 4) {
      setCurrValueLitle(e.value)
    }
  }

  const handleDelete = (item:any, index:any,x:any) => {
    if (x == 1) {
      const arr = [...values]
      arr.splice(index, 1)
      setValues(arr)
    } else if (x == 2) {
      const arr = [...valuesoneword]
      arr.splice(index, 1)
      setValuesOneWord(arr)
    } else if (x == 3) {
      const arr = [...valuesexclude]
      arr.splice(index, 1)
      setValuesExclude(arr)
    } else if (x == 4) {
      const arr = [...valueslitle]
      arr.splice(index, 1)
      setValuesLitle(arr)
    }
    getdatapencarian();

  }

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
                    Basic Filter
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
                    sx={{ marginBottom: 2 }}
                  />
                  <Autocomplete
                    disablePortal
                    id='combo-box-demo'
                    options={JobTitle}
                    getOptionLabel={(option: RoleType) => option.name}
                    renderInput={params => <TextField {...params} label='Role Type' />}
                    onChange={(event: any, newValue: RoleType | null) =>
                      newValue?.id ? setJobTitle(newValue.id) : setJobTitle('')
                    }
                    sx={{ marginBottom: 2 }}
                  />
                  <Autocomplete
                    disablePortal
                    id='combo-box-demo'
                    options={VesselType}
                    getOptionLabel={(option: VesselType) => option.name}
                    renderInput={params => <TextField {...params} label='Type of Vessel' />}
                    onChange={(event: any, newValue: VesselType | null) =>
                      newValue?.id ? setVesselType(newValue.id) : setVesselType('')
                    }
                    sx={{ marginBottom: 2 }}
                  />
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
                    sx={{ marginBottom: 2 }}
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
                    Advanced Filter
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
                  {params.get('plan') != 'advance' ? (
                    <>
                      <Button
                        href={'/company/find-candidate/?plan=advance'}
                        variant='contained'
                        color='warning'
                        sx={{ mr: 2 }}
                        fullWidth
                      >
                        Advance Filter
                      </Button>
                    </>
                  ) : (
                    <>
                      <Autocomplete
                        disablePortal
                        id='code'
                        options={dokumen}
                        getOptionLabel={(option: any) => option.title}
                        // defaultValue={props.datauser?.country}
                        renderInput={params => <TextField {...params} label='License' sx={{ mb: 2 }} />}
                        // onChange={(event: any, newValue: Dokumen | null) =>
                        //   newValue?.id ? searchcity(newValue.id) : searchcity(0)
                        // }
                        sx={{ marginBottom: 2 }}
                      />
                      <Typography>Including all these words</Typography>
                      <FormControl>
                        <div className={'container'}>
                          {values.map((item, index) => (
                            <Chip
                              color='primary'
                              size='small'
                              onDelete={() => handleDelete(item, index, 1)}
                              label={item}
                              key={item}
                            />
                          ))}
                          <Input
                            value={currValue}
                            onChange={e => handleChange(e, '1')}
                            onKeyDown={e => handleKeyDown(e, '1')}
                            onKeyUp={handleKeyUp}
                            id='1'
                            name='1'
                          />
                        </div>
                      </FormControl>

                      <Typography>include one word</Typography>
                      <FormControl>
                        <div className={'container'}>
                          {valuesoneword.map((item, index) => (
                            <Chip
                              color='primary'
                              size='small'
                              onDelete={() => handleDelete(item, index, 2)}
                              label={item}
                              key={item}
                            />
                          ))}
                          <Input
                            value={currValueoneword}
                            onChange={e => handleChange(e, '2')}
                            onKeyDown={e => handleKeyDown(e, '2')}
                            onKeyUp={handleKeyUp}
                            id='2'
                            name='2'
                          />
                        </div>
                      </FormControl>

                      <Typography>Excluding all these words</Typography>
                      <FormControl>
                        <div className={'container'}>
                          {valuesexclude.map((item, index) => (
                            <Chip
                              color='primary'
                              size='small'
                              onDelete={() => handleDelete(item, index, 3)}
                              label={item}
                              key={item}
                            />
                          ))}
                          <Input
                            value={currValueexclude}
                            onChange={e => handleChange(e, '3')}
                            onKeyDown={e => handleKeyDown(e, '3')}
                            onKeyUp={handleKeyUp}
                          />
                        </div>
                      </FormControl>
                      <Typography>Including these words in the title</Typography>
                      <FormControl>
                        <div className={'container'}>
                          {valueslitle.map((item, index) => (
                            <Chip
                              color='primary'
                              size='small'
                              onDelete={() => handleDelete(item, index, 4)}
                              label={item}
                              key={item}
                            />
                          ))}
                          <Input
                            value={currValuelitle}
                            onChange={e => handleChange(e, '4')}
                            onKeyDown={e => handleKeyDown(e, '4')}
                            onKeyUp={handleKeyUp}
                          />
                        </div>
                      </FormControl>
                    </>
                  )}
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
                                Find Candidate
                              </Typography>
                              <Typography fontSize={16} style={{ color: '#424242' }} marginTop={2} marginBottom={5}>
                                Based on your profile and search history
                              </Typography>
                                <InfiniteScroll
                                dataLength={total}
                                next={onPageChange}
                                hasMore={hasNextPage}
                                loader={(<Typography mt={5} color={'text.secondary'}>Loading..</Typography>)}>
                                 <RecomendedView listCandidate={listCandidate} />
                            </InfiniteScroll>
                              
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
// const useStyles = makeStyles(theme => ({
//   formControlRoot: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '8px',
//     width: '300px',
//     flexWrap: 'wrap',
//     flexDirection: 'row',
//     border: '2px solid lightgray',
//     padding: 4,
//     borderRadius: '4px',
//     '&> div.container': {
//       gap: '6px',
//       display: 'flex',
//       flexDirection: 'row',
//       flexWrap: 'wrap'
//     },
//     '& > div.container > span': {
//       backgroundColor: 'gray',
//       padding: '1px 3px',
//       borderRadius: '4px'
//     }
//   }
// }))

FindCandidate.acl = {
  action: 'read',
  subject: 'find-candidate'
}
export default FindCandidate
