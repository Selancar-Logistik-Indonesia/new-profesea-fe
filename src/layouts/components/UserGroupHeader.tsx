import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
// import { styled } from '@mui/material/styles'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import {   Divider } from '@mui/material' 
 import Group from 'src/contract/models/group'
 
type userProps = {
    datagroup: Group; 
}

const UserProfileHeader = (props: userProps) => { 
 
    const { datagroup } = props
      

    return (
      <Card sx={{ width: '100%', border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
        <CardMedia
          component='img'
          alt='profile-header'
          image={datagroup.groupbanner ? datagroup.groupbanner : '/images/avatars/headerprofile3.png'}
          sx={{
            height: { xs: 150, md: 250 },
            width: '100%',
            objectFit: 'cover'
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
              width: ['100%'],
              display: 'flex',
              ml: { xs: 0, md: 0 },
              alignItems: 'flex-end',
              flexWrap: ['wrap', 'nowrap'],
              justifyContent: ['center', 'space-between']
            }}
          >
            <Box sx={{ mb: [4, 0], display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }}>
            <Typography variant='body2' sx={{ color: '#32487A', fontSize: '18px', fontWeight: '900' }}>
                {datagroup.title}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: ['center', 'flex-start']
                }}
              >
                <Box sx={{ mr: 4, display: 'flex', alignItems: 'center', '& svg': { mr: 1 } }}>
                  <Typography sx={{ color: '#262525', fontWeight: 600 }}>{datagroup.description}</Typography>
                </Box>
              </Box>
            </Box>
          </Box>

        </CardContent>
        <Divider style={{ width: '100%' }} />
      </Card>
    )
}

export default UserProfileHeader
