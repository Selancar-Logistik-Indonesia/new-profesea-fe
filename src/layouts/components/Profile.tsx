// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import { Alert, CardMedia, Divider } from '@mui/material'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { IUser } from 'src/contract/models/user'
import FieldPreference from 'src/contract/models/field_preference'
import { getUserAvatar, toLinkCase } from 'src/utils/helpers'
import { useAuth } from 'src/hooks/useAuth'

export type ParamJobVacncy = {
  judul: string
  namapt: string
  lokasi: string
  waktu: string
}

type activities = {
  total_connected: string
  total_visitor: string
  total_post_feed: string
  total_post_job: string
  total_applied_job: string
  total_post_thread: string
}

type userProps = {
  datauser: IUser | null
}
// const LinkStyled = styled(Link)(() => ({
//   textDecoration: 'none'
// }))
const ProfilePicture = styled('img')(({ theme }) => ({
  width: 85,
  height: 85,
  borderRadius: '50%',
  border: `5px solid ${theme.palette.common.white}`,
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  }
}))

const Profile = (props: userProps) => {
  // const [facebook, setFacebook] = useState<any>('-')
  // const [instagram, setInstagram] = useState<any>('-')
  // const [linkedin, setLinkedin] = useState<any>('-')
  const [selectedItem, setSelectedItem] = useState<FieldPreference | null>(null)
  const [activities, getActivities] = useState<activities>()
  const [documents, setDocuments] = useState<any[]>([])

  const { user } = useAuth()

  useEffect(() => {
    HttpClient.get('/user/field-preference', { user_id: props.datauser?.id }).then(response => {
      const { fieldPreference } = response.data as { fieldPreference: FieldPreference }
      setSelectedItem(fieldPreference)
    })

    HttpClient.get('/user/statistics?user_id=' + user?.id).then(response => {
      const code = response.data
      getActivities(code)
    })

    // HttpClient.get(AppConfig.baseUrl + '/user/sosmed?page=1&take=100&user_id=' + props.datauser?.id).then(response => {
    //   const code = response.data.sosmeds.data
    //   for (const element of code) {
    //     if (element.sosmed_type == 'Facebook') {
    //       setFacebook(element.sosmed_address)
    //     }
    //     if (element.sosmed_type == 'Instagram') {
    //       setInstagram(element.sosmed_address)
    //     }
    //     if (element.sosmed_type == 'LinkedIn') {
    //       setLinkedin(element.sosmed_address)
    //     }
    //   }
    // })

    HttpClient.get(AppConfig.baseUrl + '/user/candidate-document').then(response => {
      const itemData = response.data.documents

      setDocuments(itemData)
    })
  }, [props.datauser])

  const resolveEditHref = (role?: string) => {
    if (role == 'Seafarer') {
      return '/candidate'
    }

    if (role == 'Company') {
      return '/company'
    }

    if (role == 'Trainer') {
      return '/trainer'
    }

    return '/'
  }

  const link = `${props.datauser?.role === 'Seafarer' ? '/profile' : '/company'}/${props.datauser?.id}/${toLinkCase(
    props.datauser?.username
  )}`

  return (
    <Grid container>
      {/* <Grid item xs={12}>
        <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
          <CardContent sx={{ p: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
            <Box sx={{ mb: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', objectFit: 'Fill' }}>
              <ProfilePicture
                src={getUserAvatar(props.datauser!)}
                sx={{ width: 65, height: 65, objectFit: 'cover', mr: 3, mb: 3 }}
                alt='profile-picture'
              />
            </Box>
            <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant='body2' sx={{ color: '#32487A', fontWeight: 800, fontSize: '18px' }}>
                {props.datauser?.name}
              </Typography>
              <Typography variant='body2' sx={{ color: 'text.primary', fontSize: '14px', marginTop: '5px' }}>
                {props.datauser?.name}
              </Typography>
            </Box>
            {props.datauser?.role == 'Company' && (
              <Box sx={{ width: '100%', marginBottom: '20px' }}>
                {props.datauser?.verified_at == null && documents.length == 0 && (
                  <Alert
                    severity='info'
                    sx={{ marginTop: 2, marginBottom: 2, width: '100%', borderRadius: '0px !important' }}
                  >
                    <Typography sx={{ fontWeight: 600, color: 'text.primary' }}>
                      Please Upload your document to verify your company
                    </Typography>
                  </Alert>
                )}

                {props.datauser?.verified_at == null && documents.length > 0 && (
                  <Alert
                    severity='info'
                    sx={{ marginTop: 2, marginBottom: 2, width: '100%', borderRadius: '0px !important' }}
                  >
                    <Typography sx={{ fontWeight: 600, color: 'text.primary' }}>
                      Please wait for admin to verify
                    </Typography>
                  </Alert>
                )}
              </Box>
            )}

            <Divider
              sx={{ mt: theme => `${theme.spacing(2)} !important`, mb: theme => `${theme.spacing(2)} !important` }}
            />
            <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2.7 }} display={'flex'}>
              <Icon icon={'solar:user-id-bold-duotone'} fontSize={20} color={'#262525'} />
              <Typography variant='body1' sx={{ color: '#262525', fontWeight: 'bold' }}>
                User:
              </Typography>
              <Typography fontSize={12} sx={{ color: '#262525', fontWeight: 400 }}>
                {getUserRoleName(props.datauser?.team)}
              </Typography>
            </Box>
            <Box>
              {props.datauser?.role == 'Seafarer' && (
                <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2.7 }} display={'flex'}>
                  <Icon icon={'iconamoon:box-bold'} fontSize={20} color={'#262525'} />
                  <Typography variant='body1' sx={{ color: '#262525', fontWeight: 'bold' }}>
                    Type of User:
                  </Typography>
                  <Typography fontSize={12} sx={{ color: '#262525', fontWeight: 400 }}>
                    {getEmployeetype(props.datauser?.employee_type)}
                  </Typography>
                </Box>
              )}

              <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2.7 }} display={'flex'}>
                <Icon icon={'solar:mailbox-bold-duotone'} fontSize={20} color={'#262525'} />
                <Typography variant='body1' sx={{ color: '#262525', fontWeight: 'bold' }}>
                  Email:
                </Typography>
                <Typography fontSize={12} sx={{ color: '#262525', fontWeight: 400 }}>
                  {props.datauser?.email}
                </Typography>
              </Box>
            </Box>

            {props.datauser?.role == 'Company' && (
              <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2.7 }} display={'flex'}>
                <Icon icon={'solar:buildings-3-bold-duotone'} fontSize={20} color={'#262525'} />
                <Typography fontSize={12} sx={{ color: '#262525', fontWeight: 400 }}>
                  {props.datauser?.industry?.name}
                </Typography>
              </Box>
            )}
            <Divider
              sx={{ mt: theme => `${theme.spacing(2)} !important`, mb: theme => `${theme.spacing(2)} !important` }}
            />

            {props.datauser?.role == 'Seafarer' && (
              <Box>
                <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2.7 }} display={'flex'}>
                  <Icon icon={'solar:accessibility-bold-duotone'} fontSize={20} color={'#262525'} />
                  <Typography variant='body1' sx={{ color: '#262525', fontWeight: 'bold' }}>
                    Role :
                  </Typography>
                  <Typography fontSize={12} sx={{ color: '#262525', fontWeight: 400 }}>
                    {selectedItem?.role_type?.name}
                  </Typography>
                </Box>
                {props.datauser?.employee_type == 'onship' && (
                  <>
                    <Box
                      sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2.7, mt: 2.7 }}
                      display={'flex'}
                    >
                      <Icon icon={'icon-park-twotone:ship'} fontSize={20} color={'#262525'} />
                      <Typography variant='body1' sx={{ color: '#262525', fontWeight: 'bold' }}>
                        Vessel :
                      </Typography>
                      <Typography fontSize={12} sx={{ color: '#262525', fontWeight: 400 }}>
                        {selectedItem?.vessel_type?.name}
                      </Typography>
                    </Box>
                    <Box
                      sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2.7, mt: 2.7 }}
                      display={'flex'}
                    >
                      <Icon icon={'solar:routing-2-bold-duotone'} fontSize={20} color={'#262525'} />
                      <Typography variant='body1' sx={{ color: '#262525', fontWeight: 'bold' }}>
                        Region of Travel:
                      </Typography>
                      <Typography fontSize={12} sx={{ color: '#262525', fontWeight: 400 }}>
                        {selectedItem?.region_travel?.name}
                      </Typography>
                    </Box>
                  </>
                )}
              </Box>
            )}

            <Divider
              sx={{ mt: theme => `${theme.spacing(2)} !important`, mb: theme => `${theme.spacing(2)} !important` }}
            />

            {props.datauser?.role != 'Trainer' && (
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
                      <Icon icon='mdi:facebook' fontSize={20} color={'#262525'} />
                    </Box>
                    <Typography fontSize={12} sx={{ color: '#262525', fontWeight: 400 }}>
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
                  <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2.7, mt: 2.7 }} display={'flex'}>
                    <Box width={22} textAlign='center'>
                      <Icon icon='mdi:instagram' fontSize={20} color={'#262525'} />
                    </Box>
                    <Typography fontSize={12} sx={{ color: '#262525', fontWeight: 400 }}>
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
                      <Icon icon='mdi:linkedin' fontSize={20} color={'#262525'} />
                    </Box>
                    <Typography fontSize={12} sx={{ color: '#262525', fontWeight: 400 }}>
                      {linkedin}
                    </Typography>
                  </LinkStyled>
                </Box>
              </Box>
            )}

            {props.datauser?.id == user?.id && (
              <Box display='flex' justifyContent='right' alignItems='center'>
                <Button LinkComponent={Link} href={resolveEditHref(props.datauser?.role)}>
                  <IconButton>
                    <Icon
                      fontSize='large'
                      icon={'solar:pen-new-round-bold-duotone'}
                      color={'#32487A'}
                      style={{ fontSize: '20px' }}
                    />
                  </IconButton>
                  <div style={{ marginLeft: 5, fontWeight: 800, fontSize: '12px' }}>EDIT PROFILE</div>
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      </Grid> */}
      <Grid item xs={12}>
        <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
          <CardMedia
            component='img'
            alt='profile-header'
            image={props.datauser?.banner ? props.datauser?.banner : '/images/avatars/headerprofile3.png'}
            sx={{
              height: '100px',
              width: '100%',
              objectFit: 'cover',
              marginBottom: '-80px'
            }}
          />
          <CardContent sx={{ p: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                objectFit: 'Fill'
              }}
            >
              <Link href={link}>
                <ProfilePicture
                  src={getUserAvatar(props.datauser!)}
                  sx={{ width: 100, height: 100, objectFit: 'cover', my: 2 }}
                  alt='profile-picture'
                />
              </Link>
            </Box>
            <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Link href={link}>
                <Typography variant='body2' sx={{ color: '#32487A', fontWeight: 800, fontSize: '20px' }}>
                  {props.datauser?.name}
                </Typography>
              </Link>
              {props.datauser?.role === 'Seafarer' ? (
                <Typography variant='body2' sx={{ color: 'text.primary', fontSize: '16px', marginTop: '5px' }}>
                  {`${selectedItem?.open_to_opp === 0 ? '' : 'Open to Work /'} ${
                    props.datauser?.employee_type === 'onship'
                      ? selectedItem?.role_type?.name
                      : selectedItem?.job_category?.name
                  }`}
                </Typography>
              ) : (
                <Typography variant='body2' sx={{ color: 'text.primary', fontSize: '16px', marginTop: '5px' }}>
                  {props.datauser?.role} Account
                </Typography>
              )}
            </Box>
            {props.datauser?.role == 'Company' && (
              <Box sx={{ width: '100%', marginBottom: '20px' }}>
                {props.datauser?.verified_at == null && documents.length == 0 && (
                  <Alert
                    severity='info'
                    sx={{ marginTop: 2, marginBottom: 2, width: '100%', borderRadius: '0px !important' }}
                  >
                    <Typography sx={{ fontWeight: 600, color: 'text.primary' }}>
                      Please Upload your document to verify your company
                    </Typography>
                  </Alert>
                )}

                {props.datauser?.verified_at == null && documents.length > 0 && (
                  <Alert
                    severity='info'
                    sx={{ marginTop: 2, marginBottom: 2, width: '100%', borderRadius: '0px !important' }}
                  >
                    <Typography sx={{ fontWeight: 600, color: 'text.primary' }}>
                      Please wait for admin to verify
                    </Typography>
                  </Alert>
                )}
              </Box>
            )}

            <Divider sx={{ my: 3, borderBottomWidth: '3px' }} />
            <Box display='flex' justifyContent='left' alignItems='center'>
              <Link href={resolveEditHref(props.datauser?.role)}>
                <Typography variant='body2' sx={{ color: 'text.primary', fontSize: '14px', fontWeight: '600', ml: 3 }}>
                  Edit Profile
                </Typography>
              </Link>
            </Box>
            <Divider sx={{ my: 3, borderBottomWidth: '3px' }} />
            <Box display='flex' justifyContent='left' alignItems='center' marginBottom={2}>
              <Link href={link}>
                <Typography variant='body2' sx={{ color: 'text.primary', fontSize: '16px', fontWeight: '800', ml: 3 }}>
                  Profile
                </Typography>
              </Link>
            </Box>
            <Box display='flex' justifyContent='space-between' alignItems='center' marginBottom={4}>
              <Typography variant='body2' sx={{ color: 'text.primary', fontSize: '16px', fontWeight: '800', ml: 3 }}>
                Connections
              </Typography>
              <Typography variant='body2' sx={{ color: '#262525', fontSize: '16px' }}>
                {activities?.total_connected}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Profile
