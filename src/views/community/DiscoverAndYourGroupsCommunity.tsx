import { Grid } from '@mui/material'
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
  setSelectedIndex: (id: any) => void
}

const DiscoverAndYourGroupsCommunity: React.FC<IDiscoverAndYourGroupsCommunity> = ({ isJoined, setSelectedIndex }) => {
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
        userId: user?.id
      })
    }

    resetAndFetch()
  }, [isJoined, user?.id])

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
                      description={community.description}
                      banner_url={community.banner_url}
                      members_count={community.total_members}
                      discussions_count={community.total_feeds}
                      is_joined={community?.is_joined}
                      onJoinGroup={() => {}}
                      onViewGroup={() => handleViewGroup(community?.id)}
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
