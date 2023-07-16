// ** MUI Components
 
import Grid from '@mui/material/Grid' 
import { Button } from '@mui/material' 
 
import { styled } from '@mui/material/styles'
import {   TextareaAutosize } from '@mui/material' 

export type ParamMain = {
  logo: string 
  name: string 
  waktu: string 
  postcomment: string 
}
// const ProfilePicture = styled('img')(({ theme }) => ({
//   width: 45,
//   height: 45,
//   borderRadius: theme.shape.borderRadius,
//   border: `5px solid ${theme.palette.common.white}`,
//   [theme.breakpoints.down('md')]: {
//     marginBottom: theme.spacing(4)
//   }
// }))
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
  
 const CommentForm = ( ) => {
  
  // const parentId = props['parentid'];

      return ( 
          <Grid container justifyContent="flex-end">
          <Grid xs={12} md={12}>
            <StyledTextarea aria-label="empty textarea" placeholder="Write a reply" minRows={'3'}  title='tes' /> 
          </Grid>  
          <Grid container display={{ xs: "none", lg: "block" }} md={10}>  </Grid>
          <Grid justifyContent="flex-end" sx={{display:  { xs: 12, md: 2  ,justifyContent:'right'}}}>
          <Button size='small' color='primary' variant='contained' > Post Comment </Button>
          </Grid>
          </Grid>  
       
      ) 
}
 
export default CommentForm
