import { Button, CircularProgress } from '@mui/material'
import { useState } from 'react'
import toast from 'react-hot-toast'
import DialogLogin from 'src/@core/components/login-modal'
import { IUser } from 'src/contract/models/user'
import { useAuth } from 'src/hooks/useAuth'
import { HttpClient } from 'src/services'
import { getCleanErrorMessage } from 'src/utils/helpers'
import localStorageKeys from 'src/configs/localstorage_keys'
import secureLocalStorage from 'react-secure-storage'

interface ConnectButtonProps {
  user: IUser
}

const ConnectButton = (props: ConnectButtonProps) => {
  const userLogin = secureLocalStorage.getItem(localStorageKeys.userData) as IUser

  const [user, setUser] = useState(props.user)
  const [isLoading, setIsLoading] = useState(false)
  const { user: isLoggedIn } = useAuth()
  const [openDialog, setOpenDialog] = useState(false)
  const [showButton, setShowButton] = useState(true)

  const onConnectRequest = async (user: IUser) => {
    setIsLoading(true)
    try {
      let connectionType = 'Connected'
      if (userLogin.team_id == 2 && (user.team_id == 4 || user.team_id == 3)) {
        connectionType = 'Followed'
      }

      const response = await HttpClient.post('/friendship/request-connect', {
        friend_id: user.id,
        connection_type: connectionType
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
      if (userLogin.team_id == 2 && user.team_id == 2) {
        // setConnectionType('Connected')

        return 'Connected'
      } else if (userLogin.team_id == 2 && user.team_id == 3) {
        // setConnectionType('Followed')

        return 'Followed'
      } else if (userLogin.team_id == 2 && user.team_id == 4) {
        // setConnectionType('Followed')

        return 'Followed'
      }
    } else {
      if (userLogin.team_id == 2 && user.team_id == 2) {
        // setConnectionType('Connected')

        return 'Connect'
      } else if (userLogin.team_id == 2 && user.team_id == 3) {
        // setConnectionType('Followed')

        return 'Follow'
      } else if (userLogin.team_id == 2 && user.team_id == 4) {
        // setConnectionType('Followed')

        return 'Follow'
      }
    }

    if (user.frienship_status == 'WA') {
      // setConnectionType('Requested')

      return 'Requested'
    }

    if (userLogin.team_id == 3 || userLogin.team_id == 4) {
      setShowButton(false)
    }
  }

  return (
    <>
      {showButton && (
        <Button
          disabled={isLoading || !!user.frienship_status}
          onClick={() => {
            isLoggedIn ? onConnectRequest(user) : setOpenDialog(!openDialog)
          }}
          variant={user.frienship_status ? 'outlined' : 'contained'}
          size='small'
          sx={{ fontSize: 14, textTransform: 'none', width: '100%', fontWeight: 400, p: '6px 16px' }}
        >
          {isLoading ? <CircularProgress size={22} /> : buildConnectText()}
        </Button>
      )}

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
