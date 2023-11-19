// ** React Imports
import React, { useState } from 'react'

import { Button, Paper, ButtonGroup, Popper, ClickAwayListener, MenuList, MenuItem, Grow } from '@mui/material'
// ** Layout Import

import { Icon } from '@iconify/react'

import Grid from '@mui/material/Grid'
import DialogDelete from './DialogDelete'
import IThread from 'src/contract/models/thread'
  

const ActionArea = (props:{url:string, item:IThread}) => {
  const [openDelModal, setOpenDelModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IThread | null>(null);
  
  const options = ['Edit', 'Delete']
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef<HTMLDivElement>(null)
  const handleMenuItemClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => {
    if(options[index] == 'Edit'){
      window.open(props.url);
    }else if(options[index] == 'Delete'){
      setSelectedItem(props?.item);
      setOpenDelModal(true);
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
              startIcon={<Icon icon='pepicons-pop:dots-y' fontSize={10} />}
            >
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


      <DialogDelete selectedItem={selectedItem}
      visible={openDelModal}
      onCloseClick={() => setOpenDelModal(!openDelModal)} />
      </>
  )
}


ActionArea.acl = {
  action: 'read',
  subject: 'home'
};
export default ActionArea
