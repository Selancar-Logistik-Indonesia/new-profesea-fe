import { Icon } from '@iconify/react'
import { Button, CircularProgress } from '@mui/material'
import { useState } from 'react'
// import secureLocalStorage from "react-secure-storage";
// import localStorageKeys from "src/configs/localstorage_keys";
import { IUser } from 'src/contract/models/user'

interface MessageButtonProps {
  user: IUser
}

const MessageButton = (props: MessageButtonProps) => {
  const user = props.user
  const [isLoading, setIsLoading] = useState(false)
  const onMessage = async (user: IUser) => {
    setIsLoading(true)
    window.location.replace('/chat?username=' + user.username)
  }

  //   const [show, setShowDM] = useState<boolean>(true)
  // const abilities = secureLocalStorage.getItem(localStorageKeys.abilities) as IUser

  const buildConnectIcon = () => {
    if (user.friendship_status == 'AP') {
      return 'solar:chat-round-dots-bold'
    }
    if (user.friendship_status == 'WA') {
      return 'solar:chat-round-dots-bold-duotone'
    }

    return 'solar:chat-round-dots-bold'
  }

  return (
    <Button
      disabled={!user.friendship_status}
      onClick={() => onMessage(user)}
      variant='contained'
      sx={{ py: '8px', px: '16x', fontSize: '14px', color: '#FCFCFA', textTransform: 'none', maxWidth: 'fit-content' }}
      startIcon={
        !isLoading && <Icon icon={buildConnectIcon()} color={user.friendship_status ? 'white' : '#26252542'} />
      }
    >
      {isLoading ? <CircularProgress size={22} /> : 'Message'}
    </Button>
  )
}

export default MessageButton
