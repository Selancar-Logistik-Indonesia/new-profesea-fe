// ** React Imports 
// ** MUI Components
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { Button,  Grid } from '@mui/material'
import Icon from 'src/@core/components/icon' 

const ProfilePicture = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: theme.shape.borderRadius,
  border: `5px solid ${theme.palette.common.white}`, 
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  }
}))

const UserJobCompanyHeader = () => {
  return (  
    <Grid container>
      <Grid container xs={5}> 
         <Grid xs={4} display="flex" justifyContent="center" alignItems="center">
          <ProfilePicture src='/images/avatars/1.png' alt='profile-picture' />
        </Grid>
        <Grid xs={8} display="flex" justifyContent="center" alignItems="center">
          <Box    display="table-row"  justifyContent="left"  alignItems="left">
             <Typography variant='h6' sx={{ mb: 0, color: "#424242", fontWeight: 900 }}>
              JUNIOR ELECTRICAL
            </Typography>
            <Typography sx={{ color: "#424242", fontWeight: 600 }}>PT Samudera Indonesia Maritim</Typography>
            <Box  >
              <Button color='warning' size='small' variant='contained'   startIcon={<Icon icon='fa6-regular:pen-to-square' fontSize={20} />}>
                Edit Job Posting
              </Button>
              <Button   size='small' variant='contained' sx={{ margin: '5px' }} startIcon={<Icon icon='solar:share-outline' fontSize={20}  color='white'/>}>
                Share
              </Button> 
            </Box>
          </Box>
              
        </Grid>
      </Grid>
      <Grid xs={7}>
        <Box>
          < img src='/images/avatars/headerprofile.png' style={{ maxWidth:'100%', borderRadius:'10px'}}/>
        </Box>
          
      </Grid> 
     
    </Grid>
        
  )
}

export default UserJobCompanyHeader
