import { Box, Typography, Button, Stack, useMediaQuery, useTheme } from '@mui/material'
import Image from 'next/image' // or 'img' if you're not using Next.js

const NoTrainingsFound = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box sx={{ textAlign: 'center', py: 6 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Image
          src='/images/no-trainings.png' // 👈 make sure to save the illustration at this path
          alt='No Trainings'
          width={isMobile ? 300 : 400}
          height={isMobile ? 300 : 400}
        />
      </Box>
      <Typography variant='h6' fontWeight={600} gutterBottom>
        No Trainings Found
      </Typography>
      <Typography variant='body2' color='text.secondary' sx={{ mb: 4 }}>
        We couldn't find any training that matches your search.
        <br />
        To explore more training opportunities, please log in or create an account.
      </Typography>
      <Stack direction='row' spacing={2} justifyContent='center'>
        <Button variant='outlined' color='primary' href='/login' sx={{ width: '150px', textTransform: 'capitalize' }}>
          Login
        </Button>
        <Button
          variant='contained'
          color='primary'
          href='/register'
          sx={{ width: '150px', textTransform: 'capitalize' }}
        >
          Register
        </Button>
      </Stack>
    </Box>
  )
}

export default NoTrainingsFound
