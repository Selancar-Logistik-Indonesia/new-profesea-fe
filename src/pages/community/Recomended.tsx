// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid' 
import Typography from '@mui/material/Typography' 
import { Paper } from '@mui/material'   
import { Icon } from '@iconify/react'

export type ParamMain = {
  company: string 
  title: string 
  forum: string 
  date: string 
  replies: string  
} 
 

 
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
          height={110}
            sx={{
              display: 'flex', 
              alignContent:'center', 
              '& svg': { color: 'text.secondary' } 
            }}
          > 
          
          <Grid container margin={2}>
            <Grid xs={9}>
                 <Typography variant='body1' sx={{   color: 'text.primary', textTransform: 'uppercase'  }}  fontWeight={600}>
                  {`${item.company.charAt(0).toUpperCase() + item.company.slice(1)}`}
                </Typography>
            </Grid>
            <Grid container xs={3} justifyContent="flex-end">
               <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>
                {`${item.forum.charAt(0).toUpperCase() + item.forum.slice(1)}`} 
              </Typography>
            </Grid>
             <Grid xs={12}>
                 <Typography variant='h6' sx={{   color: 'text.primary', textTransform: 'uppercase'  }}  fontWeight={600}>
                  {`${item.title.charAt(0).toUpperCase() + item.title.slice(1)}`}
                </Typography>
            </Grid>
              <Grid xs={9} >
                <Box display={'flex'}>
                   <Icon icon={'uil:comment'}  fontSize={15} />
                 <Typography variant='body1' sx={{   color: 'text.primary',   }} fontSize={10} fontWeight={600}>
                   
                   Replies ( {`${item.replies.charAt(0).toUpperCase() + item.replies.slice(1)}`} )
                  </Typography>

                </Box>
            </Grid>
            <Grid container xs={3} justifyContent="flex-end">
               <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>
                {`${item.date.charAt(0).toUpperCase() + item.date.slice(1)}`} 
              </Typography>
            </Grid>
          </Grid>
             
             
                  
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
