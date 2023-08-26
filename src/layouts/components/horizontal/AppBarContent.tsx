import Box from '@mui/material/Box'
import { Settings } from 'src/@core/context/settingsContext'
import Navigation from 'src/@core/layouts/components/horizontal/navigation'
import HorizontalNavItems from 'src/navigation/horizontal'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown'
import { TextField } from '@mui/material'
import { useFriendSuggestion } from 'src/hooks/useFriendSuggestion'

interface Props {
    settings: Settings
    saveSettings: (values: Settings) => void
}

const AppBarContent = (props: Props) => {
    const { settings } = props;
    const { handleSearch } = useFriendSuggestion();

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Navigation
                {...props}
                horizontalNavItems={HorizontalNavItems()}
            />
            <NotificationDropdown settings={settings} />
            <Box>
                <TextField
                    id='fullName'
                    label='Search Name'
                    variant='outlined'
                    size='small'
                    fullWidth
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </Box>
            <UserDropdown settings={settings} />
        </Box>
    )
}

export default AppBarContent
