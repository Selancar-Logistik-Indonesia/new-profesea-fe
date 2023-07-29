import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { CircularProgress, Paper } from '@mui/material'
import Typography from '@mui/material/Typography'
import ISocialFeed from 'src/contract/models/social_feed'
import SocialFeedContext from 'src/context/SocialFeedContext'
import { v4 } from 'uuid'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSocialFeed } from 'src/hooks/useSocialFeed'
import FeedCard from './FeedCard'
import { useEffect } from 'react'

const ListFeedView = () => { 
    const { fetchFeeds, hasNextPage, totalFeed } = useSocialFeed();

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

    useEffect(() => {
        console.log(`hasNextPage: ${hasNextPage}`);
    }, [hasNextPage]);

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
                        dataLength={totalFeed}
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
