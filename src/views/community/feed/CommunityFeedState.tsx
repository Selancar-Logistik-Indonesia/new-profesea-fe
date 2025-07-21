// components/feed/FeedStateComponents.tsx
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import { Community } from 'src/contract/models/community'
import ISocialFeed from 'src/contract/models/social_feed'
import UnauthenticatedPrivateCommunityFeed from 'src/views/community/feed/UnauthenticatedPrivateCommunityFeed'

export interface FeedStateComponentProps {
  onRetry?: () => void
  feed?: ISocialFeed | null
}

export const FeedLoadingState = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
    <CircularProgress />
  </Box>
)

export const FeedErrorState = ({ onRetry }: FeedStateComponentProps) => (
  <Box sx={{ textAlign: 'center', mt: 4 }}>
    <Typography variant='h5' gutterBottom>
      Feed Not Found
    </Typography>
    <Typography variant='body1' color='text.secondary' sx={{ mb: 3 }}>
      We couldn't load this community feed. Please try again.
    </Typography>
    {onRetry && (
      <Button onClick={onRetry} variant='contained' color='primary'>
        Try Again
      </Button>
    )}
  </Box>
)

export const FeedNotFoundState = ({ onRetry }: FeedStateComponentProps) => (
  <Box sx={{ textAlign: 'center', mt: 4 }}>
    <Typography variant='h5' gutterBottom>
      Feed Not Found
    </Typography>
    <Typography variant='body1' color='text.secondary' sx={{ mb: 3 }}>
      This community feed doesn't exist or has been removed.
    </Typography>
    {onRetry && (
      <Button onClick={onRetry} variant='outlined' color='primary'>
        Back to Community
      </Button>
    )}
  </Box>
)

type FeedPrivateStateProps = { community?: Community }

export const FeedPrivateState = ({ community }: FeedPrivateStateProps) => (
  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mx: 'auto' }}>
    <UnauthenticatedPrivateCommunityFeed community={community} />
  </Box>
)
