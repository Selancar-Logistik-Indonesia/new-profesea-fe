// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { Avatar, Button, Paper } from '@mui/material'
import Typography from '@mui/material/Typography'
import Icon from 'src/@core/components/icon'
import CommentForm from './CommentForm'
import { useState } from 'react'
import ISocialFeed from 'src/contract/models/social_feed'
import { toTitleCase } from 'src/utils/helpers'
import SocialFeedContext from 'src/context/SocialFeedContext'
import { v4 } from 'uuid'

function CommentActions({
    commentId, replycount
}: {
    commentId: string;
    replycount: string;
}) {
    const [replying, setreplying] = useState(false);

    return (
        <>
            <Button size='small' color='primary' startIcon={<Icon icon='mdi:comment-outline' fontSize={10} />} onClick={() => setreplying(!replying)}>{replycount} Comment</Button>
            {replying && <CommentForm parentId={commentId} />}
        </>
    )
}

const renderList = (feeds: ISocialFeed[]) => {
    let itemCount = 0;
    let appendComponent: any;

    if (feeds.length && feeds.length > 0) {
        console.log("masuk 1");

        return feeds.map((item) => {
            itemCount++;
            appendComponent = <></>;
            if (itemCount > 3) {
                itemCount = 1;

                appendComponent = (
                    <Paper sx={{ marginTop: '10px', padding: '10px', textAlign: 'center' }} key={v4()}>
                        <Box component='img' src={'/images/backgrounds/samplead.jpg'} sx={{ opacity: 0.2 }} />
                    </Paper>
                );
            }

            return (
                <>
                    {appendComponent}
                    <Paper sx={{ marginTop: '10px', padding: '10px' }} key={`feedItem${item.id}`}>
                        <Box sx={{ display: 'flex', '& svg': { color: 'text.secondary' } }}>
                            <Box>
                                <Avatar sx={{ width: 45, height: 45, mr: 3, mb: 3 }} src='/images/avatars/1.png' alt='profile-picture' />
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
                            <Button size='small' color='primary' startIcon={<Icon icon='ic:round-repeat' fontSize={10} />}> Repost</Button>
                            <Button size='small' color='primary' startIcon={<Icon icon='solar:share-linear' fontSize={10} />}> Share</Button>
                            <Button size='small' color='primary' startIcon={<Icon icon='mdi:like-outline' fontSize={10} />}> Like</Button>
                            <CommentActions commentId='1' replycount='1' />
                        </Box>
                    </Paper>
                </>
            )
        })
    } else {
        console.log("masuk 2");
        return <></>
    }
}

const NestedComment = () => {
    return (
        <SocialFeedContext.Consumer>
            {({ feeds }) => {
                console.log("need some render..");
                console.log("feeds: ", feeds);

                if (feeds.length > 0) {
                    console.log("value nya ada");
                    return (
                        <Grid container spacing={6}>
                            <Grid item xs={12}>
                                {renderList(feeds)}
                            </Grid>
                        </Grid>
                    )

                }
            }}
        </SocialFeedContext.Consumer>
    )
}

export default NestedComment
