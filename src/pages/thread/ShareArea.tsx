// ** React Imports
import React, { useState } from 'react'

import { Button, Paper, ButtonGroup, Popper, ClickAwayListener, MenuList, MenuItem, Grow } from '@mui/material'
// ** Layout Import

import { Icon } from '@iconify/react'

import Grid from '@mui/material/Grid'
import { toast } from 'react-hot-toast'
  

const ShareArea = (props:{url:string, subject:any, total:any}) => {
  
  const options = ['Whatsapp', 'Email','Link' ]
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef<HTMLDivElement>(null)
  const handleMenuItemClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => {
    if(options[index] == 'Link'){
      navigator.clipboard.writeText(props.url);
      toast.success('Link copied') 
    }else if(options[index] == 'Whatsapp'){
      window.open('https://web.whatsapp.com/send?text='+ props.url, '_blank')
    }else if(options[index] == 'Email'){
      const emailLink = `mailto:?subject=${encodeURIComponent("Test")}&body=${encodeURIComponent("TEST")}`
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
      <Grid container direction="row" justifyContent="flex-end" alignItems="center">
        <Grid>
          <Button
              variant='text'
              color='secondary'
              size='small'
              startIcon={<Icon icon='uil:comment' fontSize={10} />}
              href={props.url}
            >{props.total}</Button>
        </Grid>
        <Grid>
          <ButtonGroup variant="text" ref={anchorRef} aria-label="split button">
            <Button
              variant='text'
              color='secondary'
              size='small'
              aria-controls={open ? 'split-button-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-label='select merge strategy'
              aria-haspopup='menu'
              onClick={handleToggle}
              startIcon={<Icon icon='uil:share' fontSize={10} />}
            >
              Share
            </Button>
          </ButtonGroup>
        </Grid>
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
                      <MenuItem
                        key={option}
                        onClick={event => handleMenuItemClick(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Grid>               
    </>
  )
}


ShareArea.acl = {
  action: 'read',
  subject: 'home'
};
export default ShareArea
