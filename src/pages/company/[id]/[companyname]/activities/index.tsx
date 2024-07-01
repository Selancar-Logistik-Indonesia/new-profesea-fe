import { useSearchParams } from 'next/navigation'
import { Grid } from '@mui/material'
import ListFeedView from 'src/views/social-feed/ListFeedView'
import { SocialFeedProvider } from 'src/context/SocialFeedContext'
import { linkToTitleCase } from 'src/utils/helpers'

const SocialFeed = () => {
  return (
    <SocialFeedProvider>
      <SocialFeedApp />
    </SocialFeedProvider>
  )
}

const SocialFeedApp = () => {
  const params = useSearchParams()
  const usernameParam = linkToTitleCase(params.get('companyname'))

  return (
    <Grid container sx={{ display: 'flex', justifyContent: 'center', px: '120px' }}>
      <Grid item xs={12}>
        <ListFeedView username={usernameParam} />
      </Grid>
    </Grid>
  )
}

SocialFeed.acl = {
  action: 'read',
  subject: 'home'
}

export default SocialFeed
