import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { Avatar, Button, CircularProgress, Paper } from '@mui/material'
import Typography from '@mui/material/Typography'
import Icon from 'src/@core/components/icon'
import CommentForm from './CommentForm'
import { useState } from 'react'
import ISocialFeed from 'src/contract/models/social_feed'
import { getUserAvatar, toTitleCase } from 'src/utils/helpers'
import SocialFeedContext from 'src/context/SocialFeedContext'
import { v4 } from 'uuid'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSocialFeed } from 'src/hooks/useSocialFeed'
import ButtonLike from './ButtonLike'

function CommentActions({
    commentId, replycount
}: {
    commentId: string;
    replycount: number;
}) {
    const [replying, setreplying] = useState(false);

    return (
        <>
            <Button size='small' color='primary' startIcon={<Icon icon='mdi:comment-outline' fontSize={10} />} onClick={() => setreplying(!replying)}>
                {replycount > 0 && (
                    <Typography ml={-1.4} mr={1.4} fontSize={12}>{replycount}</Typography>
                )}
                Comment
            </Button>
            {replying && <CommentForm parentId={commentId} />}
        </>
    )
}

const renderList = (feeds: ISocialFeed[]) => {
    let itemCount = 0;
    const components: JSX.Element[] = [];

    if (feeds.length == 0) {
        return (
            <Typography>No feed</Typography>
        )
    }

    feeds.forEach((item) => {
        itemCount++;
        if (itemCount > 3) {
            itemCount = 1;
            components.push(
                <Paper sx={{ marginTop: '10px', padding: '10px', textAlign: 'center' }} key={v4()}>
                    <Box component='img' src={'/images/backgrounds/samplead.jpg'} sx={{ opacity: 0.2 }} />
                </Paper>
            );
        }

        components.push(<FeedCard item={item} key={`feedItem${item.id}`} />)
    })

    return components;
}

const FeedCard = (props: { item: ISocialFeed }) => {
    const { item } = props;

    return (
        <Paper sx={{ marginTop: '10px', padding: '10px' }}>
            <Box sx={{ display: 'flex', '& svg': { color: 'text.secondary' } }}>
                <Box>
                    <Avatar sx={{ width: 45, height: 45, mr: 3, mb: 3 }} src={getUserAvatar(item.user)} alt='profile-picture' />
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
                <Button size='small' color='primary' startIcon={<Icon icon='ic:round-repeat' fontSize={10} />}>Repost</Button>
                <Button size='small' color='primary' startIcon={<Icon icon='solar:share-linear' fontSize={10} />}>Share</Button>
                <ButtonLike item={item} />
                <CommentActions commentId='1' replycount={1} />
            </Box>
        </Paper>
    );
}

const ListFeedView = () => {
    const { fetchFeeds, hasNextPage } = useSocialFeed();

    return (
        <SocialFeedContext.Consumer>
            {({ feeds, onLoading }) => {

                if (onLoading) {
                    return (
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <CircularProgress sx={{ mt: 20 }} />
                        </Box>
                    );
                }

                return (
                    <InfiniteScroll
                        dataLength={10}
                        next={() => fetchFeeds({ take: 7 })}
                        hasMore={hasNextPage}
                        loader={(<Typography mt={5} color={'text.secondary'}>Loading..</Typography>)}>
                        <Grid container spacing={6}>
                            <Grid item xs={12}>
                                {renderList(feeds)}
                            </Grid>
                        </Grid>
                    </InfiniteScroll>
                )
            }}
        </SocialFeedContext.Consumer>
    )
}

export default ListFeedView
