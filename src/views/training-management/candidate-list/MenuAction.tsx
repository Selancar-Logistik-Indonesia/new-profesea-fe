import { Icon } from '@iconify/react'
import { Divider, IconButton, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'
import ITrainingParticipant from 'src/contract/models/training_participant'
import { useAuth } from 'src/hooks/useAuth'
import CancelDialog from './CancelDialog'
import ChangeStatusDialog from './ChangeStatusDialog'

const MenuAction = ({
  candidate,
  changeParams
}: {
  candidate: ITrainingParticipant
  changeParams: (value?: string) => void
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const [status, setStatus] = useState<string>('')
  const [openChangeStatusModal, setOpenChangeStatusModal] = useState(false)
  const [openCancelStatusModal, setOpenCancelStatusModal] = useState(false)

  const { user } = useAuth()

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleOpenChangeStatusModal = (status: string) => {
    setStatus(status)
    setOpenChangeStatusModal(true)
  }

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Icon icon='ph:dots-three-vertical' fontSize={24} color='#868686' />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {user?.team_id === 1 && (
          <>
            <MenuItem onClick={() => setOpenCancelStatusModal(true)} sx={{ color: '#404040' }}>
              <Icon icon='lucide:edit' fontSize={20} style={{ marginRight: 8 }} />
              Edit
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => setOpenCancelStatusModal(true)} sx={{ color: '#F22' }}>
              <Icon icon='tabler:trash' fontSize={20} style={{ marginRight: 8 }} />
              Delete
            </MenuItem>
          </>
        )}
        {user?.team_id === 4 && (
          <>
            <MenuItem onClick={() => handleOpenChangeStatusModal('onhold')} sx={{ color: '#404040' }}>
              <Icon icon='material-symbols:pause-outline-rounded' fontSize={20} style={{ marginRight: 8 }} />
              Move to Onhold
            </MenuItem>
            <MenuItem onClick={() => handleOpenChangeStatusModal('ongoing')} sx={{ color: '#404040' }}>
              <Icon icon='material-symbols:start' fontSize={20} style={{ marginRight: 8 }} />
              Move to Ongoing
            </MenuItem>
            <MenuItem onClick={() => handleOpenChangeStatusModal('complete')} sx={{ color: '#4CAF50' }}>
              <Icon icon='ph:check-bold' fontSize={20} style={{ marginRight: 8 }} />
              Complete Training
            </MenuItem>
          </>
        )}
      </Menu>
      {openCancelStatusModal && (
        <CancelDialog
          candidate={candidate}
          visible={openCancelStatusModal}
          onCloseClick={() => setOpenCancelStatusModal(false)}
          changeParams={changeParams}
        />
      )}
      {openChangeStatusModal && (
        <ChangeStatusDialog
          candidate={candidate}
          status={status}
          visible={openChangeStatusModal}
          onCloseClick={() => setOpenChangeStatusModal(false)}
          changeParams={changeParams}
        />
      )}
    </>
  )
}

export default MenuAction
