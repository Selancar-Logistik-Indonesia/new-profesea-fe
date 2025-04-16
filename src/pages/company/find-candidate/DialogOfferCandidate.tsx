import {
  Autocomplete,
  Button,
  CircularProgress,
  SwipeableDrawer,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { HttpClient } from 'src/services'
import toast from 'react-hot-toast'
import secureLocalStorage from 'react-secure-storage'
import localStorageKeys from 'src/configs/localstorage_keys'
import { IUser } from 'src/contract/models/user'

interface IDialogOfferCandidate {
  open: boolean
  onClose: () => void
  onOpen: () => void
  candidateId: any
}

const DialogOfferCandidate: React.FC<IDialogOfferCandidate> = ({ open, onClose, onOpen, candidateId }) => {
  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser

  const [characters, setCharacters] = useState(180)
  const [message, setMessage] = useState('')
  const [maxCharacters, setMaxCharacters] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [loadingSubmit, setLodingSubmit] = useState(false)
  const [optionsJob, setOptionsJob] = useState([])
  const [selectedJob, setSelectedJob] = useState<null | any>(null)

  const handleOnChangeMessage = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let value = e.target.value

    if (value === '') {
      setMaxCharacters(false)
      setCharacters(180)
    }

    if (value.length > 180) {
      value = value.slice(0, 180) // Potong ke 180 karakter
      setMaxCharacters(true)
    } else {
      setMaxCharacters(false)
    }

    setMessage(value)
    setCharacters(180 - value.length)
  }

  const handleSubmitOffer = async () => {
    setLodingSubmit(true)
    try {
      const response = await HttpClient.post('/job/offer', {
        candidate_id: candidateId,
        job_id: selectedJob ? selectedJob.id : '',
        message: message
      })

      toast.success(response?.data?.message, { position: 'top-center' })
      onClose()
      location.reload()
      setCharacters(180)
      setSelectedJob(null)
      setMessage('')
    } catch (error) {
      toast.error('Something went wrong!')
    }

    setLodingSubmit(false)
  }

  const handleFetchJob = async () => {
    try {
      const response = await HttpClient.get(`job/company/${user?.id}/jobs`)
      const dataJobs = response?.data?.jobs?.data

      setOptionsJob(dataJobs)
    } catch (error) {
      toast.error('Something went wrong!')
    }
  }

  useEffect(() => {
    handleFetchJob()
  }, [])

  return (
    <SwipeableDrawer anchor='right' open={open} onClose={onClose} onOpen={onOpen}>
      <Box
        sx={{
          display: 'flex',
          height: '100%',
          flexDirection: 'column',
          padding: '24px',
          width: isMobile ? '100%' : 400
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#1F1F1F' }}>Offer Job</Typography>
          <Icon icon='system-uicons:cross' fontSize={20} onClick={onClose} style={{ cursor: 'pointer' }} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', mb: '12px' }}>
          <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#303030' }}>
            Offer Job to This Candidate
          </Typography>
          <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#999' }}>
            Select a job from your listings to match this candidate with the right opportunity.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', mb: '40px' }}>
          <Typography sx={{ color: '#404040', fontSize: 14, fontWeight: 'bold' }}>Job</Typography>
          <Autocomplete
            size='small'
            fullWidth
            disablePortal
            id='choose-job'
            options={optionsJob}
            value={selectedJob}
            getOptionLabel={(option: any) => option.job_title}
            renderInput={params => <TextField {...params} placeholder='Choose Job' />}
            onChange={(_: any, newValue: any | null) => {
              setSelectedJob(newValue)
            }}
          />
        </Box>
        <Box>
          <TextField
            id='outlined-multiline-flexible'
            fullWidth
            multiline
            rows={8}
            placeholder='Compose a message to candidate...'
            value={message}
            onChange={handleOnChangeMessage}
          />
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', mt: '8px' }}>
            {maxCharacters ? (
              <Typography sx={{ color: 'red', fontSize: 12, fontWeight: 400 }}>180/180 characters</Typography>
            ) : (
              <Typography sx={{ color: '#999', fontSize: 12, fontWeight: 400 }}>
                {characters} characters remaining
              </Typography>
            )}
            {/* <Typography sx={{ color: '#999', fontSize: 12, fontWeight: 400 }}>
              {characters} characters remaining
            </Typography> */}
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', px: '24px', gap: '16px', marginBottom: '40px' }}>
        <Button variant='outlined' sx={{ textTransform: 'capitalize', flex: 1 }}>
          Cancel
        </Button>
        <Button
          variant='contained'
          sx={{ textTransform: 'capitalize', flex: 1 }}
          disabled={message.length == 0 || loadingSubmit}
          onClick={handleSubmitOffer}
        >
          {loadingSubmit ? <CircularProgress size={'20px'} /> : 'Assign'}
        </Button>
      </Box>
    </SwipeableDrawer>
  )
}

export default DialogOfferCandidate
