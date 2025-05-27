import { useState } from 'react'
import { Box, Grid, Typography, Popover } from '@mui/material'
import { Icon } from '@iconify/react'
import ITrainingParticipant from 'src/contract/models/training_participant'
import { HttpClient } from 'src/services'
import { toast } from 'react-hot-toast'

// Types
export type TrainingParticipantStatus =
  | 'unregistered'
  | 'contacted'
  | 'unpaid'
  | 'paid'
  | 'registered'
  | 'onhold'
  | 'ongoing'
  | 'complete'
  | 'canceled'

export const statusStyles = {
  unregistered: { label: 'Unregistered', bgColor: '#F5F5F5', fontColor: '#404040', dotColor: '#404040' },
  contacted: { label: 'Contacted', bgColor: '#D8F0FF', fontColor: '#404040', dotColor: '#62B0FF' },
  unpaid: { label: 'Unpaid', bgColor: '#F9DFCB', fontColor: '#404040', dotColor: '#F9B384' },
  paid: { label: 'Paid', bgColor: '#E4F9CB', fontColor: '#404040', dotColor: '#A9E56C' },
  registered: { label: 'Registered', bgColor: '#89BCFF', fontColor: '#404040', dotColor: '#3E90FF' },
  onhold: { label: 'Onhold', bgColor: '#FFED94', fontColor: '#404040', dotColor: '#FFCF40' },
  ongoing: { label: 'Ongoing', bgColor: '#F9CBF3', fontColor: '#404040', dotColor: '#F07EE9' },
  complete: { label: 'Completed', bgColor: '#6EEEA1', fontColor: '#404040', dotColor: '#20CC78' },
  canceled: { label: null, bgColor: null, fontColor: null, dotColor: null }
}

export interface StatusDropdownProps {
  candidate: ITrainingParticipant
  applicantStatus: TrainingParticipantStatus
  changeParams: (status: string) => void
  disabled?: boolean
}

const StatusDropdown = ({ candidate, applicantStatus, changeParams, disabled = false }: StatusDropdownProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (disabled) return
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleStatusChange = (status: TrainingParticipantStatus) => {
    HttpClient.put(`/training/participant/update-status/${candidate.id}`, {
      status
    })
      .then(
        async () => {
          if (status === 'registered') {
            const today = new Date()
            const formattedDate = today.toISOString().split('T')[0]
            await HttpClient.patch(`/training/participants/${candidate.id}/registration-date`, {
              date_registered: formattedDate
            })
          }

          toast.success(`Successfully proceed ${candidate.fullname}`)
        },
        error => {
          toast.error(`Failed to change ${candidate.fullname} status: ` + error.response.data.message)
        }
      )
      .finally(async () => {
        handleClose()
        changeParams(status)
      })
  }

  const { label, bgColor, fontColor } = statusStyles[applicantStatus] || {
    label: '-',
    bgColor: 'transparent',
    fontColor: 'inherit'
  }

  return (
    <Grid container justifyContent='left'>
      <Box>
        <Box
          onClick={handleClick}
          sx={{
            width: '120px',
            backgroundColor: bgColor,
            p: '8px 12px',
            borderRadius: '6px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: disabled ? 'default' : 'pointer',
            opacity: disabled ? 0.7 : 1
          }}
        >
          <Typography sx={{ fontSize: 12, fontWeight: 600, color: fontColor }}>{label}</Typography>
          {!disabled && <Icon icon='ph:caret-up-bold' fontSize={16} />}
        </Box>

        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          sx={{
            mt: 1,
            '& .MuiPaper-root': {
              borderRadius: '12px',
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden'
            }
          }}
        >
          <Box
            sx={{
              width: '160px',
              backgroundColor: 'white',
              py: 1
            }}
          >
            {Object.entries(statusStyles).map(([status, style]) => {
              if (status === 'canceled' || !style.label || status === applicantStatus) return null

              return (
                <Box
                  key={status}
                  onClick={() => handleStatusChange(status as TrainingParticipantStatus)}
                  sx={{
                    p: '8px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': {
                      backgroundColor: '#F2F8FE'
                    }
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: style.dotColor
                    }}
                  />
                  <Typography sx={{ fontSize: 14, color: '#404040' }}>{style.label}</Typography>
                </Box>
              )
            })}
          </Box>
        </Popover>
      </Box>
    </Grid>
  )
}

export default StatusDropdown
