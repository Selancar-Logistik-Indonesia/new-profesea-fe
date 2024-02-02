import { Ref, forwardRef, ReactElement, useState, useEffect, useRef } from 'react'

import { Box, Grid, Dialog, DialogContent, DialogTitle, IconButton, Fade, FadeProps, Typography } from '@mui/material'
import { Icon } from '@iconify/react'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import { toast } from 'react-hot-toast'
import { ISeafarerCompetencyForm } from './SeafarerCompetencyInterface'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const SeafarerCompetencyForm = (props: ISeafarerCompetencyForm) => {
  const { type, seafarerCompetency, showModal } = props
  const id = seafarerCompetency?.id

  const [userId, setUserId] = useState()
  const [countryId, setCountryId] = useState()
  const [cocId, setCocId] = useState()
  const [certificateNumber, setCertificateNumber] = useState()
  const [validUntil, setValidUntil] = useState()
  const [isLifetime, setIsLifetime] = useState()
  const [filename, setFilename] = useState()

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
        toast.error(' err ' + JSON.stringify(err))
      })
  }

  const createCompetency = (callback: Function) => {
    HttpClient.post(AppConfig.baseUrl + '/seafarer-proficiencies/', {
      user_id: userId,
      country_id: countryId,
      coc_id: cocId,
      certificate_number: certificateNumber,
      valid_until: validUntil,
      is_lifetime: isLifetime,
      filename: filename
    })
      .then(res => {
        toast.success('create competency success')
        callback()
      })
      .catch(err => {})
  }

  const updateCompetency = (id: number, callback: Function) => {
    HttpClient.patch(AppConfig.baseUrl + '/seafarer-proficiencies/' + id, {
      user_id: userId,
      country_id: countryId,
      coc_id: cocId,
      certificate_number: certificateNumber,
      valid_until: validUntil,
      is_lifetime: isLifetime,
      filename: filename
    })
      .then(res => {
        toast.success('create competency success')
        callback()
      })
      .catch(err => {
        toast.error(JSON.stringify(err))
      })
  }

  useEffect(() => {
    loadCountries()
  }, [])

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
            {type == 'create' ? 'Add new ' : 'Update '} competency
          </Typography>
          <Typography variant='body2'>Fulfill your Competency Info here</Typography>
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
        <div>{JSON.stringify(seafarerCompetency)}</div>
      </DialogContent>
    </Dialog>
  )
}

export default SeafarerCompetencyForm
