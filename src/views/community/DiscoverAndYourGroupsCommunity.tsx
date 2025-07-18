import { Box, Button, Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import CommunitiesContext from 'src/context/CommunitiesContext'

import { useRouter } from 'next/navigation'
import { useCommunities } from 'src/hooks/useCommunities'
import CardGroupCommunity from './CardGroupCommunity'
import CardGroupCommunitySkeleton from './CardGroupCommunitySkeleton'
import { useAuth } from 'src/hooks/useAuth'

interface IDiscoverAndYourGroupsCommunity {
  isJoined?: boolean
  setSelectedIndex: (id: any) => void,
  search?: string
  setIndex?:any
}

const DiscoverAndYourGroupsCommunity: React.FC<IDiscoverAndYourGroupsCommunity> = ({ isJoined, setSelectedIndex, search, setIndex }) => {
  const router = useRouter()
  const { user } = useAuth()
  const take = 6

  const { fetchCommunities, hasNextPage, totalCommunities, setPage, setHasNextPage } = useCommunities()

  const handleViewGroup = (id: any) => {
    router.push(`/community/?communityId=${id}`)
    setSelectedIndex(id)
  }

  useEffect(() => {
    const resetAndFetch = async () => {
      setPage(1)
      setHasNextPage(true) // harus true agar InfiniteScroll bisa trigger
      await fetchCommunities({
        take,
        mPage: 1,
        isJoined: isJoined === true ? true : false,
        userId: user?.id,
        search: search ?? ''
      })
    }

    resetAndFetch()
  }, [isJoined, user?.id, search])

  return (
    <>
      <CommunitiesContext.Consumer>
        {({ communities, onLoading }) => {
          if (onLoading) {
            return (
              <Grid container spacing={2}>
                {Array.from({ length: take }).map((_, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <CardGroupCommunitySkeleton />
                  </Grid>
                ))}
              </Grid>
            )
          }

          if(communities.length === 0){
            return(
              <Box sx={{display:'flex', flexDirection:'column', backgroundColor:'#FFFFFF', padding:'24px', borderRadius:'12px', gap:8}}>
                <Box component={'img'} src='/images/amico-new.png' alt='Empty Community' sx={{objectFit:'contain', height:241}}/>
                <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', gap:1}}>
                  <Typography sx={{fontSize:16, fontWeight:700, color:'#1F1F1F'}}>You Haven’t Joined Any Groups Yet</Typography>
                  <Typography sx={{fontSize:14, fontWeight:400, color:'#999999', mb:2, width:{xs:'100%', sm:'80%'}}}>Start exploring communities that match your interests and connect with like-minded people.</Typography>
                  <Button variant='contained' onClick={() => setIndex(1)} sx={{textTransform:'none'}} >
                    Discover group to join
                  </Button>
                </Box>
              </Box>
            )
          }

          return (
            <InfiniteScroll
              dataLength={totalCommunities}
              next={() => fetchCommunities()}
              hasMore={hasNextPage}
              loader={
                <Grid container spacing={2} mt={2}>
                  {Array.from({ length: take }).map((_, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <CardGroupCommunitySkeleton />
                    </Grid>
                  ))}
                </Grid>
              }
            >
              <Grid container spacing={2}>
                {communities.map((community, index) => (
                  <Grid item xs={12} sm={6} md={4} key={community.id || index}>
                    <CardGroupCommunity
                      id={community.id}
                      name={community.name}
                      is_private={community.is_private}
                      description={community.description}
                      banner_url={community.banner_url}
                      members_count={community.total_members}
                      discussions_count={community.total_feeds}
                      is_joined={community?.is_joined}
                      onJoinGroup={() => {}}
                      onViewGroup={() => handleViewGroup(community?.id)}
                      requested={community?.requested}
                    />
                  </Grid>
                ))}
              </Grid>
            </InfiniteScroll>
          )
        }}
      </CommunitiesContext.Consumer>
    </>
  )
}

export default DiscoverAndYourGroupsCommunity
