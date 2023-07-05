import Box from '@mui/material/Box'
import { Settings } from 'src/@core/context/settingsContext'
import Navigation from 'src/@core/layouts/components/horizontal/navigation'
import HorizontalNavItems from 'src/navigation/horizontal'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'

interface Props {
  settings: Settings
  saveSettings: (values: Settings) => void
}

const AppBarContent = (props: Props) => {
  const { settings } = props;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Navigation
        {...props}
        horizontalNavItems={HorizontalNavItems()}
      />

      {/* <ModeToggler settings={settings} saveSettings={saveSettings} /> */}
      <UserDropdown settings={settings} />
    </Box>
  )
}

export default AppBarContent
