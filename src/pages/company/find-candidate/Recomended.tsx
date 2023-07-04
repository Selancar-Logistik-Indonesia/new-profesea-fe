// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card' 
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
  
import { styled } from '@mui/material/styles'
import { Paper } from '@mui/material'   

export type ParamMain = {
  logo: string 
  name: string 
  waktu: string 
  postcomment: string 
}
const ProfilePicture = styled('img')(({ theme }) => ({
  width: 45,
  height: 45,
  borderRadius: theme.shape.borderRadius,
  border: `5px solid ${theme.palette.common.white}`,
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  }
}))
 

 
// export type ProfileTeamsType = ProfileTabCommonType & { color: ThemeColor }
interface Props {
  // teams: ProfileTeamsType[]
  paramcomment: ParamMain[] 
}
 
const renderList = (arr: ParamMain[]) => {
  if (arr && arr.length) {
    return arr.map((item, index) => {
      return (
        <Paper sx={{marginTop:'10px'}} key={index}>
          <Box
            
            sx={{
              display: 'flex', 
              '& svg': { color: 'text.secondary' } 
            }}
          > 
           <Box  >
              <ProfilePicture src='/images/avatars/1.png' alt='profile-picture' sx={{borderRadius:'130px'}} />
            </Box>
            <Box sx={{ mb: [6, 0], display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }}>
              <Typography variant='body2' sx={{   color: 'text.primary', textTransform: 'uppercase' }}>
                {`${item.name.charAt(0).toUpperCase() + item.name.slice(1)}`}
              </Typography>
              <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>
                {`${item.waktu.charAt(0).toUpperCase() + item.waktu.slice(1)}`} 
              </Typography> 
            </Box>  
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft:'10px'  }}>
                <Typography variant="body1" >
                 {`${item.postcomment.charAt(0).toUpperCase() + item.postcomment.slice(1)}`} 
              </Typography>
           </Box>
           
        </Paper>
        
      )
    })
  } else {
    return null
  }
}
 

const Recomended = (props: Props) => {
  const {   paramcomment  } = props

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box  > 
              {renderList(paramcomment)}
              
             
            </Box> 
           
          </CardContent>
        </Card>
      </Grid>
      
    </Grid>
  )
}

export default Recomended
