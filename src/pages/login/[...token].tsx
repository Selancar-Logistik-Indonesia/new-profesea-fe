// ** React Imports
import { ReactNode } from 'react'
import Box from '@mui/material/Box'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { CircularProgress} from '@mui/material'
import { useRouter } from 'next/router'
import { useAuth } from 'src/hooks/useAuth'


const GoogleLogin = () => {
  const router = useRouter();
  const param = router.query.token as string;
  const accessToken = decodeURIComponent(param);
  // console.log(accessToken);
  const auth = useAuth()
  auth.glogin({'accessToken': accessToken, 'namaevent': null})

  if (auth.loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CircularProgress sx={{ mt: 20 }} />
      </Box>
    )
  }
}

GoogleLogin.guestGuard = true
GoogleLogin.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default GoogleLogin
