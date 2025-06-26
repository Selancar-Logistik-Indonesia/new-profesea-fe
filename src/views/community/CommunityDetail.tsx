import React, {  useEffect, useState } from 'react'
import { Box, Typography, Tabs, Tab, Card, CardContent, CardMedia, Button, Stack, useMediaQuery } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share'
// import PublicIcon from '@mui/icons-material/Public'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import PersonIcon from '@mui/icons-material/Person'
import { HttpClient } from 'src/services'
import toast from 'react-hot-toast'
import CommunityDetailSkeleton from './CommunityDetailSkeleton'
import { Theme } from '@mui/material/styles'
import Spinner from 'src/@core/components/spinner'
import CommunityMembersSection from './CommunityMembersSection'
import { useAuth } from 'src/hooks/useAuth'
import { Icon } from '@iconify/react'
import EditGroupDialog from './EditGroupDialog'
import { useRouter } from 'next/router'
import CommunityDiscussionSection from './CommunityDiscussionSection'

interface ICreateBy {
  id: number
  name: string
  photo: string
  job_category: string
  job_title: string
  address: string
  country: string
}

export interface IDetailCommunityData {
  id: number
  banner_url: string
  created_at: string
  created_by: ICreateBy
  description: string
  is_joined: boolean
  is_private: boolean
  name: string
  requested: boolean
  total_feeds: number
  total_members: number
  updated_at: string
}

interface ICommunityDetail {
  communityId: any,
  setIsAdmin: any,
  setSelectedCommunity: any
}

export const CommunityDetail: React.FC<ICommunityDetail> = ({ communityId, setIsAdmin, setSelectedCommunity }) => {
  const { user } = useAuth()
  const router = useRouter()
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
  const [tabValue, setTabValue] = React.useState(1)
  const [loading, setLoading] = useState(true)
  const [community, setCommunity] = useState<null | IDetailCommunityData>(null)
  const [disabledTabs, setDisabledTabs] = useState(false)

  const [openEdit, setOpenEdit] = React.useState<boolean>(false)
  const handleCloseEditDialog = () => {
    setOpenEdit(false)
  }

  const handleGetDetailCommunity = async () => {
    setTabValue(0)
    setDisabledTabs(false)
    setLoading(true)
    try {
      const response = await HttpClient.get(`/community/${communityId}`)
      setCommunity(response?.data?.data)
      setSelectedCommunity(response?.data?.data)

      if(response?.data?.data.created_by.id === user?.id) setIsAdmin(true)

      const disabled = response?.data?.data.is_private && !response?.data?.data.is_joined && user?.role !== 'admin'

      if (disabled) {
        setDisabledTabs(true)
      }
    } catch (error) {
      console.error(error)
      toast.error('Error get detail community!')
    } finally {
      setLoading(false)
    }
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleJoinGroup = async () => {
    if (!community) return

    try {
      await HttpClient.post(`/community/join-request?community_id=${community.id}`)

      setCommunity(prev => {
        if (!prev) return prev

        return {
          ...prev,
          is_joined: true,
          total_members: prev.total_members + 1
        }
      })

      toast.success('Successfully joined the group!')
    } catch (error) {
      console.error('Failed to join group:', error)
      toast.error('Failed to join group. Please try again later.')
    }
  }

  const handleCopyLink = () => {
    const url = window.location.href

    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success('Link copied to clipboard!')
      })
      .catch(err => {
        console.error('Failed to copy link:', err)
      })
  }

  const handleDelete = () => {
    setLoading(true)
    HttpClient.del(`/community/${community?.id}`)
      .then(res => {
        if (res.status == 200) {
          toast.success('Community deleted successfully!')
        }

        setTimeout(() => {
          router.back()
        }, 500)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    handleGetDetailCommunity()
  }, [communityId])

  if (loading) {
    return isMobile ? <Spinner /> : <CommunityDetailSkeleton />
  }

  return (
    <>
      <EditGroupDialog
        onClose={handleCloseEditDialog}
        open={openEdit}
        community={{ ...community, owner: community?.created_by }}
      />

      <Card sx={{ borderRadius: 4, overflow: 'hidden' }}>
        <CardMedia component='img' height='300' image={community?.banner_url} alt='Lighthouse' />
        <CardContent sx={{ p: '0px !important' }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            justifyContent='space-between'
            alignItems='center'
            mb={1}
            p={'24px'}
            gap={'20px'}
          >
            <Box sx={{ width: '100%' }}>
              <Typography variant='h6' fontWeight={700} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                {community?.name}
              </Typography>
              <Stack
                direction='row'
                spacing={3}
                alignItems='center'
                justifyContent={'space-between'}
                mt={0.5}
                sx={{ width: '100%' }}
              >
                <Stack direction={'row'} spacing={2} alignItems='center' sx={{ width: '100%' }}>
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    sx={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: { xs: '10px', md: '16px' } }}
                  >
                    <PersonIcon sx={{ fontSize: 16 }} />
                    {community?.total_members} members
                  </Typography>

                  <Typography
                    variant='body2'
                    color='text.secondary'
                    sx={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: { xs: '10px', md: '16px' } }}
                  >
                    <ChatBubbleOutlineIcon sx={{ fontSize: 16 }} />
                    {community?.total_feeds} discussions
                  </Typography>
                </Stack>

                <Stack direction={'column'} spacing={2} sx={{ display: user?.role === 'admin' ? 'none' : '' }}>
                  {!community?.is_joined && (
                    <Button
                      variant='contained'
                      sx={{ borderRadius: 2, textTransform: 'capitalize' }}
                      onClick={handleJoinGroup}
                      disabled={community?.requested}
                    >
                      {community?.requested ? 'Requested' : 'Join group'}
                    </Button>
                  )}
                  <Button
                    variant='outlined'
                    startIcon={<ShareIcon />}
                    sx={{ borderRadius: 2, textTransform: 'capitalize' }}
                    onClick={handleCopyLink}
                  >
                    Share
                  </Button>
                </Stack>
              </Stack>
            </Box>

            {/* tampilan super admin */}
            <Stack direction={'column'} spacing={2} sx={{ display: user?.role === 'admin' ? '' : 'none' }}>
              <Button
                variant='outlined'
                startIcon={<Icon icon='lucide:edit' fontSize={20} />}
                sx={{ borderRadius: 2, textTransform: 'capitalize' }}
                onClick={() => setOpenEdit(true)}
              >
                Edit Group
              </Button>
              <Button
                variant='text'
                startIcon={<Icon icon='tabler:trash' fontSize={20} />}
                sx={{ borderRadius: 2, textTransform: 'capitalize', color: '#FF2222' }}
                onClick={handleDelete}
              >
                Delete Group
              </Button>
            </Stack>
          </Stack>

          <Tabs
            value={tabValue}
            variant='fullWidth'
            onChange={handleTabChange}
            sx={{ borderBottom: 1, borderColor: 'divider', mt: 1 }}
          >
            <Tab label='About' sx={{ textTransform: 'capitalize', fontWeight: 'bold' }} />
            <Tab label='Discussions' sx={{ textTransform: 'capitalize', fontWeight: 'bold' }} disabled={disabledTabs} />
            <Tab label='Members' sx={{ textTransform: 'capitalize', fontWeight: 'bold' }} disabled={disabledTabs} />
          </Tabs>

          {tabValue === 0 && (
            <Box p={'24px'}>
              <Box sx={{ padding: '24px', border: '1px solid', borderColor: 'divider', borderRadius: '6px' }}>
                <Typography fontSize={16} fontWeight={600} gutterBottom>
                  About
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {community?.description || 'No description available.'}
                </Typography>
              </Box>
            </Box>
          )}

          {/* Placeholder for future tabs */}
          {tabValue === 1 && <CommunityDiscussionSection communityId={community?.id as number} />}
          {tabValue === 2 && <CommunityMembersSection community={community} />}
        </CardContent>
      </Card>
    </>
  )
}

export default CommunityDetail
