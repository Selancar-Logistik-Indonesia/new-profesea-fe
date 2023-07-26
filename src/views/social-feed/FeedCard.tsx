import { Avatar, Button, CardMedia, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ISocialFeed from "src/contract/models/social_feed";
import { getUserAvatar, toTitleCase } from "src/utils/helpers";
import ButtonLike from "./ButtonLike";
import ButtonComment from "./ButtonComment";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { AppConfig } from "src/configs/api";
import CommentAreaView from "./CommentAreaView";

const FeedCard = (props: { item: ISocialFeed }) => {
    const { item } = props;
    const [openComment, setOpenComment] = useState(false);
    const attachments = JSON.parse(item.attachments);

    return (
        <Paper sx={{ marginTop: '10px', padding: { xs: 3, md: 5 } }}>
            <Box sx={{ display: 'flex', '& svg': { color: 'text.secondary' } }}>
                <Box>
                    <Avatar sx={{ width: 50, height: 50, mr: 3, mb: 3 }} src={getUserAvatar(item.user)} alt='profile-picture' />
                </Box>
                <Box sx={{ mb: 8, display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                    <Typography variant='body2' sx={{ color: "#424242", fontWeight: 600 }}>
                        {toTitleCase(item.user.name)}
                    </Typography>
                    <Typography sx={{ color: "#424242", fontWeight: 500 }}>
                        {item.h_created_at}
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                {(item.content_type == "videos") && (
                    <CardMedia sx={{ width: '100%', height: 320 }} component='video' controls src={`${AppConfig.baseUrl}/public/data/streaming?video=${attachments[0]}`} />
                )}

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

            {openComment && <CommentAreaView key={item.id} item={item} />}
        </Paper>
    );
}

export default FeedCard;