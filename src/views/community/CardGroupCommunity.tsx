import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/system'
import { Avatar, IconButton, Menu, MenuItem, Stack } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { useAuth } from 'src/hooks/useAuth'
import EditGroupDialog from './EditGroupDialog'
import { useRouter } from 'next/router'
import { HttpClient } from 'src/services'
import toast from 'react-hot-toast'

export interface ICardGroupProps {
  id: number
  name: string
  description: string
  is_private?: boolean
  banner_url?: string
  members_count?: number
  discussions_count?: number
  is_joined?: boolean
  onViewGroup?: (id: number) => void
  onJoinGroup?: (id: number) => void
  owner?: any
  handleDelete?: (id: number) => void
  requested?: boolean
  isOnBoarding?: boolean
}

const CardGroupCommunity: React.FC<ICardGroupProps> = ({
  id,
  description,
  name,
  banner_url = '',
  discussions_count = 0,
  members_count = 0,
  is_joined = false,
  onViewGroup = () => {},
  owner,
  is_private = false,
  handleDelete = id => {
    console.log(id)
  },
  requested = false,
  isOnBoarding = false
}) => {
  const { user } = useAuth()
  const router = useRouter()

  const [openEdit, setOpenEdit] = React.useState<boolean>(false)
  const [joinText, setJoinText] = React.useState<string>(requested ? 'Requested' : 'Join Group')

  //menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleCloseEditDialog = () => {
    setOpenEdit(false)
  }

  React.useEffect(() => {
    setJoinText(requested ? 'Requested' : 'Join Group')
  }, [requested])

  const handleJoinGroup = async () => {
    try {
      await HttpClient.post(`/community/join-request?community_id=${id}`)

      toast.success(
        is_private
          ? 'Your request to join the community has been sent. Please wait for approval.'
          : 'Successfully joined the community!'
      )

      if (is_private) {
        setJoinText('Requested')
      } else {
        setJoinText('Joined')
      }
    } catch (error) {
      console.error('Failed to join group:', error)
      toast.error('Failed to join group. Please try again later.')
    }
  }

  return (
    <>
      <EditGroupDialog
        onClose={handleCloseEditDialog}
        open={openEdit}
        community={{ id, name, description, is_private, banner_url, owner }}
      />
      <Card
        sx={{
          width: { xs: '100%', lg: 400 },
          maxWidth: isOnBoarding ? 350 : 345,
          height: isOnBoarding ? 400 : 350,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          // boxShadow: 'none',
          position: 'relative',
          flex: 1
        }}
      >
        <CardMedia
          onClick={() => onViewGroup(id)}
          sx={{ height: 120, cursor: 'pointer' }}
          image={banner_url || '/images/banner-community.png'}
          title={name}
        />

        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <CardContent sx={{ padding: '12px !important', flexGrow: 1 }}>
            {user?.role === 'admin' && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                  position: 'absolute',
                  top: 10,
                  width: '90%'
                }}
              >
                <Box sx={{ display: 'flex', gap: '8px', flexDirection: 'row' }}>
                  <Avatar
                    alt={owner?.name}
                    src={owner?.photo}
                    sx={{ width: '24px', height: '24px', objectFit: 'contain' }}
                  />
                  <Typography sx={{ fontSize: '12px', fontWeight: 600, color: '#FFFFFF', mb: '16px' }}>
                    {owner?.name}
                  </Typography>
                </Box>
                <Box>
                  <IconButton
                    id='basic-button'
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup='true'
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleOpenMenu}
                    sx={{
                      backgroundColor: 'rgba(0, 0, 0, 0.39)',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.54)'
                      }
                    }}
                  >
                    <Icon icon='bi:three-dots' fontSize={20} color={'#FFFFFF'} />
                  </IconButton>
                  <Menu id='basic-menu' anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
                    <MenuItem
                      onClick={() => setOpenEdit(true)}
                      sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                      <Icon icon='lucide:edit' fontSize={20} />
                      Edit
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleDelete(id)}
                      sx={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FF2222' }}
                    >
                      <Icon icon='tabler:trash' fontSize={20} />
                      Delete
                    </MenuItem>
                  </Menu>
                </Box>
              </Box>
            )}
            <Typography
              onClick={() => onViewGroup(id)}
              sx={{ fontSize: '13px', fontWeight: 700, color: '#2D3436', mb: 2, cursor: 'pointer' }}
            >
              {name}
            </Typography>

            <Stack
              direction={isOnBoarding ? 'column' : 'row'}
              spacing={1}
              sx={{ mb: 2, alignItems: isOnBoarding ? '' : 'center' }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Icon icon={'ph:user'} fontSize={'16px'} />
                <Typography sx={{ fontSize: '14px', fontWeight: 400 }} color='text.secondary'>
                  {members_count} members
                </Typography>
              </Box>
              <Icon
                icon='ph:dot-outline-fill'
                fontSize={'16px'}
                color='text.secondary'
                style={{ display: isOnBoarding ? 'none' : '' }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Icon icon={'ph:chat-circle-dots'} fontSize={'16px'} />
                <Typography sx={{ fontSize: '14px', fontWeight: 400 }} color='text.secondary'>
                  {discussions_count} discussions
                </Typography>
              </Box>
            </Stack>

            <Stack direction='row' spacing={3} sx={{ mb: 2, justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Icon icon={is_private ? 'ph:lock-key' : 'ph:globe-hemisphere-west'} fontSize={'16px'} />
                <Typography sx={{ fontSize: '14px', fontWeight: 400 }} color='text.secondary'>
                  {is_private ? 'Private' : 'Public'}
                </Typography>
              </Box>
            </Stack>

            <Typography
              variant='body2'
              sx={{
                color: '#525252',
                display: '-webkit-box',
                WebkitLineClamp: 4,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                minHeight: '80px' // fix height for 3 lines
              }}
            >
              {description}
            </Typography>
          </CardContent>

          <CardActions
            sx={{ padding: '12px !important', display: 'flex', flexDirection: isOnBoarding ? 'column' : 'row', gap: 1 }}
          >
            <Button
              size='small'
              variant={user?.role === 'admin' ? 'contained' : 'outlined'}
              sx={{
                fontSize: '14px',
                textTransform: 'capitalize',
                flex: 1,
                width: user?.role === 'admin' || isOnBoarding ? '100%' : ''
              }}
              onClick={() => {
                if (user?.role === 'admin') {
                  router.push(`community-management/${id}`)

                  return
                }

                onViewGroup(id)
              }}
            >
              View Group
            </Button>

            {!is_joined && (
              <Button
                size='small'
                disabled={joinText === 'Joined' || joinText === 'Requested' || requested}
                variant='contained'
                sx={{
                  fontSize: '14px',
                  textTransform: 'capitalize',
                  flex: 1,
                  display: user?.role === 'admin' ? 'none' : '',
                  width: isOnBoarding ? '100%' : '',
                  mr: isOnBoarding ? 1 : 0
                }}
                onClick={handleJoinGroup}
              >
                {joinText}
              </Button>
            )}
          </CardActions>
        </Box>
      </Card>
    </>
  )
}

export default CardGroupCommunity
