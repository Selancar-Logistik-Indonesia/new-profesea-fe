// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid' 
import Typography from '@mui/material/Typography' 
  
import { styled } from '@mui/material/styles'
import { Paper } from '@mui/material'   

export type ParamMain = {
  name: string 
  skill: string 
  location: string  
}
const ProfilePicture = styled('img')(({ theme }) => ({
  width: 75,
  height: 75,
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
          height={95}
            sx={{
              display: 'flex', 
              alignContent:'center', 
              '& svg': { color: 'text.secondary' } 
            }}
          > 
          
           <Box sx={{ display: 'flex',justifyContent:'center'}} marginTop={3} marginLeft={2}>
              <ProfilePicture src='/images/avatars/1.png' alt='profile-picture' sx={{borderRadius:'130px'}} />
            </Box>
            <Box sx={{ padding:'5',  display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }} marginTop={3}>
              <Box margin={1}>
                <Typography variant='body1' sx={{   color: 'text.primary', textTransform: 'uppercase'  }}  fontWeight={600}>
                  {`${item.skill.charAt(0).toUpperCase() + item.skill.slice(1)}`}
                </Typography>
              </Box>
               <Box margin={1}>
                 <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>
                {`${item.name.charAt(0).toUpperCase() + item.name.slice(1)}`} 
              </Typography> 
              </Box>
                <Box margin={1} display={'flex'}>
                 <Typography sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Location : 
                </Typography> 
                 <Typography sx={{ fontWeight: 600, color: 'text.secondary' }} ml="0.5rem" >
                {`${item.location.charAt(0).toUpperCase() + item.location.slice(1)}`} 
                </Typography> 
              </Box>
             
               
            </Box>  
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
         
            <Box  > 
              {renderList(paramcomment)} 
            </Box> 
            
      </Grid>
      
    </Grid>
  )
}

export default Recomended
