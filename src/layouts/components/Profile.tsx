// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import { Button, Divider } from '@mui/material'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { IUser } from 'src/contract/models/user'

export type ParamJobVacncy = {
  judul: string
  namapt: string
  lokasi: string
  waktu: string
}
type userProps = {
  datauser: any
}
// export type ProfileTeamsType = ProfileTabCommonType & { color: ThemeColor }

const ProfilePicture = styled('img')(({ theme }) => ({
  width: 85,
  height: 85,
  borderRadius: theme.shape.borderRadius,
  border: `5px solid ${theme.palette.common.white}`,
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  }
}))

const Profile = (props: userProps) => {
  const [facebook, setFacebook] = useState<any>('-')
  const [instagram, setInstagram] = useState<any>('-')
  const [linkedin, setLinkedin] = useState<any>('-') 
  const [selectedItem, setSelectedItem] = useState<IUser | null>(null)
  useEffect(() => {
     HttpClient.get(AppConfig.baseUrl + '/user/' + props.datauser.id).then(response => {
       const user = response.data.user as IUser
       setSelectedItem(user)
     })
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
    });
  }, [])

  return (
    <Grid container>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box display='flex' justifyContent='center' alignItems='center'>
              <ProfilePicture src={props.datauser?.photo} alt='profile-picture' sx={{ borderRadius: '130px' }} />
            </Box>
            <Box display='flex' justifyContent='center' alignItems='center'>
              <Typography variant='body1' sx={{ color: 'text.primary', textTransform: 'uppercase' }}>
                <a href='/home' target='_blank'>
                  {props.datauser?.name}
                </a>
              </Typography>
            </Box>
            <Box display='flex' justifyContent='center' alignItems='center'>
              <Typography sx={{ color: 'text.secondary' }}> {props.datauser?.industry?.name}</Typography>
            </Box>
            <Divider sx={{ marginTop: '10px' }} />
            {props.datauser?.role == 'Seafarer' && (
              <Box>
                <Box
                  sx={{ mr: 4, display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}
                  fontSize={'25px'}
                  marginTop={'3px'}
                >
                  <Grid xs={1}>
                    <Icon icon='clarity:briefcase-solid' />
                  </Grid>
                  <Grid item container xs={10} alignItems={'center'}>
                    <Typography variant='body1' sx={{ color: '#424242', fontWeight: 'bold' }}>
                      Role :
                    </Typography>
                    <Typography variant='body1' sx={{ color: '#424242', fontWeight: 400 }}>
                      {selectedItem?.field_preference?.role_level?.levelName}
                    </Typography>
                  </Grid>
                </Box>
                <Box
                  sx={{ mr: 4, display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}
                  fontSize={'25px'}
                  marginTop={'3px'}
                >
                  <Grid xs={1}>
                    <Icon icon='fontisto:ship' />
                  </Grid>
                  <Grid item container xs={10} alignItems={'center'}>
                    <Typography variant='body1' sx={{ color: '#424242', fontWeight: 'bold' }}>
                      Vessel :
                    </Typography>
                    <Typography variant='body1' sx={{ color: '#424242', fontWeight: 400 }}>
                      {selectedItem?.field_preference?.vessel_type?.name}
                    </Typography>
                  </Grid>
                </Box>
                <Box
                  sx={{ mr: 4, display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}
                  fontSize={'25px'}
                  marginTop={'3px'}
                >
                  <Grid xs={1}>
                    <Icon icon='gis:route' />
                  </Grid>
                  <Grid item container xs={10} alignItems={'center'}>
                    <Typography variant='body1' sx={{ color: '#424242', fontWeight: 'bold' }}>
                      Region Of Travel :
                    </Typography>
                    <Typography variant='body1' sx={{ color: '#424242', fontWeight: 400 }}>
                      {selectedItem?.field_preference?.region_travel?.name}
                    </Typography>
                  </Grid>
                </Box>
              </Box>
            )}
            {props.datauser?.role != 'Seafarer' && (
              <Box>
                <Box
                  sx={{ mr: 4, display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}
                  fontSize={'25px'}
                  marginTop={'5px'}
                >
                  <Grid item container xs={1}>
                    <Box sx={{ mr: 6, minWidth: 5, display: 'flex', justifyContent: 'center' }}>
                      <img src='/images/logos/facebook.png' alt='Facebook' height='20' />
                    </Box>
                  </Grid>

                  <Grid item container xs={10}>
                    <Typography variant='body1' sx={{ color: '#424242', fontWeight: 400 }}>
                      <a href={facebook} target='_blank'>
                        {facebook}
                      </a>
                    </Typography>
                  </Grid>
                </Box>

                <Box
                  sx={{ mr: 4, display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}
                  fontSize={'25px'}
                  marginTop={'5px'}
                >
                  <Grid item container xs={1}>
                    <Box sx={{ mr: 6, minWidth: 5, display: 'flex', justifyContent: 'center' }}>
                      <img src='/images/logos/instagram.png' alt='Instagram' height='20' />
                    </Box>
                  </Grid>

                  <Grid item container xs={10}>
                    <Typography variant='body1' sx={{ color: '#424242', fontWeight: 400 }}>
                      <a href={instagram} target='_blank'>
                        {instagram}
                      </a>
                    </Typography>
                  </Grid>
                </Box>

                <Box
                  sx={{ mr: 4, display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}
                  fontSize={'25px'}
                  marginTop={'5px'}
                >
                  <Grid item container xs={1}>
                    <Box sx={{ mr: 6, minWidth: 5, display: 'flex', justifyContent: 'center' }}>
                      <img src='/images/logos/linkedin.png' alt='Linkedin' height='20' />
                    </Box>
                  </Grid>

                  <Grid item container xs={10}>
                    <Typography variant='body1' sx={{ color: '#424242', fontWeight: 400 }}>
                      <a href={linkedin} target='_blank'>
                        {linkedin}
                      </a>
                    </Typography>
                  </Grid>
                </Box>
              </Box>
            )}
            <Box display='flex' justifyContent='center' alignItems='center'>
              {props.datauser?.role == 'Seafarer' && (
                <Link style={{ width: '100%', minWidth: '100%' }} href={'/candidate'}>
                  <Button variant='contained' sx={{ width: '100%', mt: 3, minWidth: '100%' }}>
                    Edit My Profile
                  </Button>
                </Link>
              )}
              {props.datauser?.role == 'Company' && (
                <Link style={{ width: '100%', minWidth: '100%' }} href={'/company'}>
                  <Button variant='contained' sx={{ width: '100%', mt: 3, minWidth: '100%' }}>
                    Edit My Profile
                  </Button>
                </Link>
              )}
              {props.datauser?.role == 'Trainer' && (
                <Link style={{ width: '100%', minWidth: '100%' }} href={'/trainer'}>
                  <Button variant='contained' sx={{ width: '100%', mt: 3, minWidth: '100%' }}>
                    Edit My Profile
                  </Button>
                </Link>
              )}
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Profile
