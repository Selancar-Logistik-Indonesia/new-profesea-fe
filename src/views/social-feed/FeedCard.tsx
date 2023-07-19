import { Avatar, Button, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ISocialFeed from "src/contract/models/social_feed";
import { getUserAvatar, toTitleCase } from "src/utils/helpers";
import ButtonLike from "./ButtonLike";
import ButtonComment from "./ButtonComment";
import { Icon } from "@iconify/react";

const FeedCard = (props: { item: ISocialFeed }) => {
    const { item } = props;

    return (
        <Paper sx={{ marginTop: '10px', padding: 5 }}>
            <Box sx={{ display: 'flex', '& svg': { color: 'text.secondary' } }}>
                <Box>
                    <Avatar sx={{ width: 50, height: 50, mr: 3, mb: 3 }} src={getUserAvatar(item.user)} alt='profile-picture' />
                </Box>
                <Box sx={{ mb: [6, 0], display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }}>
                    <Typography variant='body2' sx={{ color: "#424242", fontWeight: 600, textTransform: 'uppercase' }}>
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
                <ButtonComment replycount={item.count_comments} />
            </Box>
        </Paper>
    );
}

export default FeedCard;