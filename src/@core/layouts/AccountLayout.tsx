import {
  Avatar,
  Box,
  Breadcrumbs,
  Divider,
  Grid,
  Link,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { useAuth } from 'src/hooks/useAuth'
import { getEmployeetypev2 } from 'src/utils/helpers'
import { MdNavigateNext } from 'react-icons/md'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

const AccountLayout = ({ children, page, subPage }: { children: ReactNode; page: string; subPage?: string }) => {
  const router = useRouter()
  const { user } = useAuth()
  const userPhoto = user?.photo || '/images/avatars/default-user.png'

  const navItems = [
    { label: 'Account', href: '/account/my-account' },
    { label: 'Training Order', href: '/account/my-training' },
    { label: 'Subscription', href: '/account/subscription' }
  ]

  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.down('sm'))

  const handleSelectChange = (event: any) => {
    const selectedHref = navItems.find(item => item.label === event.target.value)?.href
    if (selectedHref) {
      router.push(selectedHref)
    }
  }

  const currentLabel = navItems.find(item => router.asPath.startsWith(item.href))?.label || 'Account'

  return (
    <Grid container sx={{ flexDirection: 'column', gap: '24px' }}>
      {!isXs && (
        <Grid item container>
          <Breadcrumbs separator={<MdNavigateNext fontSize='17px' color='black' />} aria-label='breadcrumb'>
            <Link href='/home' sx={{ textDecoration: 'none' }}>
              <Typography sx={{ color: '#32497A', fontSize: 12 }}>Homepage</Typography>
            </Link>
            <Typography sx={{ color: '#32497A', fontSize: 12 }}>Account</Typography>
            <Typography sx={{ color: subPage ? '#32497A' : '#525252', fontSize: 12 }}>{page}</Typography>
            {subPage && <Typography sx={{ color: '#525252', fontSize: 12 }}>{subPage}</Typography>}
          </Breadcrumbs>
        </Grid>
      )}
      <Grid item container sx={{ display: 'flex', gap: '24px' }}>
        {!isXs && (
          <Grid item>
            <Box
              sx={{
                backgroundColor: '#FFF',
                width: '276px',
                borderRadius: '12px',
                border: '1px solid #F0F0F0'
              }}
            >
              <Box sx={{ p: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Avatar alt='Profile Picture' src={userPhoto} sx={{ width: 54, height: 54 }} />
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '4px' }}>
                  <Typography fontSize={16} fontWeight={700}>
                    {user?.name}
                  </Typography>
                  <Typography fontSize={14}>
                    {user?.team_id === 2
                      ? getEmployeetypev2(user.employee_type)
                      : user?.role !== 'Company'
                      ? user?.role
                      : 'Recruiter'}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ mt: 0 }} />
              <Box sx={{ p: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {navItems.map(item => {
                  const isSelected = router.asPath.startsWith(item.href)

                  return (
                    <MenuItem
                      key={item.href}
                      component={Link}
                      href={item.href}
                      sx={{
                        p: '8px 16px',
                        fontSize: 14,
                        borderRadius: 1,
                        color: isSelected ? '#0B58A6' : 'inherit',
                        backgroundColor: isSelected ? '#F2F8FE' : 'transparent',
                        '&:hover': {
                          backgroundColor: '#F2F8FE',
                          color: '#0B58A6'
                        }
                      }}
                    >
                      {item.label}
                    </MenuItem>
                  )
                })}
              </Box>
            </Box>
          </Grid>
        )}
        <Grid item sx={{ flex: 1 }}>
          {isXs && (
            <Select
              fullWidth
              value={currentLabel}
              onChange={handleSelectChange}
              sx={{ mb: '24px', borderRadius: '8px', backgroundColor: '#FFF', borderColor: '#D1D1D1' }}
            >
              {navItems.map(item => (
                <MenuItem key={item.href} value={item.label} sx={{ fontSize: 14 }}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          )}
          {children}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default AccountLayout
