import { Icon } from '@iconify/react'
import { Button, CircularProgress } from '@mui/material'
import { useState } from 'react'
import toast from 'react-hot-toast'
import DialogLogin from 'src/@core/components/login-modal'
import { IUser } from 'src/contract/models/user'
import { useAuth } from 'src/hooks/useAuth'
import { HttpClient } from 'src/services'
import { getCleanErrorMessage } from 'src/utils/helpers'

interface ConnectButtonProps {
  user: IUser
}

const ConnectButton = (props: ConnectButtonProps) => {
  const [user, setUser] = useState(props.user)
  const [isLoading, setIsLoading] = useState(false)
  const { user: isLoggedIn } = useAuth()
  const [openDialog, setOpenDialog] = useState(false)

  const onConnectRequest = async (user: IUser) => {
    setIsLoading(true)
    try {
      const response = await HttpClient.post('/friendship/request-connect', {
        friend_id: user.id
      })

      if (response.status == 200) {
        setUser(old => {
          return {
            ...old,
            frienship_status: 'WA'
          }
        })
      }
    } catch (error) {
      toast.error(getCleanErrorMessage(error))
    }

    setIsLoading(false)
  }

  const buildConnectText = () => {
    if (user.frienship_status == 'AP') {
      return 'Connected'
    }

    if (user.frienship_status == 'WA') {
      return 'Requested'
    }

    return 'Connect'
  }

  return (
    <>
      <Button
        disabled={isLoading || !!user.frienship_status}
        onClick={() => {
          isLoggedIn ? onConnectRequest(user) : setOpenDialog(!openDialog)
        }}
        variant={user.frienship_status ? 'outlined' : 'contained'}
        startIcon={
          !isLoading && <Icon icon='solar:link-linear' color={user.frienship_status ? '#26252542' : 'white'} />
        }
        size='small'
        sx={{ fontSize: 14, textTransform: 'none', width: 'fit-content', fontWeight: 300, p: '8px 12px' }}
      >
        {isLoading ? <CircularProgress size={22} /> : buildConnectText()}
      </Button>
      {!isLoggedIn && openDialog && (
        <DialogLogin
          isBanner={false}
          visible={openDialog}
          variant='training'
          onCloseClick={() => {
            setOpenDialog(!openDialog)
          }}
        />
      )}
    </>
  )
}

export default ConnectButton
