import { Icon } from "@iconify/react"
import { Box, Button } from "@mui/material"
import { IUser } from "src/contract/models/user"
import BlockButton from "src/layouts/components/BlockButton"
import ConnectButton from "src/layouts/components/ConnectButton"
import MessageButton from "src/layouts/components/MessageButton"

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
        {/* <Button
          size='small'
          variant='contained'
          sx={{ margin: '5px' }}
          startIcon={<Icon icon='mdi:account-check-outline' fontSize={20} />}
        >
          Message
        </Button> */}
        <MessageButton user={props.user} />
        <ConnectButton user={props.user} />
        <BlockButton user={props.user} />
      </Box>
    )
}

export default ProfileActionArea;