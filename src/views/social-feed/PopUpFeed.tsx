import { Icon } from '@iconify/react'
import {
  Avatar,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Fade,
  FadeProps,
  Grid,
  IconButton,
  Typography
} from '@mui/material'
import moment from 'moment'
import Link from 'next/link'
import React, { forwardRef, ReactElement, Ref, useState } from 'react'
import secureLocalStorage from 'react-secure-storage'
import localStorageKeys from 'src/configs/localstorage_keys'
import ISocialFeed from 'src/contract/models/social_feed'
import { IUser } from 'src/contract/models/user'
import { getUserAvatar, toLinkCase, toTitleCase } from 'src/utils/helpers'
import ButtonSettings from './ButtonSettings'
import CommentAreaView from './CommentAreaView'
import FeedBottomActions from './FeedBottomActions'

type Prop = {
  feed: ISocialFeed
  openDialog: boolean
  setOpenDialog: (value: boolean) => void
}

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const PopUpFeed = (props: Prop) => {
  const { feed, openDialog, setOpenDialog } = props
  const [openComment, setOpenComment] = useState(false)
  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser
  const profileLink = `/${feed.user?.role === 'Seafarer' ? 'profile' : 'company'}/${feed.user?.id}/${toLinkCase(
    feed.user?.username
  )}`

  return (
    <Dialog
      fullWidth
      open={openDialog}
      onClose={() => setOpenDialog(!openDialog)}
      TransitionComponent={Transition}
      maxWidth='lg'
    >
      <DialogContent sx={{ position: 'relative', m: '0 !important' }}>
        <IconButton
          size='small'
          onClick={() => setOpenDialog(!openDialog)}
          sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
        >
          <Icon icon='mdi:close' />
        </IconButton>
        <Grid container sx={{ display: 'flex', flexWrap: 'nowrap' }}>
          <Grid item sx={{ flexGrow: 1 }}>
            <Typography variant='body2' color={'#32487A'} fontWeight='600' fontSize={18}>
              content gambar
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              minWidth: '380px',
              maxWidth: '480px',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Avatar
                    component={Link}
                    href={profileLink}
                    alt='profile-picture'
                    src={getUserAvatar(feed.user)}
                    sx={{ width: 36, height: 36 }}
                  />
                  <Box>
                    <Typography
                      component={Link}
                      href={profileLink}
                      sx={{ fontSize: '16px', fontWeight: 'bold', color: 'black' }}
                    >
                      {toTitleCase(feed.user.name)}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Icon color={'#949EA2'} icon='formkit:time' fontSize='16px' />
                      <Typography sx={{ fontSize: '12px', color: '#949EA2' }}>
                        {moment(feed.created_at).fromNow()}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                {/* {user.id === feed.user_id && <ButtonSettings item={feed} />} */}
              </Box>
              <Typography sx={{ fontSize: 14, fontWeight: 400, textAlign: 'justify', whiteSpace: 'pre-line' }}>
                {feed.content}
              </Typography>
            </Box>
            <Box>
              <Divider />
              <FeedBottomActions item={feed} openComment={openComment} setOpenComment={setOpenComment} />
              <Divider />
            </Box>
            <CommentAreaView item={feed} placement='popup' />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default PopUpFeed
