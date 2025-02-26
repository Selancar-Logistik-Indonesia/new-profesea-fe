import { Icon } from '@iconify/react'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import Applicant from 'src/contract/models/applicant'
import { HttpClient } from 'src/services'
import ProceedDialog from './ProceedDialog'
import RejectDialog from './RejectDialog'

const MenuAction = ({ candidate, refetch }: { candidate: Applicant; refetch: VoidFunction }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const [openRejectApplicant, setOpenRejectReasonApplicant] = useState(false)
  const [openProceedApplicant, setOpenProceedApplicant] = useState(false)

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSaveApplicant = async () => {
    HttpClient.post(`/directory/save`, {
      dirable_id: candidate.user_id,
      dirable_type: 'user'
    })
      .then(
        async () => {
          toast.success(`Successfully saved applicant: ${candidate.user.name}`)
        },
        error => {
          toast.error(`Failed to change ${candidate.user.name} status: ` + error.response.data.message)
        }
      )
      .finally(() => refetch())
  }

  const handleChat = () => {
    if (!candidate.user.phone) {
      toast.error(`Candidate phone number not found`)

      return
    } else if (candidate.status !== 'PR' && candidate.status !== 'AP') {
      setOpenProceedApplicant(true)

      return
    }

    const formattedPhone = candidate.user?.phone.startsWith('0')
      ? candidate.user?.phone.replace(/^0/, '+62')
      : `+62${candidate.user?.phone}`

    const whatsappUrl = `https://wa.me/${formattedPhone}`
    window.open(whatsappUrl, '_blank')
  }

  const handleViewCV = async () => {
    if (candidate.status === 'WR') {
      await handleViewed()
    }

    HttpClient.get(`/user/${candidate.user_id}/profile/resume`).then(
      response => {
        window.open(`${response.data?.path}`, '_blank', 'noreferrer')
      },
      error => {
        toast.error(`Failed to view candidate CV: ` + error.response.data.message)
      }
    )
  }

  const handleViewed = () => {
    HttpClient.patch(`/job/appllicant/resume/view`, { applicant_id: candidate.id })
      .then(
        async () => {
          toast.success(`Successfully saved applicant: ${candidate.user.name}`)
        },
        error => {
          toast.error(`Failed to change ${candidate.user.name} status: ` + error.response.data.message)

          return
        }
      )
      .finally(() => refetch())
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
        <MenuItem onClick={() => handleViewCV()} sx={{ color: '#428FDC' }}>
          <Icon icon='ph:eye' fontSize={20} style={{ marginRight: 8 }} />
          View CV
        </MenuItem>
        {(candidate.status === 'WR' || candidate.status === 'VD') && (
          <MenuItem onClick={() => setOpenProceedApplicant(true)} sx={{ color: '#4CAF50' }}>
            <Icon icon='ph:check-bold' fontSize={20} style={{ marginRight: 8 }} />
            Proceed
          </MenuItem>
        )}
        {candidate.status === 'PR' && (
          <MenuItem onClick={() => setOpenProceedApplicant(true)} sx={{ color: '#32497A' }}>
            <Icon icon='ph:handshake' fontSize={20} style={{ marginRight: 8 }} />
            Hired
          </MenuItem>
        )}
        {candidate.status !== 'AP' && candidate.status !== 'RJ' && (
          <MenuItem onClick={() => setOpenRejectReasonApplicant(true)} sx={{ color: '#F22' }}>
            <Icon icon='ph:x-bold' fontSize={20} style={{ marginRight: 8 }} />
            Not Suitable
          </MenuItem>
        )}
        {/* <MenuItem sx={{ color: '#FF9800' }}>
          <Icon icon='ph:swap' fontSize={20} style={{ marginRight: 8 }} />
          Move Candidate
        </MenuItem> */}
        <MenuItem onClick={() => handleSaveApplicant()} sx={{ color: '#868686' }} disabled={candidate.is_saved}>
          <Icon icon='ph:bookmark-simple' fontSize={20} style={{ marginRight: 8 }} />
          Save Candidate
        </MenuItem>
        {candidate.status !== 'RJ' && (
          <MenuItem onClick={() => handleChat()} sx={{ color: '#4CAF50' }}>
            <Icon icon='ph:whatsapp-logo' fontSize={20} style={{ marginRight: 8 }} />
            Message
          </MenuItem>
        )}
      </Menu>
      {openRejectApplicant && (
        <RejectDialog
          candidate={candidate}
          visible={openRejectApplicant}
          onCloseClick={() => setOpenRejectReasonApplicant(false)}
          refetch={refetch}
        />
      )}
      {openProceedApplicant && (
        <ProceedDialog
          candidate={candidate}
          visible={openProceedApplicant}
          onCloseClick={() => setOpenProceedApplicant(false)}
          refetch={refetch}
        />
      )}
    </>
  )
}

export default MenuAction
