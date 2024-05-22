import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
// import { styled } from '@mui/material/styles'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Grid, IconButton, styled } from '@mui/material'
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
  dataalumni: Alumni
  iduser: string
}

const UserProfileHeader = (props: userProps) => {
  const { dataalumni, iduser } = props
  const onSelectFile2 = async (e: any) => {
    const json = {
      profilepicture: e.target.files[0]
    }
    try {
      const resp = await HttpClient.postFile('/alumni/updatephoto/' + dataalumni.id, json)
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
      <Box sx={{ position: 'relative', height: { xs: 150, md: 225 } }}>
        <CardMedia
          component='img'
          alt='profile-header'
          image={'/images/banner.jpeg'}
          sx={{
            height: '100%',
            width: '100%',
            objectFit: 'cover'
          }}
        />
        {iduser == String(dataalumni.id) && (
          <>
            <Box
              sx={{
                position: 'absolute',
                top: 10,
                right: 10,
                textAlign: 'center'
              }}
            >
              <IconButton sx={{ backgroundColor: '#DFDFDF' }}>
                <input
                  accept='image/png, image/gif, image/jpeg'
                  style={{ display: 'none', height: '100%', width: '100%' }}
                  id='raised-button-file-banner'
                  onChange={onSelectFile2}
                  type='file'
                />
                <Icon fontSize='large' icon={'mingcute:pencil-fill'} color={'black'} style={{ fontSize: '24px' }} />
              </IconButton>
            </Box>
          </>
        )}
      </Box>
      <CardContent
        sx={{
          p: 4,
          gap: { xs: 0, md: 4 },
          display: 'flex',
          justifyContent: 'flex-start',
          flexDirection: { xs: 'column', md: 'row' }
        }}
      >
        <ProfilePicture
          src={dataalumni?.profilepicture ? dataalumni?.profilepicture : '/images/avatars/1.png'}
          alt='profile-picture'
          sx={{
            width: 100,
            height: 100,
            border: theme => `5px solid ${theme.palette.common.white}`
          }}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Box sx={{ mr: 2, mb: 1, display: 'flex', flexDirection: 'column' }}>
            <Grid container direction='row' alignItems='center'>
              <Grid item>
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
    </Card>
  )
}

export default UserProfileHeader
