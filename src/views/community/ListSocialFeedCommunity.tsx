import { Box, Stack } from '@mui/material'
import React, { useEffect } from 'react'
import SocialFeedContext from 'src/context/SocialFeedContext'
import { useSocialFeed } from 'src/hooks/useSocialFeed'
import PostCardCommunitySkeleton from './PostCardCommunitySkeleton'
import InfiniteScroll from 'react-infinite-scroll-component'
import PostCardCommunity from './PostCardCommunity'

const ListSocialFeedCommunity = ({communityId} : {communityId?: number}) => {
  const { fetchFeeds, hasNextPage, totalFeed } = useSocialFeed()

  const handleFetchFeeds = () => {
    fetchFeeds({
      take: 7,
      community_id: communityId || 'all'
    })
  }

  useEffect(() => {
    handleFetchFeeds()
  }, [])

  return (
    <>
      <SocialFeedContext.Consumer>
        {({ feeds, onLoading }) => {
          console.log(feeds)
          if (onLoading) {
            return (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', width: '100%' }}>
                {Array.from({ length: 7 }).map((_, index) => (
                  <PostCardCommunitySkeleton key={index} />
                ))}
              </Box>
            )
          }

          return (
            <InfiniteScroll
              dataLength={totalFeed}
              next={() => handleFetchFeeds()}
              hasMore={hasNextPage}
              loader={
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', mt: '16px', width: '100%' }}>
                  {Array.from({ length: 7 }).map((_, index) => (
                    <PostCardCommunitySkeleton key={index} />
                  ))}
                </Box>
              }
            >
              <Stack direction={'column'} gap={'16px'} sx={{width: '100%'}}>
                {feeds.map((feed, index) => (
                  <PostCardCommunity key={index} feed={feed} />
                ))}
              </Stack>
            </InfiniteScroll>
          )
        }}
      </SocialFeedContext.Consumer>
    </>
  )
}

export default ListSocialFeedCommunity
