import React, { useEffect } from 'react'
import { Button, Grid, Box } from '@mui/material'
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
    <Box padding={2}>
    <Grid container spacing={6}>
      <Grid item lg={12} md={9} xs={12}>
        <Grid container spacing={2} sx={{
              boxSizing: 'border-box',
              background: '#FFFFFF',
              border: 0,
              boxShadow: 0,
              borderRadius: '2px',
              p: 2,
              display: 'flex',
              alignItems: 'stretch',
              justifyContent: 'center',
              wrap: 'nowrap'
            }}>
          <Grid item xs={12}>            
            <Grid container >
              <Grid item xs={12} display={'flex'} alignContent={'flex-end'} justifyContent={'flex-end'}>
                <Button variant='contained' size='small' href='/thread/create' startIcon={<Icon icon='solar:add-circle-bold-duotone' fontSize={10} />}>
                  Create Thread
                </Button>
              </Grid>
            </Grid>
            <ListThreadView />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    </Box>
  )
}

Community.acl = {
  action: 'read',
  subject: 'home'
};

export default Community
