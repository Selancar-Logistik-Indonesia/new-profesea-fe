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

const UserCandidateHeader = (props:userProps) => {
  const [preview, setPreview] = useState()
  const [previewBanner, setPreviewBanner] = useState()
useEffect(() => {
   
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
          <Grid item xs={12} md={9}>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: ['center', 'flex-start']
              }}
            >
              <Box sx={{ mr: 4, display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}>
                <Icon icon='clarity:briefcase-solid' />
                <Typography variant='body1' sx={{ color: '#424242', fontWeight: 400 }}>
                  {props.datauser?.field_preference?.role_level?.levelName}
                  {/* <a href={facebook} target='_blank'>
                    {facebook}
                  </a> */}
                </Typography>
              </Box>
              <Box sx={{ mr: 4, display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}>
                <Icon icon='fontisto:ship' />
                <Typography variant='body1' sx={{ color: '#424242', fontWeight: 400 }}>
                  {props.datauser?.field_preference?.vessel_type?.name}
                  {/* <a href={instagram} target='_blank'>
                    {instagram}
                  </a> */}
                </Typography>
              </Box>

              <Box sx={{ mr: 4, display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}>
                <Icon icon='gis:route' />
                <Typography variant='body1' sx={{ color: '#424242', fontWeight: 400 }}>
                  {props.datauser?.field_preference?.region_travel?.name}
                  {/* <a href={linkedin} target='_blank'>
                    {linkedin}
                  </a> */}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={3} marginTop={'-5px'}>
            <Grid container direction='row' justifyContent='flex-end' alignItems='center'>
              <Box display={'flex'} alignItems={'center'}>
                <Typography>Available {props.datauser?.field_preference?.available_date}</Typography>
                <IconButton LinkComponent={Link} href='/candidate' sx={{ color: '#424242', fontWeight: 400 }}>
                  <Icon fontSize='medium' icon={'charm:pencil'} />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default UserCandidateHeader
