import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import { HttpClient } from 'src/services'
import ListThreadView from '../../views/community/ListThreadView'
// import { ThreadProvider } from 'src/context/ThreadContext'
// import { useThread } from 'src/hooks/useThread'

const Community = () => {
  return (
    // <ThreadProvider>
      <CommunityApp />
    // </ThreadProvider>
  )
}

const CommunityApp = () => {
  const [listThread, setlistThread] = useState<any>([]);
  // const { page } = useThread();

  const firstload = () => {
    HttpClient.get('/thread', { page: 1, take: 15, search: '' })
      .then(response => {
        const code = response.data.threads.data
        setlistThread(code)
      }).catch(() => alert("Something went wrong"));
  }

  useEffect(() => {
    firstload()
  }, []);

  return (
    <Grid container spacing={6}>
      <Grid item lg={12} md={9} xs={12}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <ListThreadView paramcomment={listThread} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

Community.acl = {
  action: 'read',
  subject: 'home'
};

export default Community
