import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { CircularProgress } from '@mui/material'
import Typography from '@mui/material/Typography'
import ISocialFeed from 'src/contract/models/social_feed'
import InfiniteScroll from 'react-infinite-scroll-component'; 
import { useEffect } from 'react'
import { useGroupFeed } from 'src/hooks/useGroupFeed'
import SocialGroupContext from 'src/context/SocialGroupContext'
import FeedCardGroup from './FeedCardGroup'

type Props = {
    username?: string,
};

const ListFeedViewGroup = (props: Props) => {
    const { fetchFeeds, hasNextPage, totalFeed } = useGroupFeed();
    // const adsEveryLine = 5;

    const renderList = (feeds: ISocialFeed[]) => {
        // let itemCount = 0;
        const components: JSX.Element[] = [];
 
        if (feeds.length == 0) {
            return (
               <Grid xs={12} >
                        <img
                          alt='logo'
                          src={ '/images/nofeed.jpg'}
                          style={{
                            maxWidth: '100%', 
                            padding: 10,
                            margin: 0
                          }}
                        />
                      </Grid>
            )
        }

        feeds.forEach((item) => {
            // itemCount++;
            // if (itemCount > adsEveryLine) {
            //     itemCount = 1;
            //     components.push(
            //         <Paper sx={{ marginTop: '10px', padding: '10px', textAlign: 'center', }} key={v4()}>
            //             <Box component='img' src={'/images/backgrounds/samplead.jpg'} sx={{ opacity: 0.2, maxWidth: '100%' }} />
            //         </Paper>
            //     );
            // }

            components.push(<FeedCardGroup item={item} key={`feedItem${item.id}`} />)
        })

        return components;
    }

    useEffect(() => {
        console.log(`hasNextPage: ${hasNextPage}`);
    }, [hasNextPage]);

    return (
      <SocialGroupContext.Consumer>
        {({ feeds, onLoading }) => {
          if (onLoading) {
            return (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CircularProgress sx={{ mt: 20 }} />
              </Box>
            )
          }

          return (
            <InfiniteScroll
              dataLength={totalFeed}
              next={() => fetchFeeds({ take: 7, group_id: props?.username })}
              hasMore={hasNextPage}
              loader={
                <Typography mt={5} color={'text.secondary'}>
                  Loading..
                </Typography>
              }
            >
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  {renderList(feeds)}
                </Grid>
              </Grid>
            </InfiniteScroll>
          )
        }}
      </SocialGroupContext.Consumer>
    )
}

export default ListFeedViewGroup
