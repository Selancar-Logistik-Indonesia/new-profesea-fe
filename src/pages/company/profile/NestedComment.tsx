// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { Button } from '@mui/material'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
 
import Icon from 'src/@core/components/icon' 
import { styled } from '@mui/material/styles'
import { Paper, TextareaAutosize } from '@mui/material' 
import CommentForm from './CommentForm'
import { useState } from 'react'

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
  const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
  };

  const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
  };

  const StyledTextarea = styled(TextareaAutosize)(
    ({ theme }) => `
    width: 100%;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
  );
// export type ProfileTeamsType = ProfileTabCommonType & { color: ThemeColor }
interface Props {
  // teams: ProfileTeamsType[]
  paramcomment: ParamMain[] 
}
function CommentActions({
  commentId, replycount
}:{
  commentId : string;
  replycount: string;
}){
  const [replying,setreplying] = useState(false);
  return(
    <> 
    <Button size='small' color='primary'  startIcon={<Icon icon='mdi:comment-outline'  fontSize={10}/>}  onClick={()=> setreplying(!replying)}>{replycount} Comment</Button> 
    {replying && <CommentForm parentId={commentId}/> }
    </>
  )
}
const renderList = (arr: ParamMain[]) => {
  if (arr && arr.length) {
    return arr.map((item, index) => {
      return (
        <Paper sx={{marginTop:'10px'}}>
          <Box
            key={index}
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
           <Box >
             <Button size='small' color='primary'  startIcon={<Icon icon='mdi:like-outline'  fontSize={10}/>} > Like</Button>
             {/* <Button size='small' color='primary'  startIcon={<Icon icon='mdi:comment-outline'  fontSize={10}/>}> Comment</Button> */}
             <CommentActions commentId='1' replycount='1'/>
             <Button size='small' color='primary'  startIcon={<Icon icon='ic:round-repeat'  fontSize={10}/>}> Repost</Button>
             <Button size='small' color='primary' startIcon={<Icon icon='solar:share-linear'  fontSize={10}/>} > Share</Button>
            {/* <Typography href='/tes' component={Link}>
              tes
            </Typography> */} 
            {/* <CommentForm></CommentForm> */}
           </Box>
        </Paper>
        
      )
    })
  } else {
    return null
  }
}
 

const NestedComment = (props: Props) => {
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

export default NestedComment
