import { Icon } from "@iconify/react";
import { Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react"; 
// import secureLocalStorage from "react-secure-storage";
// import localStorageKeys from "src/configs/localstorage_keys";
import { IUser } from "src/contract/models/user"; 
import { subscribev } from "src/utils/helpers";

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
    
    const [show, setShowDM] = useState<boolean>(true)
    // const abilities = secureLocalStorage.getItem(localStorageKeys.abilities) as IUser

    useEffect(() => { 
    const a = subscribev(['A02','A03','A12','A14']);
    setShowDM(!a)
    }, [])
    
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
        disabled={show}
        onClick={() => onMessage(user)}
        variant={user.frienship_status || show == false ? 'contained' : 'outlined'}
        size='small'
        sx={{ margin: '5px', fontSize: '10px' }}
        startIcon={
          !isLoading && (
            <Icon icon={buildConnectIcon()} color={user.frienship_status || show == false ? 'white' : '#26252542'} />
          )
        }
      >
        {isLoading ? <CircularProgress size={22} /> : buildConnectText()}
      </Button>
    )
}

export default MessageButton;