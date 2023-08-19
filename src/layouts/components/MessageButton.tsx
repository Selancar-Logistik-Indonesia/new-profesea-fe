import { Icon } from "@iconify/react";
import { Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { IUser } from "src/contract/models/user";
import { HttpClient } from "src/services";
import { getCleanErrorMessage } from "src/utils/helpers";

interface MessageButtonProps {
    user: IUser,
};

const MessageButton = (props: MessageButtonProps) => {
    const [user, setUser] = useState(props.user);
    const [isLoading, setIsLoading] = useState(false);

    const onMessage = async (user: IUser) => {
       window.location.replace('/chat?username='+user.username)
    }

    const buildConnectIcon = () => {
        if (user.frienship_status == "AP") {
            return 'mdi:account-check-outline'
        }
        if (user.frienship_status == 'WA') {
          return 'mdi:account-check-outline'
        }
        return 'fa6-solid:link';
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