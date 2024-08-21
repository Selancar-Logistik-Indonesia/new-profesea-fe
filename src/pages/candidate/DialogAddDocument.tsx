import { Ref, forwardRef, ReactElement, useState, useEffect } from 'react'
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

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

import moment from 'moment'
import toast from 'react-hot-toast'
import Icon from 'src/@core/components/icon'
import { useForm } from 'react-hook-form'
import { HttpClient } from 'src/services'
import { getCleanErrorMessage } from 'src/utils/helpers'
import { CircularProgress, FormControlLabel, Checkbox } from '@mui/material'

// import DatePicker from 'react-datepicker'
// import { DateType } from 'src/contract/models/DatepickerTypes'

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
  getCandidateDocument: VoidFunction
}

type FormData = {
  user_document: string
  document_name: string
  organization: string
  document_number: string
  issue_at: string
  expired_at: string
  is_lifetime: boolean
}

const DialogAddDocument = (props: DialogProps) => {
  const [onLoading, setOnLoading] = useState(false)
  const [preview, setPreview] = useState()
  const [selectedFile, setSelectedFile] = useState()
  const [issueDate, setIssueDate] = useState<any>(null)
  const [expiredDate, setExpiredDate] = useState<any>(null)
  const [isLifetime, setIsLifetime] = useState(false)

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)

      return
    }
    const objectUrl: any = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const {
    register,
    // formState: { errors },
    handleSubmit
  } = useForm<FormData>({
    mode: 'onBlur'
    // resolver: yupResolver(schema)
  })

  const onSubmit = async (item: FormData) => {
    saveparent(item)
    props.onStateChange()
  }
  const saveparent = async (item: FormData) => {
    const json = {
      user_document: selectedFile,
      document_name: item.document_name,
      document_number: item.document_number,
      organization: item.organization,
      issue_at: moment(issueDate).format('YYYY-MM-DD'),
      expired_at: !isLifetime && expiredDate ? moment(expiredDate).format('YYYY-MM-DD') : null,
      is_lifetime: isLifetime
    }
    setOnLoading(true)

    try {
      const resp = await HttpClient.postFile('/user/candidate-document', json)
      if (resp.status != 200) {
        throw resp.data.message ?? 'Something went wrong!'
      }
      props.onCloseClick()
      toast.success(` Certificate submited successfully!`)
      props.getCandidateDocument()
      setOnLoading(false)
    } catch (error) {
      toast.error(`Opps ${getCleanErrorMessage(error)}`)
      setOnLoading(false)
    }
  }

  const onSelectFile = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)

      return
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0])
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
              Add Certificate
            </Typography>
            <Typography variant='body2'>
              Fill in the details below to highlight your skills and qualifications.
            </Typography>
          </Box>

          <Grid container rowSpacing={'4'}>
            <Grid item md={12} xs={12}>
              <TextField
                id='document_name'
                label='Certificate Name *'
                variant='standard'
                fullWidth
                {...register('document_name')}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                id='organization'
                label='Organization *'
                variant='standard'
                fullWidth
                {...register('organization')}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label={'Issue Date *'}
                  views={['month', 'year']}
                  onChange={(date: any) => setIssueDate(date)}
                  value={issueDate}
                  slotProps={{
                    textField: { variant: 'standard', fullWidth: true, id: 'basic-input', ...register('issue_at') }
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item md={12} xs={12}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label={'Expired Date'}
                  views={['month', 'year']}
                  onChange={(date: any) => setExpiredDate(date)}
                  value={!isLifetime && expiredDate ? moment(expiredDate) : null}
                  slotProps={{ textField: { variant: 'standard', fullWidth: true, id: 'basic-input' } }}
                  disabled={isLifetime}
                />
              </LocalizationProvider>
            </Grid>
            <Grid>
              <FormControlLabel
                sx={{ width: '100%' }}
                control={
                  <Checkbox
                    name='is_lifetime'
                    id='is_lifetime'
                    onClick={() => setIsLifetime(!isLifetime)}
                    value={isLifetime}
                    checked={isLifetime}
                  />
                }
                label='This Certificate is no expired date'
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                id='document_number'
                label='Credentials ID'
                variant='standard'
                fullWidth
                {...register('document_number')}
              />
            </Grid>
            <Grid item md={12} xs={12} mt={2}>
              <Grid item xs={12} md={12} container justifyContent={'left'}>
                <Grid xs={6}>
                  <label htmlFor='x'>
                    <img
                      alt='logo'
                      src={preview ? preview : '/images/uploadimage.jpeg'}
                      style={{
                        maxWidth: '100%',
                        height: '120px',
                        padding: 0,
                        margin: 0
                      }}
                    />
                  </label>
                  <input
                    accept='application/pdf,,image/*'
                    style={{ display: 'none' }}
                    id='x'
                    onChange={onSelectFile}
                    type='file'
                  ></input>
                </Grid>
                <Grid xs={6}>
                  <Box sx={{ marginTop: '20px', marginLeft: '5px' }}>
                    <Typography variant='body2' sx={{ textAlign: 'left', color: '#262525', fontSize: '10px' }}>
                      <strong>Click to change Certificate File.</strong>
                    </Typography>
                    <Typography variant='body2' sx={{ textAlign: 'left', color: '#262525', fontSize: '10px' }}>
                      Allowed PDF.
                    </Typography>
                    <Typography variant='body2' sx={{ textAlign: 'left', color: '#262525', fontSize: '10px' }}>
                      Max size of 800K. Aspect Ratio 1:1
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
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

export default DialogAddDocument
