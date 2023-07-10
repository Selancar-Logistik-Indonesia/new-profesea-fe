// ** React Imports
import React, { ReactNode, useEffect, useState } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Button, TextField, FormControl, Autocomplete, Divider, ImageList, ImageListItem } from '@mui/material'

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
import {IUser} from 'src/contract/models/user'
import { toast } from 'react-hot-toast'
import Countries from 'src/contract/models/country'
import Industry from 'src/contract/models/industry'
import City from 'src/contract/models/city'
import Address from 'src/contract/models/address'

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
}

interface SocialAccountsType {
  title: string
  logo: string
  username?: string
  isConnected: boolean
}

type compProps = {
    visible: boolean;  
    datauser: IUser;
    address : Address
}
const CompanyProfile = (props:compProps) => {
  const [combocountry, getComboCountry] = useState<any>([])
  const [comboindustry, getComboIndustry] = useState<any>([])
  const [combocity, getComboCity] = useState<any[]>([]) 
  const [combocode, getCombocode] = useState<any[]>([])
  const [sosmed, getSosmed] = useState<any>([])

  const [idcombocode, setCombocode] = useState<any>(0) 
  const [idcity, setCombocity] = useState<any>(0) 
  const [idindustry, setIndustry] = useState<any>(0)
   const [idcountry, setCountry] = useState<any>(0)
  const combobox = () => {
    HttpClient.get(AppConfig.baseUrl + "/public/data/country?search=")
      .then((response) => {
        const code = response.data.countries;
        getComboCountry(code);
      })    
    HttpClient.get(AppConfig.baseUrl + "/public/data/industry?search=")
      .then((response) => {
        const code = response.data.industries;
        getComboIndustry(code);
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
    const listsosmed = [{
        id:'1',sosmed:'facebook'}
      , {id:'2',sosmed:'instagaram'}
      , {id:'3',sosmed:'lingkedin'}
      ]
    getSosmed(listsosmed);

  }
  const searchcity = async(q:any) =>{
    setCountry(q);
     const resp = await HttpClient.get("/public/data/city?search=&country_id=" +q);
     if (resp.status != 200) {
        throw resp.data.message ?? "Something went wrong!";
     }
      const code = resp.data.cities;
      getComboCity(code);
      
  }
  useEffect(() => {
    combobox()
    if(props.datauser.address != undefined){
      searchcity(props.datauser.country_id)
    }
  }, [])

  const {
    register,
    handleSubmit,
  } = useForm<FormData>({
    mode: 'onBlur',
  })
  const onSubmit = (data: FormData) => {

    const { companyName,  website, phone, address, about } = data
      ;
    const json = {
      'country_id': idcountry,
      'industry_id': idindustry,
      "name": companyName,
      "phone": phone,
      "website": website,
      "about": about,
      "address_country_id": idcombocode, 
      "address_city_id": idcity,
      "address_address": address, 
    };
    HttpClient.patch(AppConfig.baseUrl + '/user/update-profile', json).then(({ data }) => { 
      console.log("here 1", data);
      toast.success( ' Successfully submited!'); 
    }, error => {
      console.log("here 1", error);
      toast.error('Registrastion Failed ' + error.response.data.message)
    });
  }
  function addbutton(data:FormData) {
    const {usernamesosmed} = data;  
    const json = {
      'sosmed_type': sosmed.sosmed,
      'sosmed_id': usernamesosmed,
    };
    HttpClient.post(AppConfig.baseUrl + '/user/sosmed', json).then(({ data }) => { 
      console.log("here 1", data);
      toast.success( ' Successfully submited!'); 
    }, error => {
      console.log("here 1", error);
      toast.error('Registrastion Failed ' + error.response.data.message)
    });
  }
  const socialAccountsArr: SocialAccountsType[] = [
    {
      title: 'Facebook',
      isConnected: false,
      logo: '/images/logos/facebook.png'
    },
    {
      title: 'Instagram',
      isConnected: true,
      username: '@prfoesea',
      logo: '/images/logos/instagram.png'
    },

    {
      title: 'LinkedIn',
      isConnected: false,
      logo: '/images/logos/linkedin.png'
    }
  ]
  const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: 'Breakfast',
      author: '@bkristastucchio',
      featured: true,
    },
    {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      title: 'Burger',
      author: '@rollelflex_graphy726',
    },
    {
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      title: 'Camera',
      author: '@helloimnik',
    },
    {
      img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
      title: 'Coffee',
      author: '@nolanissac',
    },
    {
      img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
      title: 'Hats',
      author: '@hjrc33',
    },
    {
      img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
      title: 'Honey',
      author: '@arwinneil',
      featured: true,
    },
    {
      img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
      title: 'Basketball',
      author: '@tjdragotta',
    },
    {
      img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
      title: 'Fern',
      author: '@katie_wasserman',
    },
    {
      img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
      title: 'Mushrooms',
      author: '@silverdalex',
    },
    {
      img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
      title: 'Tomato basil',
      author: '@shelleypauls',
    },
    {
      img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
      title: 'Sea star',
      author: '@peterlaster',
    },
    {
      img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
      title: 'Bike',
      author: '@southside_customs',
    },
  ];

  
  console.log(props.address.city);
  return (
    <Grid container >
      <Grid xs={12} md={6} container >
        <Grid xs={4} container justifyContent={'center'}>
          <img alt='logo' src='/images/avatar.png' style={{
            maxWidth: '100%',
            height: '120px',
            padding: 0,
            margin: 0
          }} />
        </Grid>
        <Grid xs={8} direction={'row'} justifyContent={'center'} alignContent={'center'} marginTop={'20px'}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="raised-button-file"
            multiple
            type="file"
          >

          </input>
          <Box sx={{ marginTop: '2px' }}>
            <label htmlFor="raised-button-file">
              <Button size='small' variant="contained" component="span" >
                Upload Profil Image
              </Button>
            </label> &nbsp;

            {/* <label htmlFor="raised-button-file">
              <Button size='small' variant="contained" component="span" color='error' >
                Reset
              </Button>
            </label> */}
          </Box>

          <Box sx={{ marginTop: '20px' }}>
            <Typography variant='body2' sx={{ textAlign: 'left', color: "#424242", fontSize: '10px' }}>Allowed JPG, GIF or PNG.</Typography>
            <Typography variant='body2' sx={{ textAlign: 'left', color: "#424242", fontSize: '10px' }}>Max size of 800K. Aspect Ratio 1:1</Typography>
          </Box>

        </Grid>
      </Grid>
      <Grid xs={12} md={6} container >
        <Grid xs={4} container justifyContent={'center'}>
          <img alt='logo' src='/images/avatar.png' style={{
            maxWidth: '100%',
            height: '120px',
            padding: 0,
            margin: 0
          }} />
        </Grid>
        <Grid xs={8} direction={'row'} justifyContent={'center'} alignContent={'center'} marginTop={'20px'}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="raised-button-file"
            multiple
            type="file"
          >

          </input>
          <Box sx={{ marginTop: '2px' }}>
            <label htmlFor="raised-button-file">
              <Button size='small' variant="contained" component="span" >
                Upload Cover Image
              </Button>
            </label> &nbsp;

            {/* <label htmlFor="raised-button-file">
              <Button size='small' variant="contained" component="span" color='error' >
                Reset
              </Button>
            </label> */}
          </Box>

          <Box sx={{ marginTop: '20px' }}>
            <Typography variant='body2' sx={{ textAlign: 'left', color: "#424242", fontSize: '10px' }}>Allowed JPG, GIF or PNG.</Typography>
            <Typography variant='body2' sx={{ textAlign: 'left', color: "#424242", fontSize: '10px' }}>Max size of 800K. Aspect Ratio 1:1</Typography>
          </Box>

        </Grid>
      </Grid>
      <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <Grid xs={12} container marginTop={'25px'}>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item md={6} xs={11}>
                <TextField id="companyName" defaultValue={props.datauser.name} label="Company Name" variant="outlined" fullWidth sx={{ mb: 1 }}
                  {...register("companyName")} />
                  {}
              </Grid>
              <Grid item md={6} xs={12} >
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={comboindustry} 
                   defaultValue={props.datauser.industry}
                  getOptionLabel={(option: any) => option.name}
                  renderInput={(params) => <TextField {...params} label="Industry" />} 
                  onChange={(event: any, newValue: Industry | null) => (newValue?.id) ? setIndustry(newValue.id) : setIndustry(props.datauser.industry_id)}

                />
              </Grid>
              <Grid item md={6} xs={12} >
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={combocountry}
                getOptionLabel={(option: any) => option.nicename}
                defaultValue={props.address.country}
                renderInput={(params) => <TextField {...params} label="Country" />}
                onChange={(event: any, newValue: Countries | null) => (newValue?.id) ? searchcity(newValue.id) : searchcity(props.datauser.country_id)}
                // onChange={({target})=> searchcity(target)}
                />
              </Grid>
            
              <Grid item md={6} xs={12} >
                {/* <TextField id="city" label="city" variant="outlined" fullWidth sx={{ mb: 1 }}     {...register("city")}/> */}
                {/* <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={combocity} 
                  // getOptionLabel={(option: any) => option.city_name}
                  defaultValue={props.address.city.city_name}
                  renderInput={(params) => <TextField {...params} label="City" />}
                  onChange={(event: any, newValue: City | null) => (newValue?.id) ? setCity(newValue.id) : setCity(props.address.city)}
                /> */}
                <Autocomplete
                  disablePortal
                  id="city"
                  value={props.datauser.address.city}
                  options={combocity}
                  getOptionLabel={(option: City) => option.city_name}
                  renderInput={(params) => <TextField {...params} label="City" sx={{ mb: 2 }}/>}
                  onChange={(event: any, newValue: City | null) => (newValue?.id) ? setCombocity(newValue.id) : setCombocity(props.address.city_id)}
                />
              </Grid>

              
              <Grid item md={6} xs={12} >
                <TextField id="Email" label="Email" defaultValue={props.datauser.email} variant="outlined" fullWidth sx={{ mb: 1 }}  {...register("email")} />
              </Grid>
              <Grid item md={6} xs={12} >
                <TextField id="website" label="Website" defaultValue={props.datauser.website} variant="outlined" fullWidth sx={{ mb: 1 }}    {...register("website")} />
              </Grid>

              <Grid item md={3} xs={12} >
                <Autocomplete
                  disablePortal
                  id="code"
                  options={combocode}
                  getOptionLabel={(option: Countries) => option.iso}
                  defaultValue={props.address.country}
                  renderInput={(params) => <TextField {...params} label="Code" sx={{ mb: 2 }}/>}
                  onChange={(event: any, newValue: Countries | null) => (newValue?.id) ? setCombocode(newValue.id) : setCombocode(props.address.country_id)}
                />
              </Grid>

              <Grid item md={3} xs={12} >
                <TextField id="phone" label="Phone" defaultValue={props.datauser.phone} variant="outlined" fullWidth sx={{ mb: 1 }}   {...register("phone")} />
              </Grid>

              <Grid item md={6} xs={12} >
                <TextField id="address" label="Address" defaultValue={props.datauser.address?.address} variant="outlined" fullWidth sx={{ mb: 1 }}    {...register("address")} />
              </Grid>
              <Grid item md={12} xs={12} >
                {/* <Typography variant="body2" >About</Typography>   */}
                <TextField
                  fullWidth sx={{ mb: 1 }}
                  id="outlined-multiline-static"
                  label="About"
                  multiline
                  rows={4}
                  defaultValue={props.datauser.about}
                  {...register("about")} />
              </Grid>
              <Grid item md={2} xs={12} >
                <Button fullWidth size='small' type='submit' variant='contained' sx={{ mb: 7 }}>
                  Save
                </Button>
              </Grid>
            
              <Divider style={{ width: '100%' }} />
              <Grid item md={5} xs={12} >
                <Typography variant="h6"  >Social Media</Typography>
                <Typography variant="body1" >This is link social medias the company. Please fill it.</Typography>

              </Grid>
              <Grid item md={2} xs={12} marginTop={'20px'} >
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={sosmed} 
                  getOptionLabel={(option: any) => option.sosmed}
                  renderInput={(params) => <TextField {...params} label="Social Media" />}
                  onChange={(event: any, newValue: string | null) => getSosmed(newValue)}
                />

              </Grid>
              <Grid item md={3} xs={12} marginTop={'20px'} >
                <TextField id="usernamesosmed" label="Username" variant="outlined" fullWidth sx={{ mb: 1 }}   {...register("usernamesosmed")} />
              </Grid>
              <Grid item md={2} xs={12} marginTop={'20px'} >
                <Button size='small' variant='contained'  onClick={ handleSubmit(addbutton)}>
                  Add Account
                </Button>
              </Grid>

              <Grid item md={12} xs={12} marginTop={'20px'} >
                
              
              {socialAccountsArr.map(account => {
                return (
                  <Box
                    key={account.title}
                    sx={{
                      gap: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      '&:not(:last-of-type)': { mb: 2 }
                    }}
                  >
                    <Grid container xs={12} marginTop={'10px'}>
                      <Grid xs={10}  >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ mr: 12, minWidth: 45, display: 'flex', justifyContent: 'center' }}>
                            <img src={account.logo} alt={account.title} height='30' />
                          </Box>
                          <div>
                            <Typography sx={{ fontWeight: 500 }}>{account.title}</Typography>

                            {account.username}

                          </div>
                        </Box>


                      </Grid>
                      <Grid xs={1}   >
                        <label htmlFor="raised-button-file">
                          <Button size='small' variant="contained" component="span" color='error' >
                            Reset
                          </Button>
                        </label>
                      </Grid>
                    </Grid>
                  </Box>


                )
              })}
              </Grid>

              <Divider style={{ width: '100%' }} />
              <Box sx={{ marginTop: '20px' }}>

              </Box>

              <Grid item md={5} xs={12} >
                <Typography variant="h6"  >Gallery</Typography>
                <Typography variant="body1" >This is Gallery for the company. Please fill it.</Typography>

              </Grid>
              <Grid item md={5} display={{ xs: "none", lg: "block" }} > </Grid>
              <Grid item md={2} xs={12} marginTop={'20px'} >
                <Button size='small' variant='contained'  >
                  Upload Image
                </Button>
              </Grid>
              <Grid item md={12}>
                <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                  {itemData.map((item) => (
                    <ImageListItem key={item.img}>
                      <img
                        src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.title}
                        loading="lazy"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
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
