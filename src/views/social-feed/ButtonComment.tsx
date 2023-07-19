import { Button, Typography } from "@mui/material";
import { useState } from "react";
import CommentForm from "./CommentForm";
import { Icon } from "@iconify/react";

function ButtonComment({ commentId, replycount }: { commentId: string, replycount: number }) {
    const [replying, setreplying] = useState(false);

    return (
        <>
            <Button sx={{ textTransform: 'none' }} size='small' color='primary' startIcon={<Icon icon='mdi:comment-outline' fontSize={10} />} onClick={() => setreplying(!replying)}>
                {replycount > 0 && (
                    <Typography ml={-1.4} mr={1.4} fontSize={12}>{replycount}</Typography>
                )}
                Comment
            </Button>
            {replying && <CommentForm parentId={commentId} />}
        </>
    )
}

export default ButtonComment