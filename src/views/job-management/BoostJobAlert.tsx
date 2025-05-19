import { Icon } from '@iconify/react'
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Switch,
  Typography
} from '@mui/material'
import { useEffect, useState } from 'react'
import { HttpClient } from 'src/services'

import Job from 'src/contract/models/job'
import { useAuth } from 'src/hooks/useAuth'
import dynamic from 'next/dynamic'

const ModalUnlockPlus = dynamic(() => import('src/@core/components/subscription/ModalUnlockPlus'), { ssr: false })

const BoostJobAlert = ({
  setIsBoosted,
  currentJob,
  isBoosted
}: {
  isBoosted: boolean
  setIsBoosted: (e: boolean) => void
  currentJob?: Job
}) => {
  const { user, abilities } = useAuth()
  const [isSubs, setIsSubs] = useState<boolean>(false)

  const [boostCount, setBoostCount] = useState(0)
  const [open, setOpen] = useState(false)
  const [availableBoost, setAvailableBoost] = useState(true)
  const [loading, setLoading] = useState(false)

  const handleCloseModal = () => {
    setOpen(false)
  }

  const handleConfirm = (isBoost: boolean) => {
    setIsBoosted(isBoost)
  }

  const getJobs = async () => {
    try {
      setLoading(true)
      const res = await HttpClient.get('/job', {
        page: 1,
        take: 100,
        is_boosted: 1
      })
      const data = res.data.jobs.data

      if (data[0]?.is_boosted) {
        setBoostCount(boostCount + 1)
      }
      setIsBoosted(currentJob?.is_boosted as boolean)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getJobs()
  }, [])

  useEffect(() => {
    setIsSubs(abilities?.plan_type !== 'BSC-ALL')
  }, [user])

  useEffect(() => {
    if (boostCount > 0 && !currentJob?.is_boosted) {
      setAvailableBoost(false)
    }
  }, [boostCount])

  const actionSwitch = () => {
    if (loading) {
      return <CircularProgress size={20} />
    }

    if (!availableBoost) {
      return
    }

    return (
      <Switch
        // disabled={boostCount > 0 && !currentJob?.is_boosted}
        checked={isBoosted}
        inputProps={{ 'aria-label': 'controlled' }}
        onChange={() => {
          setOpen(true)
        }}
        // defaultChecked={currentJob?.is_boosted}
      />
    )
  }

  return (
    <>
      <Alert
        action={!isSubs ? <ModalUnlockPlus text={'Unlock to Boost job'} /> : actionSwitch()}
        icon={<Icon icon='ph:lightning' fontSize={32} color='#32497A' />}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 2,
          backgroundColor: availableBoost ? '#F2F8FE' : '#F8F8F7',
          border: availableBoost ? '1px solid #0B58A6' : '1px solid #BFBFBF',
          borderRadius: '8px'
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#303030' }}>Boost Job Visibility</Typography>
          <Typography sx={{ fontSize: 14, fontWeight: 400, color: '#303030' }}>
            {availableBoost
              ? 'Highlight this job to attract more candidates. You can highlight one job at a time for maximum visibility. Boosting lasts for 2 weeks—deactivate the current boost to switch.'
              : "Highlight this job to attract more candidates. You can only boost one job at a time. To highlight this job and attract more candidates, you'll need to deactivate any currently boosted job on job management."}
          </Typography>
        </Box>
      </Alert>
      <ConfirmationModal
        isOpen={open}
        handleCloseModal={handleCloseModal}
        isBoosted={isBoosted}
        handleConfirm={handleConfirm}
      />
    </>
  )
}

const ConfirmationModal = ({
  isOpen,
  handleCloseModal,
  handleConfirm,
  isBoosted
}: {
  isOpen: boolean
  handleCloseModal: () => void
  handleConfirm: (isBoost: boolean) => void
  isBoosted: boolean
}) => {
  return (
    <Dialog open={isOpen} onClose={() => handleCloseModal()} maxWidth={'xs'}>
      <DialogContent>
        <Box
          sx={{ display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center', alignItems: 'center' }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%'
              }}
            >
              <Typography fontSize={'18px'} fontWeight={700} sx={{ mx: 'auto' }}>
                {isBoosted ? 'Deactivate Current Boost?' : 'Activate Boost Job?'}
              </Typography>
              <IconButton onClick={handleCloseModal} sx={{}}>
                <Icon icon={'mdi:close'} fontSize={18} color='#868686' />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
              <Box component='img' src='/images/amico.png' sx={{ objectFit: 'contain' }} />
            </Box>
            <Typography textAlign={'center'} fontSize={'14px'} fontWeight={400} color={'#999999'}>
              {!isBoosted
                ? 'You can only have one boosted job at a time. Do you want to activate the boost for this job?'
                : 'You can only have one boosted job at a time. Do you want to deactivate the current boost?'}
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                onClick={() => {
                  if (isBoosted) handleConfirm(!isBoosted)
                  handleCloseModal()
                }}
                variant='outlined'
                sx={{ color: '#0B58A6', fontSize: '14px', textTransform: 'none', width: '100%' }}
              >
                {isBoosted ? 'Yes' : 'No'}
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                onClick={() => {
                  if (!isBoosted) handleConfirm(!isBoosted)
                  handleCloseModal()
                }}
                variant='contained'
                sx={{ color: '#FFFFFF', fontSize: '14px', textTransform: 'none', width: '100%' }}
              >
                {isBoosted ? 'No' : 'Yes'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default BoostJobAlert
