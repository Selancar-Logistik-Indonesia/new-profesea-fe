// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'    
import { styled } from '@mui/material/styles'
import { Button, Divider,  IconButton } from '@mui/material' 
import Icon from 'src/@core/components/icon'
import Link from 'next/link'

export type ParamJobVacncy = {
  judul: string
  namapt: string
  lokasi: string
  waktu: string
}

// export type ProfileTeamsType = ProfileTabCommonType & { color: ThemeColor }
interface Props {
  // teams: ProfileTeamsType[]
  vacancy: ParamJobVacncy[] 
}
const ProfilePicture = styled('img')(({ theme }) => ({
  width: 65,
  height: 65,
  borderRadius: theme.shape.borderRadius,
  border: `5px solid ${theme.palette.common.white}`,
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  }
})) 

const Profile = (props: Props) => {
  const {   vacancy  } = props

const renderList = (arr: ParamJobVacncy[]) => {
   if (arr && arr.length) return null 
}

  return (
    <Grid container  >
      <Grid item xs={12}>
        <Card>
          <CardContent>
             <Box display="flex"
                justifyContent="center"
                alignItems="center" >
                  <ProfilePicture src='/images/avatars/1.png' alt='profile-picture' sx={{borderRadius:'130px'}} />
              </Box> 
              <Box display="flex"
                justifyContent="center"
                alignItems="center" >
              
               <Typography variant='body1' sx={{  color: 'text.primary', textTransform: 'uppercase' }}>
                PT Samudera Indonesia Maritim
              </Typography>
             </Box> 
             <Box display="flex"
                justifyContent="center"
                alignItems="center" > 
             <Typography sx={{ color: 'text.secondary' }}>
                Shipping Line
              </Typography>
             </Box>
             
              <Divider sx={{marginTop:'10px'}}/>
             <Box display="flex"
                justifyContent="center"
                alignItems="center" >
              
                <Typography sx={{ color: 'text.secondary' }}>
                <IconButton>
                        <Icon icon={'mdi:web-check'} />  <Typography variant='body1' sx={{ color: "#424242", fontWeight: 600 }}>Website: https://www.samudera.id/</Typography>
                </IconButton>  
              </Typography>
             </Box>
              <Box display="flex"
                justifyContent="center"
                alignItems="center" >
                <Button variant='contained'  sx={{ width: '100%', padding: 1, margin: 2 }}>  <Link href={"/company"}>Edit My Profile</Link></Button>
             </Box> 
              {renderList(vacancy)} 
           
          </CardContent>
        </Card>
      </Grid>
      
    </Grid>
  )
}

export default Profile
