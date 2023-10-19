 
import { Box, Typography } from '@mui/material';

const Home = () => {
<Box
  sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  }}
>
  <Typography variant='h4' component='h1' align='center'>
    Maintenance in Progress
  </Typography>
</Box>
}

Home.acl = {
  action: 'read',
  subject: 'home'
};

export default Home
