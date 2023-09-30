import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Icon from 'src/@core/components/icon'
import { Settings } from 'src/@core/context/settingsContext'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import AppbarSearchUser from 'src/views/appbar/appbar-search-user'

interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
}

const AppBarContent = (props: Props) => {
  const { hidden, settings, toggleNavVisibility } = props

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {hidden ? (
          <IconButton color='inherit' sx={{ ml: -2.75 }} onClick={toggleNavVisibility}>
            <Icon icon='mdi:menu' />
          </IconButton>
        ) : null}

        {/* <ModeToggler settings={settings} saveSettings={saveSettings} /> */}
      </Box>
      <Box>
        <AppbarSearchUser />
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        <UserDropdown settings={settings} />
      </Box>
    </Box>
  )
}

export default AppBarContent
