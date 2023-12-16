import { useState, SyntheticEvent, Fragment, useEffect } from 'react'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Icon from 'src/@core/components/icon'
import { useAuth } from 'src/hooks/useAuth'
import { Settings } from 'src/@core/context/settingsContext'
import { IUser } from 'src/contract/models/user'
import Link from 'next/link'
import {   getEmployeetypev2 } from 'src/utils/helpers'

interface Props {
    settings: Settings
}

const BadgeContentSpan = styled('span')(({ theme }) => ({
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: theme.palette.success.main,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}));

const LinkStyled = styled(Link)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    marginRight: theme.spacing(8)
}));

const UserDropdown = (props: Props) => {
    const { settings } = props
    const [anchorEl, setAnchorEl] = useState<Element | null>(null)
    const router = useRouter()
    const { logout, user } = useAuth()
    const { direction } = settings
    const [userData, setUserData] = useState<IUser | null>(null);
    const userPhoto = (userData?.photo) ? userData.photo : "/images/avatars/default-user.png";
    const styles = { py: 2, px: 4, width: '100%', display: 'flex', alignItems: 'center', color: 'text.primary', textDecoration: 'none', '& svg': { mr: 2, fontSize: '1.375rem', color: 'text.primary' } };

    const handleDropdownOpen = (event: SyntheticEvent) => {
        setAnchorEl(event.currentTarget)
    }

    const handleDropdownClose = (url?: string) => {
        if (url) {
            router.push(url)
        }
        setAnchorEl(null)
    }

    const handleLogout = () => {
        logout()
        handleDropdownClose()
    }

    useEffect(() => {
        setUserData(user);
    }, []);

    return (
      <Fragment>
        <Badge
          overlap='circular'
          onClick={handleDropdownOpen}
          sx={{ ml: 2, cursor: 'pointer' }}
          badgeContent={<BadgeContentSpan />}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
        >
          <Avatar alt='John Doe' onClick={handleDropdownOpen} sx={{ width: 40, height: 40 }} src={userPhoto} />
        </Badge>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => handleDropdownClose()}
          sx={{ '& .MuiMenu-paper': { width: 230, mt: 4 } }}
          anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        >
          <Box sx={{ pt: 2, pb: 3, px: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Badge
                overlap='circular'
                badgeContent={<BadgeContentSpan />}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
              >
                <Avatar alt='John Doe' src={userPhoto} sx={{ width: '2.5rem', height: '2.5rem' }} />
              </Badge>
              <Box sx={{ display: 'flex', ml: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
                <Typography sx={{ fontWeight: 600 }}>{userData?.name}</Typography>
                {userData?.employee_type != null ? (
                  <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
                    {getEmployeetypev2(userData.employee_type)}
                  </Typography>
                ) : (
                  <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
                    {(userData?.role != 'Company') ? userData?.role : 'Recruiter'}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
          <Divider sx={{ mt: '0 !important' }} />

          {userData?.role != 'admin' && (
            <div>
              <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
                <Box sx={styles}>
                  <Icon icon='solar:user-circle-bold-duotone' />
                  <LinkStyled href='/profile'>
                    <Typography>Profile</Typography>
                  </LinkStyled>
                </Box>
              </MenuItem>
              <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
                <Box sx={styles}>
                  <Icon icon='solar:chat-round-dots-bold-duotone' />
                  <LinkStyled href='/chat'>
                    <Typography>Chat</Typography>
                  </LinkStyled>
                </Box>
              </MenuItem>
              <Divider />
                {userData?.role != 'Trainer' && (
                  <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
                  <Box sx={styles}>
                    <Icon icon='solar:leaf-bold-duotone' />
                    <LinkStyled href='/account'>
                      <Typography>Subscriptions</Typography>
                    </LinkStyled>
                  </Box>
                </MenuItem>
                )}
             
            </div>
          )}

          <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
            <Box sx={styles}>
              <Icon icon='solar:password-bold-duotone' />
              <LinkStyled href='/manage'>
                <Typography>Change Password</Typography>
              </LinkStyled>
            </Box>
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={handleLogout}
            sx={{ py: 2, '& svg': { mr: 2, fontSize: '1.375rem', color: 'text.primary' } }}
          >
            <Icon icon='solar:logout-2-bold-duotone' />
            Logout
          </MenuItem>
        </Menu>
      </Fragment>
    )
}

export default UserDropdown
