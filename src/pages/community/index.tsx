import React, { useEffect } from 'react'
import { Button, Grid } from '@mui/material'
import ListThreadView from '../../views/community/ListThreadView'
import { ThreadProvider } from 'src/context/ThreadContext'
import { useThread } from 'src/hooks/useThread'
import { Icon } from '@iconify/react'

const Community = () => {
  return (
    <ThreadProvider>
      <CommunityApp />
    </ThreadProvider>
  )
}

const CommunityApp = () => {
  const { fetchThreads } = useThread();

  useEffect(() => {
    fetchThreads({ take: 9 });
  }, []);

  return (
    <Grid container spacing={6}>
      <Grid item lg={12} md={9} xs={12}>
        <Grid container spacing={2} sx={{
              boxSizing: 'border-box',
              background: '#FFFFFF',
              border: '1px solid rgba(76, 78, 100, 0.12)',
              borderRadius: '10px',
              p: 2,
              display: 'flex',
              alignItems: 'stretch',
              justifyContent: 'center',
              wrap: 'nowrap'
            }}>
          <Grid item xs={12}>            
            <Grid container >
              <Grid item xs={12} display={'flex'} alignContent={'flex-end'} justifyContent={'flex-end'}>
                <Button variant='contained' href='/thread/create' startIcon={<Icon icon='mdi:tooltip-plus-outline' fontSize={10} />}>
                  Create Thread
                </Button>
              </Grid>
            </Grid>
            <ListThreadView />
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
