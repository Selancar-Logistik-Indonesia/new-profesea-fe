import { Icon } from "@iconify/react"
import { Box, Button } from "@mui/material"
import { IUser } from "src/contract/models/user"
import ConnectButton from "src/layouts/components/ConnectButton"

type Props = {
    enabled: boolean,
    user: IUser
}

const ProfileActionArea = (props: Props) => {
    const { enabled } = props;

    if (!enabled) {
        return <></>;
    }

    return (
        <Box sx={{ justifyContent: 'right', display: 'inline-flex' }}>
            <Button
                size='small'
                variant='contained'
                sx={{ margin: '5px' }}
                startIcon={<Icon icon='mdi:account-check-outline' fontSize={20} />}
            >
                Message
            </Button>
            <ConnectButton user={props.user} />
            <Button
                color='error'
                size='small'
                variant='contained'
                sx={{ margin: '5px' }}
                startIcon={<Icon icon='mdi:ban' fontSize={20} />}
            >
                Block
            </Button>
        </Box>
    )
}

export default ProfileActionArea;