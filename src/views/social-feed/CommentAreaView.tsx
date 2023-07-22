import { CircularProgress, Divider, Avatar, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import ISocialFeed from "src/contract/models/social_feed";
import ISocialFeedComment from "src/contract/models/social_feed_comment";
import CommentResponseType from "src/contract/types/comment_response_type";
import { useSocialFeed } from "src/hooks/useSocialFeed";
import { getUserAvatar, toTitleCase } from "src/utils/helpers";
import CommentForm from "./CommentForm";
import SubCommentAreaView from "./SubCommentAreaView";

const CommentCard = (props: { comment: ISocialFeedComment }) => {
    const { comment } = props;
    const [openReply, setOpenReply] = useState(false);

    return (
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
                <Button sx={{ textTransform: 'none', fontSize: 11 }} variant='text' size="small">Like</Button>
                <Button onClick={() => setOpenReply(!openReply)} sx={{ textTransform: 'none', fontSize: 11 }} variant='text' size="small">
                    {comment.count_replies > 0 && `(${comment.count_replies})`} Reply
                </Button>
            </Box>

            {openReply && <SubCommentAreaView key={comment.id} item={comment} />}
        </Box>
    )
}

const CommentAreaView = (props: { item: ISocialFeed }) => {
    const { item } = props;
    const [onLoading, setOnLoading] = useState(true);
    const { getComments, commentSignature } = useSocialFeed();
    const [commentObj, setCommentObj] = useState<CommentResponseType>();

    const loadComments = async () => {
        setOnLoading(true);
        const obj = await getComments(item.id, 1, 7, 'feed');
        setCommentObj(obj);
        setOnLoading(false);
    }

    useEffect(() => {
        loadComments();
    }, [commentSignature]);

    return (
        <>
            <CommentForm feedId={item.id} replyable_type='feed' />
            {onLoading && (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 10 }}>
                    <CircularProgress />
                </Box>
            )}

            {!onLoading && commentObj?.data && commentObj?.data.length > 0 && (
                <Box>
                    <Divider sx={{ mt: 3 }} />
                    {commentObj?.data.map(comment => (<CommentCard key={comment.id} comment={comment} />))}
                </Box>
            )}
        </>
    );
}

export default CommentAreaView;