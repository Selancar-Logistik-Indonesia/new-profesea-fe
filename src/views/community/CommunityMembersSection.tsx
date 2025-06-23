import React, { useState } from 'react'
import { Box, Typography, Stack, Avatar, Button, Tabs, Tab, Divider } from '@mui/material'

interface IUser {
  id: number
  name: string
  photo: string
  title: string
  location: string
  joined?: boolean
}

const mockRequests: IUser[] = [
  {
    id: 1,
    name: 'Edna Mode',
    photo: '/images/users/edna.jpg',
    title: 'UI/UX Designer • Visual Design Communication',
    location: 'Jakarta, Indonesia'
  },
  {
    id: 2,
    name: 'Muhammad Benito',
    photo: '/images/users/benito.jpg',
    title: 'Seafarer (3rd Officer) • On Tanker',
    location: 'Lombok, Indonesia'
  },
  {
    id: 3,
    name: 'Abdelaziz Ghonimah',
    photo: '/images/users/ghonimah.jpg',
    title: 'Able Body • On Tanker',
    location: 'Bali, Indonesia'
  }
]

const CommunityMembersSection = () => {
  const [tab, setTab] = useState(0)
  const [requests, setRequests] = useState<IUser[]>(mockRequests)

  const handleAccept = (userId: number) => {
    setRequests(prev => prev.filter(u => u.id !== userId))
    // Call your backend to accept user
  }

  const handleDecline = (userId: number) => {
    setRequests(prev => prev.filter(u => u.id !== userId))
    // Call your backend to decline user
  }

  return (
    <Box px={3} pt={3}>
      <Tabs value={tab} onChange={(_, val) => setTab(val)} sx={{ mb: 2 }}>
        <Tab
          label='Member Request'
          sx={{
            textTransform: 'capitalize',
            fontWeight: 'bold',
            bgcolor: tab === 0 ? '#f3f6ff' : 'transparent',
            borderRadius: 2,
            mr: 2
          }}
        />
        <Tab label='All Members' sx={{ textTransform: 'capitalize', fontWeight: 'bold' }} />
      </Tabs>

      {tab === 0 && (
        <Box>
          <Typography fontWeight={600} fontSize={14} mb={0.5}>
            Member requests • {requests.length} member request
          </Typography>
          <Typography fontSize={13} color='text.secondary' mb={3}>
            Manage and Review New Member Requests with Ease
          </Typography>

          {requests.map(user => (
            <Box key={user.id} mb={3}>
              <Stack direction='row' alignItems='flex-start' spacing={2}>
                <Avatar src={user.photo} alt={user.name} sx={{ width: 48, height: 48 }} />
                <Box flex={1}>
                  <Typography fontWeight={600} fontSize={14}>
                    {user.name}
                  </Typography>
                  <Typography fontSize={13} color='text.secondary'>
                    {user.title}
                  </Typography>
                  <Typography fontSize={12} color='text.secondary'>
                    {user.location}
                  </Typography>
                </Box>
                <Stack direction='row' spacing={1}>
                  <Button
                    variant='outlined'
                    size='small'
                    sx={{ textTransform: 'capitalize' }}
                    onClick={() => handleDecline(user.id)}
                  >
                    Decline
                  </Button>
                  <Button
                    variant='contained'
                    size='small'
                    sx={{ textTransform: 'capitalize' }}
                    onClick={() => handleAccept(user.id)}
                  >
                    Accept
                  </Button>
                </Stack>
              </Stack>
              <Divider sx={{ mt: 2 }} />
            </Box>
          ))}
        </Box>
      )}

      {tab === 1 && (
        <Typography variant='body2' color='text.secondary'>
          All members will be shown here.
        </Typography>
      )}
    </Box>
  )
}

export default CommunityMembersSection
