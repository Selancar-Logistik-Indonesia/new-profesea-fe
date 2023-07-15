// ** React Imports 
// ** MUI Components
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Button, Divider, Grid, IconButton } from '@mui/material'
import Icon from 'src/@core/components/icon' 


import {IUser} from 'src/contract/models/user'
import Address from 'src/contract/models/address'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const ProfilePicture = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: theme.shape.borderRadius,
  border: `5px solid ${theme.palette.common.white}`,
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  }
}))

type userProps = {
  datauser: IUser;
  address : Address
}

const UserProfileHeader = (props:userProps) => {
  const [facebook, setFacebook] = useState<any>('-')
  const [instagram, setInstagram] = useState<any>('-')
  const [linkedin, setLinkedin] = useState<any>('-')
  const [preview, setPreview] = useState()
  const [previewBanner, setPreviewBanner] = useState()
useEffect(() => {
   HttpClient.get(AppConfig.baseUrl + '/user/sosmed?page=1&take=100').then(response => {
     const code = response.data.sosmeds.data
     for (let x = 0; x < code.length; x++) {
       const element = code[x]
       if (element.sosmed_type == 'Facebook') {
         setFacebook(element.sosmed_address)
       }
       if (element.sosmed_type == 'Instagram') {
         setInstagram(element.sosmed_address)
       }
       if (element.sosmed_type == 'Linkedin') {
         setLinkedin(element.sosmed_address)
       }
     }
   })
    HttpClient.get(AppConfig.baseUrl + '/user/' + props.datauser.id).then(response => {
      const code = response.data.user
      setPreview(code.photo)
      setPreviewBanner(code.banner)
    })
}, [])
 
   
  return (
    <Card sx={{ width: '100%' }}>
      <CardMedia
        component='img'
        alt='profile-header'
        image={previewBanner ? previewBanner : '/images/avatars/headerprofile.png'}
        sx={{
          height: { xs: 150, md: 250 },
          width: '100%'
        }}
      />
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
        <ProfilePicture src={preview ? preview : '/images/avatars/1.png'} alt='profile-picture' />
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            ml: { xs: 0, md: 6 },
            alignItems: 'flex-end',
            flexWrap: ['wrap', 'nowrap'],
            justifyContent: ['center', 'space-between']
          }}
        >
          <Box sx={{ mb: [4, 0], display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }}>
            <Typography variant='h6' sx={{ mb: 0, color: '#424242', fontWeight: 900 }}>
              {props.datauser.name}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: ['center', 'flex-start']
              }}
            >
              <Box sx={{ mr: 4, display: 'flex', alignItems: 'center', '& svg': { mr: 1 } }}>
                <Typography sx={{ color: '#424242', fontWeight: 600 }}>
                  {props.datauser.industry != null ? props.datauser.industry.name : props.datauser.role}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ justifyContent: 'right', display: 'inline-flex' }}>
            <Button
              size='small'
              variant='contained'
              sx={{ margin: '5px' }}
              startIcon={<Icon icon='mdi:account-check-outline' fontSize={20} />}
            >
              Message
            </Button>
            <Button
              color='warning'
              size='small'
              variant='contained'
              sx={{ margin: '5px' }}
              startIcon={<Icon icon='fa6-solid:link-slash' fontSize={20} />}
            >
              Unconnect
            </Button>
            <Button
              color='error'
              size='small'
              variant='contained'
              sx={{ margin: '5px' }}
              startIcon={<Icon icon='mdi:ban' fontSize={20} />}
            >
              Block
            </Button>
          </Box>
        </Box>
      </CardContent>
      <Divider style={{ width: '100%' }} />
      <CardContent>
        <Typography variant='body1' sx={{ color: '#424242', fontWeight: 500 }}>
          {props.datauser.about != null ? props.datauser.about : '-'}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: ['center', 'flex-start']
          }}
        >
          <Box
            sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 1, mt: 2, mb: 3, color: 'text.secondary' } }}
          >
            {/* <Icon icon={designationIcon} /> */}
            {/* <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>teest 2</Typography> */}
            <Icon icon={'mdi:location'} />{' '}
            <Typography variant='body1' sx={{ color: '#424242', fontWeight: 400 }}>
              {props.address != null ? props.address.city.city_name + ', ' + props.address.country.name : '-'}
            </Typography>
          </Box>
        </Box>
        <Grid container justifyContent='flex-end'>
          <Grid item xs={12} md={11}>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: ['center', 'flex-start']
              }}
            >
              <Box sx={{ mr: 4, display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}>
                <Icon icon='mdi:facebook' />
                <Typography variant='body1' sx={{ color: '#424242', fontWeight: 400 }}>
                  <a href={facebook} target='_blank'>
                    {facebook}
                  </a>
                </Typography>
              </Box>
              <Box sx={{ mr: 4, display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}>
                <Icon icon='mdi:instagram' />
                <Typography variant='body1' sx={{ color: '#424242', fontWeight: 400 }}>
                  <a href={instagram} target='_blank'>
                    {instagram}
                  </a>
                </Typography>
              </Box>

              <Box sx={{ mr: 4, display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}>
                <Icon icon='mdi:linkedin' />
                <Typography variant='body1' sx={{ color: '#424242', fontWeight: 400 }}>
                  <a href={linkedin} target='_blank'>
                    {linkedin}
                  </a>
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={1} marginTop={'-5px'}>
            <Grid container direction='row' justifyContent='flex-end' alignItems='flex-end'>
              <IconButton LinkComponent={Link} href='/company' sx={{ color: '#424242', fontWeight: 400 }}>
                <Icon fontSize='medium' icon={'charm:pencil'} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default UserProfileHeader
