import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { CircularProgress } from '@mui/material'
import Typography from '@mui/material/Typography'
import ISocialFeed from 'src/contract/models/social_feed'
import InfiniteScroll from 'react-infinite-scroll-component'; 
import { useEffect } from 'react'
import { useAlumniFeed } from 'src/hooks/useAlumniFeed'
import SocialAlumniContext from 'src/context/SocialAlumniContext'
import FeedCardAlumni from './FeedCardAlumni'

type Props = {
    username?: string,
};

const ListFeedViewAlumni = (props: Props) => {
    const { fetchFeeds, hasNextPage, totalFeed } = useAlumniFeed();
    // const adsEveryLine = 5;

    const renderList = (feeds: ISocialFeed[]) => {
        // let itemCount = 0;
        const components: JSX.Element[] = [];
 
        if (feeds.length == 0) {
            return (
                <Typography>No feed</Typography>
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

            components.push(<FeedCardAlumni item={item} key={`feedItem${item.id}`} />)
        })

        return components;
    }

    useEffect(() => {
        console.log(`hasNextPage: ${hasNextPage}`);
    }, [hasNextPage]);

    return (
      <SocialAlumniContext.Consumer>
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
              next={() => fetchFeeds({ take: 7, alumni_id: props.username })}
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
      </SocialAlumniContext.Consumer>
    )
}

export default ListFeedViewAlumni
