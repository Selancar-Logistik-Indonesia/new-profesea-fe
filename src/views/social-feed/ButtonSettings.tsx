import { Icon } from '@iconify/react'
import { IconButton, List, ListItem, Popover } from '@mui/material'
import { useState } from 'react'
import ISocialFeed from 'src/contract/models/social_feed'
import ButtonDelete from './ButtonDelete'
import ButtonUpdate from './ButtonUpdate'

const ButtonSettings = (props: { item: ISocialFeed }) => {
  const { item } = props
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const openPopover = Boolean(anchorEl)

  return (
    <>
      <IconButton onClick={handleClick}>
        <Icon icon='icon-park-outline:more' />
      </IconButton>
      <Popover
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <List>
          <ListItem disablePadding>
            <ButtonUpdate item={item} variant='settings' />
          </ListItem>
          <ListItem disablePadding>
            <ButtonDelete
              item={{ id: item.id, feedId: item.id, count_likes: item.count_likes, deleteComment: true }}
              variant='settings'
            />
          </ListItem>
        </List>
      </Popover>
    </>
  )
}

export default ButtonSettings
