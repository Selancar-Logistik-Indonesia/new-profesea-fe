import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { Card, CircularProgress } from '@mui/material'
import Typography from '@mui/material/Typography'
import ISocialFeed from 'src/contract/models/social_feed'
import SocialFeedContext from 'src/context/SocialFeedContext'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSocialFeed } from 'src/hooks/useSocialFeed'
import FeedCard from './FeedCard'
import { useEffect } from 'react'

type Props = {
  username?: string
}

const ListFeedView = (props: Props) => {
  const { fetchFeeds, hasNextPage, totalFeed } = useSocialFeed()
  // const adsEveryLine = 5;

  const renderList = (feeds: ISocialFeed[]) => {
    // let itemCount = 0;
    const components: JSX.Element[] = []

    if (feeds?.length == 0) {
      return (
        <Card
          sx={{
            mt: 2,
            border: 0,
            boxShadow: 0,
            color: 'common.white',
            backgroundColor: '#FFFFFF',
            alignItems: 'center',
            justifyContent: 'center',
            direction: 'column'
          }}
        >
          <Grid xs={12} item container spacing={0} direction='column' alignItems='center' justifyContent='center'>
            <img
              alt='logo'
              src={'/images/nofeed.jpg'}
              style={{
                width: '35%',
                padding: 10,
                margin: 0
              }}
            />
          </Grid>
        </Card>
      )
    }

    feeds.forEach(item => {
      // itemCount++;
      // if (itemCount > adsEveryLine) {
      //     itemCount = 1;
      //     components.push(
      //         <Paper sx={{ marginTop: '10px', padding: '10px', textAlign: 'center', }} key={v4()}>
      //             <Box component='img' src={'/images/backgrounds/samplead.jpg'} sx={{ opacity: 0.2, maxWidth: '100%' }} />
      //         </Paper>
      //     );
      // }

      components.push(<FeedCard item={item} key={`feedItem${item.id}`} />)
    })

    return components
  }

  useEffect(() => {
    console.log(`hasNextPage: ${hasNextPage}`)
  }, [hasNextPage])

  return (
    <SocialFeedContext.Consumer>
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
            next={() => fetchFeeds({ take: 7, username: props.username })}
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
    </SocialFeedContext.Consumer>
  )
}

export default ListFeedView
