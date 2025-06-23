import React, { useEffect, useState } from 'react'
import {
  Button,
  Grid,
  Box,
  Typography,
  Container,
  Paper,
  List,
  ListItemText,
  ListItemButton,
  styled,
  Skeleton
} from '@mui/material'

import { ThreadProvider } from 'src/context/ThreadContext'

import { MdAdd } from 'react-icons/md'
import OnBoardingSections from 'src/views/community/OnBoardingSections'
import PostFeedCommunity from 'src/views/community/PostFeedCommunity'
import { SocialFeedProvider } from 'src/context/SocialFeedContext'
import ListSocialFeedCommunity from 'src/views/community/ListSocialFeedCommunity'
import JoinGroupCard from 'src/views/community/JoinGroupCard'
// import { useSearchParams } from 'next/navigation'
import CreateGroupDialog from 'src/views/community/CreateGroupDialog'
import { HttpClient } from 'src/services'
import { useAuth } from 'src/hooks/useAuth'
import DiscoverAndYourGroupsCommunity from 'src/views/community/DiscoverAndYourGroupsCommunity'
import { CommunitiesProvider } from 'src/context/CommunitiesContext'

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
  const { user, flaggings } = useAuth()
  console.log('ini flaggings', flaggings)

  const [communities, setCommunities] = React.useState<any[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [openDialogCreateGroup, setOpenDialogCreateGroup] = useState(false)
  const [loadingYourGroups, setLoadingYourGroups] = useState(false)
  const [isJoined, setIsJoined] = useState(false)
  const isOnBoardingCommunity = flaggings !== null ? flaggings?.community_onboarding : false // This can be replaced with actual logic to determine if onboarding is needed

  const handleListItemClick = (index: number) => {
    console.log(index)
    if (index === 2) {
      setIsJoined(true)
    } else {
      setIsJoined(false)
    }

    setSelectedIndex(index)
  }

  const handleOpenCreateGroupDialog = (show: boolean) => {
    setOpenDialogCreateGroup(show)
  }

  const fetchCommunities = async () => {
    setLoadingYourGroups(true)
    try {
      const response = await HttpClient.get(`/community?take=3&page=1&user_id=${user?.id}`)

      setCommunities(
        response.data?.data.map((d: any) => {
          return {
            id: d?.id,
            name: d?.name,
            image: d?.banner_url,
            members: d?.total_members,
            discussions: d?.total_feeds,
            is_joined: d?.is_joined
          }
        }) || []
      )
    } catch (error) {
      console.error('Failed to fetch communities', error)
    } finally {
      setLoadingYourGroups(false)
    }
  }

  useEffect(() => {
    fetchCommunities()
  }, [])

  return (
    <SocialFeedProvider>
      <CommunitiesProvider>
        <CreateGroupDialog open={openDialogCreateGroup} onClose={handleOpenCreateGroupDialog} />
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
                    sx={{
                      textTransform: 'capitalize',
                      border: '1px solid #0B58A6',
                      borderRadius: '4px',
                      color: '#0B58A6'
                    }}
                    onClick={() => handleOpenCreateGroupDialog(true)}
                  >
                    Create new group
                  </Button>
                </Paper>

                {!isOnBoardingCommunity && selectedIndex !== 2 && (
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

                    {loadingYourGroups ? (
                      <List dense>
                        {Array.from({ length: 3 }).map((_, index) => (
                          <Box
                            key={index}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px',
                              padding: '8px 16px',
                              marginBottom: 1
                            }}
                          >
                            <Skeleton variant='circular' width={40} height={40} />
                            <Box sx={{ flex: 1 }}>
                              <Skeleton variant='text' width='50%' height={20} />
                            </Box>
                          </Box>
                        ))}
                      </List>
                    ) : (
                      <List dense>
                        {communities.map((group, index) => (
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
                                  src={group?.image}
                                  alt={`Group ${index + 1}`}
                                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                              </Box>
                              <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                                {group?.name}
                              </Typography>
                            </Box>
                          </CustomListItemButton>
                        ))}
                      </List>
                    )}

                    <Button
                      variant='outlined'
                      size='small'
                      fullWidth
                      onClick={() => handleListItemClick(2)}
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
                  <Grid item xs={12} md={selectedIndex !== 0 ? 9 : 6}>
                    {selectedIndex === 0 && (
                      <>
                        <Box sx={{ width: '100%', mb: '16px' }}>
                          <PostFeedCommunity />
                        </Box>
                        <ListSocialFeedCommunity />
                      </>
                    )}
                    {selectedIndex === 1 && (
                      <>
                        <DiscoverAndYourGroupsCommunity key={isJoined ? 'joined' : 'discover'} isJoined={isJoined} />
                      </>
                    )}

                    {selectedIndex === 2 && (
                      <>
                        <DiscoverAndYourGroupsCommunity key={isJoined ? 'joined' : 'discover'} isJoined={isJoined} />
                      </>
                    )}
                  </Grid>
                  {/* Right */}
                  {selectedIndex === 0 && (
                    <Grid item xs={12} md={3}>
                      <JoinGroupCard />
                    </Grid>
                  )}
                </>
              )}
            </Grid>
          </Container>
        </Box>
      </CommunitiesProvider>
    </SocialFeedProvider>
  )
}

Community.acl = {
  action: 'read',
  subject: 'home'
}

export default Community
