import { Box } from '@mui/material'
import { SocialFeedProvider } from 'src/context/SocialFeedContext'
import ListSocialFeedCommunity from './ListSocialFeedCommunity'
import PostFeedCommunity from './PostFeedCommunity'

const CommunityDiscussionSection = ({ communityId }: { communityId: number }) => {
  return (
    <SocialFeedProvider>
      <Box>
        <PostFeedCommunity communityId={communityId} />
        <ListSocialFeedCommunity communityId={communityId} />
      </Box>
    </SocialFeedProvider>
  )
}

export default CommunityDiscussionSection
