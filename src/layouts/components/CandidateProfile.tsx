// ** React Imports
import React, { ReactNode, useEffect, useState } from 'react'
import { Theme, useTheme } from '@mui/material/styles'
// ** MUI Components
import {
  Box,
  BoxProps,
  Button,
  Grid,
  TextField,
  FormControl,
  Autocomplete,
  Divider,
  Select,
  SelectChangeEvent,
  OutlinedInput,
  Chip,
  MenuItem,
  Card,
  InputLabel,
  InputAdornment,
  Typography
} from '@mui/material'

import DatePicker from 'react-datepicker'
// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks

// ** Demo Imports
// import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import { IUser } from 'src/contract/models/user'
import { toast } from 'react-hot-toast'
import Countries from 'src/contract/models/country'
import City from 'src/contract/models/city'
import Address from 'src/contract/models/address'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { DateType } from 'src/contract/models/DatepickerTypes'
import { v4 } from 'uuid'
import DialogAddEducation from 'src/pages/candidate/DialogAddEducation'
import DialogAddWorkExperience from 'src/pages/candidate/DialogAddWorkExperience'
import DialogAddDocument from 'src/pages/candidate/DialogAddDocument'
// import RoleLevel from 'src/contract/models/role_level'
import RoleType from 'src/contract/models/role_type'
import VesselType from 'src/contract/models/vessel_type'
import RegionTravel from 'src/contract/models/regional_travel'
import Province from 'src/contract/models/province'

import { styled } from '@mui/material/styles'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import { Icon } from '@iconify/react'
import DialogEditEducation from 'src/pages/candidate/DialogEditEducation'
import DialogEditWorkExperience from 'src/pages/candidate/DialogEditWorkExperience'
import DialogEditDocument from 'src/pages/candidate/DialogEditDocument'
import { removeFirstZeroChar, refreshsession } from 'src/utils/helpers'
import secureLocalStorage from 'react-secure-storage'
import localStorageKeys from 'src/configs/localstorage_keys'
import JobCategory from 'src/contract/models/job_category'

import SeafarerTravelDocumentTable from 'src/pages/candidate/SeafarerTravelDocument/SeafarerTravelDocumentContainer'
import SeafarerExperienceTable from 'src/pages/candidate/SeafarerExperience/SeafarerExperienceContainer'
import SeafarerCompetencyTable from 'src/pages/candidate/SeafarerCompetency/SeafarerCompetencyContainer'
import SeafarerProficiencyTable from 'src/pages/candidate/SeafarerProficiency/SeafarerProficiencyContainer'
import SeafarerRecommendationForm from 'src/pages/candidate/SeafarerRecommendation/SeafarerRecommendationForm'
import DocumentUpload from './DocumentUploadSection'
import WorkExperienceSection from './WorkExperienceSection'
import EducationalInfoSection from './EducationalInfoSection'

type FormData = {
  fullName: string
  country: string
  district: string
  city: string
  postalCode: string
  email: string
  code: string
  website: string
  phone: string
  dateOfBirth: string
  address: string
  about: string
  usernamesosmed: string
  available: string
  facebook: string
  instagram: string
  linkedin: string
  genderr: string
  noExperience: boolean
}

type compProps = {
  visible: boolean
  datauser: IUser
  address: Address
}

let ship: any = []
let opp: any = []
let tampilkanship: any = ''
let availabledate: any = ''

const ProfilePicture = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: theme.shape.borderRadius,
  border: `5px solid ${theme.palette.common.white}`,
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  }
}))

const BoxWrapper = styled(Box)<BoxProps>(() => ({
  position: 'relative'
}))

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

const jeniskelamin = [
  { title: 'm', label: 'Male' },
  { title: 'f', label: 'Female' }
]

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName?.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
  }
}

let statusfb: any = ''
let statusig: any = ''
let statuslinkedin: any = ''
const CandidateProfile = (props: compProps) => {
  const schema = yup.object().shape({
    address: yup.string().required(),
    email: yup.string().email().required()
    // phone: yup.string().required(),
    // idcombokelamin: yup.string().required()
  })
  const theme = useTheme()
  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser
  if (props.datauser?.employee_type == 'onship') {
    ship = { employee_type: 'onship', label: 'PELAUT' }
  } else if (props.datauser?.employee_type == 'offship') {
    ship = { employee_type: 'offship', label: 'NON PELAUT' }
  }

  if (props.datauser.field_preference?.open_to_opp == 0) {
    opp = { id: '0', label: 'Not Available' }
  } else {
    opp = { id: '1', label: 'Open to Work' }
  }
  const [hookSignature, setHookSignature] = useState(v4())

  const [combocountry, getComboCountry] = useState<any>([])
  // const [comboroleLevel, getComborolLevel] = useState<any>([])
  const [comboProvince, getComboProvince] = useState<any>([])
  const [comboroleType, getComborolType] = useState<any>([])
  const [comboVessel, getComborVessel] = useState<any>([])
  const [comboRegion, getComboroRegion] = useState<any>([])
  const [comboShip, getShip] = useState<any>([])
  const [comboOPP, getOpp] = useState<any>([])
  const [combocity, getComboCity] = useState<any[]>([])
  const [combocode, getCombocode] = useState<any[]>([])
  const [combokelamin, getCombokelamin] = useState<any[]>([])
  const [idcombokelamin, setCombokelamin] = useState<any>(
    props.datauser?.gender == 'f' ? { title: 'f', label: 'Female' } : { title: 'm', label: 'Male' }
  )

  const [idcombocode, setCombocode] = useState<any>(props.datauser?.country_id)
  const [idcity, setCombocity] = useState<any>(props.datauser.address?.city_id)
  const [idship, setShip] = useState<any>(
    props.datauser?.employee_type == 'offship'
      ? { employee_type: 'offship', label: 'NON PELAUT' }
      : { employee_type: 'onship', label: 'PELAUT' }
  )
  const [idcountry, setCountry] = useState<any>(props.datauser?.country_id)
  const [date, setDate] = useState<DateType>(new Date())
  // const [idcomborolLevel, setComboRolLevel] = useState<any>(props.datauser?.field_preference?.role_level?.id)
  const [idcomborolType, setComboRolType] = useState<any>(props.datauser?.field_preference?.role_type?.id)
  const [idcomboVessel, setComboVessel] = useState<any>(props.datauser?.field_preference?.vessel_type?.id)
  const [idcomboRegion, setComboRegion] = useState<any>(props.datauser?.field_preference?.region_travel?.id)
  const [idcomboProvince, setComboProvince] = useState<any>(props.datauser?.location_province?.id)
  const [idOPP, setOpp] = useState<any>(
    props.datauser.field_preference?.open_to_opp == 0
      ? { id: '0', label: 'Not Available' }
      : { id: '1', label: 'Open to Work' }
  )
  const [openAddModal, setOpenAddModal] = useState(false)
  const [openAddModalWE, setOpenAddModalWE] = useState(false)
  const [openAddModalDoc, setOpenAddModalDoc] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openEditModalWE, setOpenEditModalWE] = useState(false)
  const [openEditModalDoc, setOpenEditModalDoc] = useState(false)
  const [itemData, getItemdata] = useState<any[]>([])
  const [itemDataWE, getItemdataWE] = useState<any[]>([])
  const [itemDataED, getItemdataED] = useState<any[]>([])
  const [selectedItem, setSelectedItem] = useState<any>()
  const [personName, setPersonName] = React.useState<string[]>(
    props.datauser?.field_preference?.spoken_langs ? props.datauser?.field_preference?.spoken_langs : []
  )
  const [facebook, setFacebook] = useState<any>('')
  const [instagram, setInstagram] = useState<any>('')
  const [linkedin, setLinkedin] = useState<any>('')
  // const [disabledFacebook, setDisabledFacebook] = useState<boolean>(true)
  // const [disabledInstagram, setDisabledInstagram] = useState<boolean>(true)
  // const [disabledLinkedn, setDisabledLinkedin] = useState<boolean>(true)
  // const [disabledOpen, setDisabledOpen] = useState<boolean>(true)
  // const [disabledOpen, setDisabledOpen] = useState<boolean>(true)
  const [arrayHead, getArrayHead] = useState<any[]>([])
  const [JobCategory, getJobCategory] = useState<any[]>([])
  const [JC, setJC] = useState(
    props.datauser?.field_preference?.category_id ? props.datauser?.field_preference?.category_id : 0
  )

  // const kintil = subscribev(['A09'])

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value }
    } = event
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }
  const [noExperience, setNoExperience] = useState<boolean>(props.datauser?.no_experience ? true : false)
  const [phoneNum, setPhoneNum] = useState(props.datauser?.phone)
  const [dateOfBirth, setDateOfBirth] = useState(props.datauser?.date_of_birth)
  const onChangeDateOfBirth = (input: string) => {
    setDateOfBirth(input)
  }
  const onChangePhoneNum = (input: string) => {
    setPhoneNum(removeFirstZeroChar(input))
  }
  const combobox = () => {
    // HttpClient.get(AppConfig.baseUrl + '/public/data/role-level?search=&page=1&take=100').then(response => {
    //   const code = response.data.roleLevels.data
    //   getComborolLevel(code)
    // })

    HttpClient.get(AppConfig.baseUrl + '/public/data/province?search=&country_id=100').then(response => {
      const code = response.data.provinces

      getComboProvince(code)
    })

    HttpClient.get(`/job-category?search=&page=1&take=250&employee_type=${user?.employee_type}`).then(response => {
      if (response.status != 200) {
        throw response.data.message ?? 'Something went wrong!'
      }
      getJobCategory(response.data.categories.data)
    })
    const x = user?.employee_type
    let z = ''
    if (JC != 0) {
      z = '&category_id=' + JC
    }
    HttpClient.get(AppConfig.baseUrl + '/public/data/role-type?page=1&take=100&search&employee_type=' + x + z).then(
      response => {
        const code = response.data.roleTypes.data
        getComborolType(code)
      }
    )

    HttpClient.get(AppConfig.baseUrl + '/public/data/vessel-type?page=1&take=100&search').then(response => {
      const code = response.data.vesselTypes.data
      getComborVessel(code)
    })

    HttpClient.get(AppConfig.baseUrl + '/public/data/region-travel?page=1&take=100&search').then(response => {
      const code = response.data.regionTravels.data
      getComboroRegion(code)
    })

    HttpClient.get(AppConfig.baseUrl + '/public/data/country?search=').then(response => {
      const code = response.data.countries
      getComboCountry(code)
    })
    const code = [
      { employee_type: 'onship', label: 'PELAUT' },
      { employee_type: 'offship', label: 'NON PELAUT' }
    ]
    getShip(code)

    const codeopp = [
      { id: '0', label: 'Not Available' },
      { id: '1', label: 'Open to Work' }
    ]
    getOpp(codeopp)

    HttpClient.get(AppConfig.baseUrl + '/public/data/country?search=').then(response => {
      const code = response.data.countries
      for (let x = 0; x < code.length; x++) {
        const element = code[x]
        element.label = element.name + '(' + element.phonecode + ')'
      }
      getCombocode(code)
    })

    HttpClient.get(AppConfig.baseUrl + '/user/' + props.datauser.id).then(response => {
      const code = response.data.user
      setPreview(code.photo)
      setPreviewBanner(code.banner)
    })

    HttpClient.get(AppConfig.baseUrl + '/user/document').then(response => {
      const itemData = response.data.documents

      const arr = []
      for (let x = 0; x < itemData.length; x++) {
        const element = itemData[x]
        if (element.childs.length > 0) {
          arr.push({ id: element.id, name: element.document_type })
        }
      }
      getArrayHead(arr)
      getItemdata(itemData)
    })
    HttpClient.get(AppConfig.baseUrl + '/user/experience?page=1&take=100').then(response => {
      const itemData = response.data.experiences

      getItemdataWE(itemData)
    })

    HttpClient.get(AppConfig.baseUrl + '/user/education?page=1&take=100').then(response => {
      const itemData = response.data.educations

      getItemdataED(itemData)
    })
    HttpClient.get(AppConfig.baseUrl + '/public/data/country?search=').then(response => {
      const code = response.data.countries
      for (let x = 0; x < code.length; x++) {
        const element = code[x]
        element.label = element.name + '(' + element.phonecode + ')'
      }
      getCombocode(code)
    })
    HttpClient.get(AppConfig.baseUrl + '/user/sosmed?page=1&take=100').then(response => {
      const code = response.data.sosmeds.data
      for (let x = 0; x < code.length; x++) {
        const element = code[x]
        if (element.sosmed_type == 'Facebook') {
          setFacebook(element.username)
          statusfb = element.id
        }
        if (element.sosmed_type == 'Instagram') {
          setInstagram(element.username)
          statusig = element.id
        }
        if (element.sosmed_type == 'LinkedIn') {
          setLinkedin(element.username)
          statuslinkedin = element.id
        }
      }
    })
    getCombokelamin(jeniskelamin)
  }
  useEffect(() => {
    combobox()
  }, [JC])

  const addbuttonfacebook = () => {
    let user = ''
    if (facebook.length < 20) {
      user = 'https://facebook.com/' + facebook
    } else {
      user = facebook
    }

    const json = {
      sosmed_type: 'Facebook',
      sosmed_address: user
    }
    if (statusfb == '') {
      HttpClient.post(AppConfig.baseUrl + '/user/sosmed', json).then(
        ({ data }) => {
          // toast.success(' Successfully submited!')
          statusfb = data.sosmed.id
        },
        error => {
          toast.error('Registrastion Failed : ' + error.response.data.message)
        }
      )
    } else {
      HttpClient.patch(AppConfig.baseUrl + '/user/sosmed/' + statusfb, json).then(
        () => {
          // toast.success(' Successfully submited!')
        },
        error => {
          toast.error('Registrastion Failed : ' + error.response.data.message)
        }
      )
    }
    // setDisabledFacebook(true)
  }

  const addbuttoninstagram = () => {
    let user = ''
    if (instagram.length < 20) {
      user = 'https://instagram.com/' + instagram
    } else {
      user = instagram
    }
    const json = {
      sosmed_address: user
    }
    if (statusig == '') {
      HttpClient.post(AppConfig.baseUrl + '/user/sosmed', json).then(
        ({ data }) => {
          console.log('registration success', data)
          // toast.success(' Successfully submited!')
          statusig = data.sosmed.id
        },
        error => {
          console.log('Registrastion Failed : ', error)
          toast.error('Registrastion Failed ' + error.response.data.message)
        }
      )
    } else {
      HttpClient.patch(AppConfig.baseUrl + '/user/sosmed/' + statusig, json).then(
        ({ data }) => {
          console.log('Registrastion Failed : ', data)
          // toast.success(' Successfully submited!')
        },
        error => {
          console.log('Registrastion Failed : ', error)
          toast.error('Registrastion Failed ' + error.response.data.message)
        }
      )
    }
    // setDisabledInstagram(true)
  }

  const addbuttonlinkedin = () => {
    let user = ''
    if (linkedin.length < 20) {
      user = 'https://linkedin.com/' + linkedin
    } else {
      user = linkedin
    }
    const json = {
      sosmed_type: 'linkedin',
      sosmed_address: user
    }
    if (statuslinkedin == '') {
      HttpClient.post(AppConfig.baseUrl + '/user/sosmed', json).then(
        ({ data }) => {
          // toast.success(' Successfully submited!')
          statuslinkedin = data.sosmed.id
        },
        error => {
          console.log('Registrastion Failed : ', error)
          toast.error('Registrastion Failed ' + error.response.data.message)
        }
      )
    } else {
      HttpClient.patch(AppConfig.baseUrl + '/user/sosmed/' + statuslinkedin, json).then(
        ({ data }) => {
          console.log('here 1', data)
          // toast.success(' Successfully submited!')
        },
        error => {
          console.log('Registrastion Failed : ', error)
          toast.error('Registrastion Failed ' + error.response.data.message)
        }
      )
    }
    // setDisabledLinkedin(true)
  }
  // const enabledtextfield = (x: any) => {
  // if (x == 'fb') setDisabledFacebook(false)
  // if (x == 'ig') setDisabledInstagram(false)
  // if (x == 'li') setDisabledLinkedin(false)
  // }
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
    combobox()
    if (props.datauser.address != undefined) {
      searchcity(props.datauser.country_id)
    }

    tampilkanship = ship.label
  }, [hookSignature])

  const { register, handleSubmit } = useForm<FormData>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })
  const editEducation = (item: any) => {
    setSelectedItem(item)
    setOpenEditModal(!openEditModal)
  }
  const editWorkExperience = (item: any) => {
    setSelectedItem(item)
    setOpenEditModalWE(!openEditModalWE)
  }
  const editDocument = (item: any) => {
    setSelectedItem(item)
    setOpenEditModalDoc(!openEditModalDoc)
  }
  const deletework = async (id: any) => {
    const resp = await HttpClient.del(`/user/document/` + id)
    if (resp.status != 200) {
      throw resp.data.message ?? 'Something went wrong!'
    }
    combobox()
    toast.success(`  deleted successfully!`)
  }
  const deleteeducation = async (id: any) => {
    const resp = await HttpClient.del(`/user/education/` + id)
    if (resp.status != 200) {
      throw resp.data.message ?? 'Something went wrong!'
    }
    combobox()
    toast.success(`  deleted successfully!`)
  }
  const deletewe = async (id: any) => {
    const resp = await HttpClient.del(`/user/experience/` + id)
    if (resp.status != 200) {
      throw resp.data.message ?? 'Something went wrong!'
    }
    combobox()
    toast.success(`  deleted successfully!`)
  }

  const onSubmit = (data: FormData) => {
    const { fullName, website, address, about } = data
    availabledate = date
    const json = {
      country_id: idcombocode,
      employee_type: idship,
      name: fullName,
      phone: phoneNum,
      date_of_birth: dateOfBirth,
      website: website,
      about: about,
      address_country_id: idcountry,
      address_city_id: idcity,
      address_address: address,
      gender: idcombokelamin.title,
      location_province_id: idcomboProvince,
      no_experience: noExperience
    }

    HttpClient.patch(AppConfig.baseUrl + '/user/update-profile', json).then(
      () => {
        if (tampilkanship == 'PELAUT') {
          const x = {
            // rolelevel_id: idcomborolLevel,
            roletype_id: idcomborolType,
            vesseltype_id: idcomboVessel,
            regiontravel_id: idcomboRegion,
            category_id: JC,
            available_date: availabledate,
            spoken_langs: personName,
            open_to_opp: idOPP
          }
          HttpClient.post(AppConfig.baseUrl + '/user/field-preference', x).then(
            ({ data }) => {
              console.log('field preference success ', data)
              toast.success(' Successfully submited!')
              refreshsession()
              window.location.replace('/home')
            },
            error => {
              console.log('field preference failed', error)
              toast.error('Field Preference Failed ' + error.response.data.message)
            }
          )
        } else {
          const x = {
            // rolelevel_id: idcomborolLevel,
            roletype_id: idcomborolType,
            vesseltype_id: null,
            regiontravel_id: idcomboRegion,
            available_date: null,
            spoken_langs: personName,
            open_to_opp: idOPP,
            category_id: JC
          }
          HttpClient.post(AppConfig.baseUrl + '/user/field-preference', x).then(
            () => {
              toast.success('Successfully submited!')
              refreshsession()
              window.location.replace('/home')
            },
            error => {
              toast.error(' Failed Field Preference : ' + error.response.data.message)
            }
          )
        }
      },
      error => {
        console.log('Failed Update Profile : ', error)
        toast.error(' Failed Update Profile : ' + error.response.data.message)
      }
    )
  }

  const [selectedFile, setSelectedFile] = useState()
  const [selectedFileBanner, setSelectedFileBanner] = useState()
  const [preview, setPreview] = useState()
  const [showShip, setShowShip] = useState(true)
  const [previewBanner, setPreviewBanner] = useState()
  useEffect(() => {
    const a = props.datauser?.employee_type == 'offship' ? 'offship' : 'onship'
    setShip(a)
    if (props.datauser?.employee_type == undefined || props.datauser?.employee_type == null) {
      setShowShip(false)
    }
    const b = props.datauser.field_preference?.open_to_opp == 0 ? '0' : '1'
    setOpp(b)

    // if (kintil == true) {
    //   setDisabledOpen(false)
    // }
  }, [])
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)

      return
    }

    const objectUrl: any = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])
  useEffect(() => {
    if (!selectedFileBanner) {
      setPreviewBanner(undefined)

      return
    }

    const objectUrl: any = URL.createObjectURL(selectedFileBanner)
    setPreviewBanner(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFileBanner])

  const onSelectFile = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)

      return
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0])
    const selectedFiles = e.target.files as FileList
    // setCurrentImage(selectedFiles?.[0])
    uploadPhoto(selectedFiles?.[0])
  }
  const uploadPhoto = (data: any) => {
    const json: any = new FormData()
    json.append('photo', data)
    HttpClient.post(AppConfig.baseUrl + '/user/update-photo', json).then(
      ({ data }) => {
        console.log('here 1', data)
        // toast.success(' Successfully submited!')
      },
      error => {
        console.log('here 1', error)
        toast.error(' Failed Upload Photo' + error.response.data.message)
      }
    )
  }

  const onSelectFileBanner = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFileBanner(undefined)

      return
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFileBanner(e.target.files[0])
    const selectedFiles = e.target.files as FileList
    // setCurrentImage(selectedFiles?.[0])
    uploadPhotoBanner(selectedFiles?.[0])
  }
  const uploadPhotoBanner = (data: any) => {
    const json: any = new FormData()
    json.append('banner', data)
    HttpClient.post(AppConfig.baseUrl + '/user/update-banner', json).then(
      ({ data }) => {
        console.log('here 1', data)
        // toast.success(' Successfully submited!')
      },
      error => {
        console.log('here 1', error)
        toast.error(' Failed Photo Banner' + error.response.data.message)
      }
    )
  }
  const displayship = (type: any) => {
    setShip(type?.employee_type)

    tampilkanship = type?.label
  }

  const displayopp = (type: any) => {
    setOpp(type?.id)
  }

  console.log(' idComboProvince => ', idcomboProvince)

  return (
    <Grid container md={12} xs={12} padding={5}>
      <Grid className='heading-title' xs={12} sx={{ mt: 0, ml: 2, mb: 2 }}>
        <Typography variant='body2' sx={{ color: '#32487A', fontSize: '18px', fontWeight: '600' }}>
          General Info
        </Typography>
        <Grid container item xs={12} justifyContent={'left'}>
          <Typography variant='body2' sx={{ color: '#262525', fontSize: '12px' }}>
            Fulfill your General Info
          </Typography>
        </Grid>
      </Grid>
      <input
        accept='image/*'
        style={{ display: 'none', height: 250, width: '100%' }}
        id='raised-button-file-banner'
        onChange={onSelectFileBanner}
        type='file'
      ></input>
      <Grid
        item
        container
        sx={{
          height: { xs: 150, md: 250 },
          width: '100%',
          justifyContent: { xs: 'center', md: 'flex-start' }
        }}
      >
        <Box position={'relative'} width={'100%'}>
          <Card>
            <CardMedia
              component='img'
              alt='profile-header'
              image={previewBanner ? previewBanner : '/images/avatars/headerprofile3.png'}
              sx={{
                height: { xs: 150, md: 250 },
                width: '100%',
                objectFit: 'cover'
              }}
            />
          </Card>

          <Box position={'absolute'} sx={{ right: { xs: '45%', md: '50%' }, bottom: { xs: '50%', md: '50%' } }}>
            <label htmlFor='raised-button-file-banner'>
              <Icon fontSize='large' icon={'bi:camera'} color={'white'} style={{ fontSize: '36px' }} />
            </label>
          </Box>
        </Box>
      </Grid>

      <CardContent
        className='profile-image'
        sx={{
          pt: 0,
          mt: -8,
          display: 'flex',
          alignItems: 'flex-end',
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          justifyContent: { xs: 'center', md: 'flex-start' },
          marginLeft: { md: '10px' }
          // marginTop:'125px'
        }}
      >
        <BoxWrapper>
          <ProfilePicture
            src={preview ? preview : '/images/avatars/profilepic.png'}
            alt='profile-picture'
            sx={{ width: 100, height: 100, objectFit: 'cover' }}
          ></ProfilePicture>

          <input
            accept='image/*'
            style={{ display: 'none', height: 250, width: '100%' }}
            id='raised-button-file'
            onChange={onSelectFile}
            type='file'
          ></input>
          <Box position={'absolute'} right={'40%'} bottom={'40%'}>
            <label htmlFor='raised-button-file'>
              <Icon fontSize='large' icon={'bi:camera'} color={'white'} style={{ fontSize: '26px' }} />
            </label>
          </Box>
        </BoxWrapper>
      </CardContent>

      <form id='profile-form' noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <Grid className='profile-form' item container xs={12} spacing={3} sx={{ mb: 2 }} marginTop={'25px'}>
          <Grid item md={6} xs={12}>
            <TextField
              id='fullName'
              required
              defaultValue={props.datauser.name}
              label='Full Name'
              variant='standard'
              fullWidth
              sx={{ mb: 1 }}
              {...register('fullName')}
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <Autocomplete
              disablePortal
              id='combo-box-demo'
              options={!combokelamin ? [{ label: 'Loading...', title: 0 }] : combokelamin}
              defaultValue={idcombokelamin}
              getOptionLabel={(option: any) => option.label}
              renderInput={params => (
                <TextField {...params} label='Gender *' id='gender' variant='standard' {...register('genderr')} />
              )}
              onChange={(event: any, newValue: any) =>
                newValue?.title ? setCombokelamin(newValue) : setCombokelamin('')
              }
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <Autocomplete
              disablePortal
              id='combo-box-demo'
              // options={comboShip}
              options={!comboShip ? [{ label: 'Loading...', id: 0 }] : comboShip}
              defaultValue={ship}
              getOptionLabel={(option: any) => option.label}
              renderInput={params => <TextField {...params} label='Ship *' variant='standard' />}
              onChange={(event: any, newValue: any | null) => displayship(newValue)}
              disabled={showShip}
              // onChange={(event: any, newValue: Employee ) =>
              //   newValue?.id ? setShip(newValue.employee_type) : setShip(props.datauser.employee_type)
              // }
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <Autocomplete
              disablePortal
              id='combo-box-demo'
              options={combocountry}
              getOptionLabel={(option: any) => option.nicename}
              defaultValue={props.address?.country}
              renderInput={params => <TextField {...params} label='Country *' variant='standard' />}
              onChange={(event: any, newValue: Countries | null) =>
                newValue?.id ? searchcity(newValue.id) : searchcity(props.datauser.country_id)
              }
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <Autocomplete
              disablePortal
              id='city'
              value={props.datauser.address?.city}
              options={combocity}
              getOptionLabel={(option: City) => option.city_name}
              renderInput={params => <TextField {...params} label='City *' sx={{ mb: 2 }} variant='standard' />}
              onChange={(event: any, newValue: City | null) =>
                newValue?.id ? setCombocity(newValue.id) : setCombocity(props.address?.city_id)
              }
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              id='address'
              label='Address'
              required
              defaultValue={props.datauser.address?.address}
              variant='standard'
              fullWidth
              sx={{ mb: 1 }}
              {...register('address')}
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <TextField
              id='Email'
              label='Email'
              required
              defaultValue={props.datauser.email}
              variant='standard'
              fullWidth
              sx={{ mb: 1 }}
              {...register('email')}
            />
          </Grid>
          {props.datauser.role == 'Company' && (
            <>
              <Grid item md={6} xs={12}>
                <TextField
                  id='website'
                  label='Website'
                  required
                  defaultValue={props.datauser.website}
                  variant='standard'
                  fullWidth
                  sx={{ mb: 1 }}
                  {...register('website')}
                />
              </Grid>
            </>
          )}
          <Grid item md={3} xs={12}>
            <TextField
              id='phone'
              label='Phone'
              required
              defaultValue={props.datauser.phone}
              variant='standard'
              fullWidth
              sx={{ mb: 1 }}
              type='number'
              value={phoneNum}
              onChange={e => onChangePhoneNum(e.target.value)}
              InputProps={{
                // startAdornment: <InputAdornment position='start'>Prefix</InputAdornment>,
                startAdornment: (
                  <Autocomplete
                    disablePortal
                    id='code'
                    options={combocode}
                    getOptionLabel={(option: Countries) => option.iso}
                    defaultValue={props.datauser?.country}
                    renderInput={params => <TextField {...params} variant='standard' {...register('phone')} />}
                    onChange={(event: any, newValue: Countries | null) =>
                      newValue?.id ? setCombocode(newValue.id) : setCombocode(props.address.country_id)
                    }
                  />
                  // <Autocomplete
                  //   style={{ width: '160px' }}
                  //   disablePortal
                  //   id='code'
                  //   options={!combocode ? [{ label: 'Loading...', id: 0 }] : combocode}
                  //   renderInput={params => <TextField {...params} variant='standard' />}
                  //   {...register('code')}
                  //   onChange={(event: any, newValue: string | null) => setCombocode(newValue)}
                  // />
                )
              }}
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <TextField
              id='date_of_birth'
              label='Date of Birth'
              defaultValue={'0000-01-01'}
              variant='standard'
              required={true}
              fullWidth={true}
              sx={{ mb: 1 }}
              type='date'
              value={dateOfBirth}
              onChange={e => onChangeDateOfBirth(e.target.value)}
            ></TextField>
          </Grid>
          <Grid item md={12} xs={12}>
            <TextField
              fullWidth
              sx={{ mb: 1 }}
              id='outlined-multiline-static'
              label='About me'
              variant='standard'
              required
              multiline
              rows={4}
              defaultValue={props.datauser.about}
              {...register('about')}
            />
          </Grid>
          {/* ----- Social Media Info ---- */}
          <>
            <Grid item md={5} xs={12}>
              <Grid container item xs={12} justifyContent={'left'}>
                <Typography variant='body2' sx={{ color: '#32487A', fontSize: '18px', fontWeight: '600' }}>
                  Social Media Info
                </Typography>
              </Grid>
              <Grid container item xs={12} justifyContent={'left'}>
                <Typography variant='body2' sx={{ color: '#262525', fontSize: '12px' }}>
                  Fulfill your Social Media Info
                </Typography>
              </Grid>
            </Grid>

            <Grid container item md={12} xs={12} marginTop={'20px'}>
              <Grid container item xs={12} md={4} marginBottom={2}>
                <Grid container item xs={12} md={12}>
                  <Grid xs={12} item>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ mr: 6, minWidth: 5, display: 'flex', justifyContent: 'center' }}>
                        <Icon icon='mdi:facebook' fontSize={24} color={'#262525'} />
                      </Box>
                      <TextField
                        id='facebook'
                        defaultValue={facebook}
                        label='Facebook'
                        variant='standard'
                        fullWidth
                        sx={{ mb: 1 }}
                        value={facebook}
                        {...register('facebook')}
                        // disabled={disabledFacebook}
                        onChange={e => setFacebook(e.target.value)}
                        onBlur={handleSubmit(addbuttonfacebook)}
                        InputProps={{
                          startAdornment: <InputAdornment position='start'>/</InputAdornment>
                        }}
                      />
                      {/* <Button
                    onClick={() => enabledtextfield('fb')}
                    sx={{ mr: 4, minWidth: 5, display: 'flex', justifyContent: 'center' }}
                  >
                    <Icon
                      fontSize='large'
                      icon={'solar:pen-new-round-bold-duotone'}
                      color={'primary'}
                      style={{ fontSize: '24px' }}
                    />
                  </Button> */}
                    </Box>
                  </Grid>
                </Grid>
              </Grid>

              <Grid container item xs={12} marginBottom={2} md={4}>
                <Grid container item xs={12} md={12}>
                  <Grid xs={12} item>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ mr: 6, minWidth: 5, display: 'flex', justifyContent: 'center' }}>
                        <Icon icon='mdi:instagram' fontSize={24} color={'#262525'} />
                      </Box>
                      <TextField
                        id='instagram'
                        label='Instagram'
                        variant='standard'
                        fullWidth
                        value={instagram}
                        sx={{ mb: 1 }}
                        {...register('instagram')}
                        // disabled={disabledInstagram}
                        onChange={e => setInstagram(e.target.value)}
                        onBlur={handleSubmit(addbuttoninstagram)}
                        InputProps={{
                          startAdornment: <InputAdornment position='start'>/</InputAdornment>
                        }}
                      />
                      {/* <Button
                    onClick={() => enabledtextfield('ig')}
                    sx={{ mr: 4, minWidth: 5, display: 'flex', justifyContent: 'center' }}
                  >
                    <Icon
                      fontSize='large'
                      icon={'solar:pen-new-round-bold-duotone'}
                      color={'primary'}
                      style={{ fontSize: '24px' }}
                    />
                  </Button> */}
                    </Box>
                  </Grid>
                </Grid>
              </Grid>

              <Grid container item xs={12} marginBottom={2} md={4}>
                <Grid container item xs={12} md={12}>
                  <Grid xs={12} item>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ mr: 6, minWidth: 5, display: 'flex', justifyContent: 'center' }}>
                        <Icon icon='mdi:linkedin' fontSize={24} color={'#262525'} />
                      </Box>
                      <TextField
                        id='linkedin'
                        defaultValue={linkedin}
                        label='Linkedin'
                        variant='standard'
                        fullWidth
                        sx={{ mb: 1 }}
                        {...register('linkedin')}
                        // disabled={disabledLinkedn}
                        value={linkedin}
                        onChange={e => setLinkedin(e.target.value)}
                        onBlur={handleSubmit(addbuttonlinkedin)}
                        InputProps={{
                          startAdornment: <InputAdornment position='start'>/</InputAdornment>
                        }}
                      />
                      {/* <Button
                    onClick={() => enabledtextfield('li')}
                    sx={{ mr: 4, minWidth: 5, display: 'flex', justifyContent: 'center' }}
                  >
                    <Icon
                      fontSize='large'
                      icon={'solar:pen-new-round-bold-duotone'}
                      color={'primary'}
                      style={{ fontSize: '24px' }}
                    />
                  </Button> */}
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item direction='row' justifyContent='flex-end' alignItems='center' md={0.2} lg={0.2} xs={12}></Grid>
            <Divider style={{ width: '100%', marginTop: '20px', marginBottom: '20px' }} />
          </>
          {/* ----- END Social Media Info ---- */}
          {tampilkanship == 'PELAUT' && (
            <>
              <Grid item container xs={12} spacing={4} sx={{ mb: 2 }}>
                <Grid xs={12} sx={{ mt: 5, ml: 2, mb: 2 }}>
                  <Typography variant='body2' sx={{ color: '#32487A', fontSize: '18px', fontWeight: '600' }}>
                    Preferences
                  </Typography>
                  <Grid container item xs={12} justifyContent={'left'}>
                    <Typography variant='body2' sx={{ color: '#262525', fontSize: '12px' }}>
                      Fulfill your Preferences Info
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item md={4} xs={12}>
                  <Autocomplete
                    id='combo-box-demo'
                    options={!comboOPP ? [{ label: 'Loading...', id: 0 }] : comboOPP}
                    defaultValue={opp}
                    getOptionLabel={(option: any) => option.label}
                    renderInput={params => <TextField {...params} label='Status *' variant='standard' />}
                    onChange={(event: any, newValue: any | null) => displayopp(newValue)}
                  />
                </Grid>
                {/* <Grid item md={6} xs={12}>
                <Autocomplete
                  disablePortal
                  id='combo-box-demo'
                  options={comboroleLevel}
                  getOptionLabel={(option: any) => option.levelName}
                  defaultValue={props.datauser?.field_preference?.role_level}
                  renderInput={params => <TextField {...params} label='Role Level' />}
                  onChange={(event: any, newValue: RoleLevel | null) =>
                    newValue?.id
                      ? setComboRolLevel(newValue.id)
                      : setComboRolLevel(props.datauser?.field_preference?.role_level?.id)
                  }
                />
              </Grid> */}
                <Grid item md={4} xs={12}>
                  <Autocomplete
                    sx={{ marginBottom: 2 }}
                    disablePortal
                    id='combo-box-level'
                    options={JobCategory}
                    defaultValue={props.datauser?.field_preference?.job_category}
                    getOptionLabel={(option: JobCategory) => option.name}
                    renderInput={params => <TextField {...params} label='Job Category *' variant='standard' />}
                    onChange={(event: any, newValue: JobCategory | null) =>
                      newValue?.id ? setJC(newValue?.id) : setJC(0)
                    }
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <Autocomplete
                    disablePortal
                    id='combo-box-demo'
                    options={comboroleType}
                    getOptionLabel={(option: any) => option.name}
                    defaultValue={props.datauser?.field_preference?.role_type}
                    renderInput={params => <TextField {...params} label='Job Title *' variant='standard' />}
                    onChange={(event: any, newValue: RoleType | null) =>
                      newValue?.id
                        ? setComboRolType(newValue.id)
                        : setComboRolType(props.datauser?.field_preference?.role_type?.id)
                    }
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <Autocomplete
                    disablePortal
                    id='combo-box-demo'
                    options={comboVessel}
                    getOptionLabel={(option: any) => option.name}
                    defaultValue={props.datauser?.field_preference?.vessel_type}
                    renderInput={params => <TextField {...params} label='Type of Vessel *' variant='standard' />}
                    onChange={(event: any, newValue: VesselType | null) =>
                      newValue?.id
                        ? setComboVessel(newValue.id)
                        : setComboVessel(props.datauser?.field_preference?.vessel_type?.id)
                    }
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <Autocomplete
                    disablePortal
                    id='combo-box-demo'
                    options={comboRegion}
                    getOptionLabel={(option: any) => option.name}
                    defaultValue={props.datauser?.field_preference?.region_travel}
                    renderInput={params => <TextField {...params} label='Region of Travel *' variant='standard' />}
                    onChange={(event: any, newValue: RegionTravel | null) =>
                      newValue?.id
                        ? setComboRegion(newValue.id)
                        : setComboRegion(props.datauser?.field_preference?.region_travel?.id)
                    }
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <DatePickerWrapper>
                    <DatePicker
                      minDate={new Date()}
                      dateFormat='dd/MM/yyyy'
                      selected={date}
                      id='basic-input'
                      onChange={(date: Date) => setDate(date)}
                      placeholderText='Click to select a date'
                      customInput={
                        <TextField label='Available Date *' variant='standard' fullWidth {...register('available')} />
                      }
                    />
                  </DatePickerWrapper>
                </Grid>
                <Grid item md={6} xs={12} display={'flex'} alignItems={'center'}>
                  <FormControl>
                    <InputLabel id='demo-multiple-chip-label'>LANGUANGE</InputLabel>
                    <Select
                      labelId='demo-multiple-chip-label'
                      id='demo-multiple-chip'
                      multiple
                      value={personName}
                      onChange={handleChange}
                      label='LANGUANGE'
                      sx={{ fontSize: '18px', height: 50.2 }}
                      input={
                        <OutlinedInput
                          id='select-multiple-chip'
                          label='Chip'
                          defaultValue={props.datauser?.field_preference?.spoken_langs}
                          sx={{ fontSize: '8px' }}
                        />
                      }
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
                </Grid>
              </Grid>
            </>
          )}
          {tampilkanship != 'PELAUT' && (
            <>
              <Grid item container xs={12} spacing={4} sx={{ mb: 2 }}>
                <Grid xs={12} sx={{ mt: 5, ml: 2, mb: 2 }}>
                  <Typography variant='body2' sx={{ color: '#32487A', fontSize: '18px', fontWeight: '600' }}>
                    Preferences
                  </Typography>
                  <Grid container item xs={12} justifyContent={'left'}>
                    <Typography variant='body2' sx={{ color: '#262525', fontSize: '12px' }}>
                      Fulfill your Preferences Info
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item md={6} xs={12}>
                  <Autocomplete
                    disablePortal
                    id='combo-box-demo'
                    options={!comboOPP ? [{ label: 'Loading...', id: 0 }] : comboOPP}
                    defaultValue={opp}
                    getOptionLabel={(option: any) => option.label}
                    renderInput={params => <TextField {...params} label='Status *' variant='standard' />}
                    onChange={(event: any, newValue: any | null) => displayopp(newValue)}
                  />
                </Grid>
                {/* <Grid item md={6} xs={12}>
              <Autocomplete
                disablePortal
                id='combo-box-demo'
                options={comboroleLevel}
                getOptionLabel={(option: any) => option.levelName}
                defaultValue={props.datauser?.field_preference?.role_level}
                renderInput={params => <TextField {...params} label='Role Level' />}
                onChange={(event: any, newValue: RoleLevel | null) =>
                  newValue?.id
                    ? setComboRolLevel(newValue.id)
                    : setComboRolLevel(props.datauser?.field_preference?.role_level?.id)
                }
              />
            </Grid> */}
                <Grid item md={6} xs={12}>
                  <Autocomplete
                    sx={{ marginBottom: 2 }}
                    disablePortal
                    id='combo-box-level'
                    options={JobCategory}
                    defaultValue={props.datauser?.field_preference?.job_category}
                    getOptionLabel={(option: JobCategory) => option.name}
                    renderInput={params => <TextField {...params} label='Job Category *' variant='standard' />}
                    onChange={(event: any, newValue: JobCategory | null) =>
                      newValue?.id ? setJC(newValue?.id) : setJC(0)
                    }
                  />
                </Grid>
                {/* <Grid item md={6} xs={12}>
              <Autocomplete
                disablePortal
                id='combo-box-demo'
                options={comboroleType}
                getOptionLabel={(option: any) => option.name}
                defaultValue={props.datauser?.field_preference?.role_type}
                renderInput={params => <TextField {...params} label='Job Title' />}
                onChange={(event: any, newValue: RoleType | null) =>
                  newValue?.id
                    ? setComboRolType(newValue.id)
                    : setComboRolType(props.datauser?.field_preference?.role_type?.id)
                }
              />
            </Grid> */}
                {tampilkanship == 'PELAUT' ? (
                  <Grid item md={6} xs={12}>
                    <Autocomplete
                      disablePortal
                      id='combo-box-demo'
                      options={comboRegion}
                      getOptionLabel={(option: any) => option.name}
                      defaultValue={props.datauser?.field_preference?.region_travel}
                      renderInput={params => <TextField {...params} label='Location *' variant='standard' />}
                      onChange={(event: any, newValue: RegionTravel | null) =>
                        newValue?.id
                          ? setComboRegion(newValue.id)
                          : setComboRegion(props.datauser?.field_preference?.region_travel?.id)
                      }
                    />
                  </Grid>
                ) : (
                  <Grid item md={6} xs={12}>
                    <Autocomplete
                      disablePortal
                      id='combo-box-demo'
                      options={comboProvince}
                      getOptionLabel={(option: any) => option.province_name}
                      defaultValue={props.datauser?.location_province}
                      renderInput={params => <TextField {...params} label='Location *' variant='standard' />}
                      onChange={(event: any, newValue: Province | null) =>
                        newValue?.id
                          ? setComboProvince(newValue.id)
                          : setComboProvince(props.datauser?.location_province?.id)
                      }
                    />
                  </Grid>
                )}

                {/* <Grid item md={6} xs={12}>
              <DatePickerWrapper>
                <DatePicker
                  dateFormat='dd/MM/yyyy'
                  selected={date}
                  id='basic-input'
                  onChange={(date: Date) => setDate(date)}
                  placeholderText='Click to select a date'
                  customInput={
                    <TextField label='Available Date' variant='outlined' fullWidth {...register('available')} />
                  }
                />
              </DatePickerWrapper>
            </Grid> */}
                <Grid item md={6} xs={12} display={'flex'} alignItems={'center'}>
                  <FormControl>
                    <InputLabel id='demo-multiple-chip-label'>LANGUAGE</InputLabel>
                    <Select
                      labelId='demo-multiple-chip-label'
                      id='demo-multiple-chip'
                      multiple
                      value={personName}
                      onChange={handleChange}
                      label='LANGUAGE'
                      sx={{ fontSize: '18px', height: 50.2 }}
                      input={
                        <OutlinedInput
                          id='select-multiple-chip'
                          label='Chip'
                          defaultValue={props.datauser?.field_preference?.spoken_langs}
                          sx={{ fontSize: '8px' }}
                        />
                      }
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
                </Grid>
              </Grid>
            </>
          )}
          <Divider style={{ width: '100%', marginTop: '20px', marginBottom: '20px' }} />
          <Box sx={{ marginTop: '20px' }}></Box>
          <EducationalInfoSection
            setOpenAddModal={setOpenAddModal}
            editEducation={editEducation}
            deleteeducation={deleteeducation}
            openAddModal={openAddModal}
            itemDataED={itemDataED}
          />

          {tampilkanship != 'PELAUT' && (
            <WorkExperienceSection
              setOpenAddModalWE={setOpenAddModalWE}
              deletewe={deletewe}
              editWorkExperience={editWorkExperience}
              openAddModalWE={openAddModalWE}
              itemDataWE={itemDataWE}
            />
          )}

          {tampilkanship != 'PELAUT' && (
            <DocumentUpload
              setOpenAddModalDoc={setOpenAddModalDoc}
              editDocument={editDocument}
              deletework={deletework}
              itemData={itemData}
              openAddModalDoc={openAddModalDoc}
            />
          )}
        </Grid>
      </form>

      {tampilkanship == 'PELAUT' && (
        <Grid className='seaman-table' xs={12} item container>
          <SeafarerTravelDocumentTable user_id={props?.datauser.id} />
          <SeafarerExperienceTable
            user_id={props?.datauser.id}
            no_experience={noExperience}
            setNoExperience={setNoExperience}
          />
          <SeafarerCompetencyTable user_id={props?.datauser.id} />
          <SeafarerProficiencyTable user_id={props?.datauser.id} />
          {!noExperience ? <SeafarerRecommendationForm user_id={props?.datauser.id} /> : ''}
        </Grid>
      )}

      <Grid item container lg={12} md={12} xs={12}>
        <Grid item container direction='row' justifyContent='flex-end' alignItems='right' md={12} lg={12} xs={12}>
          <Button
            form='profile-form'
            variant='contained'
            color='success'
            size='small'
            type='submit'
            sx={{ mt: 7, mb: 7 }}
          >
            <Icon
              fontSize='large'
              icon={'solar:diskette-bold-duotone'}
              color={'success'}
              style={{ fontSize: '18px' }}
            />
            <div style={{ marginLeft: 5 }}>SAVE AND PUBLISH CV</div>
          </Button>
        </Grid>
      </Grid>

      <Grid className='modals'>
        {/* <form> */}
        <DialogEditEducation
          key={selectedItem?.id}
          selectedItem={selectedItem}
          visible={openEditModal}
          onCloseClick={() => setOpenEditModal(!openEditModal)}
          onStateChange={() => setHookSignature(v4())}
        />
        {/* </form> */}
        <DialogEditWorkExperience
          key={selectedItem?.id}
          selectedItem={selectedItem}
          visible={openEditModalWE}
          onCloseClick={() => setOpenEditModalWE(!openEditModalWE)}
          onStateChange={() => setHookSignature(v4())}
        />
        <DialogEditDocument
          key={selectedItem?.id}
          selectedItem={selectedItem}
          visible={openEditModalDoc}
          onCloseClick={() => setOpenEditModalDoc(!openEditModalDoc)}
          onStateChange={() => setHookSignature(v4())}
        />
        <form>
          <DialogAddEducation
            visible={openAddModal}
            onStateChange={() => setHookSignature(v4())}
            onCloseClick={() => setOpenAddModal(!openAddModal)}
          />
        </form>
        <form>
          <DialogAddWorkExperience
            visible={openAddModalWE}
            onStateChange={() => setHookSignature(v4())}
            onCloseClick={() => setOpenAddModalWE(!openAddModalWE)}
          />
        </form>
        <form>
          <DialogAddDocument
            visible={openAddModalDoc}
            onStateChange={() => setHookSignature(v4())}
            onCloseClick={() => setOpenAddModalDoc(!openAddModalDoc)}
            arrayhead={arrayHead}
          />
        </form>
      </Grid>
    </Grid>
  )
}

CandidateProfile.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

CandidateProfile.guestGuard = true

export default CandidateProfile
