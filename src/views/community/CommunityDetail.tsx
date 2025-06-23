import React, { useEffect, useState } from 'react'
import { Box, Typography, Tabs, Tab, Card, CardContent, CardMedia, Button, Stack, useMediaQuery } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share'
import PublicIcon from '@mui/icons-material/Public'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import PersonIcon from '@mui/icons-material/Person'
import { HttpClient } from 'src/services'
import toast from 'react-hot-toast'
import CommunityDetailSkeleton from './CommunityDetailSkeleton'
import { Theme } from '@mui/material/styles'
import Spinner from 'src/@core/components/spinner'
import CommunityMembersSection from './CommunityMembersSection'

interface ICreateBy {
  id: number
  name: string
  photo: string
  job_category: string
  job_title: string
  address: string
  country: string
}

interface IDetailCommunityData {
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
  communityId: any
}

export const CommunityDetail: React.FC<ICommunityDetail> = ({ communityId }) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
  const [tabValue, setTabValue] = React.useState(0)
  const [loading, setLoading] = useState(true)
  const [community, setCommunity] = useState<null | IDetailCommunityData>(null)

  const handleGetDetailCommunity = async () => {
    setLoading(true)
    try {
      const response = await HttpClient.get(`/community/${communityId}`)
      setCommunity(response?.data?.data)
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

  useEffect(() => {
    handleGetDetailCommunity()
  }, [communityId])

  if (loading) {
    return isMobile ? <Spinner /> : <CommunityDetailSkeleton />
  }

  return (
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
          <Box>
            <Typography variant='h6' fontWeight={700} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              {community?.name}
            </Typography>
            <Stack direction='row' spacing={3} alignItems='center' mt={0.5}>
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

              <Typography
                variant='body2'
                color='text.secondary'
                sx={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: { xs: '10px', md: '16px' } }}
              >
                <PublicIcon sx={{ fontSize: 16 }} />
                {community?.is_private ? 'Private group' : ' Public group'}
              </Typography>
            </Stack>
          </Box>
          <Stack direction={'column'} spacing={2}>
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

        <Tabs
          value={tabValue}
          variant='fullWidth'
          onChange={handleTabChange}
          sx={{ borderBottom: 1, borderColor: 'divider', mt: 1 }}
        >
          <Tab label='About' sx={{ textTransform: 'capitalize', fontWeight: 'bold' }} />
          <Tab label='Discussions' sx={{ textTransform: 'capitalize', fontWeight: 'bold' }} />
          <Tab label='Members' sx={{ textTransform: 'capitalize', fontWeight: 'bold' }} />
        </Tabs>

        {tabValue === 0 && (
          <Box p={'24px'}>
            <Box sx={{ padding: '24px', border: '1px solid', borderColor: 'divider', borderRadius: '6px' }}>
              <Typography fontSize={16} fontWeight={600} gutterBottom>
                About
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                I'm a dedicated 3rd Officer with extensive tanker experience in navigation, safety drills, and cargo
                operations. I ensure compliance with maritime regulations and work closely with the bridge team to
                maintain vessel performance and security. Passionate about maritime operations, I’m committed to
                continuous learning and contributing to the ship's smooth operation.
              </Typography>
            </Box>
          </Box>
        )}

        {/* Placeholder for future tabs */}
        {tabValue === 1 && <Typography mt={2}>Discussions content</Typography>}
        {tabValue === 2 && <CommunityMembersSection />}
      </CardContent>
    </Card>
  )
}

export default CommunityDetail
