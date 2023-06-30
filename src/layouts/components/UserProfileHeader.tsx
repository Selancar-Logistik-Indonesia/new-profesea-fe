// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
 
import Icon from 'src/@core/components/icon' 
import { Grid } from '@mui/material'
import { margin } from '@mui/system'

const ProfilePicture = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: theme.shape.borderRadius,
  border: `5px solid ${theme.palette.common.white}`,
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  }
}))

const UserProfileHeader = (props:any) => { 
  return  (
    <Card  >
      <CardMedia
        component='img'
        alt='profile-header'
        image='/images/avatars/headerprofile.png'
        sx={{
          height: { xs: 150, md: 200 },
          width: { xs: 150, md: 1048 },
          margin:'25px'
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
          marginLeft:  { md: '10px' },
          // marginTop:'125px'
        }}
      >
        <Box sx={{marginTop:'-40px'}}>
        <ProfilePicture src='/images/avatars/1.png' alt='profile-picture' sx={{borderRadius:'130px'}} />
        </Box>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            ml: { xs: 0, md: 6 },
            alignItems: 'flex-end',
            flexWrap: ['wrap', 'nowrap'],
            justifyContent: ['right', 'space-between'],
            
          }}
        >
           <Grid container>
                <Grid xs={12} md={12}>
                   <Typography variant='h5' sx={{  fontSize: '1.375rem' }}>
                    PT.SAMUDERA INDONESIA MARITIM
                  </Typography>
                </Grid>
                <Grid xs={12} md={6}>
                    <Typography variant='h6' sx={{  fontSize: '1.375rem' }}>
                      Shipping line
                    </Typography> 
                </Grid>
                <Grid xs={12} md={6} container   sx={{justifyContent:'right', display:'inline-flex' }}  > 
                        <Button size='small' variant='contained' sx={{margin:'5px'}} startIcon={<Icon icon='mdi:account-check-outline' fontSize={20}   />}>
                        Message
                      </Button>  
                        <Button color='warning'  size='small' variant='contained' sx={{margin:'5px'}}startIcon={<Icon icon='fa6-solid:link-slash' fontSize={20}   />}>
                        Unconnect
                      </Button>  
                        <Button color='error' size='small' variant='contained' sx={{margin:'5px'}} startIcon={<Icon icon='mdi:ban' fontSize={20}   />}>
                        Block  
                      </Button> 
                </Grid>
           </Grid>
         
       
        </Box>

      </CardContent>
      <CardContent>
        <Typography variant="body1"   >PT Samudera Indonesia Tbk adalah sebuah perusahaan logistik dan pelayaran yang berkantor pusat di Jakarta, Indonesia. Untuk mendukung kegiatan bisnisnya, hingga tahun 2022, perusahaan ini memiliki 150+ anak perusahaan, cabang, dan kantor yang tersebar di seantero Asia.</Typography>
        <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: ['center', 'flex-start']
              }}
            >
              <Box sx={{display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}>
                {/* <Icon icon={designationIcon} /> */}
                {/* <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>teest 2</Typography> */}
                <Icon icon={'mdi:location'} /> <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 600 }} >Jakarta, Indonesia 41361</Typography>
              </Box>
              
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: ['center', 'flex-start']
              }}
            >
              <Box sx={{  mr: 4,  display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}>
                <Icon icon='mdi:facebook' />
                <Typography variant='body1'>Pt.Samudera Indonesia Maritim</Typography>
              </Box>
              <Box sx={{ mr: 4,  display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}>
                <Icon icon='mdi:instagram' />
                <Typography variant='body1'>@Samudera Indonesia</Typography>
              </Box>
              
              <Box sx={{ mr: 4,  display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}>
                <Icon icon='mdi:linkedin' />
                <Typography variant='body1'>Samudera Indonesia</Typography>
              </Box>
            </Box>
      </CardContent>
    </Card>
  )  
}

export default UserProfileHeader
