import React, { useState, useEffect } from 'react'
import { Box, Typography, IconButton, Menu, MenuItem, CircularProgress, Avatar } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import { HttpClient } from 'src/services'
import { useAuth } from 'src/hooks/useAuth'
import { Community } from 'src/contract/models/community'

interface ICommunitySelect {
  handleSetCommunityId: (communityId: any) => void
  communityWarning?: boolean
}

const CommunitySelect: React.FC<ICommunitySelect> = ({ handleSetCommunityId, communityWarning }) => {
  const { user } = useAuth()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null)
  const [communities, setCommunities] = useState<Community[]>([])
  const [loading, setLoading] = useState(false)

  const fetchCommunities = async () => {
    setLoading(true)
    try {
      const response = await HttpClient.get(`/community?take=999&page=1&user_id=${user?.id}`) // ganti sesuai endpoint kamu
      setCommunities(response.data?.data || [])
    } catch (error) {
      console.error('Failed to fetch communities', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCommunities()
  }, [])

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSelect = (community: Community) => {
    setSelectedCommunity(community)
    handleSetCommunityId(community?.id)
    handleClose()
  }

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: '#F8F8F7',
          padding: '16px 24px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          border: communityWarning ? '1px solid red' : ''
        }}
        onClick={handleClick}
      >
        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: 600,
            color: '#1F1F1F',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {selectedCommunity?.name || 'Select a group to post to'}
        </Typography>
        <IconButton size='small' edge='end'>
          <ExpandMoreIcon />
        </IconButton>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            borderRadius: 8,
            marginTop: 8,
            maxHeight: 200, // set max height here
            overflowY: 'auto' // enable scroll
          }
        }}
      >
        {loading ? (
          <MenuItem disabled>
            <CircularProgress size={20} />
            <Typography sx={{ marginLeft: 1 }}>Loading...</Typography>
          </MenuItem>
        ) : communities.length === 0 ? (
          <MenuItem disabled>No communities found</MenuItem>
        ) : (
          communities.map(community => (
            <MenuItem
              key={community.id}
              selected={community.id === selectedCommunity?.id}
              onClick={() => handleSelect(community)}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <Box>
                  <Avatar src={community?.banner_url} alt='profile-picture' sx={{ height: 50, width: 50 }} />
                </Box>

                {community.name}
              </Box>
            </MenuItem>
          ))
        )}
      </Menu>
      {communityWarning && <Typography sx={{color:'red'}}>*Please select a group before posting your feed</Typography>}
    </Box>
  )
}

export default CommunitySelect
