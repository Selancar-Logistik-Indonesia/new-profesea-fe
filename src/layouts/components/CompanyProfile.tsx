// ** React Imports
import React, { ReactNode, useEffect, useRef, useState } from 'react'

// ** MUI Components
import Box, { BoxProps } from '@mui/material/Box'
import Typography from '@mui/material/Typography'
 
import { Button, TextField, FormControl, Autocomplete, Divider, Card, InputAdornment } from '@mui/material'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks

// ** Demo Imports
// import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import { Grid } from '@mui/material'

import { useForm } from 'react-hook-form'

// import { yupResolver } from '@hookform/resolvers/yup'
import ImageSlider from './ImageSlider'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import { IUser } from 'src/contract/models/user'
import { toast } from 'react-hot-toast'
import Countries from 'src/contract/models/country'
import Industry from 'src/contract/models/industry'
import City from 'src/contract/models/city'
import Address from 'src/contract/models/address'
import { Icon } from '@iconify/react'
import { styled } from '@mui/material/styles'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'


type FormData = {
  companyName: string
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
  facebook: string
  instagram: string
  linkedin: string
}

type compProps = {
  visible: boolean
  datauser: IUser
  address: Address
}
let statusfb: any = ''
let statusig: any = ''
let statuslinkedin: any = ''
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

const CompanyProfile = (props: compProps) => {

  const inputRef = useRef<any>('')
  const handleClick = () => {
    // 👇️ open file input box on click of another element
    inputRef.current.click()
 
  } 
  const [combocountry, getComboCountry] = useState<any>([])
  const [comboindustry, getComboIndustry] = useState<any>([])
  const [combocity, getComboCity] = useState<any[]>([])
  const [combocode, getCombocode] = useState<any[]>([])
  const [idcombocode, setCombocode] = useState<any>(props.datauser.country_id)
  const [idcity, setCombocity] = useState<any>(props.datauser.address?.city_id)
  const [idindustry, setIndustry] = useState<any>(props.datauser.industry_id)
  const [idcountry, setCountry] = useState<any>(props.datauser.country_id)
  const [facebook, setFacebook] = useState<any>('')
  const [instagram, setInstagram] = useState<any>('')
  const [linkedin, setLinkedin] = useState<any>('')
  
  const [disabledFacebook, setDisabledFacebook] = useState<boolean>(true)
  const [disabledInstagram, setDisabledInstagram] = useState<boolean>(true)
  const [disabledLinkedn, setDisabledLinkedin] = useState<boolean>(true)
  

  const combobox = () => {
    HttpClient.get(AppConfig.baseUrl + '/public/data/country?search=').then(response => {
      const code = response.data.countries
      getComboCountry(code)
    })
    HttpClient.get(AppConfig.baseUrl + '/public/data/industry?search=').then(response => {
      const code = response.data.industries
      getComboIndustry(code)
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
          statusfb = element.id;
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
    HttpClient.get(AppConfig.baseUrl + '/user/' + props.datauser.id).then(response => {
      const code = response.data.user
      setPreview(code.photo)
      setPreviewBanner(code.banner)
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
  }, [])
  useEffect(() => {
    combobox()
    if (props.datauser.address != undefined) {
      searchcity(props.datauser.country_id)
    }
  }, [])
  const { register, handleSubmit } = useForm<FormData>({
    mode: 'onBlur'
  })
  const onSubmit = (data: FormData) => {
    const { companyName, website, phone, address, about } = data
    const json = {
      country_id: idcountry,
      industry_id: idindustry,
      name: companyName,
      phone: phone,
      website: website,
      about: about,
      address_country_id: idcombocode,
      address_city_id: idcity,
      address_address: address
    }
    HttpClient.patch(AppConfig.baseUrl + '/user/update-profile', json).then(
      ({ data }) => {
        console.log('here 1', data)
        toast.success(' Successfully submited!')
      },
      error => {
        console.log('here 1', error)
        toast.error('Registrastion Failed ' + error.response.data.message)
      }
    )
  }

   const addbuttonfacebook = ( ) => {
    let user = '';
    if(facebook.length < 10){
      user = 'https://facebook.com/' + facebook
    }else{ user = facebook}

    const json = {
      sosmed_type: 'Facebook',
      sosmed_address: user
    }
    if (statusfb == '') {
      HttpClient.post(AppConfig.baseUrl + '/user/sosmed', json).then(
        () => {
          toast.success(' Successfully submited!')
        },
        error => {
          toast.error('Registrastion Failed ' + error.response.data.message)
        }
      )
    } else {
      HttpClient.patch(AppConfig.baseUrl + '/user/sosmed/' + statusfb, json).then(
        () => {
          toast.success(' Successfully submited!')
        },
        error => {
          toast.error('Registrastion Failed ' + error.response.data.message)
        }
      )

    }
    setDisabledFacebook(true)
  }
 
  const addbuttoninstagram = ( ) => {
 
    let user = ''
    if (instagram.length < 10) {
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
          console.log('here 1', data)
          toast.success(' Successfully submited!')
        },
        error => {
          console.log('here 1', error)
          toast.error('Registrastion Failed ' + error.response.data.message)
        }
      )
    } else {
      HttpClient.patch(AppConfig.baseUrl + '/user/sosmed/' + statusig, json).then(
        ({ data }) => {
          console.log('here 1', data)
          toast.success(' Successfully submited!')
        },
        error => {
          console.log('here 1', error)
          toast.error('Registrastion Failed ' + error.response.data.message)
        }
      )

    }
      setDisabledInstagram(true)
 
  }
  const addbuttonlinkedin = () => {
    let user = ''
    if (linkedin.length < 10) {
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
          console.log('here 1', data)
          toast.success(' Successfully submited!')
        },
        error => {
          console.log('here 1', error)
          toast.error('Registrastion Failed ' + error.response.data.message)
        }
      )
    } else {
      HttpClient.patch(AppConfig.baseUrl + '/user/sosmed/' + statuslinkedin, json).then(
        ({ data }) => {
          console.log('here 1', data)
          toast.success(' Successfully submited!')
        },
        error => {
          console.log('here 1', error)
          toast.error('Registrastion Failed ' + error.response.data.message)
        }
      )

    }
    setDisabledLinkedin(true)

  }
  const [selectedFile, setSelectedFile] = useState()
  const [selectedFileBanner, setSelectedFileBanner] = useState()
  const [preview, setPreview] = useState()
  const [previewBanner, setPreviewBanner] = useState()
  // const [currentImage, setCurrentImage] = useState<File>()
  // create a preview as a side effect, whenever selected file is changed
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
      setSelectedFile(undefined)

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

  const onSelectFileGallery = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)

      return
    }

    // I've kept this example simple by using the first image instead of multiple
 
    const selectedFiles = e.target.files as FileList
    // setCurrentImage(selectedFiles?.[0])
    uploadPhotoGallery(selectedFiles?.[0])
  }
  const uploadPhotoGallery = (data: any) => {
    const json: any = new FormData()
    json.append('image_file', data)
    HttpClient.post(AppConfig.baseUrl + '/user/gallery', json).then(
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
   const enabledtextfield=(x:any)=>{
 
    if (x == 'fb') setDisabledFacebook(false)
    if (x == 'ig') setDisabledInstagram(false)
    if (x == 'li') setDisabledLinkedin(false)
  }
  const slides = [
    { url: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e', title: 'beach' },
    { url: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d', title: 'boat' },
    { url: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e', title: 'forest' },
    { url: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e', title: 'city' },
    { url: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e', title: 'italy' }
  ]

  return (
     <Grid container padding={5}>
 
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
            <ProfilePicture src={preview ? preview : '/images/avatars/profilepic.png'} alt='profile-picture'></ProfilePicture>
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
      <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <Grid item xs={12} container marginTop={'25px'}>
            <Grid item container spacing={2} sx={{ mb: 2 }}>
              <Grid item md={6} xs={12}>
                <TextField
                  id='companyName'
                  defaultValue={props.datauser.name}
                  label='Company Name'
                  variant='outlined'
                  fullWidth
                  sx={{ mb: 1 }}
                  {...register('companyName')}
                />
              </Grid>
              {props.datauser.role == 'Company' && (
                <Grid item md={6} xs={12}>
                  <Autocomplete
                    disablePortal
                    id='combo-box-demo'
                    options={comboindustry}
                    defaultValue={props.datauser?.industry}
                    getOptionLabel={(option: any) => option.name}
                    renderInput={params => <TextField {...params} label='Industry' />}
                    onChange={(event: any, newValue: Industry | null) =>
                      newValue?.id ? setIndustry(newValue.id) : setIndustry(props.datauser.industry_id)
                    }
                  />
                </Grid>
              )}
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
              <Grid item md={1} xs={12}>
                <Button fullWidth size='small' type='submit' variant='contained' sx={{ mb: 7 }}>
                  <Icon fontSize='large' icon={'fluent:save-28-filled'} color={'info'} style={{ fontSize: '24px' }} />
                </Button>
              </Grid>
              <Divider style={{ width: '100%' }} />
              <Grid item md={5} xs={12}>
                <Grid container item xs={12} justifyContent={'left'}>
                  <Typography variant='body2' sx={{ color: '#424242', fontSize: '18px' }}>
                    Social Media Info
                  </Typography>
                </Grid>
                <Grid container item xs={12} justifyContent={'left'}>
                  <Typography variant='body2' sx={{ color: '#424242', fontSize: '12px' }}>
                    Fulfill your Social Media Info
                  </Typography>
                </Grid>
              </Grid>

              <Grid container item md={12} xs={12} marginTop={'20px'}>
                <Grid container item xs={12} md={4} marginBottom={2}>
                  <Grid container item xs={12} md={12}>
                    <Grid xs={12} item>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
 
                        <Box sx={{ mr: 4, minWidth: 5, display: 'flex', justifyContent: 'center' }}>
                          <img src='/images/logos/facebook.png' alt='Facebook' height='20' />
 
                        </Box>
                        <TextField
                          id='facebook'
                          defaultValue={facebook}
                          label='Facebook'
                          variant='outlined'
                          fullWidth
                          sx={{ mb: 1 }}
                          value={facebook}
                          {...register('facebook')}
                          disabled={disabledFacebook}
                          onChange={e => setFacebook(e.target.value)}
                          onBlur={handleSubmit(addbuttonfacebook)}
 
                          InputProps={{
                            startAdornment: <InputAdornment position='start'>/</InputAdornment>
                          }}
                        />
                        <Button onClick={() => enabledtextfield('fb')} sx={{ mr: 4, minWidth: 5, display: 'flex', justifyContent: 'center' }}>
                          <Icon fontSize='large' icon={'material-symbols:edit'} color={'primary'} style={{ fontSize: '24px' }} />
                        </Button>
 
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid container item xs={12} marginBottom={2} md={4}>
                  <Grid container item xs={12} md={12}>
                    <Grid xs={12} item>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ mr: 6, minWidth: 5, display: 'flex', justifyContent: 'center' }}>
                          <img src='/images/logos/instagram.png' alt='instagram' height='30' />
                        </Box>
                        <TextField
                          id='instagram'
                          label='Instagram'
                          variant='outlined'
                          fullWidth
                          value={instagram}
                          sx={{ mb: 1 }}
                          {...register('instagram')}
                          disabled={disabledInstagram}
                          onChange={e => setInstagram(e.target.value)}
                          onBlur={handleSubmit(addbuttoninstagram)}
 
                          InputProps={{
                            startAdornment: <InputAdornment position='start'>/</InputAdornment>
                          }}
                        />
                        <Button onClick={() => enabledtextfield('ig')} sx={{ mr: 4, minWidth: 5, display: 'flex', justifyContent: 'center' }}>
                          <Icon fontSize='large' icon={'material-symbols:edit'} color={'primary'} style={{ fontSize: '24px' }} />
                        </Button> 
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid container item xs={12} marginBottom={2} md={4}>
                  <Grid container item xs={12} md={12}>
                    <Grid xs={12} item>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ mr: 6, minWidth: 5, display: 'flex', justifyContent: 'center' }}>
                          <img src='/images/logos/linkedin.png' alt='linkedin' height='30' />
                        </Box>
                        <TextField
                          id='linkedin'
                          defaultValue={linkedin}
                          label='Linkedin'
                          variant='outlined'
                          fullWidth
                          sx={{ mb: 1 }}
                          {...register('linkedin')}
                          disabled={disabledLinkedn}
                          value={linkedin}
                          onChange={e => setLinkedin(e.target.value)}
                          onBlur={handleSubmit(addbuttonlinkedin)}
 
                          InputProps={{
                            startAdornment: <InputAdornment position='start'>/</InputAdornment>
                          }}
                        />
                        <Button onClick={() => enabledtextfield('li')} sx={{ mr: 4, minWidth: 5, display: 'flex', justifyContent: 'center' }}>
                          <Icon fontSize='large' icon={'material-symbols:edit'} color={'primary'} style={{ fontSize: '24px' }} />
                        </Button>
 
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Divider style={{ width: '100%' }} />
              <Box sx={{ marginTop: '20px' }}></Box>
            </Grid>
          </Grid>
        </FormControl>
      </form> 
      <Grid item md={5} xs={12}>
        <Typography variant='h6'>Gallery</Typography>
        <Typography variant='body1'>This is Gallery for the company. Please fill it.</Typography>
 
      </Grid>
      <Grid item md={5} display={{ xs: 'none', lg: 'block' }}>
        {' '}
      </Grid>
 
      <Grid item md={1} xs={12} marginBottom={'5px'}>
        <Box marginBottom={2}>
          <Button variant='contained' size='small' onClick={handleClick}>
            {' '}
            <Icon fontSize='large' icon={'material-symbols:drive-folder-upload'} color={'info'} style={{ fontSize: '24px' }} />
 
          </Button>
        </Box>
        <input
          accept='image/*'
          id='raised-button-x'
          style={{ display: 'none', height: 250, width: '100%' }}
          onChange={onSelectFileGallery}
          type='file'
          ref={inputRef}
        ></input>
      </Grid>
      <Grid item md={12} xs={12}>
        <ImageSlider slide={slides} />
      </Grid>
    </Grid>
  )
}

CompanyProfile.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

CompanyProfile.guestGuard = true

export default CompanyProfile
