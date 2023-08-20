// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import { Divider, IconButton } from '@mui/material'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { IUser } from 'src/contract/models/user'
import FieldPreference from 'src/contract/models/field_preference'
import { getUserRoleName } from 'src/utils/helpers'

export type ParamJobVacncy = {
  judul: string
  namapt: string
  lokasi: string
  waktu: string
}

type userProps = {
  datauser: IUser | null
}
const LinkStyled = styled(Link)(() => ({
  textDecoration: 'none'
}))
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
  const [selectedItem, setSelectedItem] = useState<FieldPreference | null>(null)

  useEffect(() => {
    HttpClient.get('/user/field-preference', { user_id: props.datauser?.id }).then(response => {
      const { fieldPreference } = response.data as { fieldPreference: FieldPreference };
      setSelectedItem(fieldPreference)
    });

    HttpClient.get(AppConfig.baseUrl + '/user/sosmed?page=1&take=100').then(response => {
      const code = response.data.sosmeds.data
      for (const element of code) {
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

  const resolveEditHref = (role?: string) => {
    if (role == "Seafarer") {
      return "/candidate";
    }

    if (role == "Company") {
      return "/company";
    }

    if (role == "Trainer") {
      return "/trainer";
    }

    return "/";
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
          <CardContent sx={{ p: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
          <Box sx={{ mb: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', objectFit: 'Fill' }}>
            <ProfilePicture src={props.datauser?.photo} sx={{ width: 65, height: 65, mr: 3, mb: 3 }} alt='profile-picture' />
            </Box>
            <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant='body2' sx={{ color: '#32487A', fontWeight: 500, fontSize: '14px' }}>
                {props.datauser?.name}
                </Typography>
            </Box>
            <Divider sx={{ mt: theme => `${theme.spacing(4)} !important` }} />
            <Box sx={{ pt: 2, pb: 1 }}>
              <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2.7 }} display={'flex'}>
                <Icon icon={'solar:buildings-3-bold-duotone'} fontSize={20} color={'#424242'} />
                <Typography fontSize={12} sx={{ color: '#424242', fontWeight: 400 }}>
                  {props.datauser?.industry?.name}
                </Typography>
              </Box>
              <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2.7 }} display={'flex'}>
                <Icon icon={'solar:mailbox-bold-duotone'} fontSize={20} color={'#424242'} />
                <Typography fontSize={12} sx={{ color: '#424242', fontWeight: 400 }}>
                  {props.datauser?.email}
                </Typography>
              </Box>
              <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2.7 }} display={'flex'}>
                <Icon icon={'solar:user-id-bold-duotone'} fontSize={20} color={'#424242'} />
                <Typography fontSize={12} sx={{ color: '#424242', fontWeight: 400 }}>
                  {getUserRoleName(props.datauser?.team)}
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ mt: theme => `${theme.spacing(4)} !important` }} />
            {props.datauser?.role == 'Seafarer' && (
              <Box>
                <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2.7, mt: 2.7 }} display={'flex'}>
                  <Icon icon={'solar:accessibility-bold-duotone'} fontSize={20} color={'#424242'} />
                  <Typography variant='body1' sx={{ color: '#424242', fontWeight: 'bold' }}>
                    Role :
                  </Typography>
                  <Typography fontSize={12} sx={{ color: '#424242', fontWeight: 400 }}>
                    {selectedItem?.role_type?.name}
                  </Typography>
                </Box>
                <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2.7, mt: 2.7 }} display={'flex'}>
                  <Icon icon={'icon-park-twotone:ship'} fontSize={20} color={'#424242'} />
                  <Typography variant='body1' sx={{ color: '#424242', fontWeight: 'bold' }}>
                    Vessel :
                  </Typography>
                  <Typography fontSize={12} sx={{ color: '#424242', fontWeight: 400 }}>
                    {selectedItem?.vessel_type?.name}
                  </Typography>
                </Box>
                <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2.7, mt: 2.7 }} display={'flex'}>
                  <Icon icon={'solar:routing-2-bold-duotone'} fontSize={20} color={'#424242'} />
                  <Typography variant='body1' sx={{ color: '#424242', fontWeight: 'bold' }}>
                    Region Of Travel:
                  </Typography>
                  <Typography fontSize={12} sx={{ color: '#424242', fontWeight: 400 }}>
                    {selectedItem?.region_travel?.name}
                  </Typography>
                </Box>
              </Box>
            )}

            {props.datauser?.role != 'Seafarer' && (
              <Box>
                <Box
                  sx={{
                    columnGap: 2,
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'row'
                  }}
                >
                  <LinkStyled
                    href={facebook}
                    target='_blank'
                    sx={{
                      columnGap: 2,
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      display: 'flex',
                      flexDirection: 'row'
                    }}
                  >
                    <Box width={22} textAlign='center'>
                      <Icon icon='mdi:facebook' fontSize={20} color={'#424242'} />
                    </Box>
                    <Typography fontSize={12} sx={{ color: '#424242', fontWeight: 400 }}>
                      {facebook}
                    </Typography>
                  </LinkStyled>
                </Box>
                <LinkStyled
                  href={instagram}
                  target='_blank'
                  sx={{
                    columnGap: 2,
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'row'
                  }}
                >
                  <Box
                    sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2.7, mt: 2.7 }}
                    display={'flex'}
                  >
                    <Box width={22} textAlign='center'>
                      <Icon icon='mdi:instagram' fontSize={20} color={'#424242'} />
                    </Box>
                    <Typography fontSize={12} sx={{ color: '#FFFFFF', fontWeight: 400 }}>
                      {instagram}
                    </Typography>
                  </Box>
                </LinkStyled>

                <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center' }} display={'flex'}>
                  <LinkStyled
                    href={linkedin}
                    target='_blank'
                    sx={{
                      columnGap: 2,
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      display: 'flex',
                      flexDirection: 'row'
                    }}
                  >
                    <Box width={22} textAlign='center'>
                      <Icon icon='mdi:linkedin' fontSize={20} color={'#424242'} />
                    </Box>
                    <Typography fontSize={12} sx={{ color: '#FFFFFF', fontWeight: 400 }}>
                      {linkedin}
                    </Typography>
                  </LinkStyled>
                </Box>
              </Box>
            )}

            <Box display='flex' justifyContent='right' alignItems='center'>
              <Link href={resolveEditHref(props.datauser?.role)}>
                <IconButton>
                  <Icon
                    fontSize='large'
                    icon={'material-symbols:edit'}
                    color={'#FFFFFF'}
                    style={{ fontSize: '24px' }}
                  />
                </IconButton>
              </Link>
            </Box>
          </CardContent>
        </Card>
        {/* <Card>
                    <CardContent>
                        <Box display='flex' justifyContent='center' alignItems='center'>
                            <ProfilePicture src={props.datauser?.photo} alt='profile-picture' />
                        </Box>

                        <Box display='flex' justifyContent='center' alignItems='center'>
                            <Typography fontSize={12} sx={{ color: '#32487A', fontWeight: 600, textTransform: 'uppercase' }}>
                                {props.datauser?.name}
                            </Typography>
                        </Box>

                        <Divider sx={{ mt: theme => `${theme.spacing(4)} !important` }} />
                        <Box sx={{ pt: 2, pb: 1 }}>
                            <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2.7 }} display={'flex'}>
                                <Icon icon={'material-symbols:corporate-fare-rounded'} fontSize={24} color={'#32487A'} />
                                <Typography fontSize={12} sx={{ color: '#424242', fontWeight: 400 }}>
                                    {props.datauser?.industry?.name}
                                </Typography>
                            </Box>
                            <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2.7 }} display={'flex'}>
                                <Icon icon={'material-symbols:mail'} fontSize={24} color={'#32487A'} />
                                <Typography fontSize={12} sx={{ color: '#424242', fontWeight: 400 }}>
                                    {props.datauser?.email}
                                </Typography>
                            </Box>
                            <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2.7 }} display={'flex'}>
                                <Icon icon={'material-symbols:badge-rounded'} fontSize={24} color={'#32487A'} />
                                <Typography fontSize={12} sx={{ color: '#424242', fontWeight: 400 }}>
                                    {getUserRoleName(props.datauser?.team)}
                                </Typography>
                            </Box>
                        </Box>
                        <Divider sx={{ mt: theme => `${theme.spacing(4)} !important` }} />
                        {props.datauser?.role == 'Seafarer' && (
                            <Box>
                                <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2.7, mt: 2.7 }} display={'flex'}>
                                    <Icon icon={'clarity:briefcase-solid'} fontSize={24} color={'#32487A'} />
                                    <Typography variant='body1' sx={{ color: '#424242', fontWeight: 'bold' }}>
                                        Role :
                                    </Typography>
                                    <Typography fontSize={12} sx={{ color: '#424242', fontWeight: 400 }}>
                                        {selectedItem?.role_type?.name}
                                    </Typography>
                                </Box>
                                <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2.7, mt: 2.7 }} display={'flex'}>
                                    <Icon icon={'fontisto:ship'} fontSize={24} color={'#32487A'} />
                                    <Typography variant='body1' sx={{ color: '#424242', fontWeight: 'bold' }}>
                                        Vessel :
                                    </Typography>
                                    <Typography fontSize={12} sx={{ color: '#424242', fontWeight: 400 }}>
                                        {selectedItem?.vessel_type?.name}
                                    </Typography>
                                </Box>
                                <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2.7, mt: 2.7 }} display={'flex'}>
                                    <Icon icon={'gis:route'} fontSize={24} color={'#32487A'} />
                                    <Typography variant='body1' sx={{ color: '#424242', fontWeight: 'bold' }}>
                                        Region Of Travel:
                                    </Typography>
                                    <Typography fontSize={12} sx={{ color: '#424242', fontWeight: 400 }}>
                                        {selectedItem?.region_travel?.name}
                                    </Typography>
                                </Box>
                            </Box>
                        )}

                        {props.datauser?.role != 'Seafarer' && (
                            <Box>
                                <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2.7, mt: 2.7, display: 'flex', flexDirection: 'row' }}>
                                    <Box width={22} textAlign='center'>
                                        <img src='/images/logos/facebook.png' alt='Facebook' height='20' />
                                    </Box>
                                    <Typography fontSize={12} sx={{ color: '#0a66c2', fontWeight: 400 }}>
                                        <a href={facebook} target='_blank' style={{ textDecoration: 'none' }}>
                                            {facebook}
                                        </a>
                                    </Typography>
                                </Box>
                                <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2.7, mt: 2.7 }} display={'flex'}>
                                    <Box width={22} textAlign='center'>
                                        <img src='/images/logos/instagram.png' alt='Instagram' height='20' />
                                    </Box>
                                    <Typography fontSize={12} sx={{ color: '#0a66c2', fontWeight: 400 }}>
                                        <a href={instagram} target='_blank' style={{ textDecoration: 'none' }}>
                                            {instagram}
                                        </a>
                                    </Typography>
                                </Box>
                                <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2.7, mt: 2.7 }} display={'flex'}>
                                    <Box width={22} textAlign='center'>
                                        <img src='/images/logos/linkedin.png' alt='Linkedin' height='20' />
                                    </Box>
                                    <Typography fontSize={12} sx={{ color: '#0a66c2', fontWeight: 400 }}>
                                        <a href={linkedin} target='_blank' style={{ textDecoration: 'none' }}>
                                            {linkedin}
                                        </a>
                                    </Typography>
                                </Box>
                            </Box>
                        )}

                        <Box display='flex' justifyContent='right' alignItems='center'>
                            <Link href={resolveEditHref(props.datauser?.role)}>
                                <IconButton>
                                    <Icon fontSize='large' icon={'material-symbols:edit'} color={'#ef6c00'} style={{ fontSize: '24px' }} />
                                </IconButton>
                            </Link>
                        </Box>
                    </CardContent>
                </Card> */}
      </Grid>
    </Grid>
  )
}

export default Profile
