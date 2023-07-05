// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
   
import { styled } from '@mui/material/styles'
import { Button } from '@mui/material'
import { Icon } from '@iconify/react'

const ProfilePicture = styled('img')(({ theme }) => ({
  width: 45,
  height: 45,
  borderRadius: theme.shape.borderRadius,
  border: `5px solid ${theme.palette.common.white}`,
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  }
})) 
export type ParamFeed = {
  name: string
  talent: string 
}

// export type ProfileTeamsType = ProfileTabCommonType & { color: ThemeColor }
interface Props {
  // teams: ProfileTeamsType[]
  feed: ParamFeed[] 
}

const renderList = (arr: ParamFeed[]) => {
  if (arr && arr.length) {
    return arr.map((item, index) => {
      return (
        <Box
          key={index}
          sx={{
            display: 'flex',
            '&:not(:last-of-type)': { mb: 4 },
            '& svg': { color: 'text.secondary' }
            ,border:'1px solid var(--light-action-disabled-background, rgba(76, 78, 100, 0.12))',borderRadius:'10px',padding:'5px'
          }}
        >
         
 
            <Grid container>
             <Grid  xs={2}>
                <ProfilePicture src='/images/avatars/1.png' alt='profile-picture' sx={{borderRadius:'130px'}} />
            </Grid>
            <Grid xs={10}>
                  <Box sx={{display: 'flex'}}> 
                    <Typography sx={{ color: 'text.primary' }}>
                      {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                    </Typography>
                  </Box>
                  <Box sx={{display: 'flex'}}> 
                    <Typography sx={{ color: 'text.secondary' }}>
                      {item.talent.charAt(0).toUpperCase() + item.talent.slice(1)}
                    </Typography>
                  </Box>
                  <Box display="flex"
                        justifyContent="left"
                        alignItems="left" >
                  <Button  variant='contained' size='small'startIcon={<Icon icon={'material-symbols:add'} color='white' />} >  Connect</Button>
             </Box>
           
            </Grid>
            </Grid>
           
        
          
             
        </Box>
      )
    })
  } else {
    return null
  }
}
 

const Feed = (props: Props) => {
  const {   feed  } = props

  return (
    <Grid container  >
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box sx={{ mb: 7 }}>
              <Typography variant='h6' sx={{ mb: 4, color: 'text.primary', textTransform: 'uppercase' }}>
                Add To Your Feed
              </Typography>
              {renderList(feed)}
            </Box>
            {/* <Box sx={{ mb: 7 }}>
              <Typography variant='body2' sx={{ mb: 4, color: 'text.disabled', textTransform: 'uppercase' }}>
                Contacts
              </Typography>
              {renderList(contacts)}
            </Box> */}
           
          </CardContent>
        </Card>
      </Grid>
      
    </Grid>
  )
}

export default Feed
