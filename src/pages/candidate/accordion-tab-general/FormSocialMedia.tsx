import { Button, CircularProgress, Grid, InputLabel, TextField, useMediaQuery } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { AppConfig } from 'src/configs/api'
import { HttpClient } from 'src/services'
import { useTheme } from '@mui/material/styles'
import toast from 'react-hot-toast'
import { useProfileCompletion } from 'src/hooks/useProfileCompletion'

const FormSocialMedia = () => {
  const { refetch, setRefetch } = useProfileCompletion()

  const Theme = useTheme()
  const isMobile = useMediaQuery(Theme.breakpoints.down('md'))
  const [instagram, setInstagram] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [facebook, setFacebook] = useState('')
  const [loadingSave, setLoadingSave] = useState(false)
  const [disabledInstagram, setDisabledInstagram] = useState(false)
  const [disabledLinkedin, setDisabledLinkedin] = useState(false)
  const [disabledFacebook, setDisabledFacebook] = useState(false)

  let statusfb: any = ''
  let statusig: any = ''
  let statuslinkedin: any = ''

  const fetchUserSocialMedia = () => {
    HttpClient.get(AppConfig.baseUrl + '/user/sosmed?page=1&take=100').then(response => {
      const code = response.data.sosmeds.data
      for (let x = 0; x < code.length; x++) {
        const element = code[x]
        if (element.sosmed_type == 'Facebook') {
          setFacebook(element.username)
          statusfb = element.id
        }
        if (element.sosmed_type == 'Instagram') {
          setInstagram(element.username)
          statusig = element.id
        }
        if (element.sosmed_type == 'LinkedIn') {
          setLinkedin(element.username)
          statuslinkedin = element.id
        }
      }
    })
  }

  const handleSubmitSocialMedia = async () => {
    setLoadingSave(true)
    await handleSubmitInstagram()
    await handleSubmitLinkedIn()
    await handleSubmitFacebook()

    setTimeout(() => {
      setLoadingSave(false)
    }, 1000)
  }

  const handleSubmitInstagram = async () => {
    let user = ''
    if (instagram.length < 20) {
      user = 'https://instagram.com/' + instagram
    } else {
      user = instagram
    }

    const json = {
      sosmed_address: user
    }

    if (statusig == '') {
      HttpClient.post(AppConfig.baseUrl + '/user/sosmed', json).then(
        ({ data }) => {
          console.log('Success add social media (instagram):', data)
          statusig = data.sosmed.id
          setDisabledInstagram(true)
          setRefetch(!refetch)
        },
        error => {
          console.log('Failed add social media (instagram): ', error)
          toast.error('Failed add social media (instagram): ' + error.response.data.message)
        }
      )
    } else {
      HttpClient.patch(AppConfig.baseUrl + '/user/sosmed/' + statusig, json).then(
        ({ data }) => {
          console.log('Success add social media (instagram):', data)
          setDisabledInstagram(true)
        },
        error => {
          console.log('Failed add social media (instagram): ', error)
          toast.error('Failed add social media (instagram): ' + error.response.data.message)
        }
      )
    }
  }

  const handleSubmitLinkedIn = async () => {
    let user = ''
    if (linkedin.length < 20) {
      user = 'https://www.linkedin.com/in/' + linkedin
    } else {
      user = linkedin
    }
    const json = {
      sosmed_type: 'linkedin',
      sosmed_address: user
    }
    if (statuslinkedin == '') {
      HttpClient.post(AppConfig.baseUrl + '/user/sosmed', json).then(
        ({ data }) => {
          console.log('Success add social media (linkedIn):', data)
          statuslinkedin = data.sosmed.id
          setDisabledLinkedin(true)
          setRefetch(!refetch)
        },
        error => {
          console.log('Failed add social media (linkedIn): ', error)
          toast.error('Failed add social media (linkedIn): ' + error.response.data.message)
        }
      )
    } else {
      HttpClient.patch(AppConfig.baseUrl + '/user/sosmed/' + statuslinkedin, json).then(
        ({ data }) => {
          console.log('Success add social media (linkedIn):', data)
          setDisabledLinkedin(true)
        },
        error => {
          console.log('Failed add social media (linkedIn):', error)
          toast.error('Failed add social media (linkedIn): ' + error.response.data.message)
        }
      )
    }
  }

  const handleSubmitFacebook = async () => {
    let user = ''
    if (facebook.length < 20) {
      user = 'https://www.facebook.com/' + facebook
    } else {
      user = facebook
    }

    const json = {
      sosmed_type: 'Facebook',
      sosmed_address: user
    }
    if (statusfb == '') {
      HttpClient.post(AppConfig.baseUrl + '/user/sosmed', json).then(
        ({ data }) => {
          statusfb = data.sosmed.id
          setDisabledFacebook(true)
          setRefetch(!refetch)
        },
        error => {
          toast.error('Failed add social media (facebook): ' + error.response.data.message)
        }
      )
    } else {
      HttpClient.patch(AppConfig.baseUrl + '/user/sosmed/' + statusfb, json).then(
        () => {
          setDisabledFacebook(true)
        },
        error => {
          toast.error('Failed add social media (facebook): ' + error.response.data.message)
        }
      )
    }
  }

  useEffect(() => {
    fetchUserSocialMedia()
  }, [])

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <InputLabel
              sx={{
                fontFamily: 'Figtree',
                fontSize: '12px',
                fontWeight: 700,
                mb: '12px'
              }}
            >
              Instagram
            </InputLabel>
            <TextField
              id='instagram'
              value={instagram}
              variant='outlined'
              fullWidth
              onChange={e => setInstagram(e.target.value)}
              placeholder='Please input full link or username'
              disabled={disabledInstagram}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputLabel
              sx={{
                fontFamily: 'Figtree',
                fontSize: '12px',
                fontWeight: 700,
                mb: '12px'
              }}
            >
              Linked In
            </InputLabel>
            <TextField
              id='linkedin'
              value={linkedin}
              variant='outlined'
              fullWidth
              onChange={e => setLinkedin(e.target.value)}
              placeholder='Please input full link or username'
              disabled={disabledLinkedin}
            />
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <InputLabel
              sx={{
                fontFamily: 'Figtree',
                fontSize: '12px',
                fontWeight: 700,
                mb: '12px'
              }}
            >
              Facebook
            </InputLabel>
            <TextField
              id='faceboom'
              value={facebook}
              variant='outlined'
              fullWidth
              onChange={e => setFacebook(e.target.value)}
              placeholder='Please input full link or username'
              disabled={disabledFacebook}
            />
          </Grid>
          <Grid item xs={12} md={6}></Grid>
        </Grid>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type='button'
            variant='contained'
            sx={{
              width: isMobile ? '140px !important' : '212px !important',
              px: '16px',
              py: '8px',
              textTransform: 'capitalize',
              fontSize: '14px',
              fontWeight: 400
            }}
            disabled={loadingSave}
            onClick={handleSubmitSocialMedia}
          >
            {loadingSave ? <CircularProgress /> : ' Save Changes'}
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default FormSocialMedia
