import { Icon } from '@iconify/react'
import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  IconButton,
  Link,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Skeleton,
  styled,
  Typography
} from '@mui/material'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { MdAdd, MdNavigateNext } from 'react-icons/md'
import { CommunitiesProvider } from 'src/context/CommunitiesContext'
import { PublicDataProvider } from 'src/context/PublicDataContext'
import { SocialFeedProvider } from 'src/context/SocialFeedContext'
import { useAuth } from 'src/hooks/useAuth'
import { HttpClient } from 'src/services'
import CommunityDetail from 'src/views/community/CommunityDetail'
import CommunityEdit from 'src/views/community/CommunityEdit'
import CreateGroupDialog from 'src/views/community/CreateGroupDialog'
import JoinGroupCard from 'src/views/community/JoinGroupCard'

const CommunityDetailPage = () => {
  const params = useSearchParams()
  const router = useRouter()
  const id = Number(params.get('id'))
  const { user } = useAuth()

  const [selectedCommunity, setSelectedCommunity] = useState<any>()
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [openDialogCreateGroup, setOpenDialogCreateGroup] = useState(false)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [communities, setCommunities] = useState<any[]>([])
  const [loadingYourGroups, setLoadingYourGroups] = useState(false)

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

  const handleOpenCreateGroupDialog = (show: boolean) => {
    setOpenDialogCreateGroup(show)
  }

  useEffect(() => {
    if (user) {
      fetchCommunities()
    }
  }, [])

  return (
    <SocialFeedProvider>
      <CommunitiesProvider>
        <PublicDataProvider>
          <Box sx={{ minHeight: '100vh' }}>
            {/* Breadcrumbs and create group dialog is for logged in user only */}
            {user && (
              <>
                <CreateGroupDialog open={openDialogCreateGroup} onClose={handleOpenCreateGroupDialog} />
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
                    {selectedCommunity?.name}
                  </Typography>
                  {selectedIndex === 3 && (
                    <Typography
                      key='4'
                      sx={{
                        color: '#949EA2',
                        fontSize: '14px',
                        fontWeight: 400,
                        cursor: 'pointer'
                      }}
                    >
                      Edit Community Settings
                    </Typography>
                  )}
                </Breadcrumbs>
              </>
            )}

            <Box sx={{ position: 'relative', px: theme => theme.spacing(user ? 0 : 11), pt: user ? 0 : 10 }}>
              <Grid container spacing={4}>
                {/* Left side is only for logged in user */}
                {user && (
                  <>
                    {/* Left not admin */}
                    <Grid
                      item
                      xs={12}
                      md={3}
                      sx={{ display: isAdmin ? 'none' : 'flex', flexDirection: 'column', gap: '16px' }}
                    >
                      <Paper
                        sx={{
                          padding: '16px',
                          borderRadius: '12px !important',
                          background: '#FFF',
                          boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.08)'
                        }}
                      >
                        <Typography
                          onClick={() => {
                            router.push('/community/')
                          }}
                          sx={{
                            fontSize: 14,
                            fontWeight: 600,
                            color: '#32497A',
                            mb: 2,
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 2,
                            cursor: 'pointer',
                            '&:hover': { textDecoration: 'underline' }
                          }}
                        >
                          <IconButton>
                            <Icon icon={'ph:arrow-left'} fontSize={18} />
                          </IconButton>
                          Back to group feed
                        </Typography>
                        <Typography variant='h6' sx={{ mb: 2, fontWeight: 'bold' }}>
                          Groups
                        </Typography>

                        <List dense sx={{ my: '4px' }}>
                          <CustomListItemButton selected={selectedIndex === 0}>
                            <ListItemText primary='Group Detail' />
                          </CustomListItemButton>
                          <CustomListItemButton
                            onClick={() => router.push('/community?tab=1')}
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
                            <ListItemText primary='Discover' />
                          </CustomListItemButton>
                          <CustomListItemButton
                            selected={selectedIndex === 2}
                            onClick={() => router.push('/community?tab=2')}
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
                            <ListItemText primary='Your groups' />
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

                      {communities.length > 0 && (
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
                                <CustomListItemButton
                                  key={index}
                                  onClick={() => router.push('/community/' + group?.id)}
                                >
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
                            onClick={() => router.push('/community?tab=' + 2)}
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

                    {/* left admin */}
                    <Grid
                      item
                      xs={12}
                      md={3}
                      sx={{ display: isAdmin ? 'flex' : 'none', flexDirection: 'column', gap: '16px' }}
                    >
                      <Paper
                        sx={{
                          padding: '16px',
                          borderRadius: '12px !important',
                          background: '#FFF',
                          boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.08)'
                        }}
                      >
                        {/* header */}
                        <Typography
                          onClick={() => {
                            router.push('/community/')
                          }}
                          sx={{
                            fontSize: 14,
                            fontWeight: 600,
                            color: '#32497A',
                            mb: 2,
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 2,
                            cursor: 'pointer',
                            '&:hover': { textDecoration: 'underline' }
                          }}
                        >
                          <IconButton>
                            <Icon icon={'ph:arrow-left'} fontSize={18} />
                          </IconButton>
                          Back to group feed
                        </Typography>
                        <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                          Group Management
                        </Typography>

                        <List dense sx={{ my: '16px' }}>
                          <CustomListItemButton selected={selectedIndex === 0} onClick={() => setSelectedIndex(0)}>
                            <ListItemText
                              primary='Group Detail'
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
                            selected={selectedIndex === 3}
                            onClick={() => setSelectedIndex(3)}
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
                              primary='Edit Group Settings'
                              primaryTypographyProps={
                                selectedIndex === 3
                                  ? {
                                      fontWeight: 700,
                                      color: '#2654A2 !important' // primary color for selected item
                                    }
                                  : {}
                              }
                            />
                          </CustomListItemButton>
                        </List>
                      </Paper>
                    </Grid>
                  </>
                )}

                {/* Center */}
                <Grid item xs={12} md={selectedIndex !== 0 || (user ? 6 : 9)}>
                  {selectedIndex === 0 && (
                    <>
                      {(selectedIndex as number) !== 4 && (
                        <CommunityDetail
                          communityId={id}
                          setIsAdmin={setIsAdmin}
                          setSelectedCommunity={setSelectedCommunity}
                        />
                      )}
                    </>
                  )}
                  {selectedIndex === 3 && (
                    <>
                      <CommunityEdit community={selectedCommunity} />
                    </>
                  )}
                </Grid>

                {/* Right */}
                {selectedIndex === 0 && (
                  <Grid item md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
                    <JoinGroupCard
                      setSelectedIndex={(id: any) => {
                        router.push(`/community/${id}`)
                      }}
                      showMore={() => {
                        router.push('/community?tab=1')
                      }}
                    />
                  </Grid>
                )}
              </Grid>
            </Box>
          </Box>
        </PublicDataProvider>
      </CommunitiesProvider>
    </SocialFeedProvider>
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

CommunityDetailPage.acl = {
  action: 'read',
  subject: 'home'
}

CommunityDetailPage.guestGuard = false
CommunityDetailPage.authGuard = false

export default CommunityDetailPage
