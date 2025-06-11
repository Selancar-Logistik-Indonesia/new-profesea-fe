import { useState, SyntheticEvent, Fragment, useEffect } from 'react'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { useAuth } from 'src/hooks/useAuth'
import { Settings } from 'src/@core/context/settingsContext'
import { IUser } from 'src/contract/models/user'
import { getEmployeetypev2, toLinkCase } from 'src/utils/helpers'
import { useRouter } from 'next/router'

interface Props {
  settings: Settings
}

const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 10,
  height: 10,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const UserDropdown = (props: Props) => {
  const { settings } = props
  const { direction } = settings
  const router = useRouter()

  const { user, logout } = useAuth()
  const [userData, setUserData] = useState<IUser | null>(null)
  const userPhoto = userData?.photo ? userData.photo : '/images/avatars/default-user.png'

  const [anchorEl, setAnchorEl] = useState<Element | null>(null)
  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logout()
    handleDropdownClose()
  }

  useEffect(() => {
    setUserData(user)
  }, [])

  return (
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{
          cursor: 'pointer'
        }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <Avatar alt='Profile Picture' onClick={handleDropdownOpen} sx={{ width: 44, height: 44 }} src={userPhoto} />
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        PaperProps={{
          sx: {
            width: 276,
            mt: 2,
            borderRadius: '12px !important'
          }
        }}
        MenuListProps={{
          sx: {
            py: 0
          }
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
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
          <MenuItem
            onClick={() => {
              handleDropdownClose()
              router.push(
                user?.role === 'Seafarer'
                  ? `/profile/${toLinkCase(user.username)}`
                  : `/company/${toLinkCase(user?.username)}`
              )
            }}
            sx={{
              p: '8px 16px',
              fontSize: 14,
              borderRadius: 1
            }}
          >
            Profile
          </MenuItem>
          {user?.team_id == 2 && (
            <MenuItem
              onClick={() => {
                handleDropdownClose()
                router.push('/account/my-account')
              }}
              sx={{
                p: '8px 16px',
                fontSize: 14,
                borderRadius: 1
              }}
            >
              Account Center
            </MenuItem>
          )}
          <MenuItem
            onClick={handleLogout}
            sx={{
              p: '8px 16px',
              fontSize: 14,
              borderRadius: 1
            }}
          >
            Log Out
          </MenuItem>
        </Box>
      </Menu>
    </Fragment>
  )
}

export default UserDropdown
