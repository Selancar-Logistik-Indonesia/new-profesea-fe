// ** React Imports
import React, { ReactNode, useEffect, useState } from 'react'
import { Theme, useTheme } from '@mui/material/styles'
// ** MUI Components
import Box, { BoxProps } from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Button, TextField, FormControl, Autocomplete, Divider, Select, SelectChangeEvent, OutlinedInput, Chip, MenuItem, Card } from '@mui/material'

import DatePicker from 'react-datepicker'
// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks

// ** Demo Imports
// import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import { Grid } from '@mui/material'

import { useForm } from 'react-hook-form'

// import { yupResolver } from '@hookform/resolvers/yup'
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
import RoleLevel from 'src/contract/models/role_level'
import RoleType from 'src/contract/models/role_type'
import VesselType from 'src/contract/models/vessel_type'
import RegionTravel from 'src/contract/models/regional_travel'

import { styled } from '@mui/material/styles'
import CardMedia from '@mui/material/CardMedia' 
import CardContent from '@mui/material/CardContent'
import { Icon } from '@iconify/react'
import DialogEditEducation from 'src/pages/candidate/DialogEditEducation'
import DialogEditWorkExperience from 'src/pages/candidate/DialogEditWorkExperience'
import DialogEditDocument from 'src/pages/candidate/DialogEditDocument'
 
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
  address: string
  about: string
  usernamesosmed: string
  available: string
  // facebook: string
  // instagram: string
  // linkedin: string
}

type compProps = {
  visible: boolean
  datauser: IUser
  address: Address
} 
 let ship: any = []
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
  position: 'relative',
 
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

const names = [
  'Indonesian',
  'English',
  'Mandarin',
  'Arab',
  'Melayu',
 
]

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
  }
}

const CandidateProfile = (props: compProps) => {
   const theme = useTheme()
 
   if (props.datauser?.employee_type == 'onship') {
     ship = { employee_type: 'onship', label: 'On-Ship' }
     //  tampilkanship = ship.label
   } else if (props.datauser?.employee_type == 'onship') {
     ship = { employee_type: 'offship', label: 'Off-Ship' }
     // tampilkanship = ship.label
   } 
    const [hookSignature, setHookSignature] = useState(v4())
  const [combocountry, getComboCountry] = useState<any>([])
  const [comboroleLevel, getComborolLevel] = useState<any>([])
  const [comboroleType, getComborolType] = useState<any>([])
  const [comboVessel, getComborVessel] = useState<any>([])
  const [comboRegion, getComboroRegion] = useState<any>([])
  const [comboShip, getShip] = useState<any>([])
  const [combocity, getComboCity] = useState<any[]>([])
  const [combocode, getCombocode] = useState<any[]>([])
  const [idcombocode, setCombocode] = useState<any>(props.datauser?.country_id)
  const [idcity, setCombocity] = useState<any>(props.datauser.address?.city_id)
  const [idship, setShip] = useState<any>(props.datauser?.employee_type)
  const [idcountry, setCountry] = useState<any>(props.datauser?.country_id)
  const [date, setDate] = useState<DateType>(new Date())

  const [idcomborolLevel, setComboRolLevel] = useState<any>(props.datauser?.field_preference?.role_level?.id)
  const [idcomborolType, setComboRolType] = useState<any>(props.datauser?.field_preference?.role_type?.id)
  const [idcomboVessel, setComboVessel] = useState<any>(props.datauser?.field_preference?.vessel_type?.id)
  const [idcomboRegion, setComboRegion] = useState<any>(props.datauser?.field_preference?.region_travel?.id) 
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
  const [personName, setPersonName] = React.useState<string[]>(props.datauser?.field_preference?.spoken_langs) 
  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value }
    } = event
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }

  const combobox = () => { 
    HttpClient.get(AppConfig.baseUrl + '/public/data/role-level?search=&page=1&take=100').then(response => {
      const code = response.data.roleLevels.data
      getComborolLevel(code)
    })
     HttpClient.get(AppConfig.baseUrl + '/public/data/role-type?page=1&take=25&search').then(response => {
       const code = response.data.roleTypes.data
       getComborolType(code)
     })
     
     HttpClient.get(AppConfig.baseUrl + '/public/data/vessel-type?page=1&take=25&search').then(response => {
       const code = response.data.vesselTypes.data
       getComborVessel(code)
     })
     
     HttpClient.get(AppConfig.baseUrl + '/public/data/region-travel?page=1&take=25&search').then(response => {
       const code = response.data.regionTravels.data
       getComboroRegion(code)
     })

    HttpClient.get(AppConfig.baseUrl + '/public/data/country?search=').then(response => {
      const code = response.data.countries
      getComboCountry(code)
    })
      const code = [
        { employee_type: 'onship', label: 'On-Ship' },
        { employee_type: 'offship', label: 'Off-Ship' }
      ]
    getShip(code)
     
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
       const itemData =   response.data.documents
 
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


    
    HttpClient.get(AppConfig.baseUrl + "/public/data/country?search=")
      .then((response) => {
        const code = response.data.countries;
        for (let x = 0; x < code.length; x++) {
          const element = code[x];
          element.label = element.name + '(' + element.phonecode + ')'
        }
        getCombocode(code);
      })
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
    combobox()
    if (props.datauser.address != undefined) {
      searchcity(props.datauser.country_id)
    }

    tampilkanship = ship.label
  }, [hookSignature])
  
  const { register, handleSubmit } = useForm<FormData>({
    mode: 'onBlur'
  })
  const editEducation = (item: any) => {
    setSelectedItem(item)
    setOpenEditModal(!openEditModal)
  }
  const editWorkExperience = (item: any) => {
    setSelectedItem(item)
    setOpenEditModalWE(!openEditModalWE)
  }
  const editDocument= (item: any) => {
    setSelectedItem(item)
    setOpenEditModalDoc(!openEditModalDoc)
  }
  const deletework  = async (id:any) => {
    
     const resp = await HttpClient.del(`/user/document/` + id)
     if (resp.status != 200) {
       throw resp.data.message ?? 'Something went wrong!'
     }
     combobox();
      toast.success(
       `  deleted successfully!`
     )
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
    const { fullName, website, phone, address, about } = data

    availabledate = date
    const json = {
      country_id: idcountry,
      employe_type: idship,
      name: fullName,
      phone: phone,
      website: website,
      about: about,
      address_country_id: idcombocode,
      address_city_id: idcity,
      address_address: address
    }
    HttpClient.patch(AppConfig.baseUrl + '/user/update-profile', json).then(
      ({ data }) => {
        if (tampilkanship == 'On-Ship') {
          const json = {
            rolelevel_id: idcomborolLevel,
            roletype_id: idcomborolType,
            vesseltype_id: idcomboVessel,
            regiontravel_id: idcomboRegion,
            available_date: availabledate,
            spoken_langs: personName
          }
          HttpClient.post(AppConfig.baseUrl + '/user/field-preference', json).then(({ data }) => {
            console.log('here 1', data)
            toast.success(' Successfully submited!')
          })
        } else {
          console.log('here 1', data)
          toast.success(' Successfully submited!')
        } 
      },
      error => {
        console.log('here 1', error)
        toast.error('Registrastion Failed ' + error.response.data.message)
      }
    )
  }
 
  const [selectedFile, setSelectedFile] = useState()
  const [selectedFileBanner, setSelectedFileBanner] = useState()
  const [preview, setPreview] = useState()
  const [previewBanner, setPreviewBanner] = useState() 
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
        toast.success(' Successfully submited!')
      },
      error => {
        console.log('here 1', error)
        toast.error(' Failed ' + error.response.data.message)
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
        toast.success(' Successfully submited!')
      },
      error => {
        console.log('here 1', error)
        toast.error(' Failed ' + error.response.data.message)
      }
    )
  }
  const displayship = (type:any)=>{
    setShip(type?.employee_type)
    tampilkanship = type?.label
  }
 
  return (
    <Grid container>
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
        {' '}
        <BoxWrapper>
          <Card>
            <CardMedia
              component='img'
              alt='profile-header'
              image={previewBanner ? previewBanner : '/images/avatars/headerprofile.png'}
              sx={{
                height: { xs: 150, md: 250 },
                width: '100%'
              }}
            />
          </Card>

          <Box position={'absolute'} sx={{ right: { xs: '45%', md: '50%' }, bottom: { xs: '50%', md: '50%' } }}>
            <label htmlFor='raised-button-file-banner'>
              <Icon fontSize='large' icon={'bi:camera'} color={'white'} style={{ fontSize: '36px' }} />
            </label>
          </Box>
        </BoxWrapper>
      </Grid>

      <CardContent
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
          <label htmlFor='raised-button-file'>
            <ProfilePicture src={preview ? preview : '/images/avatars/1.png'} alt='profile-picture'></ProfilePicture>
          </label>
          <input
            accept='image/*'
            style={{ display: 'none', height: 250, width: '100%' }}
            id='raised-button-file'
            onChange={onSelectFile}
            type='file'
          ></input>
          <Box position={'absolute'} right={'10%'} bottom={'10%'}>
            <Icon fontSize='large' icon={'bi:camera'} color={'white'} style={{ fontSize: '26px' }} />
          </Box>
        </BoxWrapper>
      </CardContent>

      {/* <Grid item xs={12} md={6} container>
        <Grid item xs={6} md={4} container justifyContent={'center'}>
          <label htmlFor='raised-button-file'>
            <img
              alt='logo'
              src={preview ? preview : '/images/avatar.png'}
              style={{
                maxWidth: '120px',
                minWidth: '120px',
                maxHeight: '120px',
                minHeight: '120px',
                height: '120px',
                width: '120px',
                padding: 0,
                margin: 0
              }}
            />
          </label>
        </Grid>
        <Grid item xs={6} md={8} justifyContent={'center'} alignContent={'center'} marginTop={'20px'}>
          <input
            accept='image/*'
            style={{ display: 'none' }}
            id='raised-button-file'
            onChange={onSelectFile}
            type='file'
          ></input>

          <Box sx={{ marginTop: '20px' }}>
            <Typography variant='body2' sx={{ textAlign: 'left', color: '#424242', fontSize: '10px' }}>
              Click Photo to change photo profile.
            </Typography>
            <Typography variant='body2' sx={{ textAlign: 'left', color: '#424242', fontSize: '10px' }}>
              Allowed JPG, GIF or PNG.
            </Typography>
            <Typography variant='body2' sx={{ textAlign: 'left', color: '#424242', fontSize: '10px' }}>
              Max size of 800K. Aspect Ratio 1:1
            </Typography>
          </Box>
        </Grid>
      </Grid> */}
      {/* <Grid item xs={12} md={6} container>
        <Grid item xs={6} md={4} container justifyContent={'center'}>
          <label htmlFor='raised-button-file-banner'>
            <img
              alt='logo'
              src={previewBanner ? previewBanner : '/images/avatar.png'}
              style={{
                maxWidth: '120px',
                minWidth: '120px',
                maxHeight: '120px',
                minHeight: '120px',
                height: '120px',
                width: '120px',
                padding: 0,
                margin: 0
              }}
            />
          </label>
        </Grid>
        <Grid item xs={6} md={8} justifyContent={'center'} alignContent={'center'} marginTop={'20px'}>
          <input
            accept='image/*'
            style={{ display: 'none' }}
            id='raised-button-file-banner'
            onChange={onSelectFileBanner}
            type='file'
          ></input>

          <Box sx={{ marginTop: '20px' }}>
            <Typography variant='body2' sx={{ textAlign: 'left', color: '#424242', fontSize: '10px' }}>
              Click Photo to change photo Banner.
            </Typography>
            <Typography variant='body2' sx={{ textAlign: 'left', color: '#424242', fontSize: '10px' }}>
              Allowed JPG, GIF or PNG.
            </Typography>
            <Typography variant='body2' sx={{ textAlign: 'left', color: '#424242', fontSize: '10px' }}>
              Max size of 800K. Aspect Ratio 1:1
            </Typography>
          </Box>
        </Grid>
      </Grid> */}

      <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <Grid item xs={12} container marginTop={'25px'}>
            <Grid item container spacing={2} sx={{ mb: 2 }}>
              <Grid item md={6} xs={12}>
                <TextField
                  id='fullName'
                  defaultValue={props.datauser.name}
                  label='Full Name'
                  variant='outlined'
                  fullWidth
                  sx={{ mb: 1 }}
                  {...register('fullName')}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Autocomplete
                  disablePortal
                  id='combo-box-demo'
                  // options={comboShip}
                  options={!comboShip ? [{ label: 'Loading...', id: 0 }] : comboShip}
                  defaultValue={ship}
                  getOptionLabel={(option: any) => option.label}
                  renderInput={params => <TextField {...params} label='Ship' />}
                  onChange={(event: any, newValue: any | null) => displayship(newValue)}
                  // onChange={(event: any, newValue: Employee ) =>
                  //   newValue?.id ? setShip(newValue.employee_type) : setShip(props.datauser.employee_type)
                  // }
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <Autocomplete
                  disablePortal
                  id='combo-box-demo'
                  options={combocountry}
                  getOptionLabel={(option: any) => option.nicename}
                  defaultValue={props.address?.country}
                  renderInput={params => <TextField {...params} label='Country' />}
                  onChange={(event: any, newValue: Countries | null) =>
                    newValue?.id ? searchcity(newValue.id) : searchcity(props.datauser.country_id)
                  }
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <Autocomplete
                  disablePortal
                  id='city'
                  value={props.datauser.address?.city}
                  options={combocity}
                  getOptionLabel={(option: City) => option.city_name}
                  renderInput={params => <TextField {...params} label='City' sx={{ mb: 2 }} />}
                  onChange={(event: any, newValue: City | null) =>
                    newValue?.id ? setCombocity(newValue.id) : setCombocity(props.address?.city_id)
                  }
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  id='Email'
                  label='Email'
                  defaultValue={props.datauser.email}
                  variant='outlined'
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
                      defaultValue={props.datauser.website}
                      variant='outlined'
                      fullWidth
                      sx={{ mb: 1 }}
                      {...register('website')}
                    />
                  </Grid>
                </>
              )}
              <Grid item md={3} xs={12}>
                <Autocomplete
                  disablePortal
                  id='code'
                  options={combocode}
                  getOptionLabel={(option: Countries) => option.iso}
                  defaultValue={props.datauser?.country}
                  renderInput={params => <TextField {...params} label='Code' sx={{ mb: 2 }} />}
                  onChange={(event: any, newValue: Countries | null) =>
                    newValue?.id ? setCombocode(newValue.id) : setCombocode(props.address.country_id)
                  }
                />
              </Grid>

              <Grid item md={3} xs={12}>
                <TextField
                  id='phone'
                  label='Phone'
                  defaultValue={props.datauser.phone}
                  variant='outlined'
                  fullWidth
                  sx={{ mb: 1 }}
                  {...register('phone')}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  id='address'
                  label='Address'
                  defaultValue={props.datauser.address?.address}
                  variant='outlined'
                  fullWidth
                  sx={{ mb: 1 }}
                  {...register('address')}
                />
              </Grid>

              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  sx={{ mb: 1 }}
                  id='outlined-multiline-static'
                  label='About'
                  multiline
                  rows={4}
                  defaultValue={props.datauser.about}
                  {...register('about')}
                />
              </Grid>
              {tampilkanship == 'On-Ship' && (
                <Grid item container xs={12} spacing={2} sx={{ mb: 2 }}>
                  <Grid xs={12}>
                    <Typography variant='h5'>ON-SHIP TYPE</Typography>
                    <br></br>
                  </Grid>
                  <Grid item md={6} xs={12}>
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
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Autocomplete
                      disablePortal
                      id='combo-box-demo'
                      options={comboroleType}
                      getOptionLabel={(option: any) => option.name}
                      defaultValue={props.datauser?.field_preference?.role_type}
                      renderInput={params => <TextField {...params} label='Role Type' />}
                      onChange={(event: any, newValue: RoleType | null) =>
                        newValue?.id
                          ? setComboRolType(newValue.id)
                          : setComboRolType(props.datauser?.field_preference?.role_type?.id)
                      }
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Autocomplete
                      disablePortal
                      id='combo-box-demo'
                      options={comboVessel}
                      getOptionLabel={(option: any) => option.name}
                      defaultValue={props.datauser?.field_preference?.vessel_type}
                      renderInput={params => <TextField {...params} label='Type of Vessel' />}
                      onChange={(event: any, newValue: VesselType | null) =>
                        newValue?.id
                          ? setComboVessel(newValue.id)
                          : setComboVessel(props.datauser?.field_preference?.vessel_type?.id)
                      }
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Autocomplete
                      disablePortal
                      id='combo-box-demo'
                      options={comboRegion}
                      getOptionLabel={(option: any) => option.name}
                      defaultValue={props.datauser?.field_preference?.region_travel}
                      renderInput={params => <TextField {...params} label='Region of travel' />}
                      onChange={(event: any, newValue: RegionTravel | null) =>
                        newValue?.id
                          ? setComboRegion(newValue.id)
                          : setComboRegion(props.datauser?.field_preference?.region_travel?.id)
                      }
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
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
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Select
                      labelId='demo-multiple-chip-label'
                      id='demo-multiple-chip'
                      multiple
                      value={personName}
                      onChange={handleChange}
                      input={
                        <OutlinedInput
                          id='select-multiple-chip'
                          label='Chip'
                          defaultValue={props.datauser?.field_preference?.spoken_langs}
                        />
                      }
                      renderValue={selected => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
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
                  </Grid>
                </Grid>
              )}

              <Grid item md={2} xs={12}>
                <Button fullWidth size='small' type='submit' variant='contained' sx={{ mb: 7 }}>
                  Save
                </Button>
              </Grid>
              <Divider style={{ width: '100%' }} />

              <Box sx={{ marginTop: '20px' }}></Box>
              <Grid item container xs={12}>
                <Grid xs={10} md={11}>
                  <Typography variant='h5' sx={{ fontWeight: 'bold', color: '#424242' }}>
                    Educational Info
                  </Typography>
                </Grid>
                <Grid xs={2} md={1} display='flex' justifyContent='flex-end' alignItems='flex-end'>
                  <Button variant='contained' onClick={() => setOpenAddModal(!openAddModal)}>
                    +
                  </Button>
                </Grid>
                <Grid item container xs={12}>
                  {itemDataED.map(item => (
                    <Grid item container xs={12} marginTop={2} key={item.id}>
                      <Grid xs={4} md={1}>
                        <img
                          alt='logo'
                          src={item.logo ? item.logo : '/images/avatar.png'}
                          style={{
                            maxWidth: '100%',
                            height: '100px',
                            padding: 10,
                            margin: 0
                          }}
                        />
                      </Grid>
                      <Grid xs={8} md={11} item container>
                        <Grid xs={10} marginTop={2}>
                          <Typography variant='h6'>{item.title}</Typography>
                          <Typography variant='body1'>{item.major}</Typography>
                        </Grid>
                        <Grid xs={12} md={2} marginTop={2} display='flex' item container>
                          <Grid xs={12} display='flex'>
                            <Box>
                              <Typography variant='body1'>{item.start_date}</Typography>
                            </Box>
                            <Box>
                              <Typography variant='body1'> / </Typography>
                            </Box>
                            <Box>
                              <Typography variant='body1'>{item.end_date}</Typography>
                            </Box>
                          </Grid>
                          <Grid xs={12} display='flex' item container>
                            <Grid
                              xs={12}
                              md={12}
                              container
                              direction='row'
                              justifyContent='flex-end'
                              alignItems='center'
                            >
                              <Box margin={1}>
                                <Button
                                  variant='contained'
                                  color='info'
                                  size='small'
                                  onClick={() => editEducation(item)}
                                >
                                  Edit
                                </Button>
                              </Box>
                              <Box margin={1}>
                                <Button
                                  variant='contained'
                                  color='error'
                                  size='small'
                                  onClick={() => deleteeducation(item.id)}
                                >
                                  Delete
                                </Button>
                              </Box>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      {/* <Grid xs={12}>
                        <Typography variant='body1'>{item.description}</Typography>
                      </Grid> */}
                      <Divider style={{ width: '100%' }} />
                    </Grid>
                  ))}
                </Grid>
              </Grid>

              <Grid item container xs={12}>
                <Grid xs={10} md={11}>
                  <Typography variant='h5' sx={{ fontWeight: 'bold', color: '#424242' }}>
                    Work Experience Info
                  </Typography>
                </Grid>
                <Grid xs={2} md={1} display='flex' justifyContent='flex-end' alignItems='flex-end'>
                  <Button variant='contained' onClick={() => setOpenAddModalWE(!openAddModalWE)}>
                    +
                  </Button>
                </Grid>
                <Grid item container xs={12}>
                  {itemDataWE.map(item => (
                    <Grid item container xs={12} marginTop={2} key={item.id}>
                      <Grid xs={4} md={1}>
                        <img
                          alt='logo'
                          src={item.logo ? item.logo : '/images/avatar.png'}
                          style={{
                            maxWidth: '100%',
                            height: '100px',
                            padding: 10,
                            margin: 0
                          }}
                        />
                      </Grid>
                      <Grid xs={8} md={11} item container>
                        <Grid xs={10} marginTop={2}>
                          <Typography variant='h6'>{item.position}</Typography>
                          <Typography variant='body1'>{item.institution}</Typography>
                        </Grid>
                        <Grid xs={12} md={2} marginTop={2} display='flex' item container>
                          <Grid xs={12} display='flex'>
                            <Box>
                              <Typography variant='body1'>{item.start_date}</Typography>
                            </Box>
                            <Box>
                              <Typography variant='body1'> / </Typography>
                            </Box>
                            <Box>
                              <Typography variant='body1'>{item.end_date}</Typography>
                            </Box>
                          </Grid>

                          <Grid xs={12} display='flex' item container>
                            <Grid
                              xs={12}
                              md={12}
                              container
                              direction='row'
                              justifyContent='flex-end'
                              alignItems='center'
                            >
                              <Box margin={1}>
                                <Button
                                  variant='contained'
                                  color='info'
                                  size='small'
                                  onClick={() => editWorkExperience(item)}
                                >
                                  Edit
                                </Button>
                              </Box>
                              <Box margin={1}>
                                <Button
                                  variant='contained'
                                  color='error'
                                  size='small'
                                  onClick={() => deletewe(item.id)}
                                >
                                  Delete
                                </Button>
                              </Box>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid xs={12}>
                        <Typography variant='body1'>{item.description}</Typography>
                      </Grid>
                      <Divider style={{ width: '100%' }} />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item container xs={12}>
                <Grid xs={10} md={11}>
                  <Typography variant='h5' sx={{ fontWeight: 'bold', color: '#424242' }}>
                    Document Upload
                  </Typography>
                </Grid>
                <Grid display='flex' justifyContent='flex-end' alignItems='flex-end' xs={2} md={1}>
                  <Button variant='contained' onClick={() => setOpenAddModalDoc(!openAddModalDoc)}>
                    +
                  </Button>
                </Grid>
                <Grid item container xs={12}>
                  {itemData.map(item => (
                    <Grid item container xs={12} marginTop={2} key={item.id} alignItems='center'>
                      <Grid xs={12} md={9} container direction='row' alignItems='center'>
                        <img
                          alt='logo'
                          src={'/images/avatars/circle-check-solid 1.svg'}
                          style={{
                            maxWidth: '100%',
                            height: '20px',
                            padding: 0,
                            margin: 5
                          }}
                        />
                        <Typography variant='h6'>{item.document_name}</Typography>
                      </Grid>
                      <Grid xs={12} md={3} display='flex' item container>
                        <Grid xs={12} md={12} container direction='row' justifyContent='flex-end' alignItems='center'>
                          <Box margin={1}>
                            <Button variant='contained' color='success' size='small' href={item.path} target='_blank'>
                              Preview
                            </Button>
                          </Box>
                          <Box margin={1}>
                            <Button variant='contained' color='info' size='small' onClick={() => editDocument(item)}>
                              Edit
                            </Button>
                          </Box>
                          <Box margin={1}>
                            <Button variant='contained' color='error' size='small' onClick={() => deletework(item.id)}>
                              Delete
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </FormControl>
      </form>
      <Grid>
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
          />
        </form>
      </Grid>
    </Grid>
  )
}

CandidateProfile.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

CandidateProfile.guestGuard = true

export default CandidateProfile
