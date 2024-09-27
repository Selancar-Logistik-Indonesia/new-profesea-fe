import { Icon } from '@iconify/react'
import {
  Avatar,
  Box,
  Dialog,
  DialogContent,
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
import ISocialFeed from 'src/contract/models/social_feed'
import { getUserAvatar, toLinkCase, toTitleCase } from 'src/utils/helpers'
import CommentAreaView from './CommentAreaView'
import FeedBottomActions from './FeedBottomActions'
import ImageSlider from './ImageSlider'

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
      <DialogContent sx={{ position: 'relative', p: '0 !important' }}>
        <IconButton
          size='small'
          onClick={() => setOpenDialog(!openDialog)}
          sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
        >
          <Icon icon='mdi:close' />
        </IconButton>
        <Grid container sx={{ display: 'flex', flexWrap: 'nowrap' }}>
          <Grid item sx={{ flexGrow: 1, backgroundColor: '#1B1F23' }}>
            <ImageSlider items={feed.attachments} />
          </Grid>
          <Grid
            item
            sx={{
              padding: 5,
              display: 'flex',
              flexDirection: 'column',
              width: '400px',
              height: '530px',
              flexShrink: 0,
              gap: '16px',
              overflow: 'auto',
              '&::-webkit-scrollbar': {
                display: 'none'
              }
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
              <Typography sx={{ fontSize: 14, fontWeight: 400, textAlign: 'justify', whiteSpace: 'pre-line' }}>
                {feed.content}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'default' }}>
                <Icon color='#32497A' icon='ph:thumbs-up' fontSize={16} />
                <Typography sx={{ color: '#32497A', fontSize: 14 }}>{feed.count_likes}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'default' }}>
                <Icon color='#32497A' icon='ph:chat-circle' fontSize={16} />
                <Typography sx={{ color: '#32497A', fontSize: 14 }}>{feed.count_comments}</Typography>
              </Box>
            </Box>
            <Box>
              <Divider sx={{ mb: '6px' }} />
              <FeedBottomActions item={feed} openComment={openComment} setOpenComment={setOpenComment} />
              <Divider sx={{ mt: '6px' }} />
            </Box>
            <CommentAreaView item={feed} placement='popup' />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default PopUpFeed
