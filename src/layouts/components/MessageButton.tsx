import { Icon } from "@iconify/react";
import { Button, CircularProgress } from "@mui/material";
import { useState } from "react"; 
import { IUser } from "src/contract/models/user"; 

interface MessageButtonProps {
    user: IUser,
};

const MessageButton = (props: MessageButtonProps) => { 
    const user = props.user;
    const [isLoading, setIsLoading] = useState(false);

    const onMessage = async (user: IUser) => {
       setIsLoading(true)
       window.location.replace('/chat?username='+user.username)
    }

    const buildConnectIcon = () => {
        if (user.frienship_status == "AP") {
            return 'solar:chat-round-dots-bold'
        }
        if (user.frienship_status == 'WA') {
          return 'solar:chat-round-dots-bold-duotone'
        }

        return 'solar:chat-round-dots-bold';
    }

    const buildConnectText = () => {
        if (user.frienship_status == "AP") {
            return 'Message';
        }

        if (user.frienship_status == "WA") {
            return 'Message'
        }

        return 'Message'
    }

    return (
      //   startIcon={<Icon icon='mdi:account-check-outline' fontSize={20} />}
      <Button
        disabled={isLoading || !user.frienship_status}
        onClick={() => onMessage(user)}
        variant={user.frienship_status ? 'contained' : 'outlined'}
        size='small'
        sx={{ margin: '5px', fontSize: '10px' }}
        startIcon={
          !isLoading && <Icon icon={buildConnectIcon()} color={user.frienship_status ? 'white' : '#42424242'} />
        }
      >
        {isLoading ? <CircularProgress size={22} /> : buildConnectText()}
      </Button>
    )
}

export default MessageButton;