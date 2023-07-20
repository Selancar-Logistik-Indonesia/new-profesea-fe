import { Button, Typography } from "@mui/material";
import { Icon } from "@iconify/react";

interface Props {
    replyCount: number,
    onClick: () => void,
}

function ButtonComment(props: Props) {

    return (
        <Button sx={{ textTransform: 'none' }} size='small' color='primary' startIcon={<Icon icon='mdi:comment-outline' fontSize={10} />} onClick={props.onClick}>
            {props.replyCount > 0 && (
                <Typography ml={-1.4} mr={1.4} fontSize={12}>{props.replyCount}</Typography>
            )}
            Comment
        </Button>
    )
}

export default ButtonComment