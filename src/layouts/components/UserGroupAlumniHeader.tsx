import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
// import { styled } from '@mui/material/styles'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import {   Divider, Grid, styled } from '@mui/material' 
import Alumni from 'src/contract/models/alumni'
import { Icon } from '@iconify/react'
import { toast } from 'react-hot-toast'
import { HttpClient } from 'src/services'
 
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
    dataalumni: Alumni; 
    iduser: string
}

const UserProfileHeader = (props: userProps) => { 
 
    const { dataalumni,iduser } = props
    const onSelectFile2 = async (e: any) => {
    debugger;
      const json = {
        profilepicture: e.target.files[0]
      }
      try {
        console.log(json)
        const resp = await HttpClient.postFile('/alumni/updatephoto/'+dataalumni.id, json)
        if (resp.status != 200) {
          throw resp.data.message ?? 'Something went wrong create alumni!'
        } 
        toast.success(` Update Poto successfully!`)
        window.location.reload()
      } catch (error) {
        toast.error(`Opps ${error}`)
      }
    }

    return (
      <Card sx={{ width: '100%', border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
        <CardMedia
          component='img'
          alt='profile-header'
          image={'/images/banner.jpeg'}
          sx={{
            height: { xs: 150, md: 250 },
            width: '100%',
            objectFit: 'cover'
          }}
        />
        <ProfilePicture
          src={dataalumni?.profilepicture ? dataalumni?.profilepicture : '/images/avatars/1.png'}
          alt='profile-picture'
          sx={{
            top:{ xs: 280, md: 300 } ,
            left:{ xs: 25, md: 50 } ,
            width: { xs: 100, md: 100 },
            height: { xs: 100, md: 100 },
            position: 'absolute',
            border: theme => `5px solid ${theme.palette.common.white}`
          }}
        />
       
        <CardContent
          sx={{
            pt: 0,
            mt: 0,
            display: 'flex',
            alignItems: 'flex-end',
            flexWrap: { xs: 'wrap', md: 'nowrap' },
            justifyContent: { xs: 'center', md: 'flex-start' },
            marginLeft: {xs:'60px', md: '10px' }
          }}
        >
          <Box
            sx={{
              mt: 15.75,
              mb: 5.25,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Box sx={{ mr: 2, mb: 1, display: 'flex', flexDirection: 'column' }}>
              {iduser == String(dataalumni.id) &&
              <>
                 <input
                      accept="image/png, image/gif, image/jpeg" 
                      style={{ display: 'none', height: 50, width: '100%' }}
                      id='raised-button-file-banner'
                      onChange={onSelectFile2}
                      type='file'
                    ></input> 
               <Box  sx={{
                      top:{ xs: 355, md: 370 } ,
                      left:{ xs: 100, md: 127 } ,
                      width: { xs: 100, md: 100 },
                      height: { xs: 100, md: 30 },
                      position: 'absolute', 
                    }}>
                <label htmlFor='raised-button-file-banner'>
                <Icon fontSize='large' icon={'bi:camera'} color={'white'} style={{ fontSize: '26px' }} />
              </label>
              </Box>
               
                 
              </>
              
              }
              
              <Grid container direction='row' alignItems='center'  >
                
                <Grid item  >
                  <Typography variant='body2' sx={{ color: '#32487A', fontSize: '18px', fontWeight: '900' }}>
                    {dataalumni.description}
                  </Typography>
                </Grid>
                {dataalumni.statusaktif == true && (
                  <Grid item ml={2}>
                    <Typography sx={{ color: '#262525', fontWeight: 600 }}>
                      <Icon
                        fontSize='large'
                        icon={'solar:verified-check-bold'}
                        color={'info'}
                        style={{ fontSize: '22px', color: 'green' }}
                      />
                    </Typography>
                  </Grid>
                )}
              </Grid>
              <Typography sx={{ color: '#262525', fontWeight: 600 }}>
                Institution : {dataalumni.sekolah?.sekolah}
              </Typography>

              <Typography sx={{ color: '#262525', fontWeight: 600 }}>{dataalumni.totalmember} Member</Typography>
            </Box>
          </Box>
        </CardContent>
        <Divider style={{ width: '100%' }} />
      </Card>
    )
}

export default UserProfileHeader
