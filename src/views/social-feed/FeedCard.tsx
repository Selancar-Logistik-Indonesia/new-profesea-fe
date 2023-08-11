import { Avatar, CardMedia, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ISocialFeed from "src/contract/models/social_feed";
import { getUserAvatar, toTitleCase } from "src/utils/helpers";
import { useState } from "react";
import { AppConfig } from "src/configs/api";
import CommentAreaView from "./CommentAreaView";
import Link from "next/link";
import ImageListPreview from "./ImageListPreview";
import FeedBottomActions from "./FeedBottomActions";
import moment from "moment";

type Prop = {
    item: ISocialFeed,
    withBottomArea?: boolean,
}

const FeedCard = (props: Prop) => {
    const { item, withBottomArea } = props;
    const [openComment, setOpenComment] = useState(false);
    const attachments = item.attachments;

    return (
        <Paper sx={{ marginTop: '10px', padding: { xs: 3, md: 5 } }}>
            <Box sx={{ display: 'flex', '& svg': { color: 'text.secondary' }, height: 60 }}>
                <Box>
                    <Avatar sx={{ width: 50, height: 50, mr: 3, mb: 3 }} src={getUserAvatar(item.user)} alt='profile-picture' />
                </Box>
                <Box sx={{ mb: 8, display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                    <Link style={{ textDecoration: 'none' }} href={`/profile/${item.user.username}`}>
                        <Typography variant='body2' sx={{ color: '#0a66c2', fontWeight: 600 }}>
                            {toTitleCase(item.user.name)}
                        </Typography>
                        <Typography sx={{ color: '#424242', fontWeight: 500 }}>{moment(item.created_at).fromNow()}</Typography>
                    </Link>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                <Typography variant='body1' sx={{ color: '#424242', fontSize: '0.7rem', fontWeight: 400, my: 2 }}>
                    {item.content}
                </Typography>

                {item.content_type == 'videos' && (
                    <CardMedia
                        sx={{ width: '100%', height: 320, my: 2 }}
                        component='video'
                        controls
                        src={`${AppConfig.baseUrl}/public/data/streaming?video=${attachments![0]}`}
                    />
                )}

                {item.content_type == 'images' && (
                    <ImageListPreview urls={attachments!} />
                )}

                {item.feed_repost && (
                    <FeedCard item={item.feed_repost} withBottomArea={false} />
                )}
            </Box>

            {withBottomArea !== false && openComment && (
                <CommentAreaView item={item} />
            )}
        </Paper>
    )
}

export default FeedCard;