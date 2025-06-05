import { Avatar, Box, Button, Card } from '@mui/material'
import React from 'react'
import { useAuth } from 'src/hooks/useAuth'
import { getUserAvatar } from 'src/utils/helpers'

const PostFeedCommunity = () => {
  const { user, setUser } = useAuth()

  return (
    <>
      <Card
        sx={{
          border: 0,
          boxShadow: 0,
          color: 'common.white',
          backgroundColor: '#FFFFFF',
          padding: { xs: 3, md: 5 },
          borderRadius: '12px !important'
        }}
      >
        <Box
          sx={{ display: 'flex', flexDirection: 'row', borderBottom: '1px solid rgba(219, 219, 219, 1)', pb: '10px' }}
        >
          <Box mr={3} mt={1}>
            <Avatar src={getUserAvatar(user!)} alt='profile-picture' sx={{ height: 50, width: 50 }} />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              mt: '10px'
            }}
          >
            <Button
              //   onClick={() => setIsOpenDialogPostFeed(true)}
              sx={{
                width: '100%',
                borderRadius: '30px !important',
                backgroundColor: 'rgba(240, 240, 240, 1)',
                textTransform: 'capitalize',
                justifyContent: 'flex-start !important',
                fontWeight: 400,
                fontSize: '14px',
                color: 'rgba(102, 102, 102, 1)'
              }}
            >
              Write something...
            </Button>
          </Box>
        </Box>
      </Card>
    </>
  )
}

export default PostFeedCommunity
