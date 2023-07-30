import Box from '@mui/material/Box'
import { Settings } from 'src/@core/context/settingsContext'
import Navigation from 'src/@core/layouts/components/horizontal/navigation'
import HorizontalNavItems from 'src/navigation/horizontal'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import NotificationDropdown, { NotificationsType } from 'src/@core/layouts/components/shared-components/NotificationDropdown'

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

            <NotificationDropdown settings={settings} />
            <UserDropdown settings={settings} />
        </Box>
    )
}

export default AppBarContent
