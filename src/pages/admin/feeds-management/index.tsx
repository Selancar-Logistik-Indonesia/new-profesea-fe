import { Box, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { SocialFeedProvider } from 'src/context/SocialFeedContext'
import { useSocialFeed } from 'src/hooks/useSocialFeed'
import ListFeedView from 'src/views/social-feed/ListFeedView'

const FeedsManagement = () => {
  return (
    <SocialFeedProvider>
      <FeedsManagementPage />
    </SocialFeedProvider>
  )
}

const FeedsManagementPage = () => {
  const { fetchFeeds } = useSocialFeed()

  useEffect(() => {
    console.log('use effect')
    fetchFeeds({ take: 7 })
  }, [])

  return (
    <Box>
      <Grid item xs={12}>
        <ListFeedView />
      </Grid>
    </Box>
  )
}

FeedsManagement.acl = {
  action: 'read',
  subject: 'admin-feeds-management'
}

export default FeedsManagement
