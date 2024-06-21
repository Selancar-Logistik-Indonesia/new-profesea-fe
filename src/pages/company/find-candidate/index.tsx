import React, { useCallback, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  SelectChangeEvent,
  Collapse,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  Alert,
  CircularProgress,
  Tabs,
  Tab
} from '@mui/material'
import { Icon } from '@iconify/react'
import RecomendedView from 'src/views/find-candidate/RecomendedView'
// import { IUser } from 'src/contract/models/user'
import { HttpClient } from 'src/services'
import JobCategory from 'src/contract/models/job_category'
import { Theme, useTheme } from '@mui/material/styles'
import RoleType from 'src/contract/models/role_type'
import VesselType from 'src/contract/models/vessel_type'
import InfiniteScroll from 'react-infinite-scroll-component'
import RecomendedViewSubscribe from 'src/views/find-candidate/RecomendedViewSubscribe'
import { subscribev } from 'src/utils/helpers'
import CandidateContext, { CandidateProvider } from 'src/context/CandidateContext'
import { useCandidate } from 'src/hooks/useCandidate'
import debounce from 'src/utils/debounce'
import { IUser } from 'src/contract/models/user'
import Countries from 'src/contract/models/country'

// const EXPERIENCE_OPTIONS_YEARS = [
//   {
//     label: '1 Year',
//     value: 'one-year'
//   },
//   {
//     label: '2 Year',
//     value: 'two-year'
//   },
//   {
//     label: '3 Year',
//     value: 'three-year'
//   },
//   {
//     label: '4 Year',
//     value: 'four-year'
//   },
//   {
//     label: '> 5 Year',
//     value: 'more-then-five-year'
//   }
// ]

// const EXPERIENCE_OPTIONS_CONTRACT = [
//   {
//     label: '1 Contract',
//     value: 'one-contract'
//   },
//   {
//     label: '2 Contract',
//     value: 'two-contract'
//   },
//   {
//     label: '3 Contract',
//     value: 'three-contract'
//   },
//   {
//     label: '4 Contract',
//     value: 'four-contract'
//   },
//   {
//     label: '> 5 Contract',
//     value: 'more-then-five-contract'
//   }
// ]

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
  return (
    <CandidateProvider>
      <FindCandidateApp />
    </CandidateProvider>
  )
}

const FindCandidateApp = () => {
  const [listCandidateSubscribe, setListCandidateSubscribe] = useState<IUser[]>([])
  const { fetchCandidates, hasNextPage, totalCandidate, setPage } = useCandidate()
  const theme = useTheme()
  // const windowUrl = window.location.search
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const [collapsed, setCollapsed] = useState<boolean>(true)
  const [collapsed2, setCollapsed2] = useState<boolean>(true)
  const [showadvance, setShowAdvance] = useState<boolean>(false)
  const [showadvance2, setShowAdvance2] = useState<boolean>(true)
  const [JobCategory, getJobCategory] = useState<any[]>([])
  const [combocountry, getComboCountry] = useState<any>([])
  const [RoleType, getRoleType] = useState<any[]>([])
  const [VesselType, getVesselType] = useState<any[]>([])
  // const [combocode, getCombocode] = useState<any[]>([])
  const [textCandidate, SetTextCandidate] = useState<any>('')
  // const [searchByPosition, setSearchByPosition] = useState<string>('')
  const [sJobCategory, setJobCategory] = useState<any>('')
  const [sRoleType, setRoleType] = useState<any>('')
  const [sVesselType, setVesselType] = useState<any>('')
  const [personName, setPersonName] = React.useState<string[]>([])
  const [country, setCountry] = useState<any>(null)
  // const [licenseList, setLicense] = React.useState<string[]>([])
  // const [licenseCertificate, setCertificate] = React.useState<string[]>([])

  // const [values, setValues] = useState<any[]>([])
  // const [currValue, setCurrValue] = useState('')
  // const [valuesoneword, setValuesOneWord] = useState<any[]>([])
  // const [currValueoneword, setCurrValueOneWord] = useState('')
  // const [valuesexclude, setValuesExclude] = useState<any[]>([])
  // const [currValueexclude, setCurrValueExclude] = useState('')
  // const [valueslitle, setValuesLitle] = useState<any[]>([])
  // const [currValuelitle, setCurrValueLitle] = useState('')
  const [heightSpoken, setHeightSpoken] = useState('50')
  const [tabValue, setTabValue] = useState<string>('onship')
  const [experienceFilter, setExperienceFilter] = useState<any>(null)

  // const [checkBoxVisaValues, setCheckBoxVisaValues] = useState({
  //   visaUsa: false,
  //   visaSchengen: false
  // })

  const handleChange2 = (event: SelectChangeEvent<typeof personName>) => {
    setPage(1)
    const {
      target: { value }
    } = event
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }

  // const handleChangeLicense = (event: SelectChangeEvent<typeof licenseList>) => {
  //   setPage(1)
  //   const {
  //     target: { value }
  //   } = event
  //   setLicense(
  //     // On autofill we get a stringified value.
  //     typeof value === 'string' ? value.split(',') : value
  //   )
  // }

  // const handleChangeCertificate = (event: SelectChangeEvent<typeof licenseCertificate>) => {
  //   setPage(1)
  //   const {
  //     target: { value }
  //   } = event
  //   setCertificate(
  //     // On autofill we get a stringified value.
  //     typeof value === 'string' ? value.split(',') : value
  //   )
  // }

  const getListCandidates = async () => {
    const res2 = await HttpClient.get(`/job-category?search=&page=1&take=250`)
    if (res2.status != 200) {
      throw res2.data.message ?? 'Something went wrong!'
    }
    const rawData: JobCategory[] = res2?.data?.categories?.data
    const filterOnshipCategories = rawData.filter(d => d.employee_type == tabValue)
    getJobCategory(filterOnshipCategories)

    const res3 = await HttpClient.get(`/public/data/vessel-type?search=&page=1&take=250`)
    if (res3.status != 200) {
      throw res3.data.message ?? 'Something went wrong!'
    }
    getVesselType(res3.data.vesselTypes.data)

    HttpClient.get('/public/data/country?search=').then(response => {
      const code = response.data.countries
      getComboCountry(code)
    })
  }

  const getRoleTypes = async () => {
    const res4 = await HttpClient.get(`/public/data/role-type?search=&page=1&take=250&category_id=` + sJobCategory)
    if (res4.status != 200) {
      throw res4.data.message ?? 'Something went wrong!'
    }
    getRoleType(res4.data.roleTypes.data)
  }

  // const dokumen = [
  //   { title: 'Certificate of Competency', docType: 'COC' },
  //   { title: 'Certificate of Profeciency', docType: 'COP' },
  //   { title: 'Certificate of Recognition', docType: 'COR' },
  //   { title: 'Certificate of Endorsement', docType: 'COE' },
  //   { title: 'Other Certificate', docType: 'OTH' },
  //   { title: 'MCU Certificates', docType: 'MCU' }
  // ]

  // const certificate = [
  //   {
  //     title: 'Ahli Nautika Tingkat Dasar (ANTD), Nautika',
  //     doctype: 'COC1'
  //   },
  //   {
  //     title: 'Ahli Nautika Tingkat V (ANT V), Nautika',
  //     doctype: 'COC2'
  //   },
  //   {
  //     title: 'Ahli Nautika Tingkat IV (ANT IV), Nautika',
  //     doctype: 'COC3'
  //   },
  //   {
  //     title: 'Ahli Nautika Tingkat III (ANT III), Nautika',
  //     doctype: 'COC4'
  //   },
  //   {
  //     title: 'Ahli Nautika Tingkat II (ANT II), Nautika',
  //     doctype: 'COC5'
  //   },
  //   {
  //     title: 'Ahli Nautika Tingkat I (ANT I), Nautika',
  //     doctype: 'COC6'
  //   },
  //   {
  //     title: 'Ahli Teknika Tingkat Dasar (ATTD), Teknika',
  //     doctype: 'COC7'
  //   },
  //   {
  //     title: 'Ahli Teknika Tingkat V (ATT V), Teknika',
  //     doctype: 'COC8'
  //   },
  //   {
  //     title: 'Ahli Teknika Tingkat IV (ATT IV), Teknika',
  //     doctype: 'COC9'
  //   },
  //   {
  //     title: 'Ahli Teknika Tingkat III (ATT III), Teknika',
  //     doctype: 'COC10'
  //   },
  //   {
  //     title: 'Ahli Teknika Tingkat II (ATT II), Teknika',
  //     doctype: 'COC11'
  //   },
  //   {
  //     title: 'Ahli Teknika Tingkat I (ATT I), Teknika',
  //     doctype: 'COC12'
  //   },
  //   {
  //     title: 'Basic training for Oil and Chemical Tanker (BOCT)',
  //     doctype: 'COP1'
  //   },
  //   {
  //     title: 'Basic training for Liquefied Gas Tanker (BLGT)',
  //     doctype: 'COP2'
  //   },
  //   {
  //     title: 'Advance training for Oil Tanker (AOT)',
  //     doctype: 'COP3'
  //   },
  //   {
  //     title: 'Advance training for Chemical Tanker cargo operation (ACT)',
  //     doctype: 'COP4'
  //   },
  //   {
  //     title: 'Advance training for Liquefied Gas Tanker cargo operation (ALGT)',
  //     doctype: 'COP5'
  //   },
  //   {
  //     title: 'Crowd Management Training Certificate (CMT)',
  //     doctype: 'COP6'
  //   },
  //   {
  //     title: 'Crisis Management and Human Behaviour Training Certificate (CMHBT)',
  //     doctype: 'COP7'
  //   },
  //   {
  //     title: 'Ro-ro Passenger Safety, Cargo Safety and Hull Intergrity Training Certificate',
  //     doctype: 'COP8'
  //   },
  //   {
  //     title: 'Survical Craft and Rescue Boats other than fast rescue boat (SCRB)',
  //     doctype: 'COP9'
  //   },
  //   {
  //     title: 'Fast Rescue Boats (FRB)',
  //     doctype: 'COP10'
  //   },
  //   {
  //     title: 'Advanced Fire Fighting (AFF)',
  //     doctype: 'COP11'
  //   },
  //   {
  //     title: 'Medical First Aid (MFA)',
  //     doctype: 'COP12'
  //   },
  //   {
  //     title: 'Medical Care (MC)',
  //     doctype: 'COP13'
  //   },
  //   {
  //     title: 'Radar Observation (RADAR Simulator)',
  //     doctype: 'COP14'
  //   },
  //   {
  //     title: 'Automatic Radar Plotting Aid Simulator (ARPA Simulator)',
  //     doctype: 'COP15'
  //   },
  //   {
  //     title: 'Electronics Charts Display and Information System (ECDIS)',
  //     doctype: 'COP16'
  //   },
  //   {
  //     title: 'Bridge Resource Management (BRM)',
  //     doctype: 'COP17'
  //   },
  //   {
  //     title: 'Engine Room Resource Management (ERM)',
  //     doctype: 'COP18'
  //   },
  //   {
  //     title: 'Security Awareness Training (SAT)',
  //     doctype: 'COP19'
  //   },
  //   {
  //     title: 'Security for Seafarers with Designated Security Duties (SDSD)',
  //     doctype: 'COP20'
  //   },
  //   {
  //     title: 'Ship Security Officers (SSO)',
  //     doctype: 'COP21'
  //   },
  //   {
  //     title: 'International Maritime Dangerous Good Cargo (IMDG) Code',
  //     doctype: 'COP22'
  //   },
  //   {
  //     title: 'Able Seafarer Deck',
  //     doctype: 'COP23'
  //   },
  //   {
  //     title: 'Able Seafarer Engine',
  //     doctype: 'COP24'
  //   },
  //   {
  //     title: 'Cook Certificate',
  //     doctype: 'COP25'
  //   },
  //   {
  //     title: 'Basic Safety Training',
  //     doctype: 'COP26'
  //   },
  //   {
  //     title: 'GMDSS (Global Maritime Distress Safety System)',
  //     doctype: 'COP27'
  //   },
  //   {
  //     title: 'Rating Forming Part of Navigational Watch',
  //     doctype: 'COP28'
  //   },
  //   {
  //     title: 'Rating Forming Part of Engine Room Watch',
  //     doctype: 'COP29'
  //   },
  //   {
  //     title: 'Proficiency in Survival Craft and Rescue Boats other than Fast Rescue Boats (PSCRB)',
  //     doctype: 'COP30'
  //   },
  //   {
  //     title: 'International Safety Management (ISM) Code',
  //     doctype: 'COP31'
  //   }
  // ]

  const getdatapencarianSubscribe = async () => {
    const response = await HttpClient.get(
      `/candidate?search=' + '&take=6&page=1&status=bayar&employee_type=${tabValue}`
    )
    const candidates = response.data.candidates
    setListCandidateSubscribe(candidates.data)
  }

  useEffect(() => {
    getListCandidates()
    getdatapencarianSubscribe()
    setShowAdvance2(true)
  }, [tabValue])

  useEffect(() => {
    getRoleTypes()
  }, [sJobCategory])

  useEffect(() => {
    const a = subscribev(['A16'])
    setShowAdvance(true)
    if (a == true) {
      // setShowAdvance(true)
      setCollapsed2(true)
      setCollapsed(true)
    }
  }, [])

  const getdatapencarian = async () => {
    // let allword = ''
    // if (values.length > 0) allword = JSON.stringify(values)
    // let oneword = ''
    // if (valuesoneword.length > 0) oneword = JSON.stringify(valuesoneword)
    // let exclude = ''
    // if (valuesexclude.length > 0) exclude = JSON.stringify(valuesexclude)
    // let valuelitle = ''
    // if (valueslitle.length > 0) valuelitle = JSON.stringify(valueslitle)
    // let spoken = ''

    // if (personName.length > 0) spoken = JSON.stringify(personName)

    const objFilter: any = {
      take: 9,
      search: textCandidate,
      // search_by_position: searchByPosition,
      vesseltype_id: sVesselType,
      roletype_id: sRoleType,
      category_id: sJobCategory,
      // include_all_word: allword,
      // include_one_word: oneword,
      // exact_phrase: valuelitle,
      // exclude_all_these: exclude,
      // spoken: spoken,
      employee_type: tabValue,
      country: country?.id,
      experience_in_years: experienceFilter?.value
      // visaUsa: checkBoxVisaValues.visaUsa,
      // visaSchengen: checkBoxVisaValues.visaSchengen
    }

    // if (typeOfExperience == 'contract') {
    //   objFilter['experience_in_contract'] = experienceFilter?.value
    // } else {
    //   objFilter['experience_in_years'] = experienceFilter?.value
    // }

    fetchCandidates(objFilter)
  }

  useEffect(() => {
    setExperienceFilter(null)
    setCountry(null)
  }, [tabValue])

  useEffect(() => {
    getdatapencarian()
    if (personName.length > 2) {
      setHeightSpoken('100')
    } else {
      setHeightSpoken('50')
    }
  }, [
    textCandidate,
    sVesselType,
    sRoleType,
    sJobCategory,
    // values,
    // valuesoneword,
    // valuesexclude,
    // valueslitle,
    personName,
    tabValue,
    // searchByPosition,
    experienceFilter,
    country
    // checkBoxVisaValues.visaSchengen,
    // checkBoxVisaValues.visaUsa
  ])

  // const handleKeyUp = (e: any) => {
  //   setPage(1)
  //   if (e.keyCode == 32) {
  //     getdatapencarian()
  //   }
  // }

  // const handleKeyDown = (e: any, x: any) => {
  //   setPage(1)
  //   if (e.keyCode == 32) {
  //     if (x == 1) {
  //       if (values.length > 0) {
  //         setValues(oldState => [...oldState, e.target.value.substr(1)])
  //       } else {
  //         setValues(() => [e.target.value])
  //       }
  //       setCurrValue('')
  //     } else if (x == 2) {
  //       if (valuesoneword.length > 0) {
  //         setValuesOneWord(oldState => [...oldState, e.target.value.substr(1)])
  //       } else {
  //         setValuesOneWord(() => [e.target.value])
  //       }
  //       setCurrValueOneWord('')
  //     } else if (x == 3) {
  //       if (valuesexclude.length > 0) {
  //         setValuesExclude(oldState => [...oldState, e.target.value.substr(1)])
  //       } else {
  //         setValuesExclude(() => [e.target.value])
  //       }
  //       setCurrValueExclude('')
  //     } else if (x == 4) {
  //       if (valueslitle.length > 0) {
  //         setValuesLitle(oldState => [...oldState, e.target.value.substr(1)])
  //       } else {
  //         setValuesLitle(() => [e.target.value])
  //       }

  //       setCurrValueLitle('')
  //     }
  //   }
  // }

  // const handleChange = (e: any, x: any) => {
  //   setPage(1)
  //   if (x == 1) {
  //     setCurrValue(e.value)
  //   } else if (x == 2) {
  //     setCurrValueOneWord(e.value)
  //   } else if (x == 3) {
  //     setCurrValueExclude(e.value)
  //   } else if (x == 4) {
  //     setCurrValueLitle(e.value)
  //   }
  // }

  // const handleDelete = async (item: any, index: any, x: any) => {
  //   setPage(1)
  //   if (x == 1) {
  //     const arr = [...values]
  //     arr.splice(index, 1)
  //     await setValues(arr)
  //     setCurrValue('')
  //   } else if (x == 2) {
  //     setCurrValueOneWord('')
  //     const arr = [...valuesoneword]
  //     arr.splice(index, 1)
  //     await setValuesOneWord(() => arr)
  //   } else if (x == 3) {
  //     const arr = [...valuesexclude]
  //     arr.splice(index, 1)
  //     await setValuesExclude(arr)
  //     setCurrValueExclude('')
  //   } else if (x == 4) {
  //     const arr = [...valueslitle]
  //     arr.splice(index, 1)
  //     await setValuesLitle(arr)
  //     setCurrValueLitle('')
  //   }
  //   //  await getdatapencarian()
  // }

  const handleChangeTabValue = (e: any, value: any) => {
    setPage(1)
    setTabValue(value)
  }

  const handleSearch = useCallback(
    debounce((value: string) => {
      setPage(1)
      SetTextCandidate(value)
    }, 500),
    []
  )

  // const handleSearchByPosition = useCallback(
  //   debounce((value: string) => {
  //     setPage(1)
  //     setSearchByPosition(value)
  //   }, 500),
  //   []
  // )

  // const handleCheckboxChange = (event: { target: { name: any; checked: any } }) => {
  //   const { name, checked } = event.target
  //   setCheckBoxVisaValues(prevState => ({
  //     ...prevState,
  //     [name]: checked
  //   }))
  // }

  return (
    <Grid container spacing={2}>
      <Grid container spacing={6}>
        <Grid item lg={3} md={5} xs={12}>
          <Box mb={3}>
            <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
              <CardHeader
                title={
                  // <Typography variant='body2' style={{ fontSize: '14px', color: '#262525' }}>
                  //   Basic Filter
                  // </Typography>
                  <Typography variant='body2' style={{ fontSize: '14px', color: '#262525' }}>
                    Search By
                  </Typography>
                }
                action={
                  <IconButton
                    size='small'
                    aria-label='collapse'
                    sx={{ color: '#262525' }}
                    onClick={() => setCollapsed(!collapsed)}
                  >
                    <Icon fontSize={20} icon={!collapsed ? 'mdi:chevron-down' : 'mdi:chevron-up'} />
                  </IconButton>
                }
              />
              <Collapse in={collapsed}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Alert severity='info' sx={{ marginBottom: 2 }}>
                    Filter Candidate here
                  </Alert>
                  <TextField
                    id='fullName'
                    label='Search Candidate (email or name)'
                    variant='outlined'
                    fullWidth
                    onChange={e => handleSearch(e.target.value)}
                  />
                  {/* <TextField
                    id='fullName'
                    label='Search By Position'
                    variant='outlined'
                    fullWidth
                    onChange={e => handleSearchByPosition(e.target.value)}
                  /> */}

                  {/* sementara dihide filter dibawah ini */}
                  {false && (
                    <>
                      <Autocomplete
                        disablePortal
                        id='combo-box-demo'
                        options={JobCategory}
                        getOptionLabel={(option: JobCategory) => option.name}
                        renderInput={params => <TextField {...params} label='Job Category' />}
                        onChange={(event: any, newValue: JobCategory | null) => {
                          setPage(1)
                          newValue?.id ? setJobCategory(newValue.id) : setJobCategory('')
                        }}
                      />
                      <Autocomplete
                        disablePortal
                        id='combo-box-demo'
                        options={RoleType}
                        getOptionLabel={(option: RoleType) => option.name}
                        renderInput={params => <TextField {...params} label='Role Type' />}
                        onChange={(event: any, newValue: RoleType | null) => {
                          setPage(1)
                          newValue?.id ? setRoleType(newValue.id) : setRoleType('')
                        }}
                      />
                      <Autocomplete
                        disablePortal
                        id='combo-box-demo'
                        options={VesselType}
                        getOptionLabel={(option: VesselType) => option.name}
                        renderInput={params => <TextField {...params} label='Type of Vessel' />}
                        onChange={(event: any, newValue: VesselType | null) => {
                          setPage(1)
                          newValue?.id ? setVesselType(newValue.id) : setVesselType('')
                        }}
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
                              {selected?.map(value => (
                                <Chip key={value} label={value} />
                              ))}
                            </Box>
                          )}
                          MenuProps={MenuProps}
                        >
                          {names?.map(name => (
                            <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </>
                  )}
                </CardContent>
              </Collapse>
            </Card>
          </Box>
          {showadvance2 == true && (
            <Box mb={3}>
              <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
                <CardHeader
                  title={
                    // <Typography variant='body2' style={{ fontSize: '14px', color: '#262525' }}>
                    //   Advanced Filter
                    // </Typography>
                    <Typography variant='body2' style={{ fontSize: '14px', color: '#262525' }}>
                      Filter By
                    </Typography>
                  }
                  action={
                    <IconButton
                      size='small'
                      aria-label='collapse'
                      sx={{ color: '#262525' }}
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
                        <Button href={'/account'} variant='contained' color='warning' sx={{ mr: 2 }} fullWidth>
                          Advance Filter
                        </Button>
                      </>
                    ) : (
                      <>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                          {/* <Autocomplete
                            disablePortal
                            id='combo-box-experience-years'
                            value={experienceFilter}
                            options={EXPERIENCE_OPTIONS_YEARS}
                            getOptionLabel={option => option.label}
                            renderInput={params => <TextField {...params} label='Experience (years)' />}
                            onChange={(event: any, newValue: any) => {
                              setPage(1)
                              setExperienceFilter(newValue)
                            }}
                          /> */}

                          <Autocomplete
                            disablePortal
                            id='combo-box-demo'
                            options={JobCategory}
                            getOptionLabel={(option: JobCategory) => option.name}
                            renderInput={params => <TextField {...params} label='Job Category' />}
                            onChange={(event: any, newValue: JobCategory | null) => {
                              setPage(1)
                              newValue?.id ? setJobCategory(newValue.id) : setJobCategory('')
                            }}
                          />

                          {tabValue == 'onship' && (
                            <>
                              {sJobCategory && (
                                <Autocomplete
                                  disablePortal
                                  id='combo-box-demo'
                                  options={RoleType}
                                  getOptionLabel={(option: RoleType) => option.name}
                                  renderInput={params => <TextField {...params} label='Job Rank' />}
                                  onChange={(event: any, newValue: RoleType | null) => {
                                    setPage(1)
                                    newValue?.id ? setRoleType(newValue.id) : setRoleType('')
                                  }}
                                />
                              )}
                              <Autocomplete
                                disablePortal
                                id='combo-box-demo'
                                options={VesselType}
                                getOptionLabel={(option: VesselType) => option.name}
                                renderInput={params => <TextField {...params} label='Type of Vessel' />}
                                onChange={(event: any, newValue: VesselType | null) => {
                                  setPage(1)
                                  newValue?.id ? setVesselType(newValue.id) : setVesselType('')
                                }}
                              />
                            </>
                          )}
                          {tabValue == 'offship' && sJobCategory && (
                            <Autocomplete
                              disablePortal
                              id='combo-box-demo'
                              options={RoleType}
                              getOptionLabel={(option: RoleType) => option.name}
                              renderInput={params => <TextField {...params} label='Job Title' />}
                              onChange={(event: any, newValue: RoleType | null) => {
                                setPage(1)
                                newValue?.id ? setRoleType(newValue.id) : setRoleType('')
                              }}
                            />
                          )}
                          <Autocomplete
                            disablePortal
                            id='combo-box-demo'
                            options={combocountry}
                            value={country}
                            getOptionLabel={(option: any) => option.nicename}
                            renderInput={params => <TextField {...params} label='Country' />}
                            onChange={(event: any, newValue: Countries | null) => {
                              setPage(1)
                              setCountry(newValue)
                            }}
                          />
                          {/*
                          {tabValue == 'onship' && (
                            <FormControl sx={{ m: 3 }} component='fieldset' variant='standard'>
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={checkBoxVisaValues.visaUsa}
                                      onChange={handleCheckboxChange}
                                      name='visaUsa'
                                    />
                                  }
                                  label='Visa Usa'
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={checkBoxVisaValues.visaSchengen}
                                      onChange={handleCheckboxChange}
                                      name='visaSchengen'
                                    />
                                  }
                                  label='Visa Schengen'
                                />
                              </FormGroup>
                            </FormControl>
                          )} */}
                        </Box>
                      </>
                    )}
                  </CardContent>
                </Collapse>
              </Card>
            </Box>
          )}
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
                              <Box sx={{ width: '100%', my: '10px' }}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                  <Tabs
                                    value={tabValue}
                                    onChange={handleChangeTabValue}
                                    aria-label='basic tabs example'
                                  >
                                    <Tab label='Seafarer' id='tab-1' value={'onship'} />
                                    <Tab label='Professional' id='tab-2' value={'offship'} />
                                  </Tabs>
                                </Box>
                              </Box>
                              <RecomendedViewSubscribe listCandidate={listCandidateSubscribe} />
                              <CandidateContext.Consumer>
                                {({ listCandidates, onLoading }) => {
                                  if (onLoading) {
                                    return (
                                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <CircularProgress sx={{ mt: 20 }} />
                                      </Box>
                                    )
                                  }

                                  return (
                                    <InfiniteScroll
                                      dataLength={totalCandidate}
                                      next={() => getdatapencarian()}
                                      hasMore={hasNextPage}
                                      loader={
                                        <Typography mt={5} color={'text.secondary'}>
                                          Loading..
                                        </Typography>
                                      }
                                    >
                                      <RecomendedView listCandidate={listCandidates} />
                                    </InfiniteScroll>
                                  )
                                }}
                              </CandidateContext.Consumer>
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
