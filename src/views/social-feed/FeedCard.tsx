import { Avatar, Button, CircularProgress, Divider, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ISocialFeed from "src/contract/models/social_feed";
import { getUserAvatar, toTitleCase } from "src/utils/helpers";
import ButtonLike from "./ButtonLike";
import ButtonComment from "./ButtonComment";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import { useSocialFeed } from "src/hooks/useSocialFeed";
import CommentResponseType from "src/contract/types/comment_response_type";

const CommentAreaView = (props: { item: ISocialFeed }) => {
    const { item } = props;
    const [onLoading, setOnLoading] = useState(true);
    const { getComments, commentSignature } = useSocialFeed();
    const [commentObj, setCommentObj] = useState<CommentResponseType>();

    const loadComments = async () => {
        setOnLoading(true);
        const obj = await getComments(item.id, 1, 7);
        setCommentObj(obj);
        setOnLoading(false);
    }

    useEffect(() => {
        loadComments();
    }, [commentSignature]);

    return (
        <>
            <CommentForm feedId={item.id} />

            {onLoading && (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 10 }}>
                    <CircularProgress />
                </Box>
            )}

            {!onLoading && commentObj?.data && commentObj?.data.length > 0 && (
                <Box>
                    <Divider sx={{ mt: 3 }} />
                    {
                        commentObj?.data.map(comment => (
                            <Box key={comment.id} sx={{ display: 'flex', flexDirection: 'column', mt: 5 }}>
                                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                    <Box>
                                        <Avatar sx={{ width: 35, height: 35, mr: 3, mb: 3 }} src={getUserAvatar(comment.user)} alt='profile-picture' />
                                    </Box>
                                    <Box sx={{ mb: [6, 0], display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }}>
                                        <Typography variant='body2' sx={{ color: "#424242", fontWeight: 500 }}>
                                            {toTitleCase(comment.user.name)}
                                        </Typography>
                                        <Typography sx={{ color: "#424242", fontWeight: 400 }}>
                                            {comment.h_created_at}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                                    <Typography variant="body1" sx={{ color: "#424242", fontWeight: 400, margin: "5px" }}>
                                        {comment.content}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Button sx={{ textTransform: 'none', fontSize: 11 }} variant='text' size="small">Reply</Button>
                                    <Button sx={{ textTransform: 'none', fontSize: 11 }} variant='text' size="small">Like</Button>
                                </Box>
                            </Box>
                        ))
                    }
                </Box>
            )}
        </>
    );
}

const FeedCard = (props: { item: ISocialFeed }) => {
    const { item } = props;
    const [openComment, setOpenComment] = useState(false);

    return (
        <Paper sx={{ marginTop: '10px', padding: { xs: 3, md: 5 } }}>
            <Box sx={{ display: 'flex', '& svg': { color: 'text.secondary' } }}>
                <Box>
                    <Avatar sx={{ width: 50, height: 50, mr: 3, mb: 3 }} src={getUserAvatar(item.user)} alt='profile-picture' />
                </Box>
                <Box sx={{ mb: [6, 0], display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }}>
                    <Typography variant='body2' sx={{ color: "#424242", fontWeight: 600 }}>
                        {toTitleCase(item.user.name)}
                    </Typography>
                    <Typography sx={{ color: "#424242", fontWeight: 500 }}>
                        {item.h_created_at}
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                <Typography variant="body1" sx={{ color: "#424242", fontWeight: 400, margin: "5px" }}>
                    {item.content}
                </Typography>
            </Box>
            <Box>
                <Button sx={{ textTransform: 'none' }} size='small' color='primary' startIcon={<Icon icon='ic:round-repeat' fontSize={10} />}>Repost</Button>
                <Button sx={{ textTransform: 'none' }} size='small' color='primary' startIcon={<Icon icon='solar:share-linear' fontSize={10} />}>Share</Button>
                <ButtonLike item={item} />
                <ButtonComment replyCount={item.count_comments} onClick={() => setOpenComment(!openComment)} />
            </Box>

            {openComment && <CommentAreaView item={item} />}
        </Paper>
    );
}

export default FeedCard;