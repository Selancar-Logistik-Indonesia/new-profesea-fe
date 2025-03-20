import { Icon } from '@iconify/react'
import { Alert, Box, Button, CircularProgress, Dialog, DialogContent, Grid, Switch, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { HttpClient } from 'src/services'

import Job from 'src/contract/models/job'
import Link from 'next/link'

const BoostJobAlert = ({
  setIsBoosted,
  currentJob,
  isBoosted
}: {
  isBoosted: boolean
  setIsBoosted: (e: boolean) => void
  currentJob?: Job
}) => {
  const [boostCount, setBoostCount] = useState(0)
  const [open, setOpen] = useState(false)
  const [availableBoost, setAvailableBoost] = useState(true)
  const[loading, setLoading] = useState(false)

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
        take: 50
      })
      const data = res.data.jobs.data
      data.forEach((item:Job) =>{
        if(item.is_boosted) setBoostCount(prev => prev + 1)
      })
     
      setLoading(false)
      setAvailableBoost(boostCount === 0 || (boostCount > 0 && currentJob?.is_boosted as boolean))
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getJobs()
  }, [])

  const actionSwitch = () => {
    if(loading) {<CircularProgress size={20}/>}

    if (!availableBoost) {
      return (
        <Link href='/company/job-management/'>
          <Button
            sx={{
              border: '1px solid #0B58A6',
              textTransform: 'none',
              fontSize: 14,
              color: '#0B58A6',
              fontWeight: 400,
              whiteSpace: 'nowrap'
            }}
          >
            Go to Job Management
          </Button>
        </Link>
      )
    }

    return (
      <Switch
        // disabled={boostCount > 0 && !currentJob?.is_boosted}
        // checked={isBoosted === currentJob?.is_boosted ? currentJob?.is_boosted : isBoosted}
        inputProps={{ 'aria-label': 'controlled' }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setIsBoosted(e.target.checked)
          setOpen(true)
        }}
        defaultChecked={currentJob?.is_boosted}
      />
    )
  }


  return (
    <>
      <Alert
        action={actionSwitch()}
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
    <Dialog open={isOpen} onClose={() => handleCloseModal()}>
      <DialogContent>
        <Box
          sx={{ display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center', alignItems: 'center' }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Typography textAlign={'center'} fontSize={'18px'} fontWeight={700}>
              Are you sure you want to {isBoosted ? 'boost' : 'unboost'} this job?
            </Typography>
            <Typography textAlign={'center'} fontSize={'16px'} fontWeight={400}>
              This will switch the state of your job to {isBoosted ? 'boosted' : 'unboosted'}.
            </Typography>
          </Box>
          <Grid container spacing={2} sx={{}}>
            <Grid item xs={6}>
              <Button
                onClick={() => {
                  handleConfirm(isBoosted)
                  handleCloseModal()
                }}
                variant='outlined'
                sx={{ padding: '8px 12px', color: '#0B58A6', fontSize: '14px', textTransform: 'none', width: '100%' }}
              >
                Yes
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                onClick={() => {
                  handleCloseModal()
                  handleConfirm(!isBoosted)
                }}
                variant='contained'
                sx={{ padding: '8px 12px', color: '#FFFFFF', fontSize: '14px', textTransform: 'none', width: '100%' }}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default BoostJobAlert
