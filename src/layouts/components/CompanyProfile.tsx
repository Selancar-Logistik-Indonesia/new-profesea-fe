// ** React Imports
import React, {  ReactNode, useEffect, useState } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Button, TextField, FormControl, Autocomplete, Divider, IconButton } from '@mui/material'

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
const CompanyProfile = (props: compProps) => {
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
         if (element.sosmed_type == 'facebook') {
           setFacebook(element.sosmed_id)
         }
         if (element.sosmed_type == 'instagram') {
           setInstagram(element.sosmed_id)
         }
         if (element.sosmed_type == 'linkedin') {
           setLinkedin(element.sosmed_id)
         }
          
       }
       getCombocode(code)
     })
      HttpClient.get(AppConfig.baseUrl + '/user/'+ props.datauser.id).then(response => {
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
  
  const addbuttonfacebook=( data: FormData) =>{
    const { facebook } = data
    const json = {
      sosmed_type: 'facebook',
      sosmed_id: facebook
    }
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
  }
  const addbuttoninstagram = (data: FormData) => {
    const { instagram } = data
    const json = {
      sosmed_type: 'instagram',
      sosmed_id: instagram
    }
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
  }
  const addbuttonlinkedin = (data: FormData) => {
    const { linkedin } = data
    const json = {
      sosmed_type: 'linkedin',
      sosmed_id: linkedin
    }
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

  const slides = [
    { url: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e', title: 'beach' },
    { url: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d', title: 'boat' },
    { url: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e', title: 'forest' },
    { url: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e', title: 'city' },
    { url: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e', title: 'italy' }
  ]

  return (
    <Grid container>
      <Grid item xs={12} md={6} container>
        <Grid item xs={4} container justifyContent={'center'}>
          <img
            alt='logo'
            src={preview ? preview : '/images/avatar.png'}
            style={{
              maxWidth: '100%',
              height: '120px',
              padding: 0,
              margin: 0
            }}
          />
        </Grid>
        <Grid item xs={8} justifyContent={'center'} alignContent={'center'} marginTop={'20px'}>
          <input
            accept='image/*'
            style={{ display: 'none' }}
            id='raised-button-file'
            onChange={onSelectFile}
            multiple
            type='file'
          ></input>
          <Box sx={{ marginTop: '2px' }}>
            <label htmlFor='raised-button-file'>
              <Button size='small' variant='contained' component='span'>
                Upload Profil Image
              </Button>
            </label>{' '}
            &nbsp;
          </Box>

          <Box sx={{ marginTop: '20px' }}>
            <Typography variant='body2' sx={{ textAlign: 'left', color: '#424242', fontSize: '10px' }}>
              Allowed JPG, GIF or PNG.
            </Typography>
            <Typography variant='body2' sx={{ textAlign: 'left', color: '#424242', fontSize: '10px' }}>
              Max size of 800K. Aspect Ratio 1:1
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} container>
        <Grid item xs={4} container justifyContent={'center'}>
          <img
            alt='logo'
            src={previewBanner ? previewBanner : '/images/avatar.png'}
            style={{
              maxWidth: '90%',
              height: '100px',
              padding: 0,
              margin: 0
            }}
          />
        </Grid>
        <Grid item xs={8} justifyContent={'center'} alignContent={'center'} marginTop={'20px'}>
          <input
            accept='image/*'
            onChange={onSelectFileBanner}
            style={{ display: 'none' }}
            id='fotobanner'
            multiple
            type='file'
          ></input>
          <Box sx={{ marginTop: '2px' }}>
            <label htmlFor='fotobanner'>
              <Button size='small' variant='contained' component='span'>
                Upload Cover Image
              </Button>
            </label>{' '}
            &nbsp;
          </Box>

          <Box sx={{ marginTop: '20px' }}>
            <Typography variant='body2' sx={{ textAlign: 'left', color: '#424242', fontSize: '10px' }}>
              Allowed JPG, GIF or PNG.
            </Typography>
            <Typography variant='body2' sx={{ textAlign: 'left', color: '#424242', fontSize: '10px' }}>
              Max size of 800K. Aspect Ratio 1:1
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <Grid item xs={12} container marginTop={'25px'}>
            <Grid item container spacing={2} sx={{ mb: 2 }}>
              <Grid item md={6} xs={11}>
                <TextField
                  id='companyName'
                  defaultValue={props.datauser.name}
                  label='Company Name'
                  variant='outlined'
                  fullWidth
                  sx={{ mb: 1 }}
                  {...register('companyName')}
                />
                {}
              </Grid>
              {props.datauser.role == 'Company' &&
              <Grid item md={6} xs={12} >
                <Autocomplete
                  disablePortal
                  id='combo-box-demo'
                  options={comboindustry}
                  defaultValue={props.datauser?.industry}
                  getOptionLabel={(option: any) => option.name}
                  renderInput={(params) => <TextField {...params} label="Industry" />} 
                  onChange={(event: any, newValue: Industry | null) => (newValue?.id) ? setIndustry(newValue.id) : setIndustry(props.datauser.industry_id)}
                />
              </Grid>
              }
              <Grid item md={6} xs={12} >
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={combocountry}
                getOptionLabel={(option: any) => option.nicename}
                defaultValue={props.address?.country}
                renderInput={(params) => <TextField {...params} label="Country" />}
                onChange={(event: any, newValue: Countries | null) => (newValue?.id) ? searchcity(newValue.id) : searchcity(props.datauser.country_id)}
                />
              </Grid>
            
              <Grid item md={6} xs={12} >
                <Autocomplete
                  disablePortal
                  id="city"
                  value={props.datauser.address?.city}
                  options={combocity}
                  getOptionLabel={(option: City) => option.city_name}
                  renderInput={(params) => <TextField {...params} label="City" sx={{ mb: 2 }}/>}
                  onChange={(event: any, newValue: City | null) => (newValue?.id) ? setCombocity(newValue.id) : setCombocity(props.address?.city_id)}
                />
              </Grid>
              <Grid item md={6} xs={12} >
                <TextField id="Email" label="Email" defaultValue={props.datauser.email} variant="outlined" fullWidth sx={{ mb: 1 }}  {...register("email")} />
              </Grid>
              {props.datauser.role == 'Company' && <>
              <Grid item md={6} xs={12} >
                <TextField id="website" label="Website" defaultValue={props.datauser.website} variant="outlined" fullWidth sx={{ mb: 1 }}    {...register("website")} />
              </Grid>
              </>}  
              <Grid item md={3} xs={12}>
                <Autocomplete
                  disablePortal
                  id='code'
                  options={combocode}
                  getOptionLabel={(option: Countries) => option.iso}
                  defaultValue={props.address?.country}
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
              <Grid item md={6} xs={12} >
                <TextField id="address" label="Address" defaultValue={props.datauser.address?.address} variant="outlined" fullWidth sx={{ mb: 1 }}    {...register("address")} />
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
              <Grid item md={2} xs={12}>
                <Button fullWidth size='small' type='submit' variant='contained' sx={{ mb: 7 }}>
                  Save
                </Button>
              </Grid>
              <Divider style={{ width: '100%' }} />
              <Grid item md={5} xs={12}>
                <Typography variant='h6'>Social Media</Typography>
                <Typography variant='body1'>This is link social medias the company. Please fill it.</Typography>
              </Grid>

              <Grid container item md={12} xs={12} marginTop={'20px'}>
                <Grid container item xs={12} md={4}>
                  <Grid container item xs={6} md={12}>
                    <Grid xs={12} item>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ mr: 6, minWidth: 5, display: 'flex', justifyContent: 'center' }}>
                          <img src='/images/logos/facebook.png' alt='Facebook' height='30' />
                        </Box>
                        <TextField
                          id='facebook'
                          defaultValue={facebook}
                          label='Facebook'
                          variant='outlined'
                          fullWidth
                          sx={{ mb: 1 }}
                          {...register('facebook')}
                        />
                        <IconButton onClick={handleSubmit(addbuttonfacebook)}>
                          <Icon icon={'charm:pencil'} />
                        </IconButton>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid container item xs={12} md={4}>
                  <Grid container item xs={6} md={12}>
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
                          defaultValue={instagram}
                          sx={{ mb: 1 }}
                          {...register('instagram')}
                        />
                        <IconButton onClick={handleSubmit(addbuttoninstagram)}>
                          <Icon icon={'charm:pencil'} />
                        </IconButton>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid container item xs={12} md={4}>
                  <Grid container item xs={6} md={12}>
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
                        />
                        <IconButton onClick={handleSubmit(addbuttonlinkedin)}>
                          <Icon icon={'charm:pencil'} />
                        </IconButton>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Divider style={{ width: '100%' }} />
              <Box sx={{ marginTop: '20px' }}></Box>

              <Grid item md={5} xs={12}>
                <Typography variant='h6'>Gallery</Typography>
                <Typography variant='body1'>This is Gallery for the company. Please fill it.</Typography>
              </Grid>
              <Grid item md={5} display={{ xs: 'none', lg: 'block' }}>
                {' '}
              </Grid>
              <Grid item md={2} xs={12} marginTop={'20px'}>
                <Button size='small' variant='contained'>
                  Upload Image
                </Button>
              </Grid>
              <Grid item md={12} xs={12}>
                <ImageSlider slide={slides} />
              </Grid>
            </Grid>
          </Grid>
        </FormControl>
      </form>
    </Grid>
  )
}

CompanyProfile.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

CompanyProfile.guestGuard = true

export default CompanyProfile
