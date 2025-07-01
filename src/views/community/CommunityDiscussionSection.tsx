import { Box } from '@mui/material'
import { SocialFeedProvider } from 'src/context/SocialFeedContext'
import ListSocialFeedCommunity from './ListSocialFeedCommunity'
import PostFeedCommunity from './PostFeedCommunity'

const CommunityDiscussionSection = ({ communityId, is_joined }: { communityId: number, is_joined:boolean | undefined }) => {
  return (
    <SocialFeedProvider>
      <Box>
        {is_joined && <PostFeedCommunity communityId={communityId} />}
        <ListSocialFeedCommunity communityId={communityId} />
      </Box>
    </SocialFeedProvider>
  )
}

export default CommunityDiscussionSection
