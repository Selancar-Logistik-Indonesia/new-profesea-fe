// ** React Imports
import React from 'react'

import { Paper, Popper, ClickAwayListener, MenuList, MenuItem, Grow, IconButton } from '@mui/material'
// ** Layout Import

import { Icon } from '@iconify/react'

import { toast } from 'react-hot-toast'
import { Box } from '@mui/system'
// import Link from 'next/link'

const ShareArea = (props: { url: string; subject: any; clean?: boolean }) => {
  const options = ['Whatsapp', 'Email', 'Link']
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef<any>(null)
  const handleMenuItemClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => {
    if (options[index] == 'Link') {
      navigator.clipboard.writeText(props.clean ? props.url : window.location.origin + props.url)
      toast.success('Link copied')
    } else if (options[index] == 'Whatsapp') {
      window.open(
        'https://web.whatsapp.com/send?text=' + (props.clean ? props.url : window.location.origin + props.url),
        '_blank'
      )
    } else if (options[index] == 'Email') {
      const body = `Click link here ${props.clean ? props.url : window.location.origin + props.url}`
      const emailLink = `mailto:?subject=${encodeURIComponent(props.subject)}&body=${encodeURIComponent(body)}`
      window.open(emailLink, '_blank')
    }
    setOpen(false)
  }
  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }

  const handleClose = (event: Event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return
    }

    setOpen(false)
  }

  return (
    <>
      <Box>
        <Box>
          <IconButton ref={anchorRef} size='small' onClick={handleToggle}>
            <Icon icon='material-symbols-light:share-outline' fontSize={20} color='rgba(50, 73, 122, 1)' />
          </IconButton>
        </Box>
        <Popper
          sx={{
            zIndex: 1
          }}
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id='split-button-menu' autoFocusItem>
                    {options.map((option, index) => (
                      <MenuItem key={option} onClick={event => handleMenuItemClick(event, index)}>
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Box>
    </>
  )
}

ShareArea.acl = {
  action: 'read',
  subject: 'home'
}
export default ShareArea
