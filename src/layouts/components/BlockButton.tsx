import { Icon } from "@iconify/react";
import { Button, CircularProgress } from "@mui/material";
import moment, { now } from "moment";
import { useState } from "react";
import toast from "react-hot-toast";
import { IUser } from "src/contract/models/user";
import { HttpClient } from "src/services";
import { getCleanErrorMessage } from "src/utils/helpers";

interface BlockButtonProps {
    user: IUser,
};

const BlockButton = (props: BlockButtonProps) => {
    const [user, setUser] = useState(props.user);
    const [isLoading, setIsLoading] = useState(false);

    const onBlockRequest = async (user: IUser) => {
        setIsLoading(true);
        try {
            const response = await HttpClient.post("/friendship/block", {
                friend_id: user.id,
            });

            if (response.status == 200) {
                setUser((old) => {
                    return {
                        ...old,
                        blocked_at: moment().format(),
                    };
                });
            }
        } catch (error) {
            toast.error(getCleanErrorMessage(error));
        }

        setIsLoading(false);
    }

    return (
        <Button disabled={isLoading || !!user.blocked_at} onClick={() => onBlockRequest(user)}
            color='error'
            size='small'
            variant='contained'
            sx={{ margin: '5px' }}
            startIcon={<Icon icon='mdi:ban' fontSize={20} />}
        >
            {
                isLoading
                    ? (<CircularProgress size={22} />)
                    : 'Block'
            }
        </Button>
    );
}

export default BlockButton;