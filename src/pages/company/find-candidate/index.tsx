import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { Autocomplete, Button, Card, CardContent, CardHeader, Chip, SelectChangeEvent,  Collapse, FormControl, Grid, IconButton,  Input,   InputLabel,   MenuItem,   OutlinedInput,   Select,   TextField,  Typography, useMediaQuery, Alert } from '@mui/material'
import { Icon } from '@iconify/react' 
import RecomendedView from 'src/views/find-candidate/RecomendedView'
import { IUser } from 'src/contract/models/user'
import { HttpClient } from 'src/services'  
import JobCategory from 'src/contract/models/job_category'  
import { AppConfig } from 'src/configs/api' 
import { Theme, useTheme } from '@mui/material/styles'
import RoleType from 'src/contract/models/role_type'
import VesselType from 'src/contract/models/vessel_type'
import InfiniteScroll from 'react-infinite-scroll-component' 
import RecomendedViewSubscribe from 'src/views/find-candidate/RecomendedViewSubscribe'
// import secureLocalStorage from 'react-secure-storage'
// import localStorageKeys from 'src/configs/localstorage_keys'
import { subscribev } from 'src/utils/helpers'

// type Dokumen = {
//   title: string 
//   docType: string
// }


const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

const names = ['Indonesian', 'English', 'Mandarin', 'Arab', 'Melayu']

function getStyles(name: string, personName: readonly string[], theme: Theme) {

  return {
    fontWeight:
      personName?.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
  }
}

 
const FindCandidate = () => {
  const [listCandidate, setListCandidate] = useState<IUser[]>([]) 
  const [listCandidateSubscribe, setListCandidateSubscribe] = useState<IUser[]>([]) 
  const theme = useTheme()
  // const windowUrl = window.location.search
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const [collapsed, setCollapsed] = useState<boolean>(true)
  const [collapsed2, setCollapsed2] = useState<boolean>(true)
  const [showadvance, setShowAdvance] = useState<boolean>(false)
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
  const [perPage, setPerPage] = useState(12)
  const [page, setPage] = useState(1)
  const [personName, setPersonName] = React.useState<string[]>([])
  const [licenseList, setLicense] = React.useState<string[]>([])
  const [licenseCertificate, setCertificate] = React.useState<string[]>([])
 
  const [values, setValues] = useState<any[]>([])
  const [currValue, setCurrValue] = useState('')
  const [valuesoneword, setValuesOneWord] = useState<any[]>([])
  const [currValueoneword, setCurrValueOneWord] = useState('')
  const [valuesexclude, setValuesExclude] = useState<any[]>([])
  const [currValueexclude, setCurrValueExclude] = useState('')
  const [valueslitle, setValuesLitle] = useState<any[]>([])
  const [currValuelitle, setCurrValueLitle] = useState('')
  const [heightSpoken, setHeightSpoken] = useState('50')

 

  const handleChange2 = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value }
    } = event
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }
  const handleChangeLicense = (event: SelectChangeEvent<typeof licenseList>) => {
    const {
      target: { value }
    } = event
    setLicense(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }
  const handleChangeCertificate = (event: SelectChangeEvent<typeof licenseCertificate>) => {
    const {
      target: { value }
    } = event
    setCertificate(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }
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
        
  const certificate = [
    {
      title: 'Ahli Nautika Tingkat Dasar (ANTD), Teknika',
      doctype: 'COC1'
    },
    {
      title: 'Ahli Nautika Tingkat V (ANT V), Teknika',
      doctype: 'COC2'
    },
    {
      title: 'Ahli Nautika Tingkat IV (ANT IV), Teknika',
      doctype: 'COC3'
    },
    {
      title: 'Ahli Nautika Tingkat III (ANT III), Teknika',
      doctype: 'COC4'
    },
    {
      title: 'Ahli Nautika Tingkat II (ANT II), Teknika',
      doctype: 'COC5'
    },
    {
      title: 'Ahli Nautika Tingkat I (ANT I), Teknika',
      doctype: 'COC6'
    },
    {
      title: 'Ahli Teknika Tingkat Dasar (ATTD), Nautika',
      doctype: 'COC7'
    },
    {
      title: 'Ahli Teknika Tingkat V (ATT V), Nautika',
      doctype: 'COC8'
    },
    {
      title: 'Ahli Teknika Tingkat IV (ATT IV), Nautika',
      doctype: 'COC9'
    },
    {
      title: 'Ahli Teknika Tingkat III (ATT III), Nautika',
      doctype: 'COC10'
    },
    {
      title: 'Ahli Teknika Tingkat II (ATT II), Nautika',
      doctype: 'COC11'
    },
    {
      title: 'Ahli Teknika Tingkat I (ATT I), Nautika',
      doctype: 'COC12'
    },
    {
      title: 'Basic training for Oil and Chemical Tanker (BOCT)',
      doctype: 'COP1'
    },
    {
      title: 'Basic training for Liquefied Gas Tanker (BLGT)',
      doctype: 'COP2'
    },
    {
      title: 'Advance training for Oil Tanker (AOT)',
      doctype: 'COP3'
    },
    {
      title: 'Advance training for Chemical Tanker cargo operation (ACT)',
      doctype: 'COP4'
    },
    {
      title: 'Advance training for Liquefied Gas Tanker cargo operation (ALGT)',
      doctype: 'COP5'
    },
    {
      title: 'Crowd Management Training Certificate (CMT)',
      doctype: 'COP6'
    },
    {
      title: 'Crisis Management and Human Behaviour Training Certificate (CMHBT)',
      doctype: 'COP7'
    },
    {
      title: 'Ro-ro Passenger Safety, Cargo Safety and Hull Intergrity Training Certificate',
      doctype: 'COP8'
    },
    {
      title: 'Survical Craft and Rescue Boats other than fast rescue boat (SCRB)',
      doctype: 'COP9'
    },
    {
      title: 'Fast Rescue Boats (FRB)',
      doctype: 'COP10'
    },
    {
      title: 'Advanced Fire Fighting (AFF)',
      doctype: 'COP11'
    },
    {
      title: 'Medical First Aid (MFA)',
      doctype: 'COP12'
    },
    {
      title: 'Medical Care (MC)',
      doctype: 'COP13'
    },
    {
      title: 'Radar Observation (RADAR Simulator)',
      doctype: 'COP14'
    },
    {
      title: 'Automatic Radar Plotting Aid Simulator (ARPA Simulator)',
      doctype: 'COP15'
    },
    {
      title: 'Electronics Charts Display and Information System (ECDIS)',
      doctype: 'COP16'
    },
    {
      title: 'Bridge Resource Management (BRM)',
      doctype: 'COP17'
    },
    {
      title: 'Engine Room Resource Management (ERM)',
      doctype: 'COP18'
    },
    {
      title: 'Security Awareness Training (SAT)',
      doctype: 'COP19'
    },
    {
      title: 'Security for Seafarers with Designated Security Duties (SDSD)',
      doctype: 'COP20'
    },
    {
      title: 'Ship Security Officers (SSO)',
      doctype: 'COP21'
    },
    {
      title: 'International Maritime Dangerous Good Cargo (IMDG) Code',
      doctype: 'COP22'
    },
    {
      title: 'Able Seafarer Deck',
      doctype: 'COP23'
    },
    {
      title: 'Able Seafarer Engine',
      doctype: 'COP24'
    },
    {
      title: 'Cook Certificate',
      doctype: 'COP25'
    },
    {
      title: 'Basic Safety Training',
      doctype: 'COP26'
    },
    {
      title: 'GMDSS (Global Maritime Distress Safety System)',
      doctype: 'COP27'
    },
    {
      title: 'Rating Forming Part of Navigational Watch',
      doctype: 'COP28'
    },
    {
      title: 'Rating Forming Part of Engine Room Watch',
      doctype: 'COP29'
    },
    {
      title: 'Proficiency in Survival Craft and Rescue Boats other than Fast Rescue Boats (PSCRB)',
      doctype: 'COP30'
    },
    {
      title: 'International Safety Management (ISM) Code',
      doctype: 'COP31'
    }
  ]

 
  useEffect(() => {
    getListCandidates()
    const a = subscribev(['A16'])
    if (a == true) {
      setShowAdvance(true)
      setCollapsed2(true)
      setCollapsed(true)
    }
      
  }, [])

  const getdatapencarian = async () => {
     let allword = ''
    if (values.length > 0) allword = JSON.stringify(values)
    let oneword = ''
    if (valuesoneword.length > 0) oneword = JSON.stringify(valuesoneword)
    let exclude = ''
    if (valuesexclude.length > 0) exclude = JSON.stringify(valuesexclude)
    let valuelitle = ''
    if (valueslitle.length > 0) valuelitle = JSON.stringify(valueslitle)
    let spoken=''
  debugger;
    if (personName.length > 0 ) spoken = JSON.stringify(personName)
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
          allword +
          '&page=' +
          page +
          '&take=' +
          perPage +
          '&include_one_word=' +
          oneword +
          '&exact_phrase=' +
          valuelitle +
          '&exclude_all_these=' +
          exclude +
          '&spoken=' +
          spoken
      ) 
     
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
    if(personName.length>2){
      setHeightSpoken('100')
    }else{
      setHeightSpoken('50')
    }
  }, [
    textCandidate,
    sVesselType,
    sJobTitle,
    sJobCategory,
    page,
    perPage,
    values,
    valuesoneword,
    valuesexclude,
    valueslitle,
    personName
  ])
   
  const onPageChange = () => {
    
  const mPage = page + 1
  setPage(mPage)
  setPerPage(15)
  }

  const handleKeyUp = (e: any) => {
    console.log(e.keyCode)
    if (e.keyCode == 32) {
       getdatapencarian()
     }
  }
  
  const handleKeyDown = (e: any,x:any) => {
     if (e.keyCode == 32) { 
       if (x == 1) {
        if(values.length > 0){
          setValues(oldState => [...oldState, e.target.value.substr(1)])
        }else{
          setValues(() => [e.target.value])
        } 
         setCurrValue('')
       } else if (x == 2) {
         if (valuesoneword.length > 0) {
             setValuesOneWord(oldState => [...oldState, e.target.value.substr(1)])
         } else {
             setValuesOneWord(() => [ e.target.value])
         }  
         setCurrValueOneWord('')
       } else if (x == 3) {
        if (valuesexclude.length > 0) {
            setValuesExclude(oldState => [...oldState, e.target.value.substr(1)])
        } else {
           setValuesExclude(() => [ e.target.value])
        }  
         setCurrValueExclude('')
       } else if (x == 4) {
        if (valueslitle.length > 0) {
          setValuesLitle(oldState => [...oldState, e.target.value.substr(1)])
        } else {
          setValuesLitle(() => [e.target.value])
          
        } 
         
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

  const handleDelete = async (item:any, index:any,x:any) => {
    if (x == 1) {
      const arr = [...values]
      arr.splice(index, 1)
    await setValues(arr)
      setCurrValue('')
    } else if (x == 2) {
       setCurrValueOneWord('')
      const arr = [...valuesoneword]
      arr.splice(index, 1)
    await   setValuesOneWord(() => arr) 
     
    } else if (x == 3) {
      const arr = [...valuesexclude]
      arr.splice(index, 1)
     await setValuesExclude(arr)
      setCurrValueExclude('')
    } else if (x == 4) {
      const arr = [...valueslitle]
      arr.splice(index, 1)
    await setValuesLitle(arr)
      setCurrValueLitle('')
    }
  //  await getdatapencarian()

  }
  const getdatapencarianSubscribe = async () => {
    
    const response = await HttpClient.get(
      '/candidate?search=' +  '&take=6&page=1'  
    )

    const candidates = response.data.candidates
    
    setListCandidateSubscribe(candidates.data)
  }
  useEffect(() => {
     getdatapencarianSubscribe()
  }, [ ])

  return (
    <Grid container spacing={2}>
      <Grid container spacing={6}>
        <Grid item lg={3} md={5} xs={12}>
          <Box mb={3}>
            <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
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
            <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
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
                  <Alert severity='info' sx={{ marginBottom: 2 }}>
                    Filter Candidate here
                  </Alert>
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

                  <FormControl>
                    <InputLabel id='demo-multiple-chip-label'>Spoken</InputLabel>
                    <Select
                      labelId='demo-multiple-chip-label'
                      id='demo-multiple-chip'
                      multiple
                      value={personName}
                      onChange={handleChange2}
                      label='Spoken'
                      sx={{ fontSize: '18px', height: heightSpoken }}
                      input={<OutlinedInput id='select-multiple-chip' label='Chip' sx={{ fontSize: '8px' }} />}
                      renderValue={selected => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, fontSize: '8px' }}>
                          {selected.map(value => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                    >
                      {names.map(name => (
                        <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </CardContent>
              </Collapse>
            </Card>
          </Box>
          <Box mb={3}>
            <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
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
                  {showadvance !== true ? (
                    <>
                      <Button
                        href={'/account'}
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
                      {/* <Autocomplete
                        disablePortal
                        id='code'
                        options={dokumen}
                        getOptionLabel={(option: any) => option.title} 
                        renderInput={params => <TextField {...params} label='License' sx={{ mb: 2 }} />} 
                        sx={{ marginBottom: 2 }}
                      /> */}

                      <FormControl fullWidth sx={{mb:2}}>
                        <InputLabel id='demo-multiple-chip-label2'>License</InputLabel>
                        <Select
                          labelId='demo-multiple-chip-label2'
                          id='demo-multiple-chip2'
                          multiple
                          value={licenseList}
                          onChange={handleChangeLicense}
                          label='License'
                          sx={{ fontSize: '18px', height: heightSpoken }}
                          input={<OutlinedInput id='select-multiple-chip' label='Chip' sx={{ fontSize: '8px' }} />}
                          renderValue={selected => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, fontSize: '8px' }}>
                              {selected.map(value => (
                                <Chip key={value} label={value} />
                              ))}
                            </Box>
                          )}
                          MenuProps={MenuProps}
                        >
                          {dokumen.map(name => (
                            <MenuItem
                              key={name.title}
                              value={name.title}
                              style={getStyles(name.title, licenseList, theme)}
                            >
                              {name.title}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl fullWidth>
                        <InputLabel id='demo-multiple-chip-label2'>Certificate</InputLabel>
                        <Select
                          labelId='demo-multiple-chip-label2'
                          id='demo-multiple-chip2'
                          multiple
                          value={licenseCertificate}
                          onChange={handleChangeCertificate}
                          label='Certificate'
                          sx={{ fontSize: '18px', height: heightSpoken }}
                          input={<OutlinedInput id='select-multiple-chip' label='Chip' sx={{ fontSize: '8px' }} />}
                          renderValue={selected => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, fontSize: '8px' }}>
                              {selected.map(value => (
                                <Chip key={value} label={value} />
                              ))}
                            </Box>
                          )}
                          MenuProps={MenuProps}
                        >
                          {certificate.map(name => (
                            <MenuItem
                              key={name.title}
                              value={name.title}
                              style={getStyles(name.title, licenseList, theme)}
                            >
                              {name.title}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
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
                              <Alert severity='info'>
                                Based on <strong>your profile</strong> and <strong> search history</strong>
                              </Alert>
                              <RecomendedViewSubscribe listCandidate={listCandidateSubscribe} />
                              <InfiniteScroll
                                dataLength={total}
                                next={onPageChange}
                                hasMore={hasNextPage}
                                loader={
                                  <Typography mt={5} color={'text.secondary'}>
                                    Loading..
                                  </Typography>
                                }
                              >
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
