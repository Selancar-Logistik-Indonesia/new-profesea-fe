import { Icon } from "@iconify/react";
import { Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { IUser } from "src/contract/models/user";
import { HttpClient } from "src/services";
import { getCleanErrorMessage } from "src/utils/helpers";

interface ConnectButtonProps {
    user: IUser,
};

const ConnectButton = (props: ConnectButtonProps) => {
    const [user, setUser] = useState(props.user);
    const [isLoading, setIsLoading] = useState(false);

    const onConnectRequest = async (user: IUser) => {
        console.log(user.name);
        setIsLoading(true);
        try {
            const response = await HttpClient.post("/friendship/request-connect", {
                friend_id: user.id,
            });

            if (response.status == 200) {
                setUser((old) => {
                    return {
                        ...old,
                        frienship_status: 'WA'
                    };
                });
            }
        } catch (error) {
            toast.error(getCleanErrorMessage(error));
        }

        setIsLoading(false);
    }

    const buildConnectIcon = () => {
        if (user.frienship_status == "AP") {
            return 'solar:link-linear';
        }

        return 'solar:link-linear';
    }

    const buildConnectText = () => {
        if (user.frienship_status == "AP") {
            return 'Disconnect';
        }

        if (user.frienship_status == "WA") {
            return 'Requested';
        }

        return 'Connect';
    }

    return (
        <Button disabled={isLoading || !!user.frienship_status} onClick={() => onConnectRequest(user)}
            variant={user.frienship_status ? 'outlined' : 'contained'}
            size='small'
            sx={{ margin: '5px', fontSize: '10px' }}
            color='warning'
            startIcon={!isLoading && <Icon icon={buildConnectIcon()} color={user.frienship_status ? '#42424242' : 'white'} />}
        >
            {
                isLoading
                    ? (<CircularProgress size={22} />)
                    : buildConnectText()
            }
        </Button>
    );
}

export default ConnectButton;