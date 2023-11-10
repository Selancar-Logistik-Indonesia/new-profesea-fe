import { Avatar, CardMedia, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ISocialFeed from "src/contract/models/social_feed";
import { getUserAvatar, toTitleCase } from "src/utils/helpers";
import { useState } from "react";
import { AppConfig } from "src/configs/api";
import CommentAreaView from "./CommentAreaView";
import Link from "next/link";
import { Icon } from '@iconify/react';
import ImageListPreview from "./ImageListPreview";
import FeedBottomActions from "./FeedBottomActions";
import moment from "moment";
import secureLocalStorage from "react-secure-storage";
import localStorageKeys from "src/configs/localstorage_keys";
import { IUser } from "src/contract/models/user";

type Prop = {
    item: ISocialFeed,
    withBottomArea?: boolean,
    user?: IUser
}

const FeedCard = (props: Prop) => {
    const { item, withBottomArea } = props;
    const [openComment, setOpenComment] = useState(false);
    const attachments = item.attachments;
     const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser

    return (
        <Paper sx={{ marginTop: '10px', padding: { xs: 3, md: 5 }, border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
            <Box component={Link} style={{ textDecoration: 'none' }} href={`/profile/${item.user.username}`} sx={{ display: 'flex', '& svg': { color: 'text.secondary' }, height: 60 }}>
                <Box>
                    <Avatar sx={{ width: 50, height: 50, mr: 3, mb: 3 }} src={getUserAvatar(item.user)} alt='profile-picture' />
                </Box>
                <Box sx={{ mb: 8, display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                    <Typography variant='body2' sx={{ color: '#0a66c2', fontWeight: 800, fontSize: '16px',  textTransform: 'uppercase' }}>
                        {toTitleCase(item.user.name)}
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }} mb={2}>
                        <Icon color={'#26252542'} icon='mingcute:time-fill' fontSize={'18px'} /> &nbsp;
                        <Typography sx={{ color: '#262525', fontWeight: 600, fontSize: '12px' }}>{moment(item.created_at).fromNow()}</Typography>
                    </Box>
                </Box>
            </Box>
            <Box component={Link} href={`/feed/${item.id}`} sx={{ display: 'flex', flexDirection: 'column', marginLeft: '10px', p: 2, border: '1px solid #e4e4e4' }}>
                <Typography variant='body2' sx={{ color: '#262525', fontSize: '14px', fontWeight: 400, my: 2 }}>
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
                    <FeedCard item={item.feed_repost} withBottomArea={false}  user={user}/>
                )}
            </Box>

            {withBottomArea !== false && (
                <FeedBottomActions item={item} openComment={openComment} setOpenComment={setOpenComment} />
            )}

            {withBottomArea !== false && openComment && (
                <CommentAreaView item={item} />
            )}
        </Paper>
    )
}

export default FeedCard;