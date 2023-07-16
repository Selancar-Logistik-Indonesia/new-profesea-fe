import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { Button, Card, CardMedia, TextField, TextareaAutosize } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useAuth } from 'src/hooks/useAuth'

export type ParamMain = {
  logo: string
  name: string
  waktu: string
  postcomment: string
};

const ProfilePicture = styled('img')(({ theme }) => ({
  width: 75,
  height: 75,
  borderRadius: theme.shape.borderRadius,
  border: `5px solid ${theme.palette.common.white}`,
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  }
}));

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

const Postfeed = (props: any) => {
  const parentId = props['parentid'];
  const { user } = useAuth();

  const userPhoto = (user?.photo) ? user.photo : "/images/avatars/default-user.png";
  return (
    <Card>
      <CardMedia>
        <Grid container paddingRight={5} paddingTop={5} paddingBottom={5}>
          <Grid xs={2}>
            <Box display="flex"
              justifyContent="center"
              alignItems="center" >
              <ProfilePicture src={userPhoto} alt='profile-picture' sx={{ borderRadius: '130px' }} />
            </Box>
          </Grid>
          <Grid xs={10} >
            <Box>
              <Grid container justifyContent="flex-end">
                <Grid xs={12} md={12}>
                  {/* <StyledTextarea aria-label="empty textarea" placeholder="Star a post" minRows={'3'} title='tes' /> */}
                  <TextField
                    id="standard-multiline-static"
                    // label="Multiline"
                    multiline
                    fullWidth
                    rows={4}
                    defaultValue="Star a post"
                    variant="standard"
                  />
                </Grid>
                <Grid container display={{ xs: "none", lg: "block" }} md={10}>  </Grid>
                <Grid justifyContent="flex-end" sx={{ display: { xs: 12, md: 2, justifyContent: 'right' } }}>
                  <Button size='small' color='primary' variant='contained' > {parentId ? 'Post ' : 'Post '}</Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </CardMedia>
    </Card>
  )
}

export default Postfeed
