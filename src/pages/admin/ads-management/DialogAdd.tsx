import { Ref, forwardRef, ReactElement, useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { styled } from '@mui/material/styles'
import toast from 'react-hot-toast'
import Icon from 'src/@core/components/icon'
import { useForm } from 'react-hook-form'
import { HttpClient } from 'src/services'
import { getCleanErrorMessage } from 'src/utils/helpers'
import {
  Autocomplete,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup
} from '@mui/material'
// import User from 'src/contract/models/company'
import { DateType } from 'src/contract/models/DatepickerTypes'
// import { Autocomplete } from '@mui/material'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { useDropzone } from 'react-dropzone'

import Link from 'next/link'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

type DialogProps = {
  visible: boolean
  onCloseClick: VoidFunction
  onStateChange: VoidFunction
}

interface FileProp {
  name: string
  type: string
  size: number
}

const ADS_LOCATION_OPTIONS = [
  {
    label: 'Home Page',
    value: 'home-page'
  },
  {
    label: 'Candidate Profile Page',
    value: 'candidate-profile-page'
  },
  {
    label: 'Company Profile Page',
    value: 'company-profile-page'
  },
  {
    label: 'Connections Page',
    value: 'connections-page'
  },
  {
    label: 'Notifications Page',
    value: 'notifications-page'
  }
]

const ADS_PLACEMENT_OPTIONS = [
  {
    label: 'Sidebar',
    value: 'sidebar'
  },
  {
    label: 'In between Content',
    value: 'in-between-content'
  }
]

const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    marginRight: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  },
  [theme.breakpoints.down('sm')]: {
    width: 250
  }
}))

const DialogAdd = (props: DialogProps) => {
  const [onLoading, setOnLoading] = useState(false)
  const [date, setDate] = useState<DateType>(new Date())
  const [files, setFiles] = useState<File[]>([])
  const [adsLocation, setAdsLocation] = useState<string>('')
  const [adsPlacement, setAdsPlacement] = useState<string>('')
  
  //   const [submitError, setSubmitError] = useState<any>(null)

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file: File) => Object.assign(file)))
    }
  })

  const img = files.map((file: FileProp) => (
    <img
      key={file.name}
      alt={file.name}
      className='single-file-image'
      src={URL.createObjectURL(file as any)}
      width={450}
    />
  ))

  const { register, handleSubmit, reset } = useForm<any>({
    mode: 'onBlur'
  })

  const onSubmit = async (formData: { description: string; cta: string }) => {
    const { description } = formData
    const { cta } = formData

    const json = {
      attachments: files,
      expired_at:
        date
          ?.toLocaleDateString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          })
          .split('/')
          .reverse()
          .join('-') +
        ' ' +
        date?.toTimeString().split(' ')[0],
      description: description,
      cta: cta,
      ads_location: adsLocation,
      ads_placement: adsPlacement
    }

    // return

    setOnLoading(true)

    try {
      const resp = await HttpClient.postFile('/ads', json)
      if (resp.status != 200) {
        throw resp.data.message ?? 'Something went wrong!'
      }

      props.onCloseClick()
      toast.success(` Ads submited successfully!`)
      setAdsLocation('')
      setAdsPlacement('')
      reset()
    } catch (error) {
      props.onCloseClick()
      toast.error(`Opps ${getCleanErrorMessage(error)}`)
    }

    setOnLoading(false)
    props.onStateChange()
  }

  return (
    <Dialog fullWidth open={props.visible} maxWidth='sm' scroll='body' TransitionComponent={Transition}>
      <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          sx={{
            position: 'relative',
            pb: theme => `${theme.spacing(8)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <IconButton
            size='small'
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
            onClick={props.onCloseClick}
          >
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography variant='body2' color={'#32487A'} fontWeight='600' fontSize={18}>
              Add New ADS
            </Typography>
            <Typography variant='body2'>Fulfill your ADS Info here</Typography>
          </Box>

          <Grid container columnSpacing={'1'} rowSpacing={'4'}>
            <Grid item md={12} xs={12}>
              <Autocomplete
                disablePortal
                id='ads-location-select'
                options={ADS_LOCATION_OPTIONS}
                getOptionLabel={option => option.label}
                renderInput={params => <TextField {...params} label='Ads Location' />}
                onChange={(event: any, newValue) => (newValue ? setAdsLocation(newValue.value) : setAdsLocation(''))}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <FormControl>
                <FormLabel id='ads-placement-button-group'>Ads Placement</FormLabel>
                <RadioGroup
                  aria-labelledby='ads-placement-button-group'
                  name='ads-placement'
                  value={adsPlacement}
                  onChange={e => setAdsPlacement(e.target.value)}
                >
                  <FormControlLabel
                    value={ADS_PLACEMENT_OPTIONS[0].value}
                    control={<Radio />}
                    label={ADS_PLACEMENT_OPTIONS[0].label}
                  />
                  <FormControlLabel
                    value={ADS_PLACEMENT_OPTIONS[1].value}
                    control={<Radio />}
                    label={ADS_PLACEMENT_OPTIONS[1].label}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item md={12} xs={12}>
              <DatePickerWrapper>
                <DatePicker
                  showTimeSelect
                  minDate={new Date()}
                  dateFormat='dd/MM/yyyy hh:mm aa'
                  selected={date}
                  id='basic-input'
                  onChange={(date: Date) => setDate(date)}
                  placeholderText='Click to select a date'
                  customInput={<TextField label='Expired At' variant='outlined' fullWidth />}
                />
              </DatePickerWrapper>
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                id='description'
                label='Description'
                variant='outlined'
                multiline
                maxRows={4}
                fullWidth
                {...register('description')}
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <TextField
                id='cta'
                label='CTA'
                placeholder='example: https://profesea.id/'
                variant='outlined'
                multiline
                maxRows={4}
                fullWidth
                {...register('cta')}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <Box {...getRootProps({ className: 'dropzone' })} sx={{ p: 2, border: '1px dashed' }}>
                <input {...getInputProps()} />
                {files.length ? (
                  img
                ) : (
                  <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], alignItems: 'center' }}>
                    <Img width={200} alt='Upload img' src='/images/upload.png' />
                    <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: ['center', 'center', 'inherit'] }}>
                      <Typography
                        variant='h5'
                        color='textSecondary'
                        sx={{ '& a': { color: 'primary.main', textDecoration: 'none' } }}
                      >
                        Click{' '}
                        <Link href='/' onClick={e => e.preventDefault()}>
                          browse / image
                        </Link>{' '}
                        to upload ADS
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>
              <Typography sx={{ mt: 1, color: 'primary.main', fontSize: 12 }}>
                Allowed JPEG, JPG, PNG Size up to 3 Mb.
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button variant='contained' size='small' sx={{ mr: 2 }} type='submit'>
            <Icon fontSize='large' icon={'solar:diskette-bold-duotone'} color={'info'} style={{ fontSize: '18px' }} />
            {onLoading ? <CircularProgress size={25} style={{ color: 'white' }} /> : 'Submit'}
          </Button>
          <Button variant='outlined' size='small' color='error' onClick={props.onCloseClick}>
            <Icon
              fontSize='large'
              icon={'material-symbols:cancel-outline'}
              color={'info'}
              style={{ fontSize: '18px' }}
            />
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default DialogAdd
