import { Box, Stack, Typography } from '@mui/material'
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
          if (onLoading) {
            return (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', width: '100%' }}>
                {Array.from({ length: 7 }).map((_, index) => (
                  <PostCardCommunitySkeleton key={index} />
                ))}
              </Box>
            )
          }
          if(feeds.length === 0) {
            return(
              <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:2, padding:'12px 12px 24px 12px'}}>
                <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center'}}>
                  <Typography sx={{fontSize:16, fontWeight:700, color:'#303030'}}>Every community starts with a first post</Typography>
                  <Typography sx={{fontSize:14, fontWeight:400, color:'#999999'}}>Share your vision, rules, or a warm welcome to invite members to join the conversation.</Typography>
                </Box>
                <Box component={'img'} src='/images/cuate-community.png'/>
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
                  <PostCardCommunity key={index} feed={feed} isPage={true} />
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
