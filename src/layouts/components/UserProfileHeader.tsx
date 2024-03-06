import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
// import { styled } from '@mui/material/styles'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Button, Divider, Grid } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { IUser } from 'src/contract/models/user'
import Address from 'src/contract/models/address'
import { HttpClient } from 'src/services'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from 'src/hooks/useAuth'
import ProfileActionArea from 'src/views/profile/action_area'
import ShareArea from './ShareArea'
import {   getEmployeetypev2 } from 'src/utils/helpers'
import TextOverImage from 'src/views/profile/photoprofile'
import TextOverImagebiru from 'src/views/profile/photoprofilebiru'

type userProps = {
    datauser: IUser;
    address: Address;
}

const UserProfileHeader = (props: userProps) => {
    const [facebook, setFacebook] = useState<any>('-')
    const [instagram, setInstagram] = useState<any>('-')
    const [linkedin, setLinkedin] = useState<any>('-')
    const [showFriendship, setShowFriendship] = useState<boolean>(false)
    const { user } = useAuth();
    const { datauser } = props;

    useEffect(() => {
        let userId = user?.id;
        if (user?.username != datauser.username) {
            setShowFriendship(true);
            userId = datauser.id;
        }

        const payload = { page: 1, take: 5, user_id: userId };
        HttpClient.get('/user/sosmed', payload).then(response => {
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
        })
    }, [user])

    return (
      <Card sx={{ width: '100%', border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
        <CardMedia
          component='img'
          alt='profile-header'
          image={datauser.banner ? datauser.banner : '/images/avatars/headerprofile3.png'}
          sx={{
            height: { xs: 150, md: 250 },
            width: '100%',
            objectFit: 'cover'
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
          }}
        >
          {datauser.team_id ==2 ?(
            <Box>
              {/* <ProfilePicture
                src={datauser.photo ? datauser.photo : '/images/avatars/profilepic.png'}
                alt='profile-picture'
                sx={{ width: 100, height: 100, objectFit: 'cover' }}
              /> */}
              <TextOverImage
                imageUrl={datauser.photo ? datauser.photo : '/images/avatars/profilepic.png'}
                text='Open To Work'
              />
            </Box>
          ):(
             <Box>
              {/* <ProfilePicture
                src={datauser.photo ? datauser.photo : '/images/avatars/profilepic.png'}
                alt='profile-picture'
                sx={{ width: 100, height: 100, objectFit: 'cover' }}
              /> */}
              <TextOverImagebiru
                imageUrl={datauser.photo ? datauser.photo : '/images/avatars/profilepic.png'} 
                 text='Hiring'
                 
              />
            </Box>
          )}
         

          <Box
            sx={{
              width: ['100%'],
              display: 'flex',
              ml: { xs: 0, md: 6 },
              alignItems: 'flex-end',
              flexWrap: ['wrap', 'nowrap'],
              justifyContent: ['center', 'space-between']
            }}
          >
            <Box sx={{ mb: [4, 0], display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }}>
              <Typography variant='h6' sx={{ mb: 0, color: '#262525', fontWeight: 900 }}>
                {datauser.name}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: ['center', 'flex-start']
                }}
              >
                <Box sx={{ mr: 4, display: 'flex', alignItems: 'center', '& svg': { mr: 1 } }}>
                  {datauser.employee_type != null ? (
                    <Typography sx={{ color: '#262525', fontWeight: 600 }}>
                      {getEmployeetypev2(datauser.employee_type)}
                    </Typography>
                  ) : (
                    <Typography sx={{ color: '#262525', fontWeight: 600 }}>
                      {datauser.industry != null ? datauser.industry.name : datauser.role}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
            <ProfileActionArea enabled={showFriendship} user={datauser} />
          </Box>
        </CardContent>
        <Divider style={{ width: '100%' }} />
        <CardContent>
         
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: ['center', 'flex-start']
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                '& svg': { mr: 1, mt: 2, mb: 3, color: 'secondary', fontSize: '18px' }
              }}
            >
              <Icon icon={'mdi:location'} />{' '}
              <Typography variant='body1' sx={{ color: '#262525', fontWeight: 400 }}>
                {props.address != null ? props.address?.city?.city_name + ', ' + props.address?.country?.name : '-'}
              </Typography>
            </Box>
          </Box>
          <Grid container justifyContent='flex-end'>
            <Grid item xs={12} md={10}>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: ['center', 'flex-start']
                }}
              >
                <Box
                  sx={{
                    mr: 4,
                    display: 'flex',
                    alignItems: 'center',
                    '& svg': { mr: 1, color: 'secondary', fontSize: '18px' }
                  }}
                >
                  <Icon icon='mdi:facebook' />
                  <Typography variant='body1' sx={{ color: '#262525', fontWeight: 400 }}>
                    <a href={facebook} target='_blank' style={{ textDecoration: 'none' }}>
                      {facebook}
                    </a>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    mr: 4,
                    display: 'flex',
                    alignItems: 'center',
                    '& svg': { mr: 1, color: 'secondary', fontSize: '18px' }
                  }}
                >
                  <Icon icon='mdi:instagram' />
                  <Typography variant='body1' sx={{ color: '#262525', fontWeight: 400 }}>
                    <a href={instagram} target='_blank' style={{ textDecoration: 'none' }}>
                      {instagram}
                    </a>
                  </Typography>
                </Box>

                <Box
                  sx={{
                    mr: 4,
                    display: 'flex',
                    alignItems: 'center',
                    '& svg': { mr: 1, color: 'secondary', fontSize: '18px' }
                  }}
                >
                  <Icon icon='mdi:linkedin' />
                  <Typography variant='body1' sx={{ color: '#262525', fontWeight: 400 }}>
                    <a href={linkedin} target='_blank' style={{ textDecoration: 'none' }}>
                      {linkedin}
                    </a>
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={2} marginTop={'-5px'}>
              {!showFriendship && (
                <>
                  <Grid container direction='row' justifyContent='flex-end' alignItems='flex-end'>
                    <Grid item>
                      {datauser.role == 'Company'  && (
                        <Button size='small' LinkComponent={Link} href='/company'>
                          <Icon
                            fontSize='large'
                            icon={'solar:pen-new-round-bold-duotone'}
                            style={{ fontSize: '18px' }}
                          />
                          <div style={{ marginLeft: 5 }}>EDIT</div>
                        </Button>
                      )}
                      {datauser.role == 'Seafarer' && (
                        <Button size='small' LinkComponent={Link} href='/candidate'>
                          <Icon
                            fontSize='large'
                            icon={'solar:pen-new-round-bold-duotone'}
                            style={{ fontSize: '18px' }}
                          />
                          <div style={{ marginLeft: 5 }}>EDIT</div>
                        </Button>
                      )}
                        {datauser.role == 'Trainer' && (
                        <Button size='small' LinkComponent={Link} href='/trainer'>
                          <Icon
                            fontSize='large'
                            icon={'solar:pen-new-round-bold-duotone'}
                            style={{ fontSize: '18px' }}
                          />
                          <div style={{ marginLeft: 5 }}>EDIT</div>
                        </Button>
                      )}
                    </Grid>
                    <Grid item>
                      <ShareArea
                        subject={`User Shared ${datauser.name}.`}
                        url={`/profile/${datauser.username}`}
                      ></ShareArea>
                    </Grid>
                  </Grid>
                </>
              )}
              {showFriendship && (
                <ShareArea subject={`User Shared ${datauser.name}.`} url={`/profile/${datauser.username}`}></ShareArea>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    )
}

export default UserProfileHeader
