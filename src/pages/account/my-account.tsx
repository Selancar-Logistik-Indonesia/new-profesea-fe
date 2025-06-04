import AccountLayout from 'src/@core/layouts/AccountLayout'
import { Avatar, Box, Grid, Link, Typography } from '@mui/material'
import { toLinkCase } from 'src/utils/helpers'
import { useAuth } from 'src/hooks/useAuth'
import ChangePassword from 'src/layouts/components/ChangePassword'

const Account = () => {
  const { user } = useAuth()
  const userPhoto = user?.photo ? user.photo : '/images/avatars/default-user.png'

  return (
    <AccountLayout page='My Account'>
      <Grid container gap={8}>
        <Grid
          item
          container
          sx={{
            backgroundColor: '#FFF',
            borderRadius: '12px',
            border: '1px solid #F0F0F0',
            p: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Typography sx={{ fontSize: 20, fontWeight: 700 }}>Account Center</Typography>
            <Typography sx={{ fontSize: 16, fontWeight: 400 }}>
              To access your profile details, please go to your <b>profile page.</b>
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: '#F1F6FF',
              borderRadius: '8px',
              p: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: '16px',
                alignItems: { xs: 'center', md: 'flex-start' },
                textAlign: { xs: 'center', md: 'left' }
              }}
            >
              <Avatar alt='Profile Picture' src={userPhoto} sx={{ width: 73, height: 73 }} />
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '4px' }}>
                <Typography sx={{ color: '#2D3436', fontSize: 16, fontWeight: 700 }}>{user?.name}</Typography>
                <Typography sx={{ fontSize: '14px' }}>
                  (+{user?.country.phonecode}) {user?.phone}
                </Typography>
                <Typography sx={{ fontSize: '14px' }}>{user?.email}</Typography>
              </Box>
            </Box>
            <Link
              href={`/profile/${toLinkCase(user?.username)}`}
              sx={{
                color: '#2654A2',
                fontSize: 14,
                fontWeight: 700,
                textAlign: { xs: 'center', md: 'left' },
                mt: 2
              }}
            >
              Go to your profile page
            </Link>
          </Box>
        </Grid>
        <ChangePassword />
      </Grid>
    </AccountLayout>
  )
}

Account.acl = {
  action: 'read',
  subject: 'home'
}

export default Account
