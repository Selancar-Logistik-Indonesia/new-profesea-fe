import { Ref, forwardRef, ReactElement, useState, useEffect, useRef } from 'react'

import {
  Box,
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Fade,
  FadeProps,
  Typography,
  FormControl,
  InputLabel
} from '@mui/material'
import { Icon } from '@iconify/react'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import { toast } from 'react-hot-toast'
import { ISeafarerExperienceForm } from './SeafarerExperienceInterface'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const SeafarerExperienceForm = (props: ISeafarerExperienceForm) => {
  const { type, seafarerExperience, showModal } = props
  const id = seafarerExperience?.id

  const [userId, setUserId] = useState()
  const [countryId, setCountryId] = useState()
  const [rankId, setRankId] = useState()
  const [vesselTypeId, setVesselTypeId] = useState()

  const [vesselName, setVesselName] = useState()
  const [grt, setGrt] = useState()
  const [dwt, setDwt] = useState()
  const [mePower, setMePower] = useState()

  const [signIn, setSignIn] = useState()
  const [signOff, setSignOff] = useState()
  const [company, setCompany] = useState()

  const [countries, setCountries] = useState([])

  const loadCountries = () => {
    HttpClient.get(AppConfig.baseUrl + '/public/data/country?page=1&take=100')
      .then(response => {
        const countries = response?.data?.countries.map((item: any) => {
          return {
            id: item.id,
            name: item.name
          }
        })

        setCountries(countries)
      })
      .catch(err => {
        toast(' err ' + JSON.stringify(err))
      })
  }

  const createExperience = (callback: Function) => {
    HttpClient.post(AppConfig.baseUrl + '/seafarer-experiences/', {
      user_id: userId,
      rank_id: rankId,
      country_id: countryId,
      vessel_type_id: vesselTypeId,
      vessel_name: vesselName,
      grt: grt,
      dwt: dwt,
      me_power: mePower,
      sign_in: signIn,
      sign_off: signOff,
      company: company
    })
      .then(res => {
        toast('create experience success', { icon: 'success' })
        callback()
      })
      .catch(err => {})
  }

  const updateExperience = (id: number, callback: Function) => {
    HttpClient.patch(AppConfig.baseUrl + '/seafarer-experiences/' + id, {
      user_id: userId,
      rank_id: rankId,
      country_id: countryId,
      vessel_type_id: vesselTypeId,
      vessel_name: vesselName,
      grt: grt,
      dwt: dwt,
      me_power: mePower,
      sign_in: signIn,
      sign_off: signOff,
      company: company
    })
      .then(res => {
        toast('create experience success', { icon: 'success' })
        callback()
      })
      .catch(err => {
        toast(JSON.stringify(err), { icon: 'danger' })
      })
  }

  useEffect(() => {
    loadCountries()
  }, [])

  const handleCreateExperience = () => {
    createExperience(() => {})
  }

  const handleUpdateExperience = () => {
    if (typeof id == 'number') {
      updateExperience(id, () => {})
    } else {
      toast(' experience ID is required', { icon: 'danger' })
    }
  }

  return (
    <Dialog fullWidth open={showModal} maxWidth='sm' scroll='body' TransitionComponent={Transition}>
      <DialogTitle>
        <IconButton
          size='small'
          sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          onClick={e => props.handleModalForm(e)}
        >
          <Icon width='24' height='24' icon='mdi:close' />
        </IconButton>
        <Box sx={{ mb: 2, textAlign: 'center' }}>
          <Typography variant='body2' color={'#32487A'} fontWeight='600' fontSize={18}>
            {type == 'create' ? 'Add new ' : 'Update '} experience
          </Typography>
          <Typography variant='body2'>Fulfill your Experience Info here</Typography>
        </Box>
      </DialogTitle>
      <DialogContent
        dividers
        sx={{
          position: 'relative',
          pb: theme => `${theme.spacing(5)} !important`,
          px: theme => [`${theme.spacing(3)} !important`, `${theme.spacing(10)} !important`],
          pt: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(7.5)} !important`],
          height: '500px'
        }}
      >
        <Grid container>
          <Grid item md={12} xs={12} mb={5}>
            <FormControl>
              <InputLabel> Vessel Name </InputLabel>
            </FormControl>
          </Grid>
          <Grid item md={12} xs={12} mb={5}>
            <FormControl>
              <InputLabel> Vessel Type </InputLabel>
            </FormControl>
          </Grid>
          <Grid item md={12} xs={12} mb={5}>
            <FormControl>
              <InputLabel> Rank / Position </InputLabel>
            </FormControl>
          </Grid>
          <Grid item container md={12} xs={12} mb={5}>
            <Grid item md={4} xs={12}>
              <FormControl>
                <InputLabel> GRT </InputLabel>
              </FormControl>
            </Grid>
            <Grid item md={4}>
              <FormControl>
                <InputLabel> DWT </InputLabel>
              </FormControl>
            </Grid>
            <Grid item md={4}>
              <FormControl>
                <InputLabel> ME POWER </InputLabel>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default SeafarerExperienceForm
