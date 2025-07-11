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
  Skeleton,
  Link,
  Breadcrumbs,
  TextField,
  InputAdornment
} from '@mui/material'

import { ThreadProvider } from 'src/context/ThreadContext'

import { MdAdd, MdNavigateNext } from 'react-icons/md'
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
import { useRouter, useSearchParams } from 'next/navigation'
import { Icon } from '@iconify/react'

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
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, flaggings } = useAuth()

  const [communities, setCommunities] = React.useState<any[]>([])
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [openDialogCreateGroup, setOpenDialogCreateGroup] = useState(false)
  const [loadingYourGroups, setLoadingYourGroups] = useState(false)
  const [selectedTab, setSelectedTab] = useState(searchParams.get('tab') ? searchParams.get('tab') : null)
  const [search, setSearch] = useState<string>('')
  const [isOnBoardingCommunity, setIsOnBoardingCommunity] = useState<boolean>(
    flaggings !== null ? flaggings?.community_onboarding : false
  )

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index)
    // setSelectedCommunityId(null)
    setIsOnBoardingCommunity(true)
    router.replace('/community/')
  }

  const handleOpenCreateGroupDialog = (show: boolean) => {
    setOpenDialogCreateGroup(show)
  }

  const handleOpenDetailGroup = (id: any) => {
    setSelectedIndex(0)
    router.push(`/community/${id}`)
  }

  const fetchCommunities = async () => {
    setLoadingYourGroups(true)
    try {
      const response = await HttpClient.get(`/community?take=3&page=1&user_id=${user?.id}&search=${search}`)

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
    setSelectedTab(searchParams.get('tab') ? searchParams.get('tab') : null)
    fetchCommunities()
    if (selectedTab) setSelectedIndex(Number(selectedTab))
  }, [])

  return (
    <SocialFeedProvider>
      <CommunitiesProvider>
        <CreateGroupDialog open={openDialogCreateGroup} onClose={handleOpenCreateGroupDialog} />
        <Box sx={{ minHeight: '100vh' }}>
          <Breadcrumbs
            separator={<MdNavigateNext fontSize={'17px'} color='black' />}
            aria-label='breadcrumb'
            sx={{ ml: 4, mb: 2 }}
          >
            <Link key='1' href='/' sx={{ textDecoration: 'none' }}>
              <Typography
                sx={{
                  color: '#32497A',
                  fontSize: '14px',
                  fontWeight: 400
                }}
              >
                Home
              </Typography>
            </Link>
            <Link key='2' href={'/community/'} sx={{ textDecoration: 'none' }}>
              {/* nanti ganti pake logic trainer/admin */}
              <Typography
                sx={{
                  color: '#32497A',
                  fontSize: '14px',
                  fontWeight: 400
                }}
              >
                Community
              </Typography>
            </Link>
            <Typography
              key='3'
              sx={{
                color: '#949EA2',
                fontSize: '14px',
                fontWeight: 400,
                cursor: 'pointer'
              }}
            >
              {selectedIndex === 1 ? 'Discover' : selectedIndex === 2 ? 'Your Groups' : 'Group Feed'}
            </Typography>
          </Breadcrumbs>

          <Container maxWidth='xl' sx={{ py: 2 }}>
            <Grid container spacing={4}>
              {/* Left not admin */}
              <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Paper
                  className='groups-navigation'
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

                  <TextField
                    sx={{ flexGrow: 1, display: selectedIndex === 1 || selectedIndex === 2 ? '' : 'none' }}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    variant='outlined'
                    placeholder='Search'
                    size='small'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start' sx={{ marginRight: '8px' }}>
                          <Icon icon='ph:magnifying-glass' fontSize={16} />
                        </InputAdornment>
                      )
                    }}
                  />

                  <List dense sx={{ my: '4px' }}>
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
                        className='groups-joined-list'
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

                {isOnBoardingCommunity && selectedIndex !== 2 && communities.length > 0 && (
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
                          <CustomListItemButton key={index} onClick={() => handleOpenDetailGroup(group?.id)}>
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

              {!isOnBoardingCommunity ? (
                <>
                  <Grid item xs={12} md={9}>
                    <OnBoardingSections setSelectedIndex={setSelectedIndex} />
                  </Grid>
                </>
              ) : (
                <>
                  {/* Center */}
                  <Grid item xs={12} md={selectedIndex !== 0 ? 9 : 6}>
                    {selectedIndex === 0 && (
                      <>
                        {selectedIndex === 0 && (
                          <>
                            <Box sx={{ width: '100%', mb: '16px' }}>
                              <PostFeedCommunity />
                            </Box>
                            <ListSocialFeedCommunity />
                          </>
                        )}
                      </>
                    )}
                    {selectedIndex === 1 && (
                      <>
                        <DiscoverAndYourGroupsCommunity
                          key={'discover'}
                          isJoined={false}
                          setSelectedIndex={(id: any) => {
                            router.replace('/community/' + id)
                          }}
                          search={search}
                        />
                      </>
                    )}

                    {selectedIndex === 2 && (
                      <>
                        <DiscoverAndYourGroupsCommunity
                          key={'joined'}
                          isJoined={true}
                          setIndex={setSelectedIndex}
                          setSelectedIndex={(id: any) => {
                            router.replace('/community/' + id)
                          }}
                          search={search}
                        />
                      </>
                    )}
                  </Grid>
                  {/* Right */}
                  {selectedIndex === 0 && (
                    <Grid item xs={12} md={3}>
                      <JoinGroupCard
                        setSelectedIndex={(id: any) => {
                          router.replace('/community/' + id)
                        }}
                        showMore={() => {
                          setSelectedIndex(1)
                          router.replace('/community/')
                        }}
                      />
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
