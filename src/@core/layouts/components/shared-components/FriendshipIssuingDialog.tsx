import React, { useState, useEffect } from 'react'
import { Avatar, Box, Button, CircularProgress, Dialog, DialogTitle, Typography } from '@mui/material'
import { HttpClient } from 'src/services'
import { IUser } from 'src/contract/models/user'
import { getUserAvatar } from 'src/utils/helpers'
import NotificationsType from './NotificationsType'

const FriendshipIssuingDialog = (props: {
  dialogOpen: boolean
  setDialogOpen: (e: boolean) => void
  item: NotificationsType
}) => {
  const { dialogOpen, setDialogOpen, item } = props
  const [friend, setFriend] = useState<IUser>(item.payload)
  const [onLoading, setOnLoading] = useState(true)

  const getUser = async () => {
    setOnLoading(true)
    try {
      const res = await HttpClient.get(`/user/${friend.id}`)
      if (res.status != 200) {
        return
      }

      setFriend(res.data.user)
    } catch (error) {}
    setOnLoading(false)
  }

  const handleIssuing = async (type: 'AP' | 'RJ') => {
    const res = await HttpClient.post('/friendship/issuing-request', { friend_id: friend.id, type: type })
    if (res.status != 200) {
      alert(res.data?.message ?? 'Unknow error!')

      return
    }

    await getUser()
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <Dialog onClose={() => setDialogOpen(!dialogOpen)} open={dialogOpen}>
      <DialogTitle>Request Connect</DialogTitle>

      {onLoading && (
        <Box sx={{ py: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
      )}

      {!onLoading && (
        <Box sx={{ width: 320, display: 'flex', flexDirection: 'row', p: 4 }}>
          <Avatar src={getUserAvatar(friend)} sx={{ width: 50, height: 50, mr: 3, mb: 3 }} />
          <Box pt={1} width={'100%'}>
            <Typography variant='body1'>{friend.name}</Typography>
            <Typography variant='caption'>{friend.email}</Typography>

            <Box sx={{ mt: 3, textAlign: 'left' }}>
              {friend.frienship_status == 'WA' && (
                <>
                  <Button
                    onClick={() => handleIssuing('AP')}
                    disabled={onLoading}
                    sx={{ mr: 2 }}
                    variant='contained'
                    size='small'
                  >
                    Approve
                  </Button>
                  <Button
                    onClick={() => handleIssuing('RJ')}
                    disabled={onLoading}
                    disableElevation={true}
                    variant='contained'
                    color='secondary'
                    size='small'
                  >
                    Reject
                  </Button>
                </>
              )}

              {friend.frienship_status == 'AP' && (
                <Button disabled={true} variant='text'>
                  Approved
                </Button>
              )}

              {friend.frienship_status == 'RJ' && (
                <Button disabled={true} variant='text'>
                  Rejected
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      )}
    </Dialog>
  )
}

export default FriendshipIssuingDialog
