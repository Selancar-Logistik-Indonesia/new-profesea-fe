// ** React Imports
import { Fragment } from 'react'

// ** MUI Imports
import Badge from '@mui/material/Badge'
import MuiAvatar from '@mui/material/Avatar'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Import
import ChatLog from './ChatLog'
import SendMsgForm from 'src/views/apps/chat/SendMsgForm'
import CustomAvatar from 'src/@core/components/mui/avatar'
// import OptionsMenu from 'src/@core/components/option-menu'
// import UserProfileRight from 'src/views/apps/chat/UserProfileRight'

// ** Types
import { ChatContentType, StatusType } from 'src/types/apps/chatTypes'

// ** Styled Components
const ChatWrapperStartChat = styled(Box)<BoxProps>(({ theme }) => ({
  flexGrow: 1,
  height: '100%',
  display: 'flex',
  borderRadius: 1,
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: theme.palette.action.hover
}))

const ChatContent = (props: ChatContentType) => {
  // ** Props
  const {
    store,
    hidden,
    sendMsg,
    mdAbove,
    dispatch,
    statusObj,
    getInitials,
    // sidebarWidth,
    // userProfileRightOpen,
    handleLeftSidebarToggle,
    handleUserProfileRightSidebarToggle,
  } = props

  const handleStartConversation = () => {
    if (!mdAbove) {
      handleLeftSidebarToggle()
    }
  }

  const renderContent = () => {
    if (store) { 

      const selectedChat = store.selectedChat
      const hedaer = store.headerchat
      if (!hedaer) {
        return (
          <ChatWrapperStartChat
            sx={{
              ...(mdAbove ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } : {})
            }}
          >
            <MuiAvatar
              sx={{
                mb: 5,
                pt: 8,
                pb: 7,
                px: 7.5,
                width: 110,
                height: 110,
                boxShadow: 3,
                '& svg': { color: 'action.active' },
                backgroundColor: 'background.paper'
              }}
            >
              <Icon icon='mdi:message-outline' fontSize='3.125rem' />
            </MuiAvatar>
            <Box
              onClick={handleStartConversation}
              sx={{
                px: 6,
                py: 2.25,
                boxShadow: 3,
                borderRadius: 5,
                backgroundColor: 'background.paper',
                cursor: mdAbove ? 'default' : 'pointer'
              }}
            >
              <Typography sx={{ fontWeight: 600 }}>Start Conversation</Typography>
            </Box>
          </ChatWrapperStartChat>
        )
      } else {
        const is_online: StatusType = store.headerchat?.is_online

        return (
          <Box
            sx={{
              width: 0,
              flexGrow: 1,
              height: '100%',
              backgroundColor: 'action.hover'
            }}
          >
            <Box
              sx={{
                py: 3,
                px: 5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: theme => `1px solid ${theme.palette.divider}`
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {mdAbove ? null : (
                  <IconButton onClick={handleLeftSidebarToggle} sx={{ mr: 2 }}>
                    <Icon icon='mdi:menu' />
                  </IconButton>
                )}
                <Box
                  onClick={handleUserProfileRightSidebarToggle}
                  sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                >
                  <Badge
                    overlap='circular'
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                    sx={{ mr: 4.5 }}
                    badgeContent={
                      <Box
                        component='span'
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          // color: `online.main`,
                          // color: `active`,
                          backgroundColor: `${statusObj[is_online]}.main`,
                          boxShadow: theme => `0 0 0 2px ${theme.palette.background.paper}`
                        }}
                      />
                    }
                  >
                    {store.headerchat?.photo ? (
                      <MuiAvatar
                        src={store.headerchat?.photo}
                        alt={store.headerchat?.name}
                        sx={{ width: 40, height: 40 }}
                      />
                    ) : (
                      <CustomAvatar
                        skin='light'
                        color={store.headerchat?.status}
                        sx={{ width: 40, height: 40, fontSize: '1rem' }}
                      >
                        {getInitials(store.headerchat?.name)}
                      </CustomAvatar>
                    )}
                  </Badge>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ color: 'text.secondary' }}> {store.headerchat?.name}</Typography>
                    <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                      {/* {selectedChat.contact.role} */}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {mdAbove ? (
                  <Fragment>
                    {/* <IconButton size='small' sx={{ color: 'text.secondary' }}>
                      <Icon icon='mdi:phone-outline' />
                    </IconButton>
                    <IconButton size='small' sx={{ color: 'text.secondary' }}>
                      <Icon icon='mdi:video-outline' fontSize='1.5rem' />
                    </IconButton>
                    <IconButton size='small' sx={{ color: 'text.secondary' }}>
                      <Icon icon='mdi:magnify' />
                    </IconButton> */}
                  </Fragment>
                ) : null}

                {/* <OptionsMenu
                  menuProps={{ sx: { mt: 2 } }}
                  icon={<Icon icon='mdi:dots-vertical' fontSize='1.25rem' />}
                  iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
                  options={['View Contact', 'Mute Notifications', 'Block Contact', 'Clear Chat', 'Report']}
                /> */}
              </Box>
            </Box>

            {selectedChat && store.userProfile ? (
              <ChatLog
                hidden={hidden}
                data={{ ...selectedChat, userContact: store.userProfile }}
                logchat={selectedChat?.data}
              />
            ) : (
              <Box sx={{ height: 'calc(100% - 8.4375rem)' }}>
              
              </Box>
            )}

            <SendMsgForm store={store} dispatch={dispatch} sendMsg={sendMsg} id={hedaer.id} />

            {/* <UserProfileRight
              store={store}
              hidden={hidden}
              statusObj={statusObj}
              getInitials={getInitials}
              sidebarWidth={sidebarWidth}
              userProfileRightOpen={userProfileRightOpen}
              handleUserProfileRightSidebarToggle={handleUserProfileRightSidebarToggle}
            /> */}
          </Box>
        )
      }
    } else {
      return null
    }
  }

  return renderContent()
}

export default ChatContent
