import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Stack,
  Avatar,
  Button,
  CircularProgress,
  Pagination,
  TextField,
  InputAdornment,
  Link
} from '@mui/material'
import { useAuth } from 'src/hooks/useAuth'

import { IDetailCommunityData } from './CommunityDetail'
import { HttpClient } from 'src/services'
import CustomPaginationItem from 'src/@core/components/pagination/item'
import AnimatedTabs from 'src/@core/components/animated-tabs'
import toast from 'react-hot-toast'
import { Icon } from '@iconify/react'
import { v4 } from 'uuid'

interface ICommunityMembersSectionProps {
  community: IDetailCommunityData | null
}

const tabOptions = [
  { value: 0, label: 'Member Request' },
  { value: 1, label: 'All Members' }
]

const CommunityMembersSection: React.FC<ICommunityMembersSectionProps> = ({ community }) => {
  const { user } = useAuth()

  const pageItems = 10
  const pageItemsRequests = 999
  const pageRequests = 1
  const [tab, setTab] = useState(0)
  const [requests, setRequests] = useState<any[]>([])
  const [members, setMembers] = useState<any[]>([])
  const [totalMembers, setTotalMembers] = useState(0)
  const [adminMember, setAdminMember] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [loadingSearch, setLoadingSearch] = useState(false)
  const [page, setPage] = useState(1)
  const [fetch, refetch] = useState(v4())
  const [inputValue, setInputValue] = useState<string>('')
  const [search, setSearch] = useState<string>('')

  const handleFetchMembers = async () => {
    setLoadingSearch(true)
    try {
      // Simulate fetching members from backend
      const response = await HttpClient.get(
        `/community/members?community_id=${community?.id}&take=${pageItems}&page=${page}&search=${search}`
      )
      const membersWithoutAdmin = (response.data?.data || []).filter((m: any) => m.user_id !== community?.created_by.id)
      setMembers(membersWithoutAdmin)
    } catch (error) {
      console.error('Error fetching members:', error)
    } finally {
      setLoadingSearch(false)
    }
  }

  const firstLoad = async () => {
    try {
      // Simulate fetching members from backend
      const response = await HttpClient.get(
        `/community/members?community_id=${community?.id}&take=${pageItems}&page=${page}&search=${search}`
      )
      console.log(response.data)
      setTotalMembers(response.data?.total - 1 || 0)
      const membersWithoutAdmin = (response.data?.data || []).filter((m: any) => m.user_id !== community?.created_by.id)
      setMembers(membersWithoutAdmin)
      setAdminMember(response.data?.data?.find((m: any) => m.user_id === community?.created_by.id)['user'] || null)
    } catch (error) {
      console.error('Error fetching members:', error)
    } finally {
      setLoading(false)
      setLoadingSearch(false)
    }
  }

  const handleFetchRequests = async () => {
    setLoading(true)
    try {
      // Simulate fetching requests from backend
      const response = await HttpClient.get(
        `/community/requests?community_id=${community?.id}&take=${pageItemsRequests}&page=${pageRequests}&status=pending`
      )
      setRequests(response.data?.data || [])
    } catch (error) {
      console.error('Error fetching requests:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAcceptAndDecline = async (requestId: number, type: 'accept' | 'reject') => {
    try {
      await HttpClient.put(`/community/requests/${requestId}/${type}`)
      setRequests(prev => prev.filter(u => u.id !== requestId))
      toast.success(`Request ${type}ed successfully!`)
    } catch (error) {
      console.error(`Error ${type} request:`, error)
      // Optionally show an error message to the user
      toast.error(`Error ${type}ing request!`)
    }
  }

  // connect functionality is commented out as it requires backend implementation, because from payload response backend team_id is not available
  // const handleConnect = (userId: number) => {
  //    setIsLoading(true)
  //       try {
  //         let connectionType = 'Connected'
  //         if (userLogin?.team_id == 2 && (user.team_id == 4 || user.team_id == 3)) {
  //           connectionType = 'Followed'
  //         }

  //         const response = await HttpClient.post('/friendship/request-connect', {
  //           friend_id: user.id,
  //           connection_type: connectionType
  //         })

  //         if (response.status == 200) {
  //           setUser(old => {
  //             return {
  //               ...old,
  //               frienship_status: 'WA'
  //             }
  //           })
  //         }
  //       } catch (error) {
  //         toast.error(getCleanErrorMessage(error))
  //       }

  //       setIsLoading(false)
  // }

  const handleRemove = (id: number) => {
    setLoading(true)
    HttpClient.del(`/community/members?community_id=${community?.id}&user_id=${id}`)
      .then(() => {
        toast.success('Successfully remove the member.')
        setTimeout(() => {
          refetch(v4())
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
    const timeout = setTimeout(() => {
      setSearch(inputValue)
    }, 500)

    return () => clearTimeout(timeout)
  }, [inputValue])

  useEffect(() => {
    handleFetchRequests()
    firstLoad()
  }, [community])

  useEffect(() => {
    handleFetchMembers()
  }, [community, tab, page, fetch, search])

  if (loading) {
    return (
      <Stack direction={'column'} justifyContent={'center'} alignItems={'center'} spacing={2} sx={{ padding: '24px' }}>
        <CircularProgress />
      </Stack>
    )
  }

  if (user?.id !== community?.created_by.id && user?.role !== 'admin') {
    return (
      <Stack direction={'column'}>
        <Box sx={{ padding: '24px', mb: '24px', borderBottom: '1px solid #e0e0e0' }}>
          <Typography fontWeight={600} fontSize={14} mb={0.5}>
            Members • {totalMembers} members
          </Typography>
          <Typography fontSize={13} color='text.secondary'>
            All members and admins in this group are shown here.
          </Typography>
        </Box>
        <Box sx={{ px: '24px' }}>
          <Typography fontWeight={600} fontSize={16}>
            Admin • 1
          </Typography>
          <Stack
            direction='row'
            alignItems='flex-start'
            spacing={2}
            sx={{ borderBottom: '1px solid #e0e0e0', py: '24px' }}
          >
            <Avatar src={adminMember?.photo} alt={adminMember?.name} sx={{ width: 70, height: 70 }} />
            <Box flex={1} sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, justifyContent: 'center' }}>
              <Typography fontWeight={600} fontSize={14} color={'rgba(50, 73, 122, 1)'}>
                {adminMember?.name}
              </Typography>
              <Typography fontSize={13}>
                {adminMember?.job_title} • {adminMember?.job_category}
              </Typography>
              <Typography fontSize={12} color='text.secondary'>
                {adminMember?.address}, {adminMember?.country}
              </Typography>
            </Box>
          </Stack>
          <Stack spacing={2}>
            <Typography fontWeight={600} fontSize={16} mt={2}>
              Members • {totalMembers}
            </Typography>
            <TextField
              sx={{ flexGrow: 1 }}
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
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
          </Stack>

          {loadingSearch ? (
            <Stack
              direction={'column'}
              justifyContent={'center'}
              alignItems={'center'}
              spacing={2}
              sx={{ padding: '24px' }}
            >
              <CircularProgress />
            </Stack>
          ) : (
            members.map((member, idx) => (
              <Stack
                key={member.user_id || idx}
                direction='row'
                alignItems='flex-start'
                spacing={2}
                sx={{ borderBottom: '1px solid #e0e0e0', py: '24px' }}
              >
                <Avatar
                  component={Link}
                  href={
                    member?.user?.team_id === 3
                      ? `/company/${member?.user?.username}`
                      : `/profile/${member?.user?.username}`
                  }
                  src={member.user?.photo}
                  alt={member.user?.name}
                  sx={{ width: 70, height: 70, textDecoration: 'none' }}
                />
                <Box flex={1} sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, justifyContent: 'center' }}>
                  <Typography
                    component={Link}
                    href={
                      member?.user?.team_id === 3
                        ? `/company/${member?.user?.username}`
                        : `/profile/${member?.user?.username}`
                    }
                    fontWeight={600}
                    fontSize={14}
                    color={'rgba(50, 73, 122, 1)'}
                    sx={{ textDecoration: 'none' }}
                  >
                    {member.user?.name}
                  </Typography>
                  <Typography fontSize={13}>
                    {member.user?.job_title} • {member.user?.job_category}
                  </Typography>
                  <Typography fontSize={12} color='text.secondary'>
                    {member.user?.address}, {member.user?.country}
                  </Typography>
                </Box>
              </Stack>
            ))
          )}
          <Pagination
            page={page}
            count={Math.ceil(totalMembers / pageItems)}
            onChange={(_, value: number) => setPage(value)}
            variant='outlined'
            shape='rounded'
            sx={{ my: 4, display: 'flex', justifyContent: 'center' }}
            renderItem={item => <CustomPaginationItem {...item} />}
          />
        </Box>
      </Stack>
    )
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', px: '24px', pt: '24px' }}>
        <AnimatedTabs tabs={tabOptions} activeTab={tab} setActiveTab={setTab} />
      </Box>

      {tab === 0 && (
        <Box>
          <Stack sx={{ padding: '24px', borderBottom: '1px solid #e0e0e0' }}>
            <Typography fontWeight={600} fontSize={14} mb={0.5}>
              Member requests • {requests.length} member request
            </Typography>
            <Typography fontSize={13} color='text.secondary' mb={3}>
              Manage and Review New Member Requests with Ease
            </Typography>
          </Stack>
          
          {requests.map((r, idx) => (
            <Box
              key={r.user_id || idx}
              sx={{
                borderBottom: '1px solid #e0e0e0',
                py: '24px',
                px: '24px',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Stack direction='row' alignItems='flex-start' spacing={2}>
                <Avatar src={r.user?.photo} alt={r.user?.name} sx={{ width: 70, height: 70 }} />
                <Box flex={1} sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, justifyContent: 'center' }}>
                  <Typography fontWeight={600} fontSize={14} color={'rgba(50, 73, 122, 1)'}>
                    {r.user?.name}
                  </Typography>
                  <Typography fontSize={13}>
                    {r.user?.job_title} • {r.user?.job_category}
                  </Typography>
                  <Typography fontSize={12} color='text.secondary'>
                    {r.user?.address}, {r.user?.country}
                  </Typography>
                </Box>
              </Stack>
              <Stack direction='row' spacing={2} sx={{ justifyContent: 'flex-end' }}>
                <Button
                  variant='outlined'
                  size='small'
                  sx={{ textTransform: 'capitalize' }}
                  onClick={() => handleAcceptAndDecline(r.id, 'reject')}
                >
                  Decline
                </Button>
                <Button
                  variant='contained'
                  size='small'
                  sx={{ textTransform: 'capitalize' }}
                  onClick={() => handleAcceptAndDecline(r.id, 'accept')}
                >
                  Accept
                </Button>
              </Stack>
            </Box>
          ))}
        </Box>
      )}

      {tab === 1 && (
        <Stack direction={'column'}>
          <Box sx={{ padding: '24px', mb: '24px', borderBottom: '1px solid #e0e0e0' }}>
            <Typography fontWeight={600} fontSize={14} mb={0.5}>
              Members • {totalMembers} members
            </Typography>
            <Typography fontSize={13} color='text.secondary'>
              All members and admins in this group are shown here.
            </Typography>
          </Box>
          <Box sx={{ px: '24px' }}>
            <Typography fontWeight={600} fontSize={16}>
              Admin • 1
            </Typography>
            <Stack
              direction='row'
              alignItems='flex-start'
              spacing={2}
              sx={{ borderBottom: '1px solid #e0e0e0', py: '24px' }}
            >
              <Avatar src={adminMember?.photo} alt={adminMember?.name} sx={{ width: 70, height: 70 }} />
              <Box flex={1} sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, justifyContent: 'center' }}>
                <Typography fontWeight={600} fontSize={14} color={'rgba(50, 73, 122, 1)'}>
                  {adminMember?.name}
                </Typography>
                <Typography fontSize={13}>
                  {adminMember?.job_title} • {adminMember?.job_category}
                </Typography>
                <Typography fontSize={12} color='text.secondary'>
                  {adminMember?.address}, {adminMember?.country}
                </Typography>
              </Box>
            </Stack>
            <Stack spacing={2}>
              <Typography fontWeight={600} fontSize={16} mt={2}>
                Members • {totalMembers}
              </Typography>
              <TextField
                sx={{ flexGrow: 1 }}
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
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
            </Stack>
            {loadingSearch ? (
              <Stack
                direction={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                spacing={2}
                sx={{ padding: '24px' }}
              >
                <CircularProgress />
              </Stack>
            ) : (
              members.map((member, idx) => (
                <Stack
                  key={member.user_id || idx}
                  direction='row'
                  alignItems='flex-start'
                  spacing={2}
                  sx={{ borderBottom: '1px solid #e0e0e0', py: '24px' }}
                >
                  <Avatar src={member.user?.photo} alt={member.user?.name} sx={{ width: 70, height: 70 }} />
                  <Box flex={1} sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, justifyContent: 'center' }}>
                    <Typography fontWeight={600} fontSize={14} color={'rgba(50, 73, 122, 1)'}>
                      {member.user?.name}
                    </Typography>
                    <Typography fontSize={13}>
                      {member.user?.job_title} • {member.user?.job_category}
                    </Typography>
                    <Typography fontSize={12} color='text.secondary'>
                      {member.user?.address}, {member.user?.country}
                    </Typography>
                  </Box>
                  <Button
                    startIcon={<Icon icon='tabler:trash' fontSize={20} />}
                    variant='text'
                    color='error'
                    size='small'
                    sx={{
                      borderRadius: 2,
                      textTransform: 'capitalize',
                      whiteSpace: 'nowrap',
                      display: adminMember?.id === user?.id || user?.role === 'admin' ? '' : 'none',
                      alignSelf: 'center'
                    }}
                    onClick={() => handleRemove(member?.user?.id)}
                  >
                    Remove Member
                  </Button>
                </Stack>
              ))
            )}
            <Pagination
              page={page}
              count={Math.ceil(totalMembers / pageItems)}
              onChange={(_, value: number) => setPage(value)}
              variant='outlined'
              shape='rounded'
              sx={{ my: 4, display: 'flex', justifyContent: 'center' }}
              renderItem={item => <CustomPaginationItem {...item} />}
            />
          </Box>
        </Stack>
      )}
    </Box>
  )
}

export default CommunityMembersSection
