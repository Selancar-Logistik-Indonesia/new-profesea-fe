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
    const [isLoading, setIsLoading] = useState(false);
    const [requested, setRequested] = useState(false);

    const onConnectRequest = async (user: IUser) => {
        console.log(user.name);
        setIsLoading(true);
        try {
            const response = await HttpClient.post("/friendship/request-connect", {
                friend_id: user.id,
            });

            if (response.status == 200) {
                setRequested(true);
            }
        } catch (error) {
            toast.error(getCleanErrorMessage(error));
        }

        setIsLoading(false);
    }

    return (
        <Button disabled={isLoading} onClick={() => onConnectRequest(props.user)}
            variant={requested ? 'outlined' : 'contained'} size='small'
            startIcon={!isLoading && !requested ? <Icon icon={'mdi:add'} color='white' /> : null}
        >
            {
                isLoading
                    ? (<CircularProgress size={22} />)
                    : requested ? "Requested" : "Connect"
            }
        </Button>
    );
}

export default ConnectButton;