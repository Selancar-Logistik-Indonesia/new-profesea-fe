import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
// import { styled } from '@mui/material/styles'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Divider, styled } from '@mui/material' 
 import Alumni from 'src/contract/models/alumni'

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
}

const UserProfileHeader = (props: userProps) => { 
 
    const { dataalumni } = props
      

    return (
      <Card sx={{ width: '100%', border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
        <CardMedia
          component='img'
          alt='profile-header'
          image={dataalumni.alumnibanner ? dataalumni.alumnibanner : '/images/avatars/headerprofile3.png'}
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
            top: 300,
            left: 50,
            width: 100,
            height: 100,
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
            marginLeft: { md: '10px' }
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
              <Typography variant='body2' sx={{ color: '#32487A', fontSize: '18px', fontWeight: '900' }}>
                {dataalumni.sekolah?.sekolah}
              </Typography>
              <Typography sx={{ color: '#262525', fontWeight: 600 }}>{dataalumni.description}</Typography>
            </Box>
          </Box>
        </CardContent>
        <Divider style={{ width: '100%' }} />
      </Card>
    )
}

export default UserProfileHeader
