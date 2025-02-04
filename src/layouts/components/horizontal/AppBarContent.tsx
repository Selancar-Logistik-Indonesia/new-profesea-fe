import Box from '@mui/material/Box'
import { Settings } from 'src/@core/context/settingsContext'
import Navigation from 'src/@core/layouts/components/horizontal/navigation'
import HorizontalNavItems from 'src/navigation/horizontal'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown'
import AppbarSearchUser from 'src/views/appbar/appbar-search-user'
import { Grid } from '@mui/material'

interface Props {
  settings: Settings
  saveSettings: (values: Settings) => void
}

const AppBarContent = (props: Props) => {
  const { settings } = props

  return (
    <Grid container sx={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', mx: '20px' }}>
        <AppbarSearchUser />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Navigation {...props} horizontalNavItems={HorizontalNavItems()} />
        <Box sx={{ marginLeft: '106px !important' }}>
          <NotificationDropdown settings={settings} />
          <UserDropdown settings={settings} />
        </Box>
      </Box>
    </Grid>
  )
}

export default AppBarContent
