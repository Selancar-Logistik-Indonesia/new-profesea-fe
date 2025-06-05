import React, { useEffect, useState } from 'react'
import {
  Button,
  Grid,
  Box,
  Typography,
  Container,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  styled
} from '@mui/material'
import ListThreadView from '../../views/community/ListThreadView'
import { ThreadProvider } from 'src/context/ThreadContext'
import { useThread } from 'src/hooks/useThread'

import { MdAdd } from 'react-icons/md'
import OnBoardingSections from 'src/views/community/OnBoardingSections'
import PostFeedCommunity from 'src/views/community/PostFeedCommunity'
import PostCardCommunity from 'src/views/community/PostCardCommunity'

const Community = () => {
  return (
    <ThreadProvider>
      <CommunityApp />
    </ThreadProvider>
  )
}

const CustomListItemButton = styled(ListItemButton)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  borderRadius: '8px',
  '&.Mui-selected': {
    backgroundColor: 'rgba(215, 234, 246, 0.50)',
    color: '#2654A2'
  },
  '&.Mui-selected:hover': {
    backgroundColor: 'rgba(215, 234, 246, 1)'
  },
  '&:hover': {
    backgroundColor: 'rgba(215, 234, 246, 0.50)', // light blue
    color: 'primary.main', // text color on hover
    borderRadius: '8px'
  }
}))

const CommunityApp = () => {
  const { fetchThreads } = useThread()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const isOnBoardingCommunity = false // This can be replaced with actual logic to determine if onboarding is needed

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index)
  }

  useEffect(() => {
    fetchThreads({ take: 9 })
  }, [])

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Container maxWidth='xl' sx={{ py: 2 }}>
        <Grid container spacing={4}>
          {/* Left */}
          <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Paper
              sx={{
                padding: '16px',
                borderRadius: '12px !important',
                background: '#FFF',
                boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.08)'
              }}
            >
              <Typography variant='h6' sx={{ mb: 2, fontWeight: 'bold' }}>
                Groups
              </Typography>

              <List dense sx={{ my: '24px' }}>
                <CustomListItemButton selected={selectedIndex === 0} onClick={() => handleListItemClick(0)}>
                  <ListItemText
                    primary='Group feed'
                    primaryTypographyProps={
                      selectedIndex === 0
                        ? {
                            fontWeight: 700,
                            color: '#2654A2 !important' // primary color for selected item
                          }
                        : {}
                    }
                  />
                </CustomListItemButton>
                <CustomListItemButton
                  selected={selectedIndex === 1}
                  onClick={() => handleListItemClick(1)}
                  sx={{
                    mb: 1,
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: 'rgba(215, 234, 246, 0.50)', // light blue
                      color: 'primary.main', // text color on hover
                      borderRadius: '8px'
                    }
                  }}
                >
                  <ListItemText
                    primary='Discover'
                    primaryTypographyProps={
                      selectedIndex === 1
                        ? {
                            fontWeight: 700,
                            color: '#2654A2 !important' // primary color for selected item
                          }
                        : {}
                    }
                  />
                </CustomListItemButton>
                <CustomListItemButton
                  selected={selectedIndex === 2}
                  onClick={() => handleListItemClick(2)}
                  sx={{
                    mb: 1,
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: 'rgba(215, 234, 246, 0.50)', // light blue
                      color: 'primary.main', // text color on hover
                      borderRadius: '8px'
                    }
                  }}
                >
                  <ListItemText
                    primary='Your groups'
                    primaryTypographyProps={
                      selectedIndex === 2
                        ? {
                            fontWeight: 700,
                            color: '#2654A2 !important' // primary color for selected item
                          }
                        : {}
                    }
                  />
                </CustomListItemButton>
              </List>

              <Button
                variant='outlined'
                size='small'
                startIcon={<MdAdd />}
                fullWidth
                sx={{ textTransform: 'capitalize', border: '1px solid #0B58A6', borderRadius: '4px', color: '#0B58A6' }}
              >
                Create new group
              </Button>
            </Paper>

            {!isOnBoardingCommunity && (
              <Paper
                sx={{
                  padding: '16px',
                  borderRadius: '12px !important',
                  background: '#FFF',
                  boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.08)'
                }}
              >
                <Typography variant='h6' sx={{ mb: 2, fontWeight: 'bold' }}>
                  Your Groups
                </Typography>
                <List dense>
                  {[1, 2, 3].map((group, index) => (
                    <CustomListItemButton key={index}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Box
                          sx={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: '#E0E0E0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden'
                          }}
                        >
                          <img
                            src={`https://via.placeholder.com/40?text=G${index + 1}`}
                            alt={`Group ${index + 1}`}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </Box>
                        <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                          Group {index + 1}
                        </Typography>
                      </Box>
                    </CustomListItemButton>
                  ))}
                </List>
                <Button
                  variant='outlined'
                  size='small'
                  fullWidth
                  sx={{
                    textTransform: 'capitalize',
                    border: '1px solid #0B58A6',
                    borderRadius: '4px',
                    color: '#0B58A6'
                  }}
                >
                  Show more
                </Button>
              </Paper>
            )}
          </Grid>
          {isOnBoardingCommunity ? (
            <>
              <Grid item xs={12} md={9}>
                <OnBoardingSections />
              </Grid>
            </>
          ) : (
            <>
              {/* Center */}
              <Grid item xs={12} md={6}>
                <Box sx={{ width: '100%', mb: '16px' }}>
                  <PostFeedCommunity />
                </Box>
                <PostCardCommunity />
              </Grid>
              {/* Right */}
              <Grid item xs={12} md={3}>
                3
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </Box>
  )
}

Community.acl = {
  action: 'read',
  subject: 'home'
}

export default Community
