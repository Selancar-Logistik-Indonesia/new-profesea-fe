import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, Box, Grid, IconButton, Typography } from '@mui/material'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import LoginCard from 'src/@core/components/login/card'
import { PublicDataProvider } from 'src/context/PublicDataContext'
import { SocialFeedProvider } from 'src/context/SocialFeedContext'
import ISocialFeed from 'src/contract/models/social_feed'
import { useAuth } from 'src/hooks/useAuth'
import { usePublicData } from 'src/hooks/usePublicData'
import { HttpClient } from 'src/services'
import {
  FeedErrorState,
  FeedLoadingState,
  FeedNotFoundState,
  FeedPrivateState
} from 'src/views/community/feed/CommunityFeedState'
import PostCardCommunity from 'src/views/community/PostCardCommunity'
import DynamicMetaTags from 'src/views/community/feed/seo/DynamicMetaTags'
import { GetServerSidePropsContext } from 'next/types'
import { Community } from 'src/contract/models/community'

export type FeedStatus = 'loading' | 'success' | 'private' | 'error' | 'not-found'

// Server-Side Rendering function
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { feedId } = context.query

  // Validate feedId early
  const parsedFeedId = parseInt(feedId as string)
  if (!feedId || isNaN(parsedFeedId)) {
    return {
      notFound: true
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_API
  const endpoint = `${baseUrl}/public/data/social-feed/feed/${parsedFeedId}`

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // Add any required authentication headers for server-side requests
        ...(process.env.API_KEY && { Authorization: `Bearer ${process.env.API_KEY}` })
      },
      signal: controller.signal
    })

    clearTimeout(timeoutId)

    if (response.ok) {
      const data = await response.json()

      if (data?.feed) {
        console.log(`SSR: Success with endpoint: ${endpoint}`)

        return {
          props: {
            initialFeed: data.feed,
            feedId: parsedFeedId,
            ssrSuccess: true,
            isPrivate: false
          }
        }
      }
    } else if (response.status === 422) {
      // Private feed - still return props for meta tags with generic info
      console.log(`SSR: Private feed detected for ID: ${parsedFeedId}`)

      return {
        props: {
          initialFeed: null,
          feedId: parsedFeedId,
          ssrSuccess: false,
          isPrivate: true
        }
      }
    } else {
      console.error(`SSR failed with status: ${response.status}`)
    }
  } catch (error: any) {
    console.error('SSR Error:', error.message)
  }

  // Return fallback props instead of error - let client-side handle the loading
  return {
    props: {
      initialFeed: null,
      feedId: parsedFeedId,
      ssrSuccess: false,
      isPrivate: false
    }
  }
}

const customLoginCardHeader = (feed: ISocialFeed | null) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    }}
  >
    <Avatar src={feed?.community.banner || '/images/logoprofesea.png'} sx={{ width: 120, height: 120 }} />
    <Typography sx={{ fontWeight: 'bold', fontSize: 16 }}>
      Sign in to Profesea to Join {feed?.community.name}
    </Typography>
  </Box>
)

export interface FeedDetailProps {
  initialFeed: ISocialFeed | null
  feedId: number
  ssrSuccess: boolean
  isPrivate: boolean
}

const FeedDetail = ({ initialFeed, feedId, ssrSuccess, isPrivate }: FeedDetailProps) => {
  const router = useRouter()
  const { user } = useAuth()
  const { setCustomLoginCardHeader } = usePublicData()

  const [privateFeedCommunity, setPrivateFeedCommunity] = useState<Community | null>(null)
  const [feed, setFeed] = useState<ISocialFeed | null>(initialFeed)
  const [status, setStatus] = useState<FeedStatus>(
    initialFeed ? 'success' : isPrivate ? 'private' : ssrSuccess ? 'error' : 'loading'
  )

  // Move the validation check after hooks initialization
  const isValidFeedId = feedId && !isNaN(feedId)

  const handleFetchError = (error: unknown) => {
    if (error instanceof AxiosError) {
      switch (error.response?.status) {
        case 422: {
          const community = error.response.data?.data?.community || {}
          setStatus('private')
          setPrivateFeedCommunity(community)
          break
        }
        case 404:
          setStatus('not-found')
          break
        default:
          setStatus('error')
          break
      }
    } else {
      setStatus('error')
    }
    console.error('Error fetching feed:', error)
  }

  const getDetailFeed = async () => {
    if (!isValidFeedId) {
      setStatus('not-found')

      return
    }

    setStatus('loading')

    try {
      const response = await HttpClient.get(`/public/data/social-feed/feed/${feedId}`)

      if (response.status === 200 && response.data?.feed) {
        setFeed(response.data.feed)
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch (error) {
      handleFetchError(error)
    }
  }

  // Only fetch client-side if SSR failed and we don't have initial data
  useEffect(() => {
    if (!initialFeed && !ssrSuccess && isValidFeedId) {
      getDetailFeed()
    }
  }, [feedId, initialFeed, ssrSuccess, isValidFeedId])

  // Set custom login card header when feed is available
  useEffect(() => {
    if (feed) {
      setCustomLoginCardHeader(customLoginCardHeader(feed))
    }
  }, [feed, setCustomLoginCardHeader])

  // Handle invalid feedId after hooks have been called
  if (!isValidFeedId) {
    return (
      <>
        <DynamicMetaTags feed={null} feedId={0} />
        <FeedNotFoundState onRetry={() => router.push('/community')} />
      </>
    )
  }

  interface FeedContentProps {
    feed: ISocialFeed
  }

  const FeedSidebar = ({ feed }: FeedContentProps) => {
    return (
      <Grid item xs={4} sx={{ display: { xs: 'none', md: 'block' } }}>
        <Box
          sx={{
            padding: '24px',
            bgcolor: 'white',
            borderRadius: '8px',
            boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.08)'
          }}
        >
          <LoginCard isBanner={false} defaultShowInputs={false} customHeader={customLoginCardHeader(feed)} />
        </Box>
      </Grid>
    )
  }

  const FeedContent = ({ feed }: FeedContentProps) => {
    const { user } = useAuth()

    return (
      <Grid container spacing={6}>
        <Grid item md={user ? 12 : 8} xs={12}>
          <PostCardCommunity feed={feed} isPage={true} />
        </Grid>
        {!user && <FeedSidebar feed={feed} />}
      </Grid>
    )
  }

  const renderFeedContent = () => {
    switch (status) {
      case 'loading':
        return <FeedLoadingState />

      case 'error':
        return <FeedErrorState onRetry={getDetailFeed} />

      case 'not-found':
        return <FeedNotFoundState onRetry={() => router.push('/community')} />

      case 'private':
        return <FeedPrivateState community={privateFeedCommunity || undefined} />

      case 'success':
        return feed ? <FeedContent feed={feed} /> : <FeedLoadingState />

      default:
        return <FeedErrorState onRetry={getDetailFeed} />
    }
  }

  return (
    <>
      <DynamicMetaTags feed={feed} feedId={feedId} />

      <Box sx={{ position: 'relative', px: theme => theme.spacing(user ? 0 : 11), pt: user ? 0 : 10 }}>
        <Grid container sx={{ position: 'absolute', top: '12px', left: '-72px' }}>
          <IconButton onClick={() => router.push(`/community/`)}>
            <FontAwesomeIcon icon={faArrowLeft} color='text.primary' />
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          {renderFeedContent()}
        </Grid>
      </Box>
    </>
  )
}

const FeedDetailApp = (props: FeedDetailProps) => {
  return (
    <PublicDataProvider>
      <SocialFeedProvider>
        <FeedDetail {...props} />
      </SocialFeedProvider>
    </PublicDataProvider>
  )
}

FeedDetailApp.acl = {
  action: 'read',
  subject: 'feed-detail'
}

FeedDetailApp.guestGuard = false
FeedDetailApp.authGuard = false

export default FeedDetailApp
